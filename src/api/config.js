// MSA 서비스별 API URL 설정
const API_CONFIG = {
  // 1. Chat-Orchestra Service (대화 관리)
  CHAT_ORCHESTRA: import.meta.env.VITE_CHAT_ORCHESTRA_URL || 'https://your-chat-orchestra.azurewebsites.net',
  
  // 2. Photocard-Maker Service (포토카드 생성)
  PHOTOCARD_MAKER: import.meta.env.VITE_PHOTOCARD_MAKER_URL || 'https://guidely-phtotcardmaker-g9hqaacaadcwdhfn.koreacentral-01.azurewebsites.net',
  
  // 3. RAG Service (검색 및 답변)
  RAG: import.meta.env.VITE_RAG_URL || 'https://your-rag.azurewebsites.net',
  
  // 4. Exhibition & Artwork Service (전시 및 작품)
  EXHIBITION: import.meta.env.VITE_EXHIBITION_URL || 'https://your-exhibition.azurewebsites.net',
  
  // 5. 작품 통계 서비스 (Top3 작품)
  ARTWORK_STATS: import.meta.env.VITE_ARTWORK_STATS_URL || 'https://your-artwork-stats.azurewebsites.net',
  
  // 6. 대화 통계 서비스 (워드클라우드, 엔딩크레딧)
  CONVERSATION_STATS: import.meta.env.VITE_CONVERSATION_STATS_URL || 'https://guidely-summary-statistic-dtfac0dde5a0bmea.koreacentral-01.azurewebsites.net'
};

export default API_CONFIG;
