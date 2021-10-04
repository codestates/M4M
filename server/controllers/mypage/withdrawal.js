const { isAuthorized } = require('../tokenFunctions');
const { user } = require('../../models');

// DELETE http://localhost:80/withdrawal
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

      if (userInfo) {
        await user.destroy({
          where: {
            id: accessTokenData.id
          }
        });

        res.setHeader('authorization', '');

        res.status(200).json({
          message: 'Successfully withdrawn'
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
