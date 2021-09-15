const { comment } = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const { id } = req.body;
    // 로그인 된 유저인지 확인
    const accessTokenData = isAuthorized(req);

    // if (!accessTokenData) {
    //   return res.status(403).json({ message: "plz login first" });
    // } else {
    const deleteContent = await comment.destroy({
      where: { id: id },
    });

    if (!deleteContent) {
      return res.status(200).json({ message: "already deleted" });
    } else {
      return res.status(200).json({ message: "ok" });
    }
    // }
  } catch {
    res.status(400).json({ message: "error" });
  }
};
