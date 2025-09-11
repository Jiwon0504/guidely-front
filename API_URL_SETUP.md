# API URL 설정 가이드

## 🚀 실제 배포 시 URL 변경 방법

### 1. config.js 파일 수정
`src/api/config.js` 파일의 `PRODUCTION_URLS` 객체를 수정하세요:

```javascript
// 실제 프로덕션 API URLs (배포 시 수정 필요)
const PRODUCTION_URLS = {
  CHAT_ORCHESTRA: 'https://your-chat-orchestra.azurewebsites.net',       // 👈 실제 URL로 변경
  PHOTOCARD_MAKER: 'https://your-photocard-maker.azurewebsites.net',     // 👈 실제 URL로 변경
  RAG: 'https://your-rag.azurewebsites.net',                             // 👈 실제 URL로 변경
  EXHIBITION: 'https://your-exhibition.azurewebsites.net',               // 👈 실제 URL로 변경  ⭐ Top3 작품 기능 사용
  ARTWORK_STATS: 'https://your-artwork-stats.azurewebsites.net',         // 👈 실제 URL로 변경  ⭐ Top3 작품 기능 사용
  CONVERSATION_STATS: 'https://guidely-summary-statistic-dtfac0dde5a0bmea.koreacentral-01.azurewebsites.net'  // 👈 이미 실제 URL
};
```

### 2. 환경변수로 설정 (선택사항)

`.env` 파일을 사용해서 URL을 설정할 수도 있습니다:

```bash
# .env 파일
VITE_CHAT_ORCHESTRA_URL=https://real-chat-orchestra.azurewebsites.net
VITE_PHOTOCARD_MAKER_URL=https://real-photocard-maker.azurewebsites.net
VITE_RAG_URL=https://real-rag.azurewebsites.net
VITE_EXHIBITION_URL=https://real-exhibition.azurewebsites.net          # ⭐ Top3 작품 기능
VITE_ARTWORK_STATS_URL=https://real-artwork-stats.azurewebsites.net    # ⭐ Top3 작품 기능
VITE_CONVERSATION_STATS_URL=https://real-conversation-stats.azurewebsites.net
```

## 📋 Top3 작품 기능에 필요한 API

Top3 작품 기능을 사용하려면 **반드시** 다음 2개 API의 실제 URL이 필요합니다:

### 1. ARTWORK_STATS (작품 통계 서비스)
- **역할**: 상위 3개 작품 ID를 제공
- **엔드포인트**: `GET /api/stats/top3`
- **응답 예시**: `[1, 2, 3]`

### 2. EXHIBITION (전시 및 작품 서비스)  
- **역할**: 각 작품의 상세 정보 제공
- **엔드포인트**: `GET /api/artworks/{id}`
- **응답 예시**: 
```json
{
  "id": 1,
  "title": "작품명",
  "description": "작품 설명", 
  "image": "이미지 URL"
}
```

## 🔧 변경 단계

### 단계 1: URL 확인
실제 API 서버의 URL들을 확인하세요.

### 단계 2: config.js 수정
`src/api/config.js`의 `PRODUCTION_URLS`에서 해당 URL들을 변경하세요.

### 단계 3: 테스트
변경 후 다음 명령어로 테스트하세요:
```bash
npm run dev
```

### 단계 4: 빌드 및 배포
```bash
npm run build
```

## ⚠️ 주의사항

1. **테스트 환경**: `TEST_URLS`는 변경하지 마세요. 테스트에서만 사용됩니다.

2. **CORS 설정**: 실제 API 서버에서 프론트엔드 도메인을 CORS에 추가해야 합니다.

3. **HTTPS**: 프로덕션에서는 반드시 HTTPS URL을 사용하세요.

4. **API 응답 형식**: 실제 API가 예상하는 형식과 일치하는지 확인하세요.

## 🧪 테스트 방법

URL 변경 후 Top3 작품 기능이 정상 작동하는지 확인:

1. 브라우저에서 애플리케이션 열기
2. Top3 작품 컴포넌트가 표시되는 페이지로 이동
3. 작품명과 이미지가 올바르게 표시되는지 확인
4. 좋아요 버튼이 작동하는지 확인

## 📞 문제 해결

API 연결 문제가 발생하면:

1. 브라우저 개발자 도구의 Network 탭 확인
2. Console 탭에서 에러 메시지 확인  
3. API 서버가 정상 작동하는지 확인
4. CORS 설정 확인 