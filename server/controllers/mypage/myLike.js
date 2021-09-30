const { isAuthorized } = require('../tokenFunctions');
const { user, song, hashtaglike, songuserhashtaglike } = require('../../models');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const Op = Sequelize.Op;

// GET http://localhost:80/my-like
module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.status(401).send({ message: 'You\'re not logged in.' });
    } else {
      const userInfo = await user.findOne({
        where: {
          id: accessTokenData.id
        }
      });
      // console.log(userInfo.id);

      let songList = await songuserhashtaglike.findAll({
        include: [{
          model: song,
          attributes: ['id', 'title', 'artist', 'album_art', 'date']
        }],
        // 해당 유저가 등록한 것 중 hashtagId가 1인 것(=좋아요)만 출력
        where: {
          [Op.and]: [
            { userId: userInfo.id },
            { hashtagId: 1 }
          ]
        }
      });

      if (songList.length === 0) {
        res.status(404).json({
          message: 'No songs are added to the list'
        });
      } else {
        songList = Sequelize.getValues(songList);
        songList = songList.map((el) => el.song);

        const fetchSongInfo = async () => {
          const songInfo = songList.map(async (song) => {
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

              song.title = song.title.replace(/[|]/g, ',');
              song.artist = song.artist.replace(/[|]/g, ',');

              let hashtaglikeCount = {
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

              hashtaglikeCount = Object.entries(hashtaglikeCount);

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
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
