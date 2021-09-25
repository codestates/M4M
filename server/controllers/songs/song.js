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
    const songs = req.query.query;

    let songList = await song.findOne({
      where: { id: songs },
    });

    if (songList === null) {
      res.status(400).json({
        message: 'No songs are in the list'
      });
    } else {
<<<<<<< HEAD
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
=======
      songList = songList.map((songs) => {
        songs.title = songs.title.replace('|', ',');
        songs.artist = songs.artist.replace('|', ',');
        songs.genre = songs.genre.replace('|', ',');

        return {
          id: songs.id,
          title: songs.title,
          artist: songs.artist,
          genre: songs.genre,
          album: songs.album,
          album_art: songs.album_art,
          date: songs.date,
          year: songs.year,
          lyrics: songs.lyrics
        };
      });

      const fetchSongInfo = async () => {
        const songInfo = songList.map(async (songs) => {
          try {
            let getHashtagName = await songuserhashtaglike.findAll({
              include: [
                {
                  model: hashtaglike,
                  attributes: ['name']
                }
              ],
              where: {
                songId: songs.id
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
            let getComment = await song.findAll({
              include: [
                {
                  model: comment,
                  attribute: ['content']
                }
              ],
              where: { id: songs.id }
            });

            getComment = Sequelize.getValues(getComment);

            const getComments = getComment.map((comments) => comments.comments);
            const getContent = getComments.map((comments) => {
              return comments.map((comments) => [comments.content]);
            });

            return {
              id: songs.id,
              title: songs.title,
              artist: songs.artist,
              genre: songs.genre,
              album: songs.album,
              album_art: songs.album_art,
              date: songs.date,
              year: songs.year,
              lyrics: songs.lyrics,
              hashtagLike: hashtaglikeCount,
              // 유저랑 시간 추가
              comments: getContent.flat()
            };
          } catch {
            res.status(404).json({ message: 'error' });
          }
        });
>>>>>>> 21838ac38275541733ec680dcaff8c9622125452

      getComment = Sequelize.getValues(getComment);

<<<<<<< HEAD
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
=======
        res.status(200).json({
          data: results,
          message: 'ok'
>>>>>>> 21838ac38275541733ec680dcaff8c9622125452
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
    res.status(400).json({ message: 'error' });
  }
};

// module.exports = async (req, res) => {
//   try {
//     // console.log(req.query.query); // songId
//     let songList = await song.findOne({
//       where: { id: req.query.query },
//     });

//     console.log(songList.dataValues);

//     if (songList.length === 0) {
//       res.status(400).json({
//         message: "No songs are in the list",
//       });
//     } else {
//       songList = songList.map((songs) => {
//         songs.title = songs.title.replace("|", ",");
//         songs.artist = songs.artist.replace("|", ",");
//         songs.genre = songs.genre.replace("|", ",");

//         return {
//           id: songs.id,
//           title: songs.title,
//           artist: songs.artist,
//           genre: songs.genre,
//           album: songs.album,
//           album_art: songs.album_art,
//           date: songs.date,
//           year: songs.year,
//           lyrics: songs.lyrics,
//         };
//       });

//       const fetchSongInfo = async () => {
//         const songInfo = songList.map(async (songs) => {
//           try {
//             let getHashtagName = await songuserhashtaglike.findAll({
//               include: [
//                 {
//                   model: hashtaglike,
//                   attributes: ["name"],
//                 },
//               ],
//               where: {
//                 songId: songs.id,
//               },
//             });

//             getHashtagName = Sequelize.getValues(getHashtagName);

//             let hashtaglikeCount = {
//               좋아요: 0,
//             };

//             getHashtagName.map((songs) => {
//               if (hashtaglikeCount[songs.hashtaglike.name]) {
//                 hashtaglikeCount[songs.hashtaglike.name] += 1;
//               } else {
//                 hashtaglikeCount[songs.hashtaglike.name] = 1;
//               }
//             });

//             // 객체 -> 배열(해시태그, 좋아요)
//             hashtaglikeCount = Object.entries(hashtaglikeCount);

//             // 댓글 가져오기
//             let getComment = await song.findAll({
//               include: [
//                 {
//                   model: comment,
//                   attribute: ["content"],
//                 },
//               ],
//               where: { id: songs.id },
//             });

//             getComment = Sequelize.getValues(getComment);

//             const getComments = getComment.map((comments) => comments.comments);
//             const getContent = getComments.map((comments) => {
//               return comments.map((comments) => [comments.content]);
//             });

//             return {
//               id: songs.id,
//               title: songs.title,
//               artist: songs.artist,
//               genre: songs.genre,
//               album: songs.album,
//               album_art: songs.album_art,
//               date: songs.date,
//               year: songs.year,
//               lyrics: songs.lyrics,
//               hashtagLike: hashtaglikeCount,
//               // 유저랑 시간 추가(배열안에 객체형태로)
//               comments: getContent.flat(),
//             };
//           } catch {
//             res.status(404).json({ message: "error" });
//           }
//         });

//         const results = await Promise.all(songInfo);

//         res.status(200).json({
//           data: results,
//           message: "ok",
//         });
//       };

//       fetchSongInfo();
//     }
//   } catch {
//     res.status(400).json({ message: "error" });
//   }
// };
