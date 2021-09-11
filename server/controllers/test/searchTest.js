const db = require('../../models');

module.exports = {
  // 예시(http 환경일 때): http://localhost:80/searchTest?query=가질+수+없는+너
  // 예시(https 환경일 때): https://localhost:80/searchTest?query=가질+수+없는+너
  findAll: async (req, res) => {
    try {
      if (req.query.query !== undefined) {
        console.log(req.query.query);

        // 쿼리가 비어있을 때
        if (req.query.query.length === 0) {
          return res.status(400).json({
            message: 'Please enter a search term'
          });
        }

        const songInfo = await db.song.findAll({
          where: {
            title: req.query.query
          }
        });

        if (songInfo.length === 0) {
          res.status(400).json({
            message: 'Song not found'
          });
        } else {
          // console.log(songInfo);
          res.status(200).json({
            data: [{
              id: songInfo[0].id,
              title: songInfo[0].title,
              artist: songInfo[0].artist,
              genre: songInfo[0].genre,
              album: songInfo[0].album,
              album_art: songInfo[0].album_art,
              date: songInfo[0].date,
              lyrics: songInfo[0].lyrics,
              recommendType1: songInfo[0].recommendType1,
              recommendType2: songInfo[0].recommendType2,
              recommendType3: songInfo[0].recommendType3
            }],
            message: 'ok'
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
