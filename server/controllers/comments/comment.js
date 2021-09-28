const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    // 댓글의 id => 적용 불가. 클라이언트에서는 댓글의 id 정보 가지고 있지 않음
    // const { id, content } = req.body;

    // 로그인 된 유저인지 확인
    // const accessTokenData = isAuthorized(req);
    // JUST FOR TEST PURPOSES: without a real accessToken
    const accessTokenData = { id: req.headers.authorization };
    // console.log(accessTokenData.id);

    if (!accessTokenData) {
      return res.status(403).json({ message: 'You\'re not logged in' });
    } else {
      const { songId, content } = req.body;

      const userComments = await comment.findAll({
        where: {
          userId: accessTokenData.id,
          songId: songId
        }
      });

      // console.log(userComments.length);

      if (userComments.length >= 50) {
        return res.status(400).json({ message: 'Already reached the limit' });
      }

      const newContent = await comment.findOne({
        where: {
          userId: accessTokenData.id,
          songId: songId,
          content: content
        }
      });

      if (newContent) {
        return res
          .status(409)
          .json({ message: 'You cannot write the same comment' });
      }

      await comment.create({
        userId: accessTokenData.id,
        songId: songId,
        content: content
      });

      return res.status(200).json({ message: 'ok' });
    }
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
