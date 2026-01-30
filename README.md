# 케어콘텐츠AI - 방문요양 마케팅 AI 도우미

## 프로젝트 개요
- **이름**: 케어콘텐츠AI
- **목표**: 방문요양센터의 마케팅 콘텐츠를 AI가 대신 작성해주는 SaaS 서비스
- **주요 기능**: 블로그 제목/글, 네이버 플레이스, 당근마켓, 스레드/SNS 글 생성

## 미리보기 URL
- **개발 서버**: https://3000-ixlwp0galtqgfx5gnhuku-cc2fbc16.sandbox.novita.ai

## 페이지 구성

| 경로 | 설명 | 인증 필요 |
|------|------|-----------|
| `/` | 랜딩페이지 (서비스 소개, 요금제) | ❌ |
| `/login` | 로그인 페이지 | ❌ |
| `/signup` | 회원가입 페이지 | ❌ |
| `/dashboard` | 대시보드 (콘텐츠 생성) | ✅ |

## 인증 기능 (Supabase)

### 회원가입 (`/signup`)
- 이메일, 비밀번호, 센터명, 원장님 성함 입력
- Supabase Auth로 회원가입
- user_metadata에 name, center_name, credits(15) 저장
- 회원가입 완료 시 대시보드로 이동

### 로그인 (`/login`)
- 이메일, 비밀번호 입력
- Supabase Auth 인증
- 로그인 성공 시 대시보드로 리다이렉트
- 이미 로그인된 상태에서 접근 시 대시보드로 리다이렉트

### 로그아웃
- 대시보드 헤더의 사용자 드롭다운에서 로그아웃
- 세션 종료 후 랜딩페이지로 이동

### 라우팅 보호
- `/dashboard`는 로그인한 사용자만 접근 가능
- 비로그인 상태로 대시보드 접근 시 `/login`으로 리다이렉트
- 인증 상태 변경 감지 및 자동 리다이렉트

## 기술 스택
- **프레임워크**: Hono (Cloudflare Pages)
- **스타일링**: TailwindCSS (CDN)
- **아이콘**: Font Awesome
- **인증**: Supabase Auth

## 디자인
- **메인 컬러**: #4A90A4 (따뜻한 블루-그린)
- **스타일**: 깔끔하고 신뢰감 있는 톤
- **반응형**: 모바일/태블릿/데스크톱 지원

## 현재 상태

### ✅ 완료된 기능
1. 랜딩페이지 전체 UI
2. 로그인 페이지 UI + Supabase 연동
3. 회원가입 페이지 UI + Supabase 연동
4. 대시보드 페이지 UI
5. Supabase 인증 (회원가입, 로그인, 로그아웃)
6. 라우팅 보호 (인증 미들웨어)
7. 사용자 정보 표시 (이름, 센터명, 크레딧)
8. 반응형 디자인

### ⏳ 미구현 기능
1. 실제 AI 콘텐츠 생성 (기능 카드 클릭 시 alert만 표시)
2. 크레딧 충전 시스템
3. 콘텐츠 저장/불러오기 (DB 연동)
4. 결제 시스템
5. 소셜 로그인 (Google, 네이버)

## 개발 명령어

```bash
# 개발 서버 시작
npm run build && pm2 start ecosystem.config.cjs

# 빌드
npm run build

# 서버 재시작
pm2 restart carecontents-ai

# 로그 확인
pm2 logs carecontents-ai --nostream
```

## Supabase 설정 정보

```javascript
SUPABASE_URL: 'https://ohqujuoruhnfdlxssgrc.supabase.co'
SUPABASE_ANON_KEY: 'sb_publishable_...'
```

## 파일 구조

```
webapp/
├── src/
│   ├── index.tsx            # 라우팅 설정
│   ├── renderer.tsx         # HTML 렌더러
│   ├── lib/
│   │   └── supabase.js      # Supabase 설정
│   ├── components/
│   │   ├── Header.tsx       # 공통 헤더
│   │   └── Footer.tsx       # 공통 푸터
│   └── pages/
│       ├── landing.tsx      # 랜딩페이지
│       ├── login.tsx        # 로그인
│       ├── signup.tsx       # 회원가입
│       └── dashboard.tsx    # 대시보드
├── public/
│   └── static/
│       ├── app.js           # 공통 JS
│       ├── style.css        # 커스텀 CSS
│       └── supabase-auth.js # Supabase 인증 모듈
├── ecosystem.config.cjs     # PM2 설정
├── package.json
└── wrangler.jsonc          # Cloudflare 설정
```

## 다음 개발 단계 권장

1. **AI 콘텐츠 생성 기능 구현**
   - OpenAI API 연동
   - 각 기능별 프롬프트 설계
   - 결과 화면 구현

2. **데이터베이스 연동**
   - Supabase에 contents 테이블 생성
   - 생성된 콘텐츠 저장/조회

3. **크레딧 시스템 구현**
   - credits 테이블 생성
   - 크레딧 차감/충전 로직

4. **결제 시스템**
   - 토스페이먼츠/카카오페이 연동
   - 구독 관리

---
**Last Updated**: 2025-01-30
