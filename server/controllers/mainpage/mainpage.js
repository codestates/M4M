const { isAuthorized } = require('../tokenFunctions');
const { song, hashtaglike, songuserhashtaglike } = require('../../models');
const Sequelize = require('sequelize');

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
    // console.log(req.headers.authorization);
    // const accessTokenData = { id: req.headers.authorization };

    let songList = await song.findAll();

    if (songList.length === 0) {
      res.status(400).json({
        message: 'No songs are in the list'
      });
    } else {
      songList = Sequelize.getValues(songList);

      songList = songList.map((song) => {
        song.title = song.title.replace(/[|]/g, ',');
        song.artist = song.artist.replace(/[|]/g, ',');
        song.album = song.album.replace(/[|]/g, ',');
        song.genre = song.genre.replace(/[|]/g, ',');

        return {
          id: song.id,
          title: song.title,
          artist: song.artist,
          genre: song.genre,
          album_art: song.album_art,
          date: song.date,
          year: song.year
        };
      });

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

            let hashtaglikeCount = {
              좋아요: 0,
              '#인생곡인': 0,
              '#가사가재밌는': 0,
              '#몸이기억하는': 0,
              '#눈물샘자극': 0,
              '#노래방금지곡': 0,
              '#영원한18번': 0,
              '#추억소환': 0
            };

            getHashtagName.map((song) => {
              // console.log(song.hashtaglike.name);
              if (hashtaglikeCount[song.hashtaglike.name]) {
                hashtaglikeCount[song.hashtaglike.name] += 1;
              } else {
                hashtaglikeCount[song.hashtaglike.name] = 1;
              }
            });

            // hashtagLike 배열 형태로 출력, 객체로 출력해야할 시 주석 처리 후 실행
            hashtaglikeCount = Object.entries(hashtaglikeCount);

            const payload = {
              id: song.id,
              title: song.title,
              artist: song.artist,
              genre: song.genre,
              album_art: song.album_art,
              date: song.date,
              year: song.year,
              hashtagLike: hashtaglikeCount
            };

            // 로그인 된 유저에 한해서는 본인이 추가한 좋아요 및 해시태그 정보를 추가적으로 보내주어야 함.
            if (accessTokenData) {
              let userHashtagLikes = await songuserhashtaglike.findAll(
                {
                  where: {
                    userId: accessTokenData.id,
                    songId: song.id
                  }
                }
              );

              userHashtagLikes = Sequelize.getValues(userHashtagLikes);

              if (userHashtagLikes) {
                userHashtagLikes = userHashtagLikes.map((el) => el.hashtagId);
                payload.userHashtagLikes = userHashtagLikes;
              }
            }

            return payload;
          } catch (error) {
            res.status(400).json({ message: 'error' });
          }
        });

        const results = await Promise.all(songInfo);

        res.status(200).json({
          data: results,
          message: 'ok'
        });
      };

      fetchSongInfo();
    }
  } catch (error) {
    res.status(400).json({ message: 'error' });
  }
};
