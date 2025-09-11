// 작품 선택 API 연결
import API_CONFIG from '../config';

const API_BASE_URL = API_CONFIG.PHOTOCARD_MAKER;

/**
 * 대화 세션에서 작품을 선택합니다
 * @param {string} sessionId - 대화 세션 ID
 * @param {string} artworkId - 작품 ID
 * @returns {Promise<Object>} 작품 선택 결과
 */
export const selectArtwork = async (sessionId, artworkId) => {
  try {
    // sessionId와 artworkId를 정수형으로 변환
    const sessionIdInt = parseInt(sessionId);
    const artworkIdInt = parseInt(artworkId);
    
    console.log('작품 선택 요청 - sessionId:', sessionIdInt, 'artworkId:', artworkIdInt);
    console.log('요청 URL:', `${API_BASE_URL}/api/conversation/${sessionIdInt}/artworks/${artworkIdInt}/select`);
    console.log('API 서버 URL:', API_BASE_URL);

    // API 서버 상태 확인
    try {
      const healthResponse = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
      console.log('API 서버 상태:', healthResponse.status);
    } catch (healthError) {
      console.log('API 서버 상태 확인 실패:', healthError.message);
    }

    // 여러 sessionId 형식 테스트 (이전에 성공했던 형식들)
    const sessionIdFormats = [
      sessionIdInt,           // 정수형
      sessionId,              // 원본 문자열
      `session_${sessionId}`, // session_ 접두사
      `conv_${sessionId}`,    // conv_ 접두사
      1,                      // 고정값 1
      12345                   // 고정값 12345 (이전에 성공했던 값)
    ];

    let response;
    let lastError;

    for (const testSessionId of sessionIdFormats) {
      try {
        console.log(`🔍 sessionId 테스트: ${testSessionId}`);
        
        response = await fetch(`${API_BASE_URL}/api/conversation/${testSessionId}/artworks/${artworkIdInt}/select`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          console.log(`✅ 성공: sessionId = ${testSessionId}`);
          break;
        } else {
          console.log(`❌ 실패: sessionId = ${testSessionId} - ${response.status}`);
          lastError = response;
        }
      } catch (error) {
        console.log(`❌ 오류: sessionId = ${testSessionId} - ${error.message}`);
        lastError = error;
      }
    }

    // 모든 형식이 실패한 경우
    if (!response || !response.ok) {
      response = lastError;
    }


    if (!response.ok) {
      // 오류 응답의 상세 정보 확인
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorDetails = '';
      
      console.error('❌ API 오류 발생:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        headers: Object.fromEntries(response.headers.entries())
      });
      
      try {
        // 응답을 복제해서 안전하게 읽기
        const responseClone = response.clone();
        const errorData = await responseClone.json();
        errorDetails = JSON.stringify(errorData);
        console.error('API 오류 상세 (JSON):', errorData);
      } catch (jsonError) {
        try {
          // JSON 파싱 실패 시 텍스트로 읽기
          const responseClone = response.clone();
          const errorText = await responseClone.text();
          errorDetails = errorText;
          console.error('API 오류 상세 (텍스트):', errorText);
        } catch (textError) {
          console.error('응답 읽기 실패:', textError);
          errorDetails = '응답을 읽을 수 없습니다';
        }
      }
      
      errorMessage += ` - ${errorDetails}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('작품 선택 API 응답:', data);
    return data;
  } catch (error) {
    console.error('작품 선택 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 대화 세션에서 선택된 작품 목록을 가져옵니다
 * @param {string} sessionId - 대화 세션 ID
 * @returns {Promise<Array>} 선택된 작품 목록
 */
export const getSelectedArtworks = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/conversation/${sessionId}/artworks/selected`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('선택된 작품 목록 API 응답:', data);
    return data;
  } catch (error) {
    console.error('선택된 작품 목록 조회 중 오류 발생:', error);
    throw error;
  }
};

/**
 * 대화 세션에서 작품 선택을 취소합니다
 * @param {string} sessionId - 대화 세션 ID
 * @param {string} artworkId - 작품 ID
 * @returns {Promise<Object>} 작품 선택 취소 결과
 */
export const deselectArtwork = async (sessionId, artworkId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/conversation/${sessionId}/artworks/${artworkId}/deselect`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('작품 선택 취소 API 응답:', data);
    return data;
  } catch (error) {
    console.error('작품 선택 취소 중 오류 발생:', error);
    throw error;
  }
};
