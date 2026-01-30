# 케어콘텐츠AI - 방문요양 마케팅 AI 도우미

## 프로젝트 개요
- **이름**: 케어콘텐츠AI
- **목표**: 방문요양센터의 마케팅 콘텐츠를 AI가 대신 작성해주는 SaaS 서비스
- **주요 기능**: 블로그 제목/글, 네이버 플레이스, 당근마켓, 스레드/SNS 글 생성

## 백업 파일
- **다운로드 URL**: https://www.genspark.ai/api/files/s/fSFktla5
- **복원 방법**: 
  ```bash
  # 다운로드 후 압축 해제
  tar -xzf carecontents-ai-backup-2025-01-30.tar.gz -C /home/user/
  cd /home/user/webapp
  npm install
  npm run build
  pm2 start ecosystem.config.cjs
  ```

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
회원가입 → 로그인 → 대시보드 → 콘텐츠 생성
                      ↓
          (선택) AI 인터뷰로 센터 정보 등록 → 맞춤형 콘텐츠 생성
```

## 핵심 기능

### 1. AI 콘텐츠 생성 (Gemini API)
- **블로그 제목 생성**: 메인 키워드 기반 15개 제목 생성
- **블로그 글 작성**: 2500자 이상 SEO 최적화 글
- **네이버 플레이스**: 3가지 패턴 (혜택형/공감형/전문성형)
- **당근마켓**: 친근한 지역 홍보글
- **스레드**: 3-5개 타래 형식 SNS 글

### 2. Gemini API 안정성 기능 (최신 업데이트)
- **자동 재시도**: 각 모델당 최대 3회 재시도
- **지수 백오프**: 1초 → 2초 → 4초 대기 후 재시도
- **모델 Fallback**: gemini-2.0-flash → gemini-1.5-flash → gemini-1.5-flash-8b
- **429 Rate Limit 자동 처리**

### 3. 크레딧 시스템
- 회원가입 시 15 크레딧 지급
- 콘텐츠 유형별 차등 소모
- **생성 성공 후에만 크레딧 차감** (실패 시 차감 안 됨)
- 크레딧 히스토리 추적
- 크레딧 부족 시 모달 표시

### 4. 온보딩 AI 인터뷰 (선택적)
- 7단계 대화형 인터뷰
- 센터 정보 자동 저장
- **가입 후 강제 이동 없음** - 대시보드에서 선택 가능
- AI 콘텐츠 맞춤화에 활용

### 5. 채널 변환 기능
- 블로그 글 작성 후 → 네이버 플레이스/당근마켓/스레드로 변환
- sessionStorage를 사용한 안정적인 콘텐츠 전달

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
- **AI**: Google Gemini API (gemini-2.0-flash + fallback 모델)

## 환경 설정

### Supabase 설정
- **URL**: `https://ohqujuoruhnfdlxssgrc.supabase.co`
- **Anon Key**: `public/static/supabase-auth.js`에 설정됨

### Gemini API 설정
- **API Key**: `public/static/gemini-api.js`에 설정됨
- **모델**: gemini-2.0-flash (기본) → gemini-1.5-flash → gemini-1.5-flash-8b (fallback)

## 현재 상태

### ✅ 완료된 기능
1. 랜딩페이지 전체 UI
2. 로그인/회원가입 + Supabase 연동
3. 로그아웃 기능
4. 라우팅 보호 (인증 체크)
5. 온보딩 챗봇 인터뷰 (7단계) - **선택적**
6. 센터 정보 Supabase 저장
7. **AI 콘텐츠 생성 (5개 채널)**
8. **크레딧 시스템 (차감/히스토리)**
9. **콘텐츠 히스토리 페이지**
10. **마이페이지 (정보 수정)**
11. **요금제 페이지**
12. 반응형 디자인
13. **API 오류 자동 재시도/fallback**
14. **채널 변환 기능**

### ⏳ 미구현 기능
1. 결제 시스템 (요금제 결제, 단건 충전)
2. 소셜 로그인 (Google, 네이버)
3. Cloudflare 배포

## 개발 명령어

```bash
# 의존성 설치
npm install

# 빌드
npm run build

# 개발 서버 시작 (PM2)
pm2 start ecosystem.config.cjs

# 서버 재시작
pm2 restart carecontents-ai

# 로그 확인
pm2 logs carecontents-ai --nostream

# 전체 재시작 (포트 정리 포함)
fuser -k 3000/tcp 2>/dev/null || true && pm2 delete all 2>/dev/null || true && npm run build && pm2 start ecosystem.config.cjs
```

## 파일 구조

```
webapp/
├── src/
│   ├── index.tsx            # 라우팅 설정
│   ├── renderer.tsx         # HTML 렌더러
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
│       ├── supabase-auth.js # Supabase 인증/DB 모듈
│       └── gemini-api.js    # Gemini API 모듈 (재시도/fallback 포함)
├── ecosystem.config.cjs     # PM2 설정
├── package.json
├── vite.config.ts
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

CREATE POLICY "Users can manage own centers" ON centers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own credits" ON credits FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own credit_history" ON credit_history FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own contents" ON contents FOR ALL USING (auth.uid() = user_id);
```

## 최근 Git 커밋 내역

```
6841a40 fix: API 오류 해결 및 온보딩 선택적으로 변경
5c4f182 fix: 콘텐츠 생성 및 UI 개선
4b37926 fix: 크레딧 차감 로직 수정 - 콘텐츠 생성 성공 후에만 차감
4d1dfc0 Update README with complete feature documentation
50cb03e Implement all core features: content generation, history, mypage, pricing
```

---
**Last Updated**: 2025-01-30
