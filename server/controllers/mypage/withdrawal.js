// const { isAuthorized } = require('../tokenFunctions');
const { user } = require('../../models');

// DELETE http://localhost:80/withdrawal
module.exports = async (req, res) => {
  try {
    // const accessTokenData = isAuthorized(req);

    // if (!accessTokenData) {
    //   return res.status(404).send({ message: 'You\'re not logged in.' });
    // } else {
    //   await User.destroy({
    //     where: { id: accessTokenData.id },
    //   });
    // }

    // test: without accessToken
    const userInfo = await user.findOne({
      where: {
        id: req.body.id
      }
    });

    if (userInfo) {
      await user.destroy({
        where: {
          id: userInfo.id
        }
      });

      // res.setHeader('authorization', '');
      // res.cookie('refreshToken', '');

      res.status(200).json({
        message: 'Successfully withdrawn'
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
