const { song } = require('../../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = async (req, res) => {
  try {
    // console.log(req.body);

    const resultType = req.body.resultType;
    let recommendType = '';
    if (resultType === 'AFL') {
      recommendType = '들썩들썩, 이별, 듣는 노래';
    } else if (resultType === 'AFW') {
      recommendType = '들썩들썩, 이별, 보는 노래';
    } else if (resultType === 'AHL') {
      recommendType = '들썩들썩, 사랑, 듣는 노래';
    } else if (resultType === 'AHW') {
      recommendType = '들썩들썩, 사랑, 보는 노래';
    } else if (resultType === 'AEL') {
      recommendType = '들썩들썩, 그외, 듣는 노래';
    } else if (resultType === 'AEW') {
      recommendType = '들썩들썩, 그외, 보는 노래';
    } else if (resultType === 'CFL') {
      recommendType = '차분차분, 이별, 듣는 노래';
    } else if (resultType === 'CFW') {
      recommendType = '차분차분, 이별, 보는 노래';
    } else if (resultType === 'CHL') {
      recommendType = '차분차분, 사랑, 듣는 노래';
    } else if (resultType === 'CHW') {
      recommendType = '차분차분, 사랑, 보는 노래';
    } else if (resultType === 'CEL') {
      recommendType = '차분차분, 그외, 듣는 노래';
    } else if (resultType === 'CEW') {
      recommendType = '차분차분, 그외, 보는 노래';
    }

    recommendType = recommendType.split(', ');

    const songList = await song.findAll({
      where: {
        [Op.and]: [
          { recommendType1: recommendType[0] },
          { recommendType2: recommendType[1] },
          { recommendType3: recommendType[2] }
        ]
      }
    });

    console.log(songList.length);

    if (songList.length === 0) {
      res.status(422).json({
        message: 'Not enough songs are in the list'
      });
    } else {
      const listLength = songList.length;
      const randomIndexArray = [];

      while (randomIndexArray.length < 3) {
        const randomNum = Math.floor(Math.random() * listLength);

        if (!randomIndexArray.includes(randomNum)) {
          randomIndexArray.push(randomNum);
        }
      }

      console.log(randomIndexArray);

      const selectedSong = [];

      for (const el of randomIndexArray) {
        selectedSong.push(`${songList[el].id},${songList[el].title} by ${songList[el].artist}`);
      }

      res.status(200).json({
        data: selectedSong,
        message: 'ok'
      });
    }
  } catch {
    res.status(400).json({
      message: 'error'
    });
  }
};
