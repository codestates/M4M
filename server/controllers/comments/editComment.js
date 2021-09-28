const { song, comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    // 댓글의 id
    const { id, content } = req.body;
    // 로그인 된 유저인지 확인
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(403).json({ message: 'plz login first' });
    } else {
      const userContent = await comment.findOne({
        where: { id: id }
      });

      if (userContent.dataValues.content === content) {
        return res
          .status(400)
          .json({ message: 'you can not write same comment' });
      } else {
        const newContent = {
          userId: accessTokenData.id,
          songId: userContent.dataValues.songId,
          content: content
        };

        await comment.update(
          {
            userId: accessTokenData.id,
            songId: newContent.songId,
            content: newContent.content
          },
          {
            where: { id: userContent.dataValues.id }
          }
        );

        return res.status(200).json({ message: 'ok' });
      }
    }
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
