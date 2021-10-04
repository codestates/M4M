const { comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    // 로그인 된 유저인지 확인
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(401).json({ message: "You're not logged in" });
    } else {
      const { songId, content } = req.body;
      const deleteContent = await comment.destroy({
        where: {
          userId: accessTokenData.id,
          songId: songId,
          content: content
        }
      });

      if (!deleteContent) {
        return res.status(200).json({ message: 'already deleted' });
      } else {
        return res.status(200).json({ message: 'ok' });
      }
    }
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
