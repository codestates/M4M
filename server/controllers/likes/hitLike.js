const { song, songuserhashtaglike, hashtaglike } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    // 곡의 id, hashtag 네임(좋아요)
    const { id, name } = req.body;
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

      // 해당 해시태그의 id를 찾기 위함 -> hashtag.datavalues.id
      const hashtag = await hashtaglike.findOne({
        where: { name: name },
      });

      // 해시태그를 중복해서 선택하였을 경우
      const userHashtag = await songuserhashtaglike.findOne({
        where: {
          userId: accessTokenData.id,
          songId: songId.dataValues.id,
          hashtagId: hashtag.dataValues.id,
        },
      });

      if (userHashtag) {
        return res.status(400).json({ message: "already hit like button" });
      }

      await songuserhashtaglike.create({
        userId: accessTokenData.id,
        songId: songId.dataValues.id,
        hashtagId: hashtag.dataValues.id,
      });

      return res.status(200).json({ message: "ok" });
    }
  } catch {
    res.status(400).json({ message: "error" });
  }
};
