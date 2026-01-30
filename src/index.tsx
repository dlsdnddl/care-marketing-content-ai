import { Hono } from 'hono'
import { renderer } from './renderer'
import { LandingPage } from './pages/landing'
import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import { DashboardPage } from './pages/dashboard'
import { OnboardingPage } from './pages/onboarding'
import { CreateTitlePage } from './pages/create/title'
import { CreateBlogPage } from './pages/create/blog'
import { CreatePlacePage } from './pages/create/place'
import { CreateCarrotPage } from './pages/create/carrot'
import { CreateThreadPage } from './pages/create/thread'
import { HistoryPage } from './pages/history'
import { MyPage } from './pages/mypage'
import { PricingPage } from './pages/pricing'

const app = new Hono()

app.use(renderer)

// 랜딩 페이지
app.get('/', (c) => {
  return c.render(<LandingPage />)
})

// 로그인 페이지
app.get('/login', (c) => {
  return c.render(<LoginPage />)
})

// 회원가입 페이지
app.get('/signup', (c) => {
  return c.render(<SignupPage />)
})

// 온보딩 페이지 (센터 정보 등록)
app.get('/onboarding', (c) => {
  return c.render(<OnboardingPage />)
})

// 대시보드 페이지
app.get('/dashboard', (c) => {
  return c.render(<DashboardPage />)
})

// 콘텐츠 생성 페이지들
app.get('/create/title', (c) => {
  return c.render(<CreateTitlePage />)
})

app.get('/create/blog', (c) => {
  return c.render(<CreateBlogPage />)
})

app.get('/create/place', (c) => {
  return c.render(<CreatePlacePage />)
})

app.get('/create/carrot', (c) => {
  return c.render(<CreateCarrotPage />)
})

app.get('/create/thread', (c) => {
  return c.render(<CreateThreadPage />)
})

// 히스토리 페이지
app.get('/history', (c) => {
  return c.render(<HistoryPage />)
})

// 마이페이지
app.get('/mypage', (c) => {
  return c.render(<MyPage />)
})

// 요금제 페이지
app.get('/pricing', (c) => {
  return c.render(<PricingPage />)
})

// API 엔드포인트 (목업)
app.post('/api/login', async (c) => {
  const body = await c.req.json()
  // 목업 인증 - 나중에 Supabase 연결
  return c.json({ 
    success: true, 
    user: { 
      name: body.email?.split('@')[0] || '사용자',
      centerName: '행복한 방문요양센터'
    },
    token: 'mock-token-12345'
  })
})

app.post('/api/signup', async (c) => {
  const body = await c.req.json()
  return c.json({ 
    success: true, 
    message: '회원가입이 완료되었습니다.'
  })
})

export default app
