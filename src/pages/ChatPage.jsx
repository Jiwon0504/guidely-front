import React from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Send, ArrowLeft } from "lucide-react";
import Recorder from "../components/Recorder";

export default function ChatPage({ 
  language, 
  selectedCharacter, 
  messages, 
  inputMessage, 
  setInputMessage,
  handleBackToGuideSelect,
  handleSendMessage,
  handleLearnMore,
  handleEndChat,
  handleRecommendedQuery,
  getRarityColor
}) {
  const recommendedQueries = language === 'en' ? [
    "The Top 5 most-viewed artworks",
    "2F facilities location guide", 
    "Tell me about \"A Room of Quiet Contemplation\""
  ] : [
    "지금 가장 많이 찾아본 작품 Top 5",
    "2F 편의시설 위치 안내",
    "사유의 방 작품 설명"
  ];

  return (
    <div className="min-h-screen w-full relative flex flex-col bg-black" style={{height: '100vh'}}>
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <img
          src={selectedCharacter?.backgroundImage}
          alt={`${selectedCharacter?.name || ''} 배경`}
          className="w-full h-full object-cover"
        />
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* 헤더 */}
      <div
        className={`relative z-10 bg-gradient-to-r ${
          selectedCharacter ? getRarityColor(selectedCharacter.rarity) : 'from-gray-500 to-gray-600'
        } bg-opacity-90 backdrop-blur-sm p-4 shadow-lg flex-shrink-0`}
      >
        <div className="flex items-center gap-4 px-4">
          <Button
            onClick={handleBackToGuideSelect}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          {selectedCharacter && (
            <>
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/50"
              />
              <div>
                <h2 className="text-white font-bold text-lg">{selectedCharacter.name}</h2>
                <p className="text-white/80 text-sm">{selectedCharacter.nameEn}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 메시지 영역 */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : `bg-gradient-to-r ${
                          selectedCharacter
                            ? getRarityColor(selectedCharacter.rarity)
                            : 'from-gray-500 to-gray-600'
                        } text-white`
                  }`}
                >
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
                      {language === 'en'
                        ? 'Learn more'
                        : '이 주제에 대해 더 알려줘!'}
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
      </div>

      {/* 하단 고정 영역 */}
      <div className="relative z-10 bg-black/30 backdrop-blur-sm border-t border-gray-700/30 flex-shrink-0">
        {/* 추천 검색어 버블 */}
        <div className="px-4 pt-4">
          <div className="mx-auto">
            <p className="text-white/80 text-sm mb-3">
              {language === 'en' ? 'Try asking...' : '이렇게 질문해보세요!'}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {recommendedQueries.map((query, index) => (
                <button
                  key={index}
                  onClick={() => handleRecommendedQuery(query)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 hover:scale-105 bg-gradient-to-r ${
                    selectedCharacter
                      ? getRarityColor(selectedCharacter.rarity)
                      : 'from-gray-500 to-gray-600'
                  } bg-opacity-20 border border-current text-white hover:bg-opacity-30 backdrop-blur-sm`}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 입력 영역 */}
        <div className="px-4 pb-4">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={
                language === 'en' ? 'Type a message...' : '메시지를 입력하세요...'
              }
              className="flex-1 bg-white/90 backdrop-blur-sm border-gray-500/50 text-black placeholder-gray-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            {/* 🎤 Recorder 컴포넌트 */}
            <Recorder onTranscribedText={(text) => setInputMessage(text)} />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className={`bg-gradient-to-r ${
                selectedCharacter
                  ? getRarityColor(selectedCharacter.rarity)
                  : 'from-gray-500 to-gray-600'
              } hover:opacity-90 text-white`}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
