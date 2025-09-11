import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X, Download, Loader2 } from "lucide-react";
import { downloadPhotoCard } from "../api/photocard/downloadApi";

export function PhotoCard({ artwork, guide, language, onClose, photoCardData }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // 대화 기반 요약 문장들 (예시)
  const summaryTexts = language === 'en' ? [
    `Today's exploration with ${guide.nameEn} revealed the hidden stories behind this masterpiece.`,
    "A journey through history, art, and culture that touched the heart.",
    "Every brushstroke tells a story of our ancestors' wisdom and creativity.",
    "This artwork will forever hold a special place in your museum memories."
  ] : [
    `${guide.name}와 함께한 오늘의 탐험에서 이 작품의 숨겨진 이야기를 발견했습니다.`,
    "역사와 예술, 문화를 통한 마음을 울린 여행이었습니다.",
    "모든 붓터치에는 우리 조상들의 지혜와 창의성이 담겨 있습니다.",
    "이 작품은 영원히 당신의 박물관 추억 속에 특별한 자리를 차지할 것입니다."
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // 다운로드 기능 구현 (실제로는 더 복잡한 구현이 필요)
    alert(language === 'en' ? 'Download feature coming soon!' : '다운로드 기능 준비 중입니다!');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      {/* 포토카드 컨테이너 */}
      <div className="relative">
        {/* 닫기 버튼 */}
        <Button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
          size="sm"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* 포토카드 본체 */}
        <div 
          className="bg-white rounded-lg shadow-2xl overflow-hidden print:shadow-none"
          style={{ width: '600px', height: '400px' }} // 가로형 비율
        >
          {/* 상단 작품명 */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-6 text-center">
            <h1 className="text-2xl font-bold">{artwork.title}</h1>
            <p className="text-sm opacity-80 mt-1">
              {language === 'en' ? 'National Museum of Korea' : '국립중앙박물관'}
            </p>
          </div>

          {/* 중앙 작품 이미지와 가이드 */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 relative overflow-hidden">
            {/* 가이드 배경 이미지 */}
            <div className="absolute inset-0">
              <img
                src={guide.image}
                alt={language === 'en' ? guide.nameEn : guide.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
                style={{ 
                  filter: 'blur(0.5px) brightness(1.5) contrast(1.3)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-50/60 via-gray-50/20 to-gray-50/60"></div>
            </div>
            
            {/* 메인 작품 이미지 */}
            <div className="relative z-10">
              <img
                src={artwork.url}
                alt={artwork.title}
                className="w-64 h-48 object-cover rounded-lg shadow-lg"
              />
              {/* 이미지 테두리 효과 */}
              <div className="absolute inset-0 rounded-lg border-4 border-white shadow-xl"></div>
            </div>
          </div>

          {/* 하단 요약 문장들 */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 p-6">
            <div className="text-center space-y-2">
              {summaryTexts.map((text, index) => (
                <p 
                  key={index} 
                  className="text-gray-700 text-sm leading-relaxed"
                  style={{ fontSize: '12px' }}
                >
                  {text}
                </p>
              ))}
              
              {/* 날짜와 가이드 정보 */}
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • {language === 'en' ? `with ${guide.nameEn}` : `${guide.name}와 함께`}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Guidely • {language === 'en' ? 'AI Curator Experience' : 'AI 큐레이터 체험'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 액션 버튼들 */}
        <div className="flex justify-center gap-4 mt-6 print:hidden">
          <Button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            <Download className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Print' : '인쇄하기'}
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="px-6 py-2"
          >
            {language === 'en' ? 'Download' : '다운로드'}
          </Button>
        </div>
      </div>

      {/* 배경 클릭으로 닫기 */}
      <div 
        className="absolute inset-0 -z-10" 
        onClick={onClose}
      ></div>


    </div>
  );
}