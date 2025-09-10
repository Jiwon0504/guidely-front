import rumiImage from "../assets/76c70bdc264bc6d920da9e65cc49744ccffd1f0e.png";
import miraImage from "../assets/51c5f63cb0c32a56b9ec983aa91454fe41daec5e.png";
import zoeyImage from "../assets/d86bd75a231ee00fad6013bb95e162d2ba5529dc.png";
import jinuImage from "../assets/66276f75c89a80a89ef0d734d5d31d8adddd1df9.png";
import rumiBg from "../assets/591b85a33569d72c0d25bd04f31691c5a872804b.png";
import miraBg from "../assets/dcb159076a41fce79f10481e9b7f746dc18507b5.png";
import zoeyBg from "../assets/d86bd75a231ee00fad6013bb95e162d2ba5529dc.png";
import jinuBg from "../assets/4c44c31a43a93232a02ea00210a44f962acfc59f.png";

export const characters = [
  {
    id: 1,
    name: '루미',
    nameEn: 'Rumi',
    level: 1,
    description: '차분하고 책임감 있는 리더, 깊이 있는 설명을 해줍니다.',
    descriptionEn: 'A calm and responsible leader who offers insightful explanations.',
    rarity: 'legendary',
    image: rumiImage,
    backgroundImage: rumiBg
  },
  {
    id: 2,
    name: '미라',
    nameEn: 'Mira',
    level: 2,
    description: '카리스마 있고 열정적인 감각파 큐레이터, 트렌디한 가이드를 제공합니다.',
    descriptionEn: 'A charismatic and passionate curator who delivers trendy guidance.',
    rarity: 'epic',
    image: miraImage,
    backgroundImage: miraBg
  },
  {
    id: 3,
    name: '조이',
    nameEn: 'Zoey',
    level: 3,
    description: '유쾌하고 발랄한 막내, 쉽고 재미있게 풀어줍니다.',
    descriptionEn: 'A cheerful and lively youngest member who makes things fun and easy to understand.',
    rarity: 'rare',
    image: zoeyImage,
    backgroundImage: zoeyBg
  },
  {
    id: 4,
    name: '진우',
    nameEn: 'Jinu',
    level: 4,
    description: '카리스마와 장난스러움이 공존, 색다른 시각을 제시합니다.',
    descriptionEn: 'A mix of charisma and playfulness, offering a fresh and unique perspective.',
    rarity: 'common',
    image: jinuImage,
    backgroundImage: jinuBg
  }
];
