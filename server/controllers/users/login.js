const crypto = require('crypto');
const { user } = require('../../models');
const { isAuthorized, generateAccessToken, generateRefreshToken } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    const { nickname, email, password, birthYear, kakao } = req.body;
    if (kakao) {
      const members = await user.findAll({
        where: {
          kakao: true,
          email: email
        }
      });

      const userNickname = `${nickname}#${members[0].dataValues.id + 1}`;

      const dplctEmail = await user.findAll({
        where: {
          email: email
        }
      });

      const accessToken = generateAccessToken(members[0].dataValues);
      const refreshToken = generateRefreshToken(members[0].dataValues);
      const cookieOptions = {
        httpOnly: true,
        sameSite: 'None'
      };

      if (dplctEmail.length !== 0) {
        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);
        res.status(200).json({ accessToken, refreshToken, message: 'ok' });
      } else {
        user.create({ nickname: userNickname, email: email, kakao: kakao });
        res.cookie('accessToken', accessToken, cookieOptions);
        res.cookie('refreshToken', refreshToken, cookieOptions);
        res.status(201).json({ accessToken, refreshToken, message: 'ok' });
      }
    } else {
      const salt = crypto.randomBytes(64).toString('hex');
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 9999, 64, 'sha512')
        .toString('base64');

      const accessTokenData = isAuthorized(req);

      // 토큰정보가 있어 중복 유저인 경우
      if (accessTokenData) {
        return res.status(406).json({ message: 'you are already a user' });
      }

      // 회원가입 양식을 다 채우지 않은 경우
      if (!nickname || !email || !password || !birthYear) {
        return res.status(422).json({ message: 'insufficient parameters supplied' });
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
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'error' });
  }
};
