// ========================================
// 🚀 실제 배포 시 이 URL들을 변경하세요!
// ========================================

// 실제 프로덕션 API URLs (배포 시 수정 필요)
const PRODUCTION_URLS = {
  CHAT_ORCHESTRA: 'https://your-chat-orchestra.azurewebsites.net',
  PHOTOCARD_MAKER: 'https://your-photocard-maker.azurewebsites.net', 
  RAG: 'https://your-rag.azurewebsites.net',
  EXHIBITION: 'https://guidely-exhibition-artwork-services-dmeagqebfud4e7hh.koreacentral-01.azurewebsites.net',
  ARTWORK_STATS: 'https://guidely-artwork-statistic-fah0b3dte6hvech2.koreacentral-01.azurewebsites.net',
  CONVERSATION_STATS: 'https://guidely-summary-statistic-dtfac0dde5a0bmea.koreacentral-01.azurewebsites.net'
};

// 테스트 환경 URLs (변경 불필요)
const TEST_URLS = {
  CHAT_ORCHESTRA: 'https://test-chat-orchestra.example.com',
  PHOTOCARD_MAKER: 'https://test-photocard-maker.example.com',
  RAG: 'https://test-rag.example.com', 
  EXHIBITION: 'https://test-exhibition.example.com',
  ARTWORK_STATS: 'https://test-artwork-stats.example.com',
  CONVERSATION_STATS: 'https://test-conversation-stats.example.com'
};

// ========================================

const isTestEnvironment = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

// 환경변수 가져오기 함수 (테스트 환경 고려)
const getEnvUrl = (envKey, serviceName) => {
  if (isTestEnvironment) {
    return TEST_URLS[serviceName];
  }
  
  try {
    // 환경변수가 있으면 사용, 없으면 기본 URL 사용
    return import.meta.env?.[envKey] || PRODUCTION_URLS[serviceName];
  } catch (e) {
    return PRODUCTION_URLS[serviceName];
  }
};

const API_CONFIG = {
  // 1. Chat-Orchestra Service (대화 관리)
  CHAT_ORCHESTRA: getEnvUrl('VITE_CHAT_ORCHESTRA_URL', 'CHAT_ORCHESTRA'),
  
  // 2. Photocard-Maker Service (포토카드 생성)
  PHOTOCARD_MAKER: getEnvUrl('VITE_PHOTOCARD_MAKER_URL', 'PHOTOCARD_MAKER'),
  
  // 3. RAG Service (검색 및 답변)
  RAG: getEnvUrl('VITE_RAG_URL', 'RAG'),
  
  // 4. Exhibition & Artwork Service (전시 및 작품) - Top3 작품 기능에서 사용
  EXHIBITION: getEnvUrl('VITE_EXHIBITION_URL', 'EXHIBITION'),
  
  // 5. 작품 통계 서비스 (Top3 작품) - Top3 작품 기능에서 사용  
  ARTWORK_STATS: getEnvUrl('VITE_ARTWORK_STATS_URL', 'ARTWORK_STATS'),
  
  // 6. 대화 통계 서비스 (워드클라우드, 엔딩크레딧)
  CONVERSATION_STATS: getEnvUrl('VITE_CONVERSATION_STATS_URL', 'CONVERSATION_STATS')
};

export default API_CONFIG;
