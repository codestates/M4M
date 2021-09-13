const { user, song, hashtaglike, songuserhashtaglike } = require('../../models');
const Sequelize = require('sequelize');
require('sequelize-values')(Sequelize);

module.exports = async (req, res) => {
  // test: without accessToken
  try {
    const userInfo = await user.findOne({
      where: {
        id: req.body.id
      }
    });
    // console.log(userInfo.id);

    let songList = await songuserhashtaglike.findAll({
      include: [{
        model: song,
        attributes: ['id', 'title', 'artist', 'album_art', 'date']
      }],
      where: {
        userId: userInfo.id
      }
    });

    if (songList.length === 0) {
      res.status(404).json({
        message: 'No songs are added to the list'
      });
    } else {
      songList = Sequelize.getValues(songList);
      songList = songList.map((el) => el.song);
      //   console.log('++++++++++++++++++\n', songList);

      const fetchSongInfo = async () => {
        const songInfo = songList.map(async (song) => {
          // console.log("++++++++++++++++++\n", song.id);
          let getHashtagName = await songuserhashtaglike.findAll({
            include: [{
              model: hashtaglike,
              attributes: ['name']
            }],
            where: {
              songId: song.id
            }
          });
          getHashtagName = Sequelize.getValues(getHashtagName);
          // console.log(getHashtagName);
          return {
            title: song.title,
            artist: song.artist,
            album_art: song.album_art,
            date: song.date,
            hashtagInfo: getHashtagName
          };
        });
        const results = await Promise.all(songInfo);
        console.log(results);
        res.status(200).json(results);
      };

      fetchSongInfo();

    //   res.status(200).json({
    //     data: songList,
    //     message: 'ok'
    //   });
    }
  } catch {
    res.status(400).json({
      message: 'Invalid access token'
    });
  }
};
