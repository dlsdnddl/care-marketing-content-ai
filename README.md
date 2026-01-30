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
| `/onboarding` | 센터 정보 등록 (챗봇 인터뷰) | ✅ |
| `/dashboard` | 대시보드 (콘텐츠 생성) | ✅ |
| `/create/title` | 블로그 제목 생성 (1 크레딧) | ✅ |
| `/create/blog` | 블로그 글 작성 (5 크레딧) | ✅ |
| `/create/place` | 네이버 플레이스 소식 (3 크레딧) | ✅ |
| `/create/carrot` | 당근마켓 홍보글 (3 크레딧) | ✅ |
| `/create/thread` | 스레드/SNS 글 (3 크레딧) | ✅ |
| `/history` | 콘텐츠 히스토리 | ✅ |
| `/mypage` | 마이페이지 (정보 수정, 크레딧) | ✅ |
| `/pricing` | 요금제 페이지 | ❌ |

## 사용자 흐름

```
회원가입 → 로그인 → 온보딩 (7단계 인터뷰) → 대시보드 → 콘텐츠 생성
                      ↑
          센터 정보 없으면 자동 리다이렉트
```

## 핵심 기능

### 1. AI 콘텐츠 생성 (Gemini API)
- **블로그 제목 생성**: 메인 키워드 기반 15개 제목 생성
- **블로그 글 작성**: 2500자 이상 SEO 최적화 글
- **네이버 플레이스**: 3가지 패턴 (혜택형/공감형/전문성형)
- **당근마켓**: 친근한 지역 홍보글
- **스레드**: 3-5개 타래 형식 SNS 글

### 2. 크레딧 시스템
- 회원가입 시 15 크레딧 지급
- 콘텐츠 유형별 차등 소모
- 크레딧 히스토리 추적
- 크레딧 부족 시 모달 표시

### 3. 온보딩 챗봇
- 7단계 대화형 인터뷰
- 센터 정보 자동 저장
- AI 콘텐츠 맞춤화에 활용

## 데이터 모델 (Supabase)

### centers 테이블
```sql
CREATE TABLE centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  center_name TEXT NOT NULL,
  origin_story TEXT,
  care_philosophy TEXT,
  core_principle TEXT,
  unique_detail TEXT,
  vision TEXT,
  other_strengths TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### credits 테이블
```sql
CREATE TABLE credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### credit_history 테이블
```sql
CREATE TABLE credit_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### contents 테이블
```sql
CREATE TABLE contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## 기술 스택
- **프레임워크**: Hono (Cloudflare Pages)
- **스타일링**: TailwindCSS (CDN)
- **아이콘**: Font Awesome
- **인증/DB**: Supabase (Auth + Database)
- **AI**: Google Gemini API (gemini-2.5-flash)

## 현재 상태

### ✅ 완료된 기능
1. 랜딩페이지 전체 UI
2. 로그인/회원가입 + Supabase 연동
3. 로그아웃 기능
4. 라우팅 보호 (인증 미들웨어)
5. 온보딩 챗봇 인터뷰 (7단계)
6. 센터 정보 Supabase 저장
7. **AI 콘텐츠 생성 (5개 채널)**
8. **크레딧 시스템 (차감/히스토리)**
9. **콘텐츠 히스토리 페이지**
10. **마이페이지 (정보 수정)**
11. **요금제 페이지**
12. 반응형 디자인

### ⏳ 미구현 기능
1. 결제 시스템 (요금제 결제, 단건 충전)
2. 소셜 로그인 (Google, 네이버)

## 개발 명령어

```bash
# 빌드
npm run build

# 개발 서버 시작
pm2 start ecosystem.config.cjs

# 서버 재시작
pm2 restart carecontents-ai

# 로그 확인
pm2 logs carecontents-ai --nostream
```

## 파일 구조

```
webapp/
├── src/
│   ├── index.tsx            # 라우팅 설정
│   ├── renderer.tsx         # HTML 렌더러
│   ├── lib/
│   │   └── supabase.js      # Supabase 설정
│   └── pages/
│       ├── landing.tsx      # 랜딩페이지
│       ├── login.tsx        # 로그인
│       ├── signup.tsx       # 회원가입
│       ├── onboarding.tsx   # 온보딩
│       ├── dashboard.tsx    # 대시보드
│       ├── history.tsx      # 히스토리
│       ├── mypage.tsx       # 마이페이지
│       ├── pricing.tsx      # 요금제
│       └── create/
│           ├── title.tsx    # 블로그 제목 생성
│           ├── blog.tsx     # 블로그 글 작성
│           ├── place.tsx    # 네이버 플레이스
│           ├── carrot.tsx   # 당근마켓
│           └── thread.tsx   # 스레드
├── public/
│   └── static/
│       ├── app.js           # 공통 JS
│       ├── style.css        # 커스텀 CSS
│       ├── supabase-auth.js # Supabase 인증 모듈
│       └── gemini-api.js    # Gemini API 모듈
├── ecosystem.config.cjs     # PM2 설정
├── package.json
└── wrangler.jsonc          # Cloudflare 설정
```

## Supabase 테이블 생성 SQL (전체)

```sql
-- centers 테이블
CREATE TABLE IF NOT EXISTS centers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  center_name TEXT NOT NULL,
  origin_story TEXT,
  care_philosophy TEXT,
  core_principle TEXT,
  unique_detail TEXT,
  vision TEXT,
  other_strengths TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- credits 테이블
CREATE TABLE IF NOT EXISTS credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  balance INTEGER DEFAULT 15,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- credit_history 테이블
CREATE TABLE IF NOT EXISTS credit_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- contents 테이블
CREATE TABLE IF NOT EXISTS contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 정책
ALTER TABLE centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own data" ON centers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own data" ON credits FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own data" ON credit_history FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own data" ON contents FOR ALL USING (auth.uid() = user_id);
```

---
**Last Updated**: 2025-01-30
