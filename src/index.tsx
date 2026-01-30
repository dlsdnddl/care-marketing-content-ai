import { Hono } from 'hono'
import { renderer } from './renderer'
import { LandingPage } from './pages/landing'
import { LoginPage } from './pages/login'
import { SignupPage } from './pages/signup'
import { DashboardPage } from './pages/dashboard'

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

// 대시보드 페이지
app.get('/dashboard', (c) => {
  return c.render(<DashboardPage />)
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
