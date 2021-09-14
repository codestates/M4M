const { song, hashtaglike, songuserhashtaglike } = require('../../models');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const Op = Sequelize.Op;

module.exports = {
  // 예시(http 환경일 때): http://localhost:80/title?query=그럴때마다
  // 예시(https 환경일 때): https://localhost:80/title?query=그럴때마다
  findAllTitle: async (req, res) => {
    try {
      if (req.query.query !== undefined) {
        console.log('query: ' + req.query.query);

        // 쿼리가 비어있을 때
        if (req.query.query.length === 0) {
          return res.status(400).json({
            message: 'Please enter a search term'
          });
        }

        let songList = await song.findAll({
          where: {
            title: {
              [Op.like]: '%' + req.query.query + '%'
            }
          }
        });

        if (songList.length === 0) {
          res.status(400).json({
            message: 'Title not found'
          });
        } else {
          songList = Sequelize.getValues(songList);

          songList = songList.map((song) => {
            song.title = song.title.replace(/[|]/g, ',');
            song.artist = song.artist.replace(/[|]/g, ',');

            return {
              id: song.id,
              title: song.title,
              artist: song.artist,
              album_art: song.album_art,
              date: song.date
            };
          });

          const fetchSongInfo = async () => {
            const songInfo = songList.map(async (song) => {
              // console.log("++++++++++++++++++\n", song.id);
              try {
                let getHashtagName = await songuserhashtaglike.findAll({
                  include: [{
                    model: hashtaglike,
                    attributes: ['name']
                  }],
                  where: {
                    songId: song.id
                  }
                });

                getHashtagName = Sequelize.getValues(getHashtagName);
                // console.log(getHashtagName);

                const hashtaglikeCount = {};
                getHashtagName.map((song) => {
                  // console.log(song.hashtaglike.name);
                  if (hashtaglikeCount[song.hashtaglike.name]) {
                    hashtaglikeCount[song.hashtaglike.name] += 1;
                  } else {
                    hashtaglikeCount[song.hashtaglike.name] = 1;
                  }
                });
                
                // console.log(hashtaglikeCount);

                if (!hashtaglikeCount['좋아요']) {
                  hashtaglikeCount['좋아요'] = 0;
                }

                return {
                  id: song.id,
                  title: song.title,
                  artist: song.artist,
                  album_art: song.album_art,
                  date: song.date,
                  hashtagLike: hashtaglikeCount
                };
              } catch (error) {
                console.log(error);
              }
            });

            const results = await Promise.all(songInfo);
            // console.log(results);

            res.status(200).json({
              data: results,
              message: 'ok'
            });
          };

          fetchSongInfo();
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
