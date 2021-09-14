// const { isAuthorized } = require('../tokenFunctions');
const { songuserhashtaglike } = require('../../models');

// DELETE http://localhost:80/delete-my-like
module.exports = async (req, res) => {
  try {
    // const accessTokenData = isAuthorized(req);

    // if (!accessTokenData) {
    //   return res.status(404).send({ message: 'You\'re not logged in.' });
    // } else {
    // }

    // test: without accessToken
    const songInfo = await songuserhashtaglike.findOne({
      where: {
        id: req.body.id
      }
    });

    if (songInfo) {
      await songuserhashtaglike.destroy({
        where: {
          id: req.body.id
        }
      });

      res.status(200).json({
        message: 'ok'
      });
    } else {
      res.status(400).json({
        message: 'Invalid access token'
      });
    }
  } catch {
    res.status(400).json({
      message: 'Invalid access token'
    });
  }
};
