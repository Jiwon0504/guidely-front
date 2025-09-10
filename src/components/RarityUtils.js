// 레어도 관련 디자인 유틸리티 함수들

export const getRarityColor = (rarity) => {
  switch (rarity) {
    case 'legendary':
      return 'from-yellow-400 to-orange-500'
    case 'epic':
      return 'from-purple-400 to-pink-500'
    case 'rare':
      return 'from-blue-400 to-cyan-500'
    case 'common':
      return 'from-gray-400 to-gray-500'
    default:
      return 'from-gray-400 to-gray-500'
  }
};

export const getRarityBackground = (rarity) => {
  switch (rarity) {
    case 'legendary':
      return 'from-yellow-400 to-orange-500'
    case 'epic':
      return 'from-purple-400 to-pink-500'
    case 'rare':
      return 'from-blue-400 to-cyan-500'
    case 'common':
      return 'from-gray-400 to-gray-500'
    default:
      return 'from-gray-400 to-gray-500'
  }
};

export const getGlowEffect = (rarity) => {
  switch (rarity) {
    case 'legendary':
      return 'hover:shadow-[0_0_60px_20px_rgba(251,191,36,1),0_0_120px_50px_rgba(251,191,36,0.8),0_0_200px_80px_rgba(251,191,36,0.6),0_0_300px_120px_rgba(251,191,36,0.4),0_0_400px_150px_rgba(251,191,36,0.2)]' // 황금색 극강 glow
    case 'epic':
      return 'hover:shadow-[0_0_60px_20px_rgba(168,85,247,1),0_0_120px_50px_rgba(168,85,247,0.8),0_0_200px_80px_rgba(168,85,247,0.6),0_0_300px_120px_rgba(168,85,247,0.4),0_0_400px_150px_rgba(168,85,247,0.2)]' // 보라색 극강 glow
    case 'rare':
      return 'hover:shadow-[0_0_60px_20px_rgba(59,130,246,1),0_0_120px_50px_rgba(59,130,246,0.8),0_0_200px_80px_rgba(59,130,246,0.6),0_0_300px_120px_rgba(59,130,246,0.4),0_0_400px_150px_rgba(59,130,246,0.2)]' // 파란색 극강 glow
    case 'common':
      return 'hover:shadow-[0_0_60px_20px_rgba(107,114,128,1),0_0_120px_50px_rgba(107,114,128,0.8),0_0_200px_80px_rgba(107,114,128,0.6),0_0_300px_120px_rgba(107,114,128,0.4),0_0_400px_150px_rgba(107,114,128,0.2)]' // 회색 극강 glow
    default:
      return 'hover:shadow-[0_0_60px_20px_rgba(107,114,128,1),0_0_120px_50px_rgba(107,114,128,0.8),0_0_200px_80px_rgba(107,114,128,0.6),0_0_300px_120px_rgba(107,114,128,0.4),0_0_400px_150px_rgba(107,114,128,0.2)]' // 회색 극강 glow
  }
};

export const getRarityBorder = (rarity) => {
  switch (rarity) {
    case 'legendary':
      return 'border-yellow-500'
    case 'epic':
      return 'border-purple-500'
    case 'rare':
      return 'border-blue-500'
    case 'common':
      return 'border-gray-500'
    default:
      return 'border-gray-500'
  }
};

export const getSelectedShadow = (rarity) => {
  switch (rarity) {
    case 'legendary':
      return 'shadow-2xl shadow-yellow-400/60'
    case 'epic':
      return 'shadow-2xl shadow-purple-400/60'
    case 'rare':
      return 'shadow-2xl shadow-blue-400/60'
    case 'common':
      return 'shadow-2xl shadow-gray-400/60'
    default:
      return 'shadow-2xl shadow-gray-400/60'
  }
};
