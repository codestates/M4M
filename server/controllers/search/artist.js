const db = require('../../models');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const Op = Sequelize.Op;

module.exports = {
  // 예시(http 환경일 때): http://localhost:80/artist?query=일기예보
  // 예시(https 환경일 때): https://localhost:80/artist?query=일기예보
  findAllArtist: async (req, res) => {
    try {
      if (req.query.query !== undefined) {
        console.log(req.query.query);

        // 쿼리가 비어있을 때
        if (req.query.query.length === 0) {
          return res.status(400).json({
            message: 'Please enter a search term'
          });
        }

        let songInfo = await db.song.findAll({
          where: {
            artist: {
              [Op.like]: '%' + req.query.query + '%'
            }
          }
        });

        songInfo = Sequelize.getValues(songInfo);

        if (songInfo.length === 0) {
          res.status(400).json({
            message: 'Artist not found'
          });
        } else {
          console.log(songInfo);
          console.log(songInfo.length);
          res.status(200).json({
            data: songInfo,
            message: 'ok'
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
};
