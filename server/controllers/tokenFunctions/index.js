require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return jwt.sign(data, process.env.ACCESS_SECRET, { expiresIn: '10s' });
  },
  generateRefreshToken: (data) => {
    return jwt.sign(data, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  },
  resendAccessToken: (res, accessToken, data) => {
    res.json({ data: { accessToken, data }, message: 'ok' });
  },
  isAuthorized: (req) => {
    // const isCookie = req.headers.cookie;
    // console.log(isCookie);
    // if (!isCookie) {
    //   return null;
    // }
    const authorization = req.headers.authorization;
    // console.log(authorization);

    if (!authorization) {
      return null;
    }
    const token = authorization.split(' ')[1];

    try {
      return jwt.verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
      // console.log(err.message);
      // if (err.message === 'jwt expired') {
      //   return 'invalid token';
      // }
      return null;
    }
  },
  checkRefreshToken: (refreshToken) => {
    try {
      return jwt.decode(refreshToken);
    } catch {
      return null;
    }
  }
};
