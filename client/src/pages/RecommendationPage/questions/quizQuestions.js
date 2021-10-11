// Song Type:
//   - [A]ctive 들썩들썩, [C]alm 차분차분
//   - [F]arewell 이별, [H]eart 사랑, [E]ct. 기타,
//   - [L]istening 듣는 노래, [W]atching 보는 노래

const quizQuestions = [
  // question #1 차분차분 vs. 들썩들썩 Q1
  {
    question: '학교가 끝났다! 친구랑 어디를 놀러 갈까?!',
    answers: [{
      type: 'A',
      content: '딱지치기, 구슬치기 다 상대해줄게! 당장 친구들이 모여있는 골목으로 달려간다!'
    },
    {
      type: 'C',
      content: '뜨신 방에서 빌려온 만화나 보며 뒹굴거리자~'
    }
    ]
  },
  // question #2 듣는 노래 vs. 보는 노래 Q1
  {
    question: '우연히 듣게 된 노래, 근데 가수 목소리가 너무 좋잖아?!',
    answers: [{
      type: 'W',
      content: '이 사람에 대해 더 알고 싶어! 예능, 뮤비, 콘서트 영상 모조리 다 찾아본다.'
    },
    {
      type: 'L',
      content: '또 어떤 좋은 노래가 있을까? 가수의 다른 노래도 검색해 본다.'
    }
    ]
  },
  // question #3 차분차분 vs. 들썩들썩 Q2
  {
    question: '내일이 개학인데 방학숙제를 하나도 안 했다?!',
    answers: [{
      type: 'C',
      content: '심호흡 크게 한 번 하고 마음부터 추스리자...;;'
    },
    {
      type: 'A',
      content: '뭐 어떻게든 되겠지? 열정 넘치는 노래로 텐션부터 올린다!'
    }
    ]
  },
  // question #4 이별 vs. 사랑 vs. 그외 Q1
  {
    question: '무료 영화 관람권이 생겼다! 무슨 영화를 볼까?',
    answers: [{
      type: 'H',
      content: '무조건 로맨틱 코미디!'
    },
    {
      type: 'F',
      content: '절절한 멜로영화가 땡긴다ㅜㅜ'
    },
    {
      type: 'E',
      content: '훗 사랑 영화 따위... 액션 영화가 짱이지!'
    }
    ]
  },
  // question #5 듣는 노래 vs. 보는 노래 Q2
  {
    question: '더운 여름날, 친구랑 어떤 아이스크림을 먹으러 갈까?',
    answers: [{
      type: 'L',
      content: '그냥 편의점에서 메로나나 사먹을까?'
    },
    {
      type: 'W',
      content: '31가지 골라 먹는 재미가 있는 거!'
    }
    ]
  },
  // question #6 들썩들썩 vs. 차분차분 Q3
  {
    question: '오늘 왠지 기분이 꿀꿀하다..(ㅠ_ㅠ)',
    answers: [{
      type: 'A',
      content: '당장 베프들과 만날 약속을 잡는다!'
    },

    {
      type: 'C',
      content: '이럴 때 나가봤자 기만 빨린다. 그냥 집에서 쉬자.'
    }
    ]
  },
  // question #7 듣는 노래 vs. 보는 노래 Q3
  {
    question: '이거 꿈 아니지…? 내가 좋아하는 놀이동산에 왔다!! 빨리 놀이기구를 타러 가자~!',
    answers: [{
      type: 'L',
      content: '아무리 타도 최고는 질리지 않지! 최애 놀이기구만 3번 탄다!'
    },
    {
      type: 'W',
      content: '한시가 급해! 여기 있는 기구 몽땅 다 타봐야지!'
    }
    ]
  }
];

export default quizQuestions;
