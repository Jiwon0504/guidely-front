// 작품 통계 API 연결
import API_CONFIG from './config';

const API_BASE_URL = API_CONFIG.ARTWORK_STATS;

/**
 * Top3 인기 작품을 가져옵니다
 * @returns {Promise<Array>} Top3 작품 데이터 배열
 */
export const fetchTopArtworks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stats/top3`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Top3 작품 API 응답:', data);
    return data;
  } catch (error) {
    console.error('Top3 작품 데이터를 가져오는 중 오류 발생:', error);
    
    // 에러 발생 시 더미 데이터 반환
    return [
      {
        id: 1,
        title: '금관(백제)',
        description: '백제시대의 웅장한 금관',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
        views: 1250,
        rating: 4.9,
        likeCount: 89
      },
      {
        id: 2,
        title: '반가사유상',
        description: '삼국시대의 평온한 불교 조각상',
        image: 'https://images.unsplash.com/photo-1622947337539-86542cc0cbf4?w=400&h=300&fit=crop',
        views: 1180,
        rating: 4.8,
        likeCount: 76
      },
      {
        id: 3,
        title: '청자 상감운학문 매병',
        description: '구름과 학 문양이 새겨진 우아한 청자',
        image: 'https://images.unsplash.com/photo-1594138352322-731eff042041?w=400&h=300&fit=crop',
        views: 980,
        rating: 4.7,
        likeCount: 63
      }
    ];
  }
};

/**
 * 작품 좋아요를 추가합니다
 * @param {string} artworkId - 작품 ID
 * @returns {Promise<Object>} 좋아요 결과
 */
export const likeArtwork = async (artworkId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ artworkId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('작품 좋아요 API 응답:', data);
    return data;
  } catch (error) {
    console.error('작품 좋아요 중 오류 발생:', error);
    throw error;
  }
};

