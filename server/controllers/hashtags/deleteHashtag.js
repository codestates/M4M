const { song, songuserhashtaglike, hashtaglike } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = async (req, res) => {
  try {
    // 곡의 id, hashtag 네임
    const { id, name } = req.body;
    // 로그인 된 유저인지 확인
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.status(403).json({ message: 'plz login first' });
    } else {
      const songId = await song.findOne({
        where: { id: id }
      });

      // 해당 해시태그의 id를 찾기 위함 -> hashtag.datavalues.id
      const hashtag = await hashtaglike.findOne({
        where: { name: name }
      });

      const deleteHashtag = await songuserhashtaglike.destroy({
        where: {
          userId: accessTokenData.id,
          songId: songId.dataValues.id,
          hashtagId: hashtag.dataValues.id
        }
      });

      if (!deleteHashtag) {
        return res.status(200).json({ message: 'already deleted' });
      } else {
        return res.status(200).json({ message: 'ok' });
      }
    }
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
