import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import museumImage1 from "../assets/7a10e11e29a2fe22a6ebc94fd262efdfe5f23027.png";
import museumImage2 from "../assets/180498df2b6b7c55a6a38f0ff6955c42f5b5303d.png";

export default function LandingPage({ language, onStartGuide, onLanguageChange }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const museumImages = [museumImage1, museumImage2];
  
  const content = {
    ko: {
      title: "국립중앙박물관 AI 큐레이터 · Guidely",
      subtitle: "나만의 인공지능 큐레이터와 함께하는 새로운 전시 경험",
      button: "Guidely와 관람 시작하기"
    },
    en: {
      title: "National Museum of Korea · AI Curator Guidely",
      subtitle: "Explore Korean Heritage with your AI Curator",
      button: "Begin your Journey with Guidely"
    }
  };

  // 배경 이미지 슬라이드쇼
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % museumImages.length
      );
    }, 5000); // 5초마다 변경
    return () => clearInterval(interval);
  }, [museumImages.length]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 배경 이미지 슬라이드쇼 */}
      <div className="absolute inset-0">
        {museumImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`국립중앙박물관 ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>
      
      {/* 컨텐츠 영역 */}
      <div className="relative z-10 text-center space-y-8 max-w-5xl mx-auto px-6">
        {/* 언어 설정 버튼 */}
        <div className="flex justify-center gap-4 mb-10">
          <Button
            variant={language === 'ko' ? 'default' : 'outline'}
            size="lg"
            onClick={() => onLanguageChange('ko')}
            className={`px-8 py-3 text-lg font-semibold backdrop-blur-sm border-white/20 transition-all duration-300 ${
              language === 'ko'
                ? 'bg-white/30 text-white border-white/50 shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            한국어
          </Button>
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            size="lg"
            onClick={() => onLanguageChange('en')}
            className={`px-8 py-3 text-lg font-semibold backdrop-blur-sm border-white/20 transition-all duration-300 ${
              language === 'en'
                ? 'bg-white/30 text-white border-white/50 shadow-lg'
                : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
            }`}
          >
            English
          </Button>
        </div>
        
        {/* 메인 타이틀 */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight whitespace-nowrap drop-shadow-2xl">
          {content[language].title}
        </h1>
        
        {/* 서브 타이틀 */}
        <p className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-lg">
          {content[language].subtitle}
        </p>
        
        {/* 시작 버튼 */}
        <div className="pt-4">
          <Button 
            onClick={onStartGuide}
            size="lg"
            className="px-12 py-4 text-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 transition-all duration-300 drop-shadow-lg"
          >
            {content[language].button}
          </Button>
        </div>
      </div>
      
      {/* 이미지 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {museumImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white shadow-lg' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
