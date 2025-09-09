import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { ScrollArea } from "./components/ui/scroll-area";
import { PhotoCard } from "./components/PhotoCard";
import { Send, ArrowLeft, Mic, Heart } from "lucide-react";
import rumiImage from "./assets/76c70bdc264bc6d920da9e65cc49744ccffd1f0e.png";
import miraImage from "./assets/51c5f63cb0c32a56b9ec983aa91454fe41daec5e.png";
import zoeyImage from "./assets/d86bd75a231ee00fad6013bb95e162d2ba5529dc.png";
import jinuImage from "./assets/66276f75c89a80a89ef0d734d5d31d8adddd1df9.png";
import museumImage1 from "./assets/7a10e11e29a2fe22a6ebc94fd262efdfe5f23027.png";
import museumImage2 from "./assets/180498df2b6b7c55a6a38f0ff6955c42f5b5303d.png";
import rumiBg from "./assets/591b85a33569d72c0d25bd04f31691c5a872804b.png";
import miraBg from "./assets/dcb159076a41fce79f10481e9b7f746dc18507b5.png";
import zoeyBg from "./assets/d86bd75a231ee00fad6013bb95e162d2ba5529dc.png";
import jinuBg from "./assets/4c44c31a43a93232a02ea00210a44f962acfc59f.png";
import transitionBg1 from "./assets/b7849cb38b3409941691afb7821cfd234223c641.png";
import transitionBg2 from "./assets/66ec66f92d58f4ce9239f67f34f6b8ad2abaa407.png";
import transitionBg3 from "./assets/acace210f12a3f453253423209de0aa1f9f356c7.png";

