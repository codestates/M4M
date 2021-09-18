// const { isAuthorized } = require('../tokenFunctions');
const { user } = require('../../models');
const crypto = require('crypto');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

// PATCH http://localhost:80/user-info
module.exports = async (req, res) => {
  try {
    // const accessTokenData = isAuthorized(req);

    // if (!accessTokenData) {
    //   return res.status(404).send({ message: 'You\'re not logged in.' });
    // } else {
    //   });
    // }

    // ===============================================================
    //                       JUST FOR TEST PURPOSES
    // ================================================================

    console.log(req.headers.authorization);
    // console.log('🥺🥺🥺🥺🥺🥺🥺');
    console.log(req.body);

    let userInfo = await user.findOne({
      where: {
        id: req.headers.authorization
      }
    });

    // ================================================================

    userInfo = Sequelize.getValues(userInfo);

    const salt = crypto.randomBytes(64).toString('hex');
    const encryptedPassword = crypto
      .pbkdf2Sync(req.body.password, salt, 9999, 64, 'sha512')
      .toString('base64');

    let changedNickname = userInfo.nickname.split('#')[0];

    if (changedNickname === req.body.nickname &&
      req.body.nickname.split('#')[0] === '') {
      // 닉네임을 변경하지 않은 경우
      changedNickname = userInfo.nickname;
    } else {
      changedNickname = req.body.nickname + '#' + userInfo.id;
    }

    let changedBirthYear = userInfo.birthYear;

    if (userInfo.birthYear !== '') {
      changedBirthYear = req.body.birthYear;
    }
    
    // console.log('🙏🙏🙏🙏🙏🙏🙏');
    console.log(changedNickname);
    console.log(changedBirthYear);
    console.log(encryptedPassword);

    await user.update(
      {
        nickname: changedNickname,
        salt: salt,
        password: encryptedPassword,
        birthYear: changedBirthYear
      },
      //   { where: { id: accessTokenData.id } }
      { where: { id: userInfo.id } }
    );

    res.status(200).json({
      data: {
        nickname: changedNickname
      },
      message: 'Information updated'
    });
  } catch {
    res.status(400).json({ message: 'Invalid access token' });
  }
};
