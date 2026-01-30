import { Header } from '../components/Header'

export const LoginPage = () => {
  return (
    <div class="min-h-screen bg-gray-50">
      <Header showLogin={false} />
      
      <main class="py-12 px-4">
        <div class="max-w-md mx-auto">
          {/* 로고 & 타이틀 */}
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-pen-fancy text-white text-2xl"></i>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">로그인</h1>
            <p class="text-gray-600 mt-2">케어콘텐츠AI에 오신 것을 환영합니다</p>
          </div>

          {/* 로그인 폼 */}
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* 에러/성공 메시지 */}
            <div id="alertMessage" class="hidden mb-4 p-4 rounded-lg text-sm"></div>
            
            <form id="loginForm" class="space-y-5">
              {/* 이메일 */}
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              {/* 비밀번호 */}
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="••••••••"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              {/* 로그인 유지 & 비밀번호 찾기 */}
              <div class="flex items-center justify-between">
                <label class="flex items-center">
                  <input type="checkbox" id="rememberMe" class="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500" />
                  <span class="ml-2 text-sm text-gray-600">로그인 유지</span>
                </label>
                <a href="#" onclick="alert('비밀번호 찾기 기능은 준비 중입니다'); return false;" class="text-sm text-primary-600 hover:text-primary-700">
                  비밀번호 찾기
                </a>
              </div>

              {/* 로그인 버튼 */}
              <button
                type="submit"
                id="submitBtn"
                class="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span id="submitText">로그인</span>
                <span id="submitLoading" class="hidden">
                  <i class="fas fa-spinner fa-spin mr-2"></i>로그인 중...
                </span>
              </button>
            </form>

            {/* 구분선 */}
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-gray-500">또는</span>
              </div>
            </div>

            {/* 소셜 로그인 */}
            <div class="space-y-3">
              <button
                type="button"
                onclick="alert('소셜 로그인은 준비 중입니다')"
                class="w-full flex items-center justify-center gap-3 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google로 계속하기
              </button>
              <button
                type="button"
                onclick="alert('소셜 로그인은 준비 중입니다')"
                class="w-full flex items-center justify-center gap-3 py-3 bg-[#03C75A] text-white rounded-lg font-medium hover:bg-[#02b350] transition-colors"
              >
                <span class="font-bold text-lg">N</span>
                네이버로 계속하기
              </button>
            </div>
          </div>

          {/* 회원가입 링크 */}
          <p class="text-center mt-6 text-gray-600">
            아직 계정이 없으신가요?{' '}
            <a href="/signup" class="text-primary-600 font-semibold hover:text-primary-700">
              회원가입
            </a>
          </p>
        </div>
      </main>

      {/* 로그인 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // 페이지 로드 시 이미 로그인되어 있으면 대시보드로 리다이렉트
          document.addEventListener('DOMContentLoaded', async function() {
            await SupabaseAuth.init();
            await SupabaseAuth.redirectIfLoggedIn('/dashboard');
          });

          // 알림 메시지 표시
          function showAlert(message, type = 'error') {
            const alertEl = document.getElementById('alertMessage');
            alertEl.textContent = message;
            alertEl.className = 'mb-4 p-4 rounded-lg text-sm ' + 
              (type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700');
            alertEl.classList.remove('hidden');
          }

          // 버튼 로딩 상태
          function setLoading(loading) {
            const btn = document.getElementById('submitBtn');
            const text = document.getElementById('submitText');
            const loadingEl = document.getElementById('submitLoading');
            
            btn.disabled = loading;
            text.classList.toggle('hidden', loading);
            loadingEl.classList.toggle('hidden', !loading);
          }

          // 로그인 폼 제출
          document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            
            if (!email || !password) {
              showAlert('이메일과 비밀번호를 입력해주세요.');
              return;
            }

            setLoading(true);
            
            try {
              const data = await SupabaseAuth.signIn(email, password);
              
              if (data.user) {
                showAlert('로그인 성공! 대시보드로 이동합니다.', 'success');
                setTimeout(() => {
                  window.location.href = '/dashboard';
                }, 1000);
              }
            } catch (error) {
              console.error('Login error:', error);
              
              // 에러 메시지 한글화
              let errorMessage = error.message;
              if (error.message.includes('Invalid login credentials')) {
                errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
              } else if (error.message.includes('Email not confirmed')) {
                errorMessage = '이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.';
              } else if (error.message.includes('Too many requests')) {
                errorMessage = '너무 많은 요청이 있었습니다. 잠시 후 다시 시도해주세요.';
              }
              
              showAlert(errorMessage);
            } finally {
              setLoading(false);
            }
          });
        `
      }} />
    </div>
  )
}
