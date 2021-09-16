const { song, hashtaglike, songuserhashtaglike } = require('../../models');
const Sequelize = require('sequelize');

module.exports = async (req, res) => {
  try {
    let songList = await song.findAll({});

    if (songList.length === 0) {
      res.status(400).json({
        message: 'No songs are in the list'
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

            const hashtaglikeCount = {
              좋아요: 0
            };

            getHashtagName.map((song) => {
              // console.log(song.hashtaglike.name);
              if (hashtaglikeCount[song.hashtaglike.name]) {
                hashtaglikeCount[song.hashtaglike.name] += 1;
              } else {
                hashtaglikeCount[song.hashtaglike.name] = 1;
              }
            });

            // console.log(hashtaglikeCount);

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
  } catch (error) {
    console.error(error);
  }
};
