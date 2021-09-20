const {
  song,
  hashtaglike,
  songuserhashtaglike,
  comment,
} = require("../../models");
const Sequelize = require("sequelize");

module.exports = async (req, res) => {
  try {
    let songList = await song.findAll();

    if (songList.length === 0) {
      res.status(400).json({
        message: "No songs are in the list",
      });
    } else {
      songList = songList.map((songs) => {
        songs.title = songs.title.replace("|", ",");
        songs.artist = songs.artist.replace("|", ",");
        songs.genre = songs.genre.replace("|", ",");

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
        };
      });

      const fetchSongInfo = async () => {
        const songInfo = songList.map(async (songs) => {
          try {
            let getHashtagName = await songuserhashtaglike.findAll({
              include: [
                {
                  model: hashtaglike,
                  attributes: ["name"],
                },
              ],
              where: {
                songId: songs.id,
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

            // 커맨트 가져오기
            let getComment = await song.findAll({
              include: [
                {
                  model: comment,
                  attribute: ["content"],
                },
              ],
              where: { id: songs.id },
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
              comments: getContent.flat(),
            };
          } catch {
            res.status(404).json({ message: "error" });
          }
        });

        const results = await Promise.all(songInfo);

        res.status(200).json({
          data: results,
          message: "ok",
        });
      };

      fetchSongInfo();
    }
  } catch {
    res.status(400).json({ message: "error" });
  }
};
