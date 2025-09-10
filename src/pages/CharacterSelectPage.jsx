import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft } from "lucide-react";

export default function CharacterSelectPage({ 
  language, 
  characters, 
  selectedCharacter, 
  hoveredCharacter, 
  setHoveredCharacter,
  handleCharacterSelect,
  handleConfirm,
  handleBackToHome,
  getRarityColor,
  getRarityBackground,
  getGlowEffect
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl">
        {/* 뒤로가기 버튼 */}
        <div className="absolute top-0 left-0">
          <Button
            onClick={handleBackToHome}
            variant="ghost"
            size="lg"
            className="px-6 py-3 text-white hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-3" />
            {language === 'en' ? 'Home' : '홈으로'}
          </Button>
        </div>
        
        {/* 제목 */}
        <div className="text-center mb-12 pt-16">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            {language === 'en' ? 'Select Your Guide' : '가이드 선택'}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'en' 
              ? 'Choose your guide to explore the museum together today.' 
              : '오늘 관람을 함께할 가이드를 선택하세요.'
            }
          </p>
        </div>
        
        {/* 캐릭터 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12 w-full max-w-7xl mx-auto px-6">
          {characters.map((character, index) => (
            <div
              key={character.id}
              className={`
                relative cursor-pointer transition-all duration-300 transform hover:scale-105
                ${selectedCharacter?.id === character.id
                  ? 'p-[3px] bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 rounded-xl'
                  : ''
                }
              `}
              onMouseEnter={() => setHoveredCharacter(character.id)}
              onMouseLeave={() => setHoveredCharacter(null)}
            >
              <Card
                className={`
                  relative h-[480px] flex flex-col
                  bg-gradient-to-br ${getRarityBackground(character.rarity)} overflow-hidden backdrop-blur-md
                  border-none rounded-xl shadow-lg transition-shadow duration-300 ease-in-out
                  ${getGlowEffect(character.rarity)}
                `}
                onClick={() => handleCharacterSelect(character)}
              >
                {/* 레어도 글로우 효과 */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(character.rarity)} opacity-20 pointer-events-none`}></div>
                <div className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none`}></div>
                
                {/* 레벨 배지 */}
                <div className="absolute top-4 left-4 z-10">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRarityColor(character.rarity)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {index + 1}
                  </div>
                </div>
                
                <CardContent className="p-6 h-[400px] flex flex-col">
                  {/* 캐릭터 이미지 영역 */}
                  <div className="relative w-full h-60 mt-4 mb-4 bg-transparent rounded-lg flex items-center justify-center overflow-hidden">
                    {character.image ? (
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="object-contain h-48 w-auto mx-auto"
                      />
                    ) : (
                      <>
                        {/* 임시 아바타 */}
                        <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getRarityColor(character.rarity)} flex items-center justify-center shadow-lg`}>
                          <span className="text-2xl font-bold text-white">{character.name[0]}</span>
                        </div>
                        {/* 배경 패턴 */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="w-full h-full bg-gradient-to-br from-transparent via-white to-transparent opacity-10"></div>
                        </div>
                        {/* 이미지 플레이스홀더 텍스트 */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">
                          캐릭터 이미지
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* 캐릭터 정보 */}
                  <div className="text-center h-32 flex flex-col justify-center overflow-hidden">
                    <div>
                      {language === 'en' ? (
                        <>
                          <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">
                            {character.nameEn}
                          </h3>
                          <p className="text-base text-white/80 drop-shadow-md mb-4">
                            {character.name}
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2">
                            {character.name}
                          </h3>
                          {character.nameEn && (
                            <p className="text-base text-white/80 drop-shadow-md mb-4">
                              {character.nameEn}
                            </p>
                          )}
                        </>
                      )}
                      <p className={`text-white/90 text-sm leading-relaxed font-medium ${language === 'en' ? 'line-clamp-6' : 'line-clamp-3'}`}>
                        {language === 'en' ? character.descriptionEn : character.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* 선택 확인 버튼 */}
        <div className="text-center">
          <Button
            onClick={handleConfirm}
            disabled={!selectedCharacter}
            className="px-8 py-4 text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {selectedCharacter 
              ? 'SELECT' 
              : (language === 'en' ? 'Choose a guide' : '가이드를 선택하세요')
            }
          </Button>
          {selectedCharacter && (
            <p className="mt-4 text-gray-300">
              {language === 'en' ? 'Selected Guide: ' : '선택된 가이드: '}
              <span className="text-yellow-400 font-bold">
                {language === 'en' ? selectedCharacter.nameEn : selectedCharacter.name}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
