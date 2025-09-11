# 🚨 CORS 설정 요청서

## 📋 요청 개요
프론트엔드에서 API 호출 시 CORS 정책에 의해 차단되고 있어 백엔드 서버에 CORS 설정이 필요합니다.

## ❌ 현재 발생하는 오류
```
Access to fetch at 'https://guidely-artwork-statistic-fah0b3dte6hvech2.koreacentral-01.azurewebsites.net/api/v1/artwork-stats/top3' 
from origin 'http://localhost:5173' has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 🌐 프론트엔드 도메인 정보
- **개발 환경**: `http://localhost:5173` (Vite 개발 서버)
- **프로덕션 환경**: `https://your-frontend-domain.com` (실제 배포 도메인으로 변경 필요)

## 🎯 CORS 설정이 필요한 API 서버들

### 1. 작품 통계 서비스 (ARTWORK_STATS)
- **서버**: `https://guidely-artwork-statistic-fah0b3dte6hvech2.koreacentral-01.azurewebsites.net`
- **엔드포인트**: 
  - `GET /api/v1/artwork-stats/top3` (Top3 작품 ID 조회)
  - `POST /api/likes` (작품 좋아요)

### 2. 전시 및 작품 서비스 (EXHIBITION)
- **서버**: `https://your-exhibition-server.azurewebsites.net` (실제 URL 확인 필요)
- **엔드포인트**: 
  - `GET /api/artworks/{id}` (작품 상세 정보 조회)

## ⚙️ 필요한 CORS 헤더 설정

```http
Access-Control-Allow-Origin: http://localhost:5173, https://your-frontend-domain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 86400
```

## 🛠️ 서버별 CORS 설정 예시

### Spring Boot (Java)
```java
@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:5173",
                    "https://your-frontend-domain.com"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(86400);
    }
}
```

### ASP.NET Core (C#)
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("AllowFrontend", builder =>
        {
            builder.WithOrigins(
                "http://localhost:5173",
                "https://your-frontend-domain.com"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()
            .SetPreflightMaxAge(TimeSpan.FromDays(1));
        });
    });
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseCors("AllowFrontend");
    // ... other middleware
}
```

### Express.js (Node.js)
```javascript
const cors = require('cors');

app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://your-frontend-domain.com'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    maxAge: 86400
}));
```

## 🧪 설정 확인 방법

### 1. 브라우저에서 확인
```javascript
// 브라우저 콘솔에서 테스트
fetch('https://guidely-artwork-statistic-fah0b3dte6hvech2.koreacentral-01.azurewebsites.net/api/v1/artwork-stats/top3')
  .then(response => response.json())
  .then(data => console.log('성공:', data))
  .catch(error => console.error('실패:', error));
```

### 2. curl 명령어로 확인
```bash
curl -X OPTIONS \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v \
  https://guidely-artwork-statistic-fah0b3dte6hvech2.koreacentral-01.azurewebsites.net/api/v1/artwork-stats/top3
```

성공하면 다음과 같은 헤더가 응답에 포함되어야 합니다:
```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
```

## 🚀 우선순위

### 1. 즉시 필요한 설정 (Top3 작품 기능)
- **ARTWORK_STATS**: `https://guidely-artwork-statistic-fah0b3dte6hvech2.koreacentral-01.azurewebsites.net`
- **EXHIBITION**: 실제 URL 확인 후 설정

### 2. 향후 필요한 설정
- 다른 마이크로서비스들의 CORS 설정

## 📞 연락처
CORS 설정 완료 후 알려주시면 즉시 테스트하겠습니다!

---
**작성일**: `date +%Y-%m-%d`
**작성자**: 프론트엔드 개발팀 