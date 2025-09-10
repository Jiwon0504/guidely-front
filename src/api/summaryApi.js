// 엔딩크레딧 API 연결
import API_CONFIG from './config';

const API_BASE_URL = API_CONFIG.CONVERSATION_STATS;

/**
 * 엔딩크레딧을 생성합니다
 * @param {number} conversationId - 대화 ID
 * @param {Array} messages - 메시지 배열
 * @param {number} count - 생성할 요약 개수 (기본값: 10)
 * @returns {Promise<Object>} 엔딩크레딧 데이터
 */
export const generateEndingCredits = async (conversationId, messages, count = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/summary-statistics/ending-credits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationId,
        messages,
        count
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('엔딩크레딧 API 응답:', data);
    return data;
  } catch (error) {
    console.error('엔딩크레딧 생성 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 특정 대화의 요약 정보를 가져옵니다
 * @param {number} conversationId - 대화 ID
 * @returns {Promise<Object>} 대화 요약 데이터
 */
export const getConversationSummary = async (conversationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/summary-statistics/conversations/${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('대화 요약 API 응답:', data);
    return data;
  } catch (error) {
    console.error('대화 요약 조회 중 오류 발생:', error);
    throw error;
  }
};
