import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ArrowLeft, TrendingUp, Star } from "lucide-react";
import WordCloudComponent from "../components/WordCloudComponent";

export default function HighlightsPage({ 
  language, 
  onStartChat,
  onBackToHome 
}) {

  // Top3 인기 작품 데이터
  const topArtworks = language === 'en' ? [
    {
      id: 1,
      title: 'Gold Crown (Baekje)',
      description: 'A magnificent golden crown from the Baekje period',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      views: 1250,
      rating: 4.9
    },
    {
      id: 2,
      title: 'Pensive Bodhisattva',
      description: 'A serene Buddhist sculpture from the Three Kingdoms period',
      image: 'https://images.unsplash.com/photo-1622947337539-86542cc0cbf4?w=400&h=300&fit=crop',
      views: 1180,
      rating: 4.8
    },
    {
      id: 3,
      title: 'Celadon Prunus Vase',
      description: 'Elegant celadon pottery with cloud and crane designs',
      image: 'https://images.unsplash.com/photo-1594138352322-731eff042041?w=400&h=300&fit=crop',
      views: 980,
      rating: 4.7
    }
  ] : [
    {
      id: 1,
      title: '금관(백제)',
      description: '백제시대의 웅장한 금관',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      views: 1250,
      rating: 4.9
    },
    {
      id: 2,
      title: '반가사유상',
      description: '삼국시대의 평온한 불교 조각상',
      image: 'https://images.unsplash.com/photo-1622947337539-86542cc0cbf4?w=400&h=300&fit=crop',
      views: 1180,
      rating: 4.8
    },
    {
      id: 3,
      title: '청자 상감운학문 매병',
      description: '구름과 학 문양이 새겨진 우아한 청자',
      image: 'https://images.unsplash.com/photo-1594138352322-731eff042041?w=400&h=300&fit=crop',
      views: 980,
      rating: 4.7
    }
  ];

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
            onClick={onBackToHome}
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
            {language === 'en' ? 'Exhibition Highlights' : '전시 하이라이트'}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {language === 'en' 
              ? 'Discover what other visitors found most fascinating' 
              : '다른 관람객들이 가장 흥미로워한 것들을 발견해보세요'
            }
          </p>
        </div>

        {/* 메인 콘텐츠 - 좌우 분할 레이아웃 */}
        <div className="flex flex-row gap-8 mb-12 min-h-[600px]">
          {/* 왼쪽: Top3 랭킹 */}
          <div className="flex flex-col h-full flex-1">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
              {language === 'en' ? 'Top 3 Popular Artworks' : 'Top 3 인기 작품'}
            </h2>
            <div className="space-y-4 flex-1">
              {topArtworks.map((artwork, index) => (
                <div
                  key={artwork.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* 랭킹 번호 */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center font-bold text-white text-base">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* 작품 이미지 */}
                    <div className="flex-shrink-0">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    
                    {/* 작품 정보 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base mb-1 truncate">{artwork.title}</h3>
                      <p className="text-gray-300 text-sm mb-2 line-clamp-2">{artwork.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-medium">{artwork.rating}</span>
                        </div>
                        <span className="text-gray-400">{artwork.views.toLocaleString()} {language === 'en' ? 'views' : '조회'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 워드클라우드 */}
          <div className="flex flex-col h-full flex-1">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              {language === 'en' ? 'Popular Keywords' : '인기 키워드'}
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 flex items-center justify-center h-96">
              <div className="w-96 h-80">
                <WordCloudComponent language={language} />
              </div>
            </div>
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div className="text-center">
          <Button
            onClick={onStartChat}
            size="lg"
            className="px-12 py-4 text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            {language === 'en' ? 'Start Chatting Now!' : '이제 채팅을 하러 가볼까요?'}
          </Button>
          <p className="mt-4 text-gray-400 text-sm">
            {language === 'en' 
              ? 'Ready to explore with your AI guide?' 
              : 'AI 가이드와 함께 탐험할 준비가 되셨나요?'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
