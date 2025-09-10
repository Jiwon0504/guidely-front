import React, { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import HighlightsPage from "./pages/HighlightsPage";
import ChatPage from "./pages/ChatPage";
import CharacterSelectPage from "./pages/CharacterSelectPage";
import FavoriteSelectPage from "./pages/FavoriteSelectPage";
import TransitionEffect from "./components/TransitionEffect";
import { characters } from "./data/characters";
import { 
  getRarityColor, 
  getRarityBackground, 
  getGlowEffect, 
  getRarityBorder, 
  getSelectedShadow 
} from "./components/RarityUtils";
import { 
  handleLearnMore, 
  handleRecommendedQuery, 
  handleSendMessage 
} from "./components/ChatService";
import transitionBg1 from "./assets/b7849cb38b3409941691afb7821cfd234223c641.png";
import transitionBg2 from "./assets/66ec66f92d58f4ce9239f67f34f6b8ad2abaa407.png";
import transitionBg3 from "./assets/acace210f12a3f453253423209de0aa1f9f356c7.png";
import Recorder from "./components/Recorder";
import { startConversation } from "./api/conversationsApi";
export default function App() {
  const [language, setLanguage] = useState('ko');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);
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

  const transitionBackgrounds = [transitionBg1, transitionBg2, transitionBg3];

  // 채팅 페이지 진입 시 환영 메시지 자동 생성
  useEffect(() => {
    if (currentPage === 'chat' && selectedCharacter && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        type: 'guide',
        content: language === 'en' 
          ? `Hello! I'm ${selectedCharacter.nameEn}, your personal guide at the National Museum of Korea. I'm excited to help you explore our amazing collection! What would you like to know about?`
          : `안녕하세요! 저는 국립중앙박물관의 가이드 ${selectedCharacter.name}입니다. 오늘 국립중앙박물관에 오신 것을 환영해요! 궁금한 것이 있으시면 언제든 물어보세요.`,
        timestamp: formatTime(new Date())
      };
      setMessages([welcomeMessage]);
    }
  }, [currentPage, selectedCharacter, language, messages.length]);

  const handleStartGuide = () => {
    setCurrentPage('highlights');
  };
  
  const handleStartChat = () => {
    setCurrentPage('character-select');
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
        // 대화 세션 시작 및 시스템 메시지 + 환영 메시지 추가
        (async () => {
          const res = await startConversation({ body: { language } });

          const welcomeMessage = {
            id: 2,
            type: 'guide',
            content: language === 'en' 
              ? `Hello! I'm ${selectedCharacter.nameEn}. I'll help you explore the National Museum of Korea today. Feel free to ask me anything!`
              : `안녕하세요! 저는 ${selectedCharacter.name}입니다. 오늘 국립중앙박물관 관람을 도와드리겠습니다. 궁금한 것이 있으시면 언제든 물어보세요!`,
            timestamp: formatTime(new Date())
          };

          const messagesToSet = [];
          if (res?.success && res?.data?.sessionId != null) {
            const sessionId = res.data.sessionId;
            messagesToSet.push({
              id: 1,
              type: 'system',
              content: language === 'en'
                ? `Chat ID ${sessionId} has joined the conversation.`
                : `채팅 ID ${sessionId}이 대화에 참여했습니다.`,
              timestamp: formatTime(new Date())
            });
          } else {
            console.error('startConversation failed:', res);
            messagesToSet.push({
              id: 1,
              type: 'system',
              content: language === 'en'
                ? 'Failed to start a chat session. Starting in offline mode.'
                : '세션 시작에 실패했습니다. 오프라인 모드로 진행합니다.',
              timestamp: formatTime(new Date())
            });
          }

          messagesToSet.push(welcomeMessage);
          setMessages(messagesToSet);
        })();
      }, 1500);
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
  if (currentPage === 'home') {
    return (
      <LandingPage 
        language={language} 
        onStartGuide={handleStartGuide}
        onLanguageChange={setLanguage}
      />
    );
  }

  // 하이라이트 페이지
  if (currentPage === 'highlights') {
    return (
      <HighlightsPage
        language={language}
        onStartChat={handleStartChat}
        onBackToHome={() => setCurrentPage('home')}
      />
    );
  }
  // 전환 효과
  if (isTransitioning) {
    return (
      <TransitionEffect
        language={language}
        selectedCharacter={selectedCharacter}
        transitionBackground={transitionBackground}
        getRarityColor={getRarityColor}
      />
    );
  }

  // 채팅 페이지
  if (currentPage === 'chat') {
    return (
      <ChatPage
        language={language}
        selectedCharacter={selectedCharacter}
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleBackToGuideSelect={handleBackToGuideSelect}
        handleSendMessage={(inputMessage) => handleSendMessage(inputMessage, setInputMessage, messages, setMessages, selectedCharacter, language, formatTime)}
        handleLearnMore={(messageContent) => handleLearnMore(messageContent, language, selectedCharacter, messages, setMessages, formatTime)}
        handleEndChat={handleEndChat}
        handleRecommendedQuery={(query) => handleRecommendedQuery(query, language, selectedCharacter, messages, setMessages, setInputMessage, formatTime)}
        getRarityColor={getRarityColor}
      />
    );
  }

  // 관람 후기 페이지
  if (currentPage === 'summary') {
    return (
      <FavoriteSelectPage
            language={language}
        selectedCharacter={selectedCharacter}
        selectedFavoriteArt={selectedFavoriteArt}
        setSelectedFavoriteArt={setSelectedFavoriteArt}
        showPhotoCard={showPhotoCard}
        setShowPhotoCard={setShowPhotoCard}
        setCurrentPage={setCurrentPage}
        getRarityColor={getRarityColor}
      />
    );
  }
  // 캐릭터 선택 페이지
  return (
    <CharacterSelectPage
      language={language}
      characters={characters}
      selectedCharacter={selectedCharacter}
      hoveredCharacter={hoveredCharacter}
      setHoveredCharacter={setHoveredCharacter}
      handleCharacterSelect={handleCharacterSelect}
      handleConfirm={handleConfirm}
      handleBackToHome={handleBackToHome}
      getRarityColor={getRarityColor}
      getRarityBackground={getRarityBackground}
      getGlowEffect={getGlowEffect}
    />
  );
}
