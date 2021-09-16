const { song } = require("../../models");

module.exports = async (req, res) => {
  try {
    res.status(200).json({ message: "ok" });
  } catch {
    res.status(400).json({ message: "error" });
  }
};
