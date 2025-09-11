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
import { getConversation } from "./api/conversationDetailsApi";
import { endConversation } from "./api/conversationEndApi";
import transitionBg1 from "./assets/b7849cb38b3409941691afb7821cfd234223c641.png";
import transitionBg2 from "./assets/66ec66f92d58f4ce9239f67f34f6b8ad2abaa407.png";
import transitionBg3 from "./assets/acace210f12a3f453253423209de0aa1f9f356c7.png";
import Recorder from "./components/Recorder";
import { startConversation } from "./api/conversationsApi";

export default function App() {
  const [language, setLanguage] = useState("ko");
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [hoveredCharacter, setHoveredCharacter] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [transitionBackground, setTransitionBackground] = useState(null);
  const [selectedFavoriteArt, setSelectedFavoriteArt] = useState(null);
  const [showPhotoCard, setShowPhotoCard] = useState(false);
  const [conversationId, setConversationId] = useState(null);


  // 시간 포맷 함수
  const formatTime = (date) => {
    if (language === "en") {
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleTimeString();
    }
  };

  const transitionBackgrounds = [transitionBg1, transitionBg2, transitionBg3];

  // 채팅 페이지 진입 시 환영 메시지 자동 생성
  useEffect(() => {
    if (currentPage === "chat" && selectedCharacter && messages.length === 0) {
      const welcomeMessage = {
        id: 1,
        type: "guide",
        content:
          language === "en"
            ? `Hello! I'm ${selectedCharacter.nameEn}, your personal guide at the National Museum of Korea. I'm excited to help you explore our amazing collection! What would you like to know about?`
            : `안녕하세요! 저는 국립중앙박물관의 가이드 ${selectedCharacter.name}입니다. 오늘 국립중앙박물관에 오신 것을 환영해요! 궁금한 것이 있으시면 언제든 물어보세요.`,
        timestamp: formatTime(new Date()),
      };
      setMessages([welcomeMessage]);
    }
  }, [currentPage, selectedCharacter, language, messages.length]);

  const handleStartGuide = () => {
    setCurrentPage("highlights");
  };

  const handleStartChat = () => {
    setCurrentPage("character-select");
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
        setCurrentPage("chat");
        setIsTransitioning(false);
        setTransitionBackground(null);

        // 대화 세션 시작 및 시스템 메시지 + 환영 메시지 추가
        (async () => {
          try {
            const res = await startConversation();

            const messagesToSet = [];
            if (res?.success && res?.data && 'session_id' in res.data) {
              const sessionId = res.data.session_id;
              setConversationId(sessionId);

              messagesToSet.push({
                id: 1,
                type: "system",
                content:
                  language === "en"
                    ? `Chat session ${sessionId} started.`
                    : `채팅 세션 ${sessionId}이 시작되었습니다.`,
                timestamp: formatTime(new Date()),
              });

              // 기존 대화 기록 불러오기 시도 (실패해도 괜찮음 - 첫 대화일 수 있음)
              try {
                const history = await getConversation(sessionId, { page: 0, size: 20 });
                if (
                  history?.success &&
                  Array.isArray(history?.data?.messages) &&
                  history.data.messages.length > 0
                ) {
                  history.data.messages.forEach((m) => {
                    messagesToSet.push({
                      id: messagesToSet.length + 1,
                      type: m.role?.toLowerCase() === "user" ? "user" : "guide",
                      content: m.content,
                      timestamp: formatTime(new Date(m.createdAt || Date.now())),
                    });
                  });
                }
              } catch (historyError) {
                // 기록 불러오기 실패는 정상 (첫 대화일 가능성)
                console.log("📝 No conversation history found (first chat):", historyError.message);
              }
            } else {
              console.error("❌ startConversation failed:", res);
              messagesToSet.push({
                id: 1,
                type: "system",
                content:
                  language === "en"
                    ? "Failed to start a chat session. Starting in offline mode."
                    : "세션 시작에 실패했습니다. 오프라인 모드로 진행합니다.",
                timestamp: formatTime(new Date()),
              });
            }

            // 기록이 없으면 환영 메시지 추가
            if (!messagesToSet.some((msg) => msg.type === "guide")) {
              messagesToSet.push({
                id: messagesToSet.length + 1,
                type: "guide",
                content:
                  language === "en"
          ? `Hello! I'm ${selectedCharacter.nameEn}. I'll help you explore the National Museum of Korea today. Feel free to ask me anything!`
                    : `안녕하세요! 저는 ${selectedCharacter.name}입니다. 오늘 국립중앙박물관 관람을 도와드리겠습니다. 궁금한 것이 있으시면 언제든 물어보세요!`,
                timestamp: formatTime(new Date()),
              });
            }
            setMessages(messagesToSet);
          } catch (err) {
            console.error("🔥 startConversation error:", err);
        setMessages([
          {
            id: 1,
                type: "system",
                content:
                  language === "en"
                    ? "Error occurred while starting session."
                    : "세션 시작 중 오류가 발생했습니다.",
                timestamp: formatTime(new Date()),
              },
            ]);
          }
        })();
      }, 1500);
    }
  };

  const handleBackToGuideSelect = () => {
    setCurrentPage("character-select");
    setMessages([]);
    setConversationId(null);
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    setSelectedCharacter(null);
    setSelectedFavoriteArt(null);
    setShowPhotoCard(false);
    setConversationId(null);
  };

  const handleEndChat = async () => {
    if (conversationId) {
      try {
        await endConversation(conversationId, { reason: "USER_REQUEST" });
      } catch (e) {
        console.error("endConversation failed", e);
      }
    }
    setCurrentPage("summary");
  };

  // --- 렌더링 ---
  if (currentPage === "home") {
    return (
      <LandingPage
        language={language}
        onStartGuide={handleStartGuide}
        onLanguageChange={setLanguage}
      />
    );
  }

  if (currentPage === "highlights") {
    return (
      <HighlightsPage
        language={language}
        onStartChat={handleStartChat}
        onBackToHome={() => setCurrentPage("home")}
      />
    );
  }

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

  if (currentPage === "chat") {
    return (
      <ChatPage
        language={language}
        selectedCharacter={selectedCharacter}
        messages={messages}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        handleBackToGuideSelect={handleBackToGuideSelect}
        handleSendMessage={(inputMessage) =>
          handleSendMessage(
            inputMessage,
            setInputMessage,
            messages,
            setMessages,
            selectedCharacter,
            language,
            formatTime,
            conversationId
          )
        }
        handleLearnMore={(messageContent) =>
          handleLearnMore(
            messageContent,
            language,
            selectedCharacter,
            messages,
            setMessages,
            formatTime
          )
        }
        handleEndChat={handleEndChat}
        handleRecommendedQuery={(query) =>
          handleRecommendedQuery(
            query,
            language,
            selectedCharacter,
            messages,
            setMessages,
            setInputMessage,
            formatTime
          )
        }
        getRarityColor={getRarityColor}
      />
    );
  }

  if (currentPage === "summary") {
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
        sessionId={conversationId}
      />
    );
  }

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
