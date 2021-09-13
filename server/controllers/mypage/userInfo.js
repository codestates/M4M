const { user } = require('../../models');

module.exports = async (req, res) => {
  // test: without accessToken
  try {
    const userInfo = await user.findOne({
      where: {
        id: req.body.id
      }
    });

    res
      .status(200)
      .json({
        data: {
          nickname: userInfo.nickname,
          email: userInfo.email,
          birthYear: userInfo.birthYear
        },
        message: 'ok'
      });
    // with accessToken
    // const accessTokenData = isAuthorized(req);

    // if (!accessTokenData) {
    //   return res
    //     .status(404)
    //     .send({
    //       data: null,
    //       message: 'Not an existing user'
    //     });
    // } else {
    //   delete accessTokenData.password;

    //   const userInfo = await user.findOne({
    //     where: {
    //       id: accessTokenData.id
    //     }
    //   });

    //   res
    //     .status(200)
    //     .json({
    //       data: {
    //         nickname: userInfo.nickname,
    //         email: userInfo.email,
    //         birthYear: userInfo.birthYear
    //       },
    //       message: 'ok'
    //     });
    // }
  } catch {
    res.status(400).json({
      message: 'Invalid access token'
    });
  }
};
