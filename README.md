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

## 사용자 흐름

```
회원가입 → 로그인 → 온보딩 (7단계 인터뷰) → 대시보드
                      ↑
          센터 정보 없으면 자동 리다이렉트
```

## 온보딩 기능 (챗봇 인터뷰)

### 진입 조건
- 로그인한 사용자가 `centers` 테이블에 데이터 없으면 → `/onboarding`으로 리다이렉트
- `centers` 테이블에 데이터 있으면 → `/dashboard`로 정상 진입

### 7단계 질문
1. **센터 이름**: 운영 중인 센터의 이름
2. **시작의 계기**: 시니어 케어 분야를 선택한 이유
3. **운영 철학**: 진정한 돌봄에 대한 생각
4. **핵심 원칙**: 절대 타협하지 않는 원칙
5. **차별화 디테일**: 다른 센터와 다른 특별한 디테일
6. **최종 비전**: 10년 후 센터의 모습
7. **기타 강점**: 자랑하고 싶은 강점

### UI 특징
- 챗봇 대화형 인터페이스
- 상단 진행 상태 바 (● ● ○ ○ ○ ○ ○)
- 예시 보기 기능 (2단계부터)
- 이전 답변이 위에 쌓이는 형태

## 데이터 모델

### centers 테이블 (Supabase)
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

## 기술 스택
- **프레임워크**: Hono (Cloudflare Pages)
- **스타일링**: TailwindCSS (CDN)
- **아이콘**: Font Awesome
- **인증/DB**: Supabase (Auth + Database)

## 현재 상태

### ✅ 완료된 기능
1. 랜딩페이지 전체 UI
2. 로그인/회원가입 + Supabase 연동
3. 로그아웃 기능
4. 라우팅 보호 (인증 미들웨어)
5. **온보딩 챗봇 인터뷰 (7단계)**
6. **센터 정보 Supabase 저장**
7. **대시보드 진입 시 온보딩 체크**
8. 반응형 디자인

### ⏳ 미구현 기능
1. 실제 AI 콘텐츠 생성 (기능 카드 클릭 시 alert만 표시)
2. 크레딧 충전 시스템
3. 콘텐츠 저장/불러오기
4. 결제 시스템
5. 소셜 로그인 (Google, 네이버)

## Supabase 테이블 생성 SQL

```sql
-- centers 테이블 생성
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

-- RLS (Row Level Security) 활성화
ALTER TABLE centers ENABLE ROW LEVEL SECURITY;

-- 사용자가 자신의 센터만 조회/수정할 수 있도록
CREATE POLICY "Users can view own center" ON centers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own center" ON centers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own center" ON centers
  FOR UPDATE USING (auth.uid() = user_id);
```

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
│   ├── components/
│   │   ├── Header.tsx       # 공통 헤더
│   │   └── Footer.tsx       # 공통 푸터
│   └── pages/
│       ├── landing.tsx      # 랜딩페이지
│       ├── login.tsx        # 로그인
│       ├── signup.tsx       # 회원가입
│       ├── onboarding.tsx   # 온보딩 (NEW)
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
   - 센터 정보 기반 맞춤 프롬프트
   - 결과 화면 구현

2. **크레딧 시스템 구현**
   - credits 테이블 생성
   - 크레딧 차감/충전 로직

3. **콘텐츠 저장 기능**
   - contents 테이블 생성
   - 생성된 콘텐츠 저장/조회

---
**Last Updated**: 2025-01-30
