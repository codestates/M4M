const { user } = require('../../models');
// const { isAuthorized } = require('../tokenFunctions');
const crypto = require('crypto');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);
const Op = Sequelize.Op;

module.exports = async (req, res) => {
  try {
    // const accessTokenData = isAuthorized(req);

    // if (!accessTokenData) {
    //   return res.status(404).send({ message: "로그인이 되어있지 않습니다." });
    // } else {
    //   let newUserInfo = await user.findOne({
    //     where: {
    //       id: accessTokenData.id,
    //     },
    //   });
    // }
    // console.log(newUserInfo.dataValues);

    let userInfo = await user.findOne({
      where: {
        id: req.body.id
      }
    });

    userInfo = Sequelize.getValues(userInfo);

    const salt = crypto.randomBytes(64).toString('hex');
    const encryptedPassword = crypto
      .pbkdf2Sync(req.body.password, salt, 9999, 64, 'sha512')
      .toString('base64');

    let changedNickname = req.body.nickname;

    if (changedNickname === userInfo.nickname.split('#')[0]) {
      // 닉네임을 변경하지 않은 경우
      changedNickname = userInfo.nickname;
    } else {
      changedNickname = changedNickname + '#';

      let checkDuplicate = await user.findAll({
        where: {
          nickname: {
            [Op.like]: changedNickname + '%'
          }
        }
      });

      checkDuplicate = Sequelize.getValues(checkDuplicate);
      // console.log(checkDuplicate);

      // sequelize의 Op.like는 case-insensitive하기 때문에 별도의 처리 과정 필요
      const duplicateNickname = checkDuplicate.filter((el) => {
        return el.nickname.split('#')[0] === req.body.nickname;
      });

      if (duplicateNickname.length === 0) {
        // 닉네임을 변경했고 중복 닉네임이 없을 경우
        changedNickname = changedNickname + '1';
      } else {
        // 닉네임을 변경했고 중복 닉네임이 존재하는 경우
        // 중복되는 닉네임들 중 가장 마지막 닉네임의 번호에 1을 더해 새로운 닉네임 설정
        const lastNickname = duplicateNickname[duplicateNickname.length - 1].nickname;
        const lastNicknameNumber = lastNickname.split('#')[1];
        // console.log('last nickname: ' + lastNickname);
        changedNickname = changedNickname + (Number(lastNicknameNumber) + 1);
      }
    }

    await user.update(
      {
        nickname: changedNickname,
        salt: salt,
        password: encryptedPassword
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
