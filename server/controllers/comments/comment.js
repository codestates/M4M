const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    // 로그인 된 유저인지 확인
    const accessTokenData = isAuthorized(req);

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
