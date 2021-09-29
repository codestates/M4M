const { isAuthorized } = require('../tokenFunctions');
const { songuserhashtaglike } = require('../../models');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const Op = Sequelize.Op;

// DELETE http://localhost:80/my-like
module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(404).send({ message: 'You\'re not logged in.' });
    } else {
      // console.log(req.body.songId);

      let songInfo = await songuserhashtaglike.findAll({
        where: {
          [Op.and]: [
            { userId: accessTokenData.id },
            { songId: req.body.songId },
            { hashtagId: 1 }
          ]
        }
      });

      songInfo = Sequelize.getValues(songInfo);
      console.log(songInfo.length);

      songInfo = songInfo.map((song) => song.id);
      // console.log(songInfo);
      if (songInfo) {
        await songuserhashtaglike.destroy({
          where: {
            id: songInfo
          }
        });

        res.status(200).json({
          message: 'ok'
        });
      } else {
        res.status(400).json({
          message: 'error'
        });
      }
    }
  } catch {
    res.status(400).json({
      message: 'error'
    });
  }
};
