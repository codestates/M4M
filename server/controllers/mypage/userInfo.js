const { isAuthorized } = require('../tokenFunctions');
const { user } = require('../../models');

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
      // console.log(userInfo.nickname);
      res.status(200).json({
        data: {
          nickname: userInfo.nickname,
          email: userInfo.email,
          birthYear: userInfo.birthYear,
          kakao: userInfo.kakao
        },
        message: 'ok'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: 'error'
    });
  }
};