export default function App() {
  const [language, setLanguage] = useState('ko');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [transitionBackground, setTransitionBackground] = useState(null);
  const [selectedFavoriteArt, setSelectedFavoriteArt] = useState(null);
  const [showPhotoCard, setShowPhotoCard] = useState(false);

  // 시간 포맷 함수
  const formatTime = (date) => {
    if (language === 'en') {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else {
      return date.toLocaleTimeString();
    }
  };

  const museumImages = [museumImage1, museumImage2];
  const transitionBackgrounds = [transitionBg1, transitionBg2, transitionBg3];

  // 배경 이미지 슬라이드쇼
  useEffect(() => {
    if (currentPage === 'home') {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          (prevIndex + 1) % museumImages.length
        );
      }, 5000); // 5초마다 변경

      return () => clearInterval(interval);
    }
  }, [currentPage, museumImages.length]);

  const handleStartGuide = () => {
    setCurrentPage('character-select');
  };

  const content = {
    ko: {
      title: "국립중앙박물관 AI 큐레이터 · Guidely",
      subtitle: "나만의 인공지능 큐레이터와 함께하는 새로운 전시 경험",
      button: "Guidely와 관람 시작하기"
    },
    en: {
      title: "National Museum of Korea · AI Curator Guidely",
      subtitle: "Explore with your AI Curator",
      button: "Start Guidely"
    }
  };

  const characters = [
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

  const getRarityColor = (rarity) => {
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

  const getRarityBackground = (rarity) => {
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

  const getGlowEffect = (rarity) => {
    switch (rarity) {
      case 'legendary':
        return 'hover:shadow-[0_0_100px_40px_rgba(251,191,36,0.9),0_0_200px_80px_rgba(251,191,36,0.7),0_0_300px_120px_rgba(251,191,36,0.4)]' // 황금색 초대형 glow
      case 'epic':
        return 'hover:shadow-[0_0_100px_40px_rgba(168,85,247,0.9),0_0_200px_80px_rgba(168,85,247,0.7),0_0_300px_120px_rgba(168,85,247,0.4)]' // 보라색 초대형 glow
      case 'rare':
        return 'hover:shadow-[0_0_100px_40px_rgba(59,130,246,0.9),0_0_200px_80px_rgba(59,130,246,0.7),0_0_300px_120px_rgba(59,130,246,0.4)]' // 파란색 초대형 glow
      case 'common':
        return 'hover:shadow-[0_0_100px_40px_rgba(107,114,128,0.9),0_0_200px_80px_rgba(107,114,128,0.7),0_0_300px_120px_rgba(107,114,128,0.4)]' // 회색 초대형 glow
      default:
        return 'hover:shadow-[0_0_100px_40px_rgba(107,114,128,0.9),0_0_200px_80px_rgba(107,114,128,0.7),0_0_300px_120px_rgba(107,114,128,0.4)]' // 회색 초대형 glow
    }
  };

  const getRarityBorder = (rarity) => {
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

  const getSelectedShadow = (rarity) => {
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

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleConfirm = () => {
    if (selectedCharacter) {
      // 랜덤 배경 이미지 선택
      const randomIndex = Math.floor(Math.random() * transitionBackgrounds.length);
      setTransitionBackground(transitionBackgrounds[randomIndex]);
      
      setIsTransitioning(true);
      // 전환 효과 후 채팅 페이지로 이동
      setTimeout(() => {
        setCurrentPage('chat');
        setIsTransitioning(false);
        setTransitionBackground(null);
        // 첫 인사 메시지 추가
        const welcomeMessage = language === 'en' 
          ? `Hello! I'm ${selectedCharacter.nameEn}. I'll help you explore the National Museum of Korea today. Feel free to ask me anything!`
          : `안녕하세요! 저는 ${selectedCharacter.name}입니다. 오늘 국립중앙박물관 관람을 도와드리겠습니다. 궁금한 것이 있으시면 언제든 물어보세요!`;
        
        setMessages([
          {
            id: 1,
            type: 'guide',
            content: welcomeMessage,
            timestamp: formatTime(new Date())
          }
        ]);
      }, 1500);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: 'user',
        content: inputMessage,
        timestamp: formatTime(new Date())
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      
      // 가이드 응답 시뮬레이션
      setTimeout(() => {
        const responseContent = language === 'en'
          ? `That's an interesting question! ${selectedCharacter.nameEn} will explain it in detail. The National Museum of Korea has so many treasures.`
          : `흥미로운 질문이네요! ${selectedCharacter.name}이(가) 자세히 설명해드릴게요. 국립중앙박물관에는 정말 많은 보물들이 있어요.`;
        
        const guideResponse = {
          id: messages.length + 2,
          type: 'guide',
          content: responseContent,
          timestamp: formatTime(new Date())
        };
        setMessages(prev => [...prev, guideResponse]);
      }, 1000);
    }
  };

  const handleBackToGuideSelect = () => {
    setCurrentPage('character-select');
    setMessages([]);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCharacter(null);
    setSelectedFavoriteArt(null);
    setShowPhotoCard(false);
  };

  const handleEndChat = () => {
    setCurrentPage('summary');
  };

  const handleLearnMore = (messageContent) => {
    const learnMoreMessage = language === 'en' 
      ? `Tell me more about: "${messageContent}"`
      : `이것에 대해 더 자세히 알려주세요: "${messageContent}"`;
    
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: learnMoreMessage,
      timestamp: formatTime(new Date())
    };
    setMessages([...messages, newMessage]);
    
    // 가이드 응답 시뮬레이션
    setTimeout(() => {
      const responseContent = language === 'en'
        ? `${selectedCharacter.nameEn} will provide more detailed information about this topic. This is a deeper explanation with additional historical context and interesting facts.`
        : `${selectedCharacter.name}이(가) 이 주제에 대해 더 자세한 정보를 알려드릴게요. 추가적인 역사적 배경과 흥미로운 사실들을 포함한 깊이 있는 설명입니다.`;
      
      const guideResponse = {
        id: messages.length + 2,
        type: 'guide',
        content: responseContent,
        timestamp: formatTime(new Date())
      };
      setMessages(prev => [...prev, guideResponse]);
    }, 1000);
  };

  const recommendedQueries = language === 'en' ? [
    "The Top 5 most-viewed artworks",
    "2F facilities location guide", 
    "Tell me about \"A Room of Quiet Contemplation\""
  ] : [
    "지금 가장 많이 찾아본 작품 Top 5",
    "2F 편의시설 위치 안내",
    "사유의 방 작품 설명"
  ];

  const handleRecommendedQuery = (query) => {
    setInputMessage(query);
    // 바로 메시지 전송
    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: query,
      timestamp: formatTime(new Date())
    };
    setMessages([...messages, newMessage]);
    setInputMessage('');
    
    // 가이드 응답 시뮬레이션
    setTimeout(() => {
      let guideResponse = '';
      
      if (language === 'en') {
        if (query.includes('most-viewed') || query.includes('Top 5')) {
          guideResponse = `${selectedCharacter.nameEn} recommends these popular artworks! 1. Gold Crown (Baekje) 2. Pensive Bodhisattva 3. Celadon Prunus Vase with Inlaid Cloud and Crane Design 4. Hunminjeongeum Haerye 5. White Porcelain Moon Jar. Which artwork would you like to know more about?`;
        } else if (query.includes('facilities')) {
          guideResponse = `Let me guide you to the 2F facilities! 🏛️ The rest area is at the east end, the cafeteria is in the central hall, and restrooms are located on both the west and east sides. Nursing rooms and lockers are also available!`;
        } else if (query.includes('Room of Quiet Contemplation')) {
          guideResponse = `The Room of Quiet Contemplation is a special meditation space at the National Museum of Korea. 📿 It displays Buddhist sculptures including the Pensive Bodhisattva, where you can quietly reflect while viewing. The Gilt-bronze Pensive Bodhisattva is especially a must-see!`;
        }
      } else {
        if (query.includes('Top 5')) {
          guideResponse = `${selectedCharacter.name}이(가) 추천하는 인기 작품들을 소개해드릴게요! 1. 금관(백제) 2. 반가사유상 3. 청자 상감운학문 매병 4. 훈민정음 해례본 5. 백자 달항아리입니다. 어떤 작품에 대해 더 자세히 알고 싶으신가요?`;
        } else if (query.includes('편의시설')) {
          guideResponse = `2층 편의시설을 안내해드릴게요! 🏛️ 휴게실은 동편 끝에, 카페테리아는 중앙 홀에, 화장실은 서편과 동편에 각각 위치해 있습니다. 또한 수유실과 물품보관함도 이용 가능해요!`;
        } else if (query.includes('사유의 방')) {
          guideResponse = `사유의 방은 국립중앙박물관의 특별한 명상 공간이에요. 📿 이곳에는 반가사유상을 비롯한 불교 조각상들이 전시되어 있어, 조용히 사색하며 관람할 수 있는 곳입니다. 특히 금동미륵보살반가상은 꼭 보셔야 할 작품이에요!`;
        }
      }
      
      const response = {
        id: messages.length + 2,
        type: 'guide',
        content: guideResponse,
        timestamp: formatTime(new Date())
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  if (currentPage === 'home') {
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
              onClick={() => setLanguage('ko')}
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
              onClick={() => setLanguage('en')}
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
              onClick={handleStartGuide}
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

  // 전환 효과
  if (isTransitioning) {
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

  // 채팅 페이지
  if (currentPage === 'chat') {
    return (
      <div className="min-h-screen relative flex flex-col overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <img
            src={selectedCharacter.backgroundImage}
            alt={`${selectedCharacter.name} 배경`}
            className="w-full h-full object-cover"
          />
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        {/* 헤더 */}
        <div className={`relative z-10 bg-gradient-to-r ${getRarityColor(selectedCharacter.rarity)} bg-opacity-90 backdrop-blur-sm p-4 shadow-lg`}>
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <Button
              onClick={handleBackToGuideSelect}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <img 
              src={selectedCharacter.image} 
              alt={selectedCharacter.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
            />
            <div>
              <h2 className="text-white font-bold text-lg">{selectedCharacter.name}</h2>
              <p className="text-white/80 text-sm">{selectedCharacter.nameEn}</p>
            </div>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div className="relative z-10 flex-1 max-w-4xl mx-auto w-full p-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : `bg-gradient-to-r ${getRarityColor(selectedCharacter.rarity)} text-white`
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                  
                  {/* 가이드 메시지 아래에만 액션 버튼들 표시 */}
                  {message.type === 'guide' && (
                    <div className="flex justify-start">
                      <div className="flex gap-2 ml-2">
                        <Button
                          onClick={() => handleLearnMore(message.content)}
                          size="sm"
                          variant="outline"
                          className="text-xs bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                        >
                          {language === 'en' ? 'Learn more' : '이 주제에 대해 더 알려줘!'}
                        </Button>
                        <Button
                          onClick={handleEndChat}
                          size="sm"
                          variant="default"
                          className="text-xs bg-red-600 text-white hover:bg-red-700 border-none"
                        >
                          {language === 'en' ? 'End chat' : '대화 종료하기'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* 추천 검색어 버블 */}
        <div className="relative z-10 border-t border-gray-700/30 px-4 pt-4 bg-black/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <p className="text-white/80 text-sm mb-3">
              {language === 'en' ? 'Try asking...' : '이렇게 질문해보세요!'}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {recommendedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleRecommendedQuery(query)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 bg-gradient-to-r ${getRarityColor(selectedCharacter.rarity)} bg-opacity-20 border border-current text-white hover:bg-opacity-30 backdrop-blur-sm`}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="relative z-10 px-4 pb-4 bg-black/30 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={language === 'en' ? 'Type a message...' : '메시지를 입력하세요...'}
              className="flex-1 bg-black/40 backdrop-blur-sm border-gray-500/50 text-white placeholder-gray-300"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button
              onClick={() => {
                // 음성 입력 기능 구현 예정
                console.log('음성 입력 기능 준비 중...');
              }}
              className="bg-black/40 backdrop-blur-sm border border-gray-500/50 text-white hover:bg-black/60 transition-all duration-200"
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`bg-gradient-to-r ${getRarityColor(selectedCharacter.rarity)} hover:opacity-90 text-white`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 관람 후기 페이지
  if (currentPage === 'summary') {
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
                      onClick={() => setSelectedFavoriteArt(selectedFavoriteArt === photo.id ? null : photo.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all duration-200 transform hover:scale-110"
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
                onClick={() => {
                  if (selectedFavoriteArt) {
                    setShowPhotoCard(true);
                  } else {
                    alert(language === 'en' 
                      ? 'Please select your favorite artwork first!' 
                      : '먼저 가장 마음에 드는 작품을 선택해주세요!'
                    );
                  }
                }}
                size="lg"
                disabled={!selectedFavoriteArt}
                className="px-8 py-4 bg-white/20 border-2 border-white/60 text-white hover:bg-white/30 hover:border-white/80 backdrop-blur-sm rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {language === 'en' ? 'Print Photo Card' : '포토카드 인쇄하기'}
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

  // 캐릭터 선택 페이지
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
          {characters.map((character) => (
            <div
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
                key={character.id}
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
                  {character.level}
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
                    <p className="text-white/90 text-sm leading-relaxed font-medium line-clamp-3">
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