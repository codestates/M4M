const { isAuthorized } = require('../tokenFunctions');
const {
  user,
  song,
  hashtaglike,
  songuserhashtaglike,
  comment
} = require('../../models');
const Sequelize = require('sequelize');

module.exports = async (req, res) => {
  try {
    const accessTokenData = isAuthorized(req);
    console.log(req.query);

    const songs = req.query.query;

    const songList = await song.findOne({
      where: { id: songs }
    });

    if (songList === null) {
      res.status(400).json({
        message: 'No songs are found'
      });
    } else {
      // replace('|', ',') => 최초 1개만 변경, replace(/[|]/g, ',') => 모든 occurrence를 변경
      songList.dataValues.title = songList.dataValues.title.replace(
        /[|]/g,
        ','
      );
      songList.dataValues.artist = songList.dataValues.artist.replace(
        /[|]/g,
        ','
      );
      songList.dataValues.genre = songList.dataValues.genre.replace(
        /[|]/g,
        ','
      );
      songList.dataValues.album = songList.dataValues.album.replace(
        /[|]/g,
        ','
      );

      let getHashtagName = await songuserhashtaglike.findAll({
        include: [
          {
            model: hashtaglike,
            attributes: ['name']
          }
        ],
        where: {
          songId: songs
        }
      });

      getHashtagName = Sequelize.getValues(getHashtagName);
      let hashtaglikeCount = {
        좋아요: 0
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
      // 댓글 최신순 정렬
      let getComment = await song.findAll({
        include: [
          {
            model: comment,
            attribute: ['content']
          }
        ],
        where: { id: songs },
        order: [[comment, 'createdAt', 'DESC']]
      });

      getComment = Sequelize.getValues(getComment);

      const getComments = getComment.map((comments) => comments.comments);
      const getUserId = getComments.map((comments) => {
        return comments.map((comments) => [comments.userId]);
      });
      const getContent = getComments.map((comments) => {
        return comments.map((comments) => [
          comments.content,
          comments.createdAt
        ]);
      });

      const flattenedUserId = getUserId.reduce(
        (acc, val) => acc.concat(val),
        []
      );

      const userNickname = [];
      for (let i = 0; i < flattenedUserId.length; i++) {
        userNickname.push([flattenedUserId[i][0]]);
      }

      const getUserNicknames = [];
      for (nickname of userNickname) {
        const findUserNickname = await user.findOne({
          where: { id: nickname }
        });

        getUserNicknames.push(findUserNickname);
      }

      // 닉네임만 들어가있는 배열(ex -> 김경호#47)
      const getUserNickname = [];
      for (nickname of getUserNicknames) {
        getUserNickname.push(nickname.dataValues.nickname);
      }

      const flattenedContent = getContent.reduce(
        (acc, val) => acc.concat(val),
        []
      );

      for (let i = 0; i < flattenedContent.length; i++) {
        if (flattenedContent[i][0] !== getUserNickname[i]) {
          flattenedContent[i].unshift(getUserNickname[i]);
        } else {
          continue;
        }
      }

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
        comments: flattenedContent
      };

      // 로그인 된 유저에 한해서는 본인이 추가한 좋아요 및 해시태그 정보를 추가적으로 보내주어야 함.
      if (accessTokenData) {
        let userContent = await songuserhashtaglike.findAll({
          where: {
            userId: accessTokenData.id,
            songId: songs
          }
        });

        userContent = Sequelize.getValues(userContent);

        if (userContent) {
          userContent = userContent.map((el) => el.hashtagId);
          payload.userContent = userContent;
        }
      }

      res.status(200).json({
        data: payload,
        message: 'ok'
      });
    }
  } catch {
    res.status(400).json({ message: 'error' });
  }
};
