require('dotenv').config();
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
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
        console.log(songInfo[0].title);

        res.status(200).json({
          data: [{
            id: songInfo[0].id,
            title: songInfo[0].title,
            artist: songInfo[0].artist,
            genre: songInfo[0].genre,
            album_art: songInfo[0].album_art,
            date: songInfo[0].date,
            lyrics: songInfo[0].lyrics
          }],
          message: 'ok'
        });
      } else {
        res.status(400).json({
          message: 'Song not found'
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
};
