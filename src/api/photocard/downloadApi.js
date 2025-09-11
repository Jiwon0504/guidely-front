// 다운로드 API 연결
import API_CONFIG from '../config';

const API_BASE_URL = API_CONFIG.PHOTOCARD_MAKER;

// 포토카드 다운로드
export const downloadPhotoCard = async (downloadUrl, filename = 'photocard.png') => {
  try {
    console.log('포토카드 다운로드 시작:', downloadUrl);
    
    const response = await fetch(downloadUrl, {
      method: 'GET',
      headers: {
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      throw new Error(`다운로드 실패: ${response.status} ${response.statusText}`);
    }

    // Blob으로 변환
    const blob = await response.blob();
    
    // 다운로드 링크 생성
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // 다운로드 실행
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // URL 해제
    window.URL.revokeObjectURL(url);
    
    console.log('포토카드 다운로드 완료:', filename);
    return { success: true, filename };
    
  } catch (error) {
    console.error('포토카드 다운로드 중 오류 발생:', error);
    throw error;
  }
};

// 포토카드 미리보기 (이미지 표시용)
export const getPhotoCardPreview = async (downloadUrl) => {
  try {
    console.log('포토카드 미리보기 로드:', downloadUrl);
    
    const response = await fetch(downloadUrl, {
      method: 'GET',
      headers: {
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      throw new Error(`미리보기 로드 실패: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const imageUrl = window.URL.createObjectURL(blob);
    
    console.log('포토카드 미리보기 로드 완료');
    return imageUrl;
    
  } catch (error) {
    console.error('포토카드 미리보기 로드 중 오류 발생:', error);
    throw error;
  }
};

// 포토카드 생성 (이미지 파일 업로드)
export const createPhotoCard = async (conversationId, artworkId, imageFile) => {
  try {
    console.log('포토카드 생성 시작:', { conversationId, artworkId, imageFile });
    
    // 이미지를 base64로 변환
    const base64String = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]); // data:image/... 부분 제거
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
    
    const requestBody = {
      file: base64String
    };
    
    const response = await fetch(`${API_BASE_URL}/api/photocards?conversationId=${conversationId}&artworkId=${artworkId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      let errorMessage = `포토카드 생성 실패: ${response.status} ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        console.error('포토카드 생성 오류 상세:', errorData);
        errorMessage += ` - ${JSON.stringify(errorData)}`;
      } catch (jsonError) {
        console.error('오류 응답 파싱 실패:', jsonError);
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('포토카드 생성 완료:', data);
    return data;
    
  } catch (error) {
    console.error('포토카드 생성 중 오류 발생:', error);
    throw error;
  }
};

// 포토카드 정보 조회
export const getPhotoCardInfo = async (photoCardId) => {
  try {
    console.log('포토카드 정보 조회:', photoCardId);
    
    const response = await fetch(`${API_BASE_URL}/api/photocards/${photoCardId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`포토카드 정보 조회 실패: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('포토카드 정보 조회 완료:', data);
    return data;
    
  } catch (error) {
    console.error('포토카드 정보 조회 중 오류 발생:', error);
    throw error;
  }
};
