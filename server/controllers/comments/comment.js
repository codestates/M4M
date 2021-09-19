const { song, comment } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    // 곡의 id
    const { id, content } = req.body;
    // 로그인 된 유저인지 확인
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(403).json({ message: "plz login first" });
    } else {
      const songId = await song.findOne({
        where: {
          id: id,
        },
      });

      const userContent = await comment.findAll({
        where: {
          userId: accessTokenData.id,
          songId: songId.dataValues.id,
        },
      });

      if (userContent.length >= 50) {
        return res.status(400).json({ message: "already reached the limit" });
      }

      const newContent = await comment.findOne({
        where: {
          songId: songId.dataValues.id,
          content: content,
        },
      });

      if (newContent) {
        return res
          .status(400)
          .json({ message: "you can not write same comment" });
      }

      await comment.create({
        userId: accessTokenData.id,
        songId: songId.dataValues.id,
        content: content,
      });

      return res.status(200).json({ message: "ok" });
    }
  } catch {
    res.status(400).json({ message: "error" });
  }
};
