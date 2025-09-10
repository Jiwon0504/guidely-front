import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { PhotoCard } from "../components/PhotoCard";
import { ArrowLeft, Heart } from "lucide-react";
import { selectArtwork, getSelectedArtworks, deselectArtwork, downloadPhotoCard, getPhotoCardPreview } from "../api";

export default function FavoriteSelectPage({ 
  language, 
  selectedCharacter, 
  selectedFavoriteArt, 
  setSelectedFavoriteArt,
  showPhotoCard,
  setShowPhotoCard,
  setCurrentPage,
  getRarityColor,
  sessionId
}) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [photoCardData, setPhotoCardData] = useState(null);
  const [photoCardPreview, setPhotoCardPreview] = useState(null);

  // 작품 선택 API 호출 함수
  const handleArtworkSelect = async (artworkId) => {
    if (!sessionId) {
      console.warn('세션 ID가 없습니다.');
      return;
    }

    try {
      setIsSelecting(true);
      
      console.log('🔍 API 연결 테스트 시작...');
      console.log('sessionId:', sessionId, 'artworkId:', artworkId);
      
      const result = await selectArtwork(sessionId, artworkId);
      console.log('✅ 작품 선택이 완료되었습니다.');
      
      // 포토카드 데이터 저장
      if (result && result.downloadUrl) {
        setPhotoCardData(result);
        console.log('포토카드 데이터 저장:', result);
      }
    } catch (error) {
      console.warn('⚠️ API 서버 연결 실패 - 로컬에서만 작동합니다:', error.message);
      console.log('📝 작품 선택 정보 (로컬):', { sessionId, artworkId });
    } finally {
      setIsSelecting(false);
    }
  };

  // 포토카드 다운로드 함수
  const handleDownload = async () => {
    if (!photoCardData || !photoCardData.downloadUrl) {
      console.warn('다운로드할 포토카드가 없습니다.');
      return;
    }

    try {
      setIsDownloading(true);
      console.log('포토카드 다운로드 시작...');
      
      const filename = `photocard_${photoCardData.id}_${Date.now()}.png`;
      await downloadPhotoCard(photoCardData.downloadUrl, filename);
      
      console.log('✅ 포토카드 다운로드 완료!');
    } catch (error) {
      console.error('포토카드 다운로드 실패:', error);
      alert('다운로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsDownloading(false);
    }
  };

  // 포토카드 미리보기 로드 함수
  const handlePreview = async () => {
    if (!photoCardData || !photoCardData.downloadUrl) {
      console.warn('미리보기할 포토카드가 없습니다.');
      return;
    }

    try {
      console.log('포토카드 미리보기 로드 시작...');
      
      const previewUrl = await getPhotoCardPreview(photoCardData.downloadUrl);
      setPhotoCardPreview(previewUrl);
      
      console.log('✅ 포토카드 미리보기 로드 완료!');
    } catch (error) {
      console.error('포토카드 미리보기 로드 실패:', error);
      alert('미리보기 로드에 실패했습니다. 다시 시도해주세요.');
    }
  };


  const visitPhotos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1682648354214-a92f654a0c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGtvcmVhbiUyMGFydCUyMHBhaW50aW5nfGVufDF8fHx8MTc1NzMxOTM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: language === 'en' ? 'Museum Gallery' : '박물관 갤러리'
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1594138352322-731eff042041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBwb3R0ZXJ5JTIwY2VyYW1pY3N8ZW58MXx8fHwxNzU3MzE5Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: language === 'en' ? 'Korean Pottery' : '한국 도자기'
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1622947337539-86542cc0cbf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb3JlYW4lMjBidWRkaGlzdCUyMHNjdWxwdHVyZXxlbnwxfHx8fDE3NTczMTkzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: language === 'en' ? 'Buddhist Sculpture' : '불교 조각상'
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1753184649034-cadec03611da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGtvcmVhbiUyMGFydCUyMHBhaW50aW5nfGVufDF8fHx8MTc1NzMxOTM5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: language === 'en' ? 'Traditional Art' : '전통 예술'
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
            onClick={() => setCurrentPage('home')}
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
            {language === 'en' ? 'How was your visit today?' : '오늘 관람은 어떠셨나요?'}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {language === 'en' 
              ? 'Here are the highlights from your museum experience with Guidely' 
              : 'Guidely와 함께한 박물관 관람의 하이라이트입니다'
            }
          </p>
          
          {/* 가이드 정보 */}
          {selectedCharacter && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <img 
                src={selectedCharacter.image} 
                alt={selectedCharacter.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white/50"
              />
              <div className="text-left">
                <h3 className="text-white font-bold text-lg">
                  {language === 'en' ? 'Your Guide: ' : '함께한 가이드: '}
                  <span className={`bg-gradient-to-r ${getRarityColor(selectedCharacter.rarity)} bg-clip-text text-transparent`}>
                    {language === 'en' ? selectedCharacter.nameEn : selectedCharacter.name}
                  </span>
                </h3>
                <p className="text-gray-300 text-sm">
                  {language === 'en' ? selectedCharacter.descriptionEn : selectedCharacter.description}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* 관람 사진들 */}
        <div className="mb-8">
          <h2 className="text-center text-2xl text-white mb-6">
            {language === 'en' ? 'Select your favorite artwork' : '가장 마음에 드는 작품을 선택해주세요'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
            {visitPhotos.map((photo) => (
              <Card
                key={photo.id}
                className={`bg-white/10 backdrop-blur-sm border overflow-hidden hover:transform hover:scale-105 transition-all duration-300 ${
                  selectedFavoriteArt === photo.id 
                    ? 'border-red-400 ring-2 ring-red-400/50 shadow-lg shadow-red-400/25' 
                    : 'border-white/20'
                }`}
              >
                <div className="aspect-square relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  {/* 하트 버튼 */}
                  <button
                    onClick={async () => {
                      const newSelection = selectedFavoriteArt === photo.id ? null : photo.id;
                      setSelectedFavoriteArt(newSelection);
                      
                      // 작품이 선택된 경우에만 API 호출
                      if (newSelection) {
                        await handleArtworkSelect(photo.id);
                      }
                    }}
                    disabled={isSelecting}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-all duration-200 ${
                        selectedFavoriteArt === photo.id 
                          ? 'text-red-400 fill-red-400' 
                          : 'text-white'
                      }`}
                    />
                  </button>
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-sm">{photo.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* 선택된 작품 정보 */}
          {selectedFavoriteArt && (
            <div className="text-center">
              <p className="text-white/80 text-sm">
                {language === 'en' ? 'Selected: ' : '선택된 작품: '}
                <span className="text-red-400 font-bold">
                  {visitPhotos.find(photo => photo.id === selectedFavoriteArt)?.title}
                </span>
              </p>
              {isSelecting && (
                <p className="text-yellow-400 text-xs mt-2">
                  {language === 'en' ? 'Saving selection...' : '선택사항을 저장하는 중...'}
                </p>
              )}
              
              {/* 포토카드 미리보기 섹션 */}
              {photoCardData && photoCardData.downloadUrl && (
                <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  <p className="text-white/90 text-sm mb-3">
                    {language === 'en' ? 'Photo Card Ready!' : '포토카드가 준비되었습니다!'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {/* 미리보기 버튼 */}
                    <button
                      onClick={handlePreview}
                      className="px-4 py-2 bg-blue-500/80 hover:bg-blue-500 text-white text-sm rounded-lg transition-all duration-200 hover:scale-105"
                    >
                      {language === 'en' ? 'Preview' : '미리보기'}
                    </button>
                  </div>
                  
                  {/* 미리보기 이미지 */}
                  {photoCardPreview && (
                    <div className="mt-3">
                      <img 
                        src={photoCardPreview} 
                        alt="Photo Card Preview" 
                        className="max-w-xs mx-auto rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* 하단 액션 버튼들 */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => {
                setCurrentPage('character-select');
                setSelectedFavoriteArt(null);
              }}
              size="lg"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105"
            >
              {language === 'en' ? 'Explore with Another Guide' : '다른 가이드와 탐험하기'}
            </Button>
            <Button
              onClick={async () => {
                if (selectedFavoriteArt) {
                  if (photoCardData && photoCardData.downloadUrl) {
                    // 포토카드가 이미 생성된 경우 다운로드
                    try {
                      await handleDownload();
                    } catch (error) {
                      console.error('다운로드 실패:', error);
                    }
                  } else {
                    // 포토카드가 없는 경우 모달 표시
                    setShowPhotoCard(true);
                  }
                } else {
                  alert(language === 'en' 
                    ? 'Please select your favorite artwork first!' 
                    : '먼저 가장 마음에 드는 작품을 선택해주세요!'
                  );
                }
              }}
              size="lg"
              disabled={!selectedFavoriteArt || isDownloading}
              className="px-8 py-4 bg-white/20 border-2 border-white/60 text-white hover:bg-white/30 hover:border-white/80 backdrop-blur-sm rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isDownloading 
                ? (language === 'en' ? 'Downloading...' : '다운로드 중...')
                : (photoCardData && photoCardData.downloadUrl)
                  ? (language === 'en' ? 'Download Photo Card' : '포토카드 다운로드')
                  : (language === 'en' ? 'Print Photo Card' : '포토카드 인쇄하기')
              }
            </Button>
          </div>
          
          <p className="text-gray-400 text-sm">
            {language === 'en' 
              ? 'Thank you for visiting the National Museum of Korea with Guidely!' 
              : '국립중앙박물관 AI 큐레이터 Guidely와 함께해 주셔서 감사합니다!'
            }
          </p>
        </div>
      </div>
      
      {/* 포토카드 모달 */}
      {showPhotoCard && selectedFavoriteArt && selectedCharacter && (
        <PhotoCard
          artwork={visitPhotos.find(photo => photo.id === selectedFavoriteArt)}
          guide={{
            name: selectedCharacter.name,
            nameEn: selectedCharacter.nameEn,
            image: selectedCharacter.image
          }}
          language={language}
          onClose={() => setShowPhotoCard(false)}
        />
      )}
    </div>
  );
}
