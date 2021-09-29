const crypto = require('crypto');
const { user } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const { nickname, email, password, birthYear } = req.body;
    const salt = crypto.randomBytes(64).toString('hex');
    const encryptedPassword = crypto
      .pbkdf2Sync(password, salt, 9999, 64, 'sha512')
      .toString('base64');

    const accessTokenData = isAuthorized(req);

    // 토큰정보가 있어 중복 유저인 경우
    if (accessTokenData) {
      return res.status(403).json({ message: 'you are already a user' });
    }

    // 회원가입 양식을 다 채우지 않은 경우
    if (!nickname || !email || !password || !birthYear) {
      return res
        .status(422)
        .json({ message: 'insufficient parameters supplied' });
    }

    // 이메일이 중복인 경우
    const dplctEmail = await user.findAll({
      where: {
        email: email
      }
    });

    if (dplctEmail.length !== 0) {
      return res.status(409).json({ message: 'conflict: email' });
    } else {
      const firstUserNickname = `${nickname}#1`;
      const members = await user.findAll({
        order: [['createdAt', 'DESC']]
      });

      if (members.length === 0) {
        await user.create({
          nickname: firstUserNickname,
          email: email,
          salt: salt,
          password: encryptedPassword,
          birthYear: birthYear
        });

        return res.status(201).json({ message: 'thank you for signing up!' });
      } else {
        const userNickname = `${nickname}#${members[0].dataValues.id + 1}`;

        // 카카오 로그인이 아닌 경우
        await user.create({
          nickname: userNickname,
          email: email,
          salt: salt,
          password: encryptedPassword,
          birthYear: birthYear,
          kakao: false
        });

        return res.status(201).json({ message: 'thank you for signing up!' });
      }
    }
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
