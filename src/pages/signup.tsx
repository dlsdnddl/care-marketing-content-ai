import { Header } from '../components/Header'

export const SignupPage = () => {
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
            <h1 class="text-2xl font-bold text-gray-900">회원가입</h1>
            <p class="text-gray-600 mt-2">무료로 시작하고 5회 이용권을 받으세요</p>
          </div>

          {/* 회원가입 폼 */}
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <form id="signupForm" class="space-y-5">
              {/* 센터명 */}
              <div>
                <label for="centerName" class="block text-sm font-medium text-gray-700 mb-2">
                  센터명 <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="centerName"
                  name="centerName"
                  required
                  placeholder="예: 행복한 방문요양센터"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              {/* 원장님 성함 */}
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  원장님 성함 <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="홍길동"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              {/* 이메일 */}
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  이메일 <span class="text-red-500">*</span>
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
                  비밀번호 <span class="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  minlength="8"
                  placeholder="8자 이상 입력하세요"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label for="passwordConfirm" class="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 확인 <span class="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  required
                  placeholder="비밀번호를 다시 입력하세요"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>

              {/* 약관 동의 */}
              <div class="space-y-3 pt-2">
                <label class="flex items-start">
                  <input type="checkbox" id="agreeAll" class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500" />
                  <span class="ml-2 text-sm font-medium text-gray-900">전체 동의</span>
                </label>
                <div class="border-t border-gray-100 pt-3 ml-6 space-y-2">
                  <label class="flex items-start">
                    <input type="checkbox" id="agreeTerms" required class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500" />
                    <span class="ml-2 text-sm text-gray-600">
                      <span class="text-red-500">[필수]</span> 이용약관 동의
                    </span>
                  </label>
                  <label class="flex items-start">
                    <input type="checkbox" id="agreePrivacy" required class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500" />
                    <span class="ml-2 text-sm text-gray-600">
                      <span class="text-red-500">[필수]</span> 개인정보 처리방침 동의
                    </span>
                  </label>
                  <label class="flex items-start">
                    <input type="checkbox" id="agreeMarketing" class="w-4 h-4 mt-1 text-primary-500 border-gray-300 rounded focus:ring-primary-500" />
                    <span class="ml-2 text-sm text-gray-600">
                      <span class="text-gray-400">[선택]</span> 마케팅 정보 수신 동의
                    </span>
                  </label>
                </div>
              </div>

              {/* 가입 버튼 */}
              <button
                type="submit"
                class="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mt-4"
              >
                무료로 시작하기
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

            {/* 소셜 가입 */}
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
                Google로 가입하기
              </button>
              <button
                type="button"
                onclick="alert('소셜 로그인은 준비 중입니다')"
                class="w-full flex items-center justify-center gap-3 py-3 bg-[#03C75A] text-white rounded-lg font-medium hover:bg-[#02b350] transition-colors"
              >
                <span class="font-bold text-lg">N</span>
                네이버로 가입하기
              </button>
            </div>
          </div>

          {/* 로그인 링크 */}
          <p class="text-center mt-6 text-gray-600">
            이미 계정이 있으신가요?{' '}
            <a href="/login" class="text-primary-600 font-semibold hover:text-primary-700">
              로그인
            </a>
          </p>
        </div>
      </main>

      {/* 회원가입 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // 전체 동의 체크박스
          document.getElementById('agreeAll').addEventListener('change', function() {
            const checkboxes = ['agreeTerms', 'agreePrivacy', 'agreeMarketing'];
            checkboxes.forEach(id => {
              document.getElementById(id).checked = this.checked;
            });
          });

          // 개별 체크박스 상태 확인
          ['agreeTerms', 'agreePrivacy', 'agreeMarketing'].forEach(id => {
            document.getElementById(id).addEventListener('change', function() {
              const allChecked = ['agreeTerms', 'agreePrivacy', 'agreeMarketing'].every(
                id => document.getElementById(id).checked
              );
              document.getElementById('agreeAll').checked = allChecked;
            });
          });

          // 회원가입 폼 제출
          document.getElementById('signupForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const passwordConfirm = document.getElementById('passwordConfirm').value;
            
            if (password !== passwordConfirm) {
              alert('비밀번호가 일치하지 않습니다.');
              return;
            }

            const centerName = document.getElementById('centerName').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // 목업 회원가입 - 나중에 Supabase 연결
            localStorage.setItem('user', JSON.stringify({
              email: email,
              name: name,
              centerName: centerName,
              credits: 15
            }));
            
            alert('회원가입이 완료되었습니다! 5회 무료 이용권이 지급되었습니다.');
            window.location.href = '/dashboard';
          });
        `
      }} />
    </div>
  )
}
