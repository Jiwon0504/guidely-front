# 테스트 실행 가이드

## 필요한 dependencies 설치

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom babel-jest @babel/preset-env @babel/preset-react identity-obj-proxy jest-transform-stub
```

## package.json에 추가할 스크립트들

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --watchAll=false --coverage",
    "test:api": "jest src/api/__tests__",
    "test:components": "jest src/components/__tests__",
    "test:integration": "jest src/__tests__/integration"
  }
}
```

## 테스트 실행 명령어들

### 1. 모든 테스트 실행
```bash
npm test
```

### 2. 특정 파일/폴더 테스트
```bash
# API 테스트만 실행
npm run test:api

# 컴포넌트 테스트만 실행  
npm run test:components

# 통합 테스트만 실행
npm run test:integration
```

### 3. 커버리지 리포트와 함께 실행
```bash
npm run test:coverage
```

### 4. Watch 모드로 실행 (개발 중)
```bash
npm run test:watch
```

### 5. CI/CD 환경에서 실행
```bash
npm run test:ci
```

## 테스트 파일 구조

```
src/
├── api/
│   ├── __tests__/
│   │   └── artworkStatisticsApi.test.js
│   └── artworkStatisticsApi.js
├── components/
│   ├── __tests__/
│   │   └── Top3Artworks.test.jsx
│   ├── Top3Artworks.jsx
│   └── Top3Artworks.css
├── __tests__/
│   └── integration/
│       └── Top3Artworks.integration.test.jsx
└── setupTests.js
```

## 테스트 커버리지 목표

- 브랜치 커버리지: 80% 이상
- 함수 커버리지: 80% 이상  
- 라인 커버리지: 80% 이상
- 구문 커버리지: 80% 이상

## 테스트 종류별 설명

### 1. API 테스트 (artworkStatisticsApi.test.js)
- fetch API 호출 검증
- 에러 처리 검증
- 더미 데이터 fallback 검증
- HTTP 상태 코드 처리 검증

### 2. 컴포넌트 테스트 (Top3Artworks.test.jsx)
- 렌더링 검증
- 사용자 인터랙션 검증
- 로딩/에러 상태 검증
- props 처리 검증

### 3. 통합 테스트 (Top3Artworks.integration.test.jsx)
- 전체 플로우 검증
- API 호출 순서 검증
- 에러 복구 시나리오 검증
- 실제 사용자 시나리오 검증 