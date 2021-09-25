const {
  user,
  song,
  hashtaglike,
  songuserhashtaglike,
  comment,
} = require("../../models");
const Sequelize = require("sequelize");

module.exports = async (req, res) => {
  try {
    const songs = req.query.query;

    let songList = await song.findOne({
      where: { id: songs },
    });

    if (songList === null) {
      res.status(400).json({
        message: "No songs are in the list",
      });
    } else {
      songList.dataValues.title = songList.dataValues.title.replace("|", ",");
      songList.dataValues.artist = songList.dataValues.artist.replace("|", ",");
      songList.dataValues.genre = songList.dataValues.genre.replace("|", ",");

      let getHashtagName = await songuserhashtaglike.findAll({
        include: [
          {
            model: hashtaglike,
            attributes: ["name"],
          },
        ],
        where: {
          songId: songs,
        },
      });

      getHashtagName = Sequelize.getValues(getHashtagName);
      let hashtaglikeCount = {
        좋아요: 0,
      };

      getHashtagName.map((songs) => {
        if (hashtaglikeCount[songs.hashtaglike.name]) {
          hashtaglikeCount[songs.hashtaglike.name] += 1;
        } else {
          hashtaglikeCount[songs.hashtaglike.name] = 1;
        }
      });

      // 객체 -> 배열(해시태그, 좋아요)
      hashtaglikeCount = Object.entries(hashtaglikeCount);

      // 댓글 가져오기
      let getComment = await song.findAll({
        include: [
          {
            model: comment,
            attribute: ["content"],
          },
        ],
        where: { id: songs },
      });

      getComment = Sequelize.getValues(getComment);

      const getComments = getComment.map((comments) => comments.comments);
      const getUserId = getComments.map((comments) => {
        return comments.map((comments) => [comments.userId]);
      });
      const getContent = getComments.map((comments) => {
        return comments.map((comments) => [
          comments.content,
          comments.createdAt,
        ]);
      });

      const userNickname = [];
      for (let i = 0; i < getUserId.flat().length; i++) {
        userNickname.push([getUserId.flat()[i][0]]);
      }

      const getUserNicknames = [];
      for (nickname of userNickname) {
        const findUserNickname = await user.findOne({
          where: { id: nickname },
        });

        getUserNicknames.push(findUserNickname);
      }

      // 닉네임만 들어가있는 배열(ex -> 김경호#47)
      const getUserNickname = [];
      for (nickname of getUserNicknames) {
        getUserNickname.push(nickname.dataValues.nickname);
      }

      for (let i = 0; i < getContent.flat().length; i++) {
        if (getContent.flat()[i][0] !== getUserNickname[i]) {
          getContent.flat()[i].unshift(getUserNickname[i]);
        } else {
          continue;
        }
      }

      console.log(getContent.flat());

      const payload = {
        id: songList.dataValues.id,
        title: songList.dataValues.title,
        artist: songList.dataValues.artist,
        genre: songList.dataValues.genre,
        album: songList.dataValues.album,
        album_art: songList.dataValues.album_art,
        date: songList.dataValues.date,
        year: songList.dataValues.year,
        lyrics: songList.dataValues.lyrics,
        hashtagLike: hashtaglikeCount,
        comments: getContent.flat(),
      };

      res.status(200).json({
        data: payload,
        message: "ok",
      });
    }
  } catch {
    res.status(400).json({ message: "error" });
  }
};
