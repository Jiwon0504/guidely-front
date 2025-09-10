// 워드클라우드 API 연결
import API_CONFIG from './config';

const API_BASE_URL = API_CONFIG.CONVERSATION_STATS;

/**
 * 워드클라우드 데이터를 가져옵니다
 * @returns {Promise<Array>} 워드클라우드 데이터 배열
 */
export const fetchWordCloudData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/summary-statistics/word-frequency`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('워드클라우드 API 응답:', data);
    return data;
  } catch (error) {
    console.error('워드클라우드 데이터를 가져오는 중 오류 발생:', error);
    
    // 에러 발생 시 더미 데이터 반환
    return [
      { text: '전통', weight: 100 },
      { text: '호랑이', weight: 80 },
      { text: '까치', weight: 70 },
      { text: '문양', weight: 60 },
      { text: '전시', weight: 50 },
      { text: '예술', weight: 45 },
      { text: '문화', weight: 40 },
      { text: '역사', weight: 35 },
      { text: '아름다움', weight: 30 },
      { text: '상징', weight: 25 },
    ];
  }
};

/**
 * 워드클라우드 데이터를 wordcloud.js 형식으로 변환
 * @param {Array} data - API에서 받은 데이터
 * @returns {Array} wordcloud.js 형식의 데이터
 */
export const formatWordCloudData = (data) => {
  if (!Array.isArray(data)) {
    return [];
  }
  
  return data.map(item => [
    item.word || item.text || item.name,
    item.frequency || item.weight || item.count || 1
  ]);
};
