const { song, comment } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = async (req, res) => {
  try {
    const { id, content } = req.body;
    // 로그인 된 유저인지 확인
    const accessTokenData = isAuthorized(req);

    // if (!accessTokenData) {
    //   return res.status(403).json({ message: "plz login first" });
    // } else {
    const songId = await song.findOne({
      where: {
        title: {
          [Op.like]: '%' + title + '%'
        }
      }
    });

    const userContent = await comment.findOne({
      where: { songId: songId.dataValues.id, content: content }
    });

    if (userContent) {
      return res
        .status(400)
        .json({ message: 'you can not write same comment' });
    }

    const newContent = await comment.findOne({
      where: { id: id, songId: songId.dataValues.id }
    });

    const payload = {
      // userId: accessTokenData.id,
      songId: newContent.dataValues.songId,
      content: content
    };

    await comment.update(
      {
        // userId: accessTokenData.id,
        songId: payload.songId,
        content: payload.content
      },
      {
        where: { id: newContent.dataValues.id }
      }
    );

    return res.status(200).json({ message: 'ok' });
    // }
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
