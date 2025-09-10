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
    rarity: 'legendary',
    description: '차분하고 책임감 있는 리더, 통찰력 있는 해석을 제공합니다.',
    descriptionEn: 'A calm and responsible leader who provides insightful interpretations.',
    image: rumiImage,
    backgroundImage: rumiBg,

    voices: {
      ko: "ko-KR-SunHiNeural",   // 루미 한국어
      en: "en-US-AvaMultilingualNeural" // 루미 영어
    }
  },
  {
    id: 2,
    name: '미라',
    nameEn: 'Mira',
    rarity: 'epic',
    description: '카리스마 있고 열정적인 감각파 큐레이터, 트렌디한 시각을 전해줍니다.',
    descriptionEn: 'A charismatic and passionate curator who brings a trendy perspective.',
    image: miraImage,
    backgroundImage: miraBg,

    voices: {
      ko: "ko-KR-SoonBokNeural",   // 미라 한국어
      en: "en-US-SerenaMultilingualNeural" // 미라 영어
    }
  },
  {
    id: 3,
    name: '조이',
    nameEn: 'Zoey',
    rarity: 'rare',
    description: '유쾌하고 발랄한 막내, 쉽고 재미있게 설명해줍니다.',
    descriptionEn: 'A cheerful and lively maknae who explains things in a fun and easy way.',
    image: zoeyImage,
    backgroundImage: zoeyBg,

    voices: {
      ko: "ko-KR-SeoHyeonNeural",   // 조이 한국어
      en: "en-US-PhoebeMultilingualNeural" // 조이 영어
    }
  },
  {
    id: 4,
    name: '진우',
    nameEn: 'Jinu',
    rarity: 'common',
    description: '재치 있고 유머러스한 동행자, 색다른 감상을 도와줍니다.',
    descriptionEn: 'A witty and humorous companion who helps you enjoy a different perspective.',
    image: jinuImage,
    backgroundImage: jinuBg,

    voices: {
      ko: "ko-KR-HyunsuMultilingualNeural",   // 지누 한국어
      en: "en-US-AndrewMultilingualNeural"    // 지누 영어
    }
  }
];