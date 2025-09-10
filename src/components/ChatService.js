// 채팅 관련 서비스 함수들

export const handleLearnMore = (messageContent, language, selectedCharacter, messages, setMessages, formatTime) => {
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

export const handleRecommendedQuery = (query, language, selectedCharacter, messages, setMessages, setInputMessage, formatTime) => {
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

export const handleSendMessage = (inputMessage, setInputMessage, messages, setMessages, selectedCharacter, language, formatTime) => {
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
