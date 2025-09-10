import React from "react";

export default function TransitionEffect({ 
  language, 
  selectedCharacter, 
  transitionBackground, 
  getRarityColor 
}) {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* 랜덤 배경 이미지 */}
      {transitionBackground && (
        <div className="absolute inset-0">
          <img
            src={transitionBackground}
            alt="연결 중 배경"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}
      
      {/* 애니메이션 원들 */}
      <div 
        className={`relative z-10 w-96 h-96 rounded-full bg-gradient-to-br ${getRarityColor(selectedCharacter.rarity)} animate-ping opacity-75`}
      ></div>
      <div 
        className={`absolute z-10 w-64 h-64 rounded-full bg-gradient-to-br ${getRarityColor(selectedCharacter.rarity)} animate-pulse`}
      ></div>
      
      {/* 연결 중 텍스트 */}
      <div className="absolute text-white text-2xl font-bold z-20 drop-shadow-2xl">
        {language === 'en' 
          ? `Connecting ${selectedCharacter.nameEn}...`
          : `${selectedCharacter.name}와 연결중`
        }
      </div>
    </div>
  );
}
