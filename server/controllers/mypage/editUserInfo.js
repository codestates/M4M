const { isAuthorized } = require('../tokenFunctions');
const { user } = require('../../models');
const crypto = require('crypto');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

// PATCH http://localhost:80/user-info
module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
    console.log(accessTokenData);
    if (!accessTokenData) {
      return res.status(401).send({ message: 'You\'re not logged in.' });
    } else {
      console.log(req.body);

      const { nickname, password, birthYear } = req.body;
      // console.log(nickname, password, birthYear);

      let userInfo = await user.findOne({
        where: {
          id: accessTokenData.id
        }
      });

      userInfo = Sequelize.getValues(userInfo);

      let salt = userInfo.salt;
      let encryptedPassword = userInfo.password;

      if (password !== '') {
        salt = crypto.randomBytes(64).toString('hex');
        encryptedPassword = crypto
          .pbkdf2Sync(password, salt, 9999, 64, 'sha512')
          .toString('base64');
      }

      let changedNickname = userInfo.nickname.split('#')[0];

      if (changedNickname === nickname ||
        nickname.split('#')[0] === '') {
        // 닉네임을 변경하지 않은 경우
        changedNickname = userInfo.nickname;
      } else {
        changedNickname = nickname + '#' + userInfo.id;
      }

      let changedBirthYear = userInfo.birthYear;

      if (birthYear !== '') {
        changedBirthYear = birthYear;
      }

      // console.log(changedNickname);
      // console.log(changedBirthYear);
      // console.log(encryptedPassword);

      await user.update(
        {
          nickname: changedNickname,
          salt: salt,
          password: encryptedPassword,
          birthYear: changedBirthYear
        },
        { where: { id: accessTokenData.id } }
      );

      res.status(200).json({
        data: {
          nickname: changedNickname
        },
        message: 'Information updated'
      });
    }
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
