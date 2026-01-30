export const PricingPage = () => {
  return (
    <div class="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center h-16">
            <a href="/dashboard" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <i class="fas fa-arrow-left"></i>
              <span>대시보드</span>
            </a>
            <div class="flex-1 text-center">
              <h1 class="text-lg font-bold text-gray-900">요금제</h1>
            </div>
            <div class="w-16"></div>
          </div>
        </div>
      </header>

      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 타이틀 */}
        <div class="text-center mb-12">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">합리적인 요금제를 선택하세요</h1>
          <p class="text-gray-600">방문요양 마케팅에 최적화된 AI 콘텐츠 생성 서비스</p>
          <div class="mt-4">
            <span class="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              <i class="fas fa-coins"></i>
              현재 보유: <span id="currentCredits" class="font-bold">--</span> 크레딧
            </span>
          </div>
        </div>

        {/* 요금제 카드 */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* 스타터 */}
          <div class="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-seedling text-gray-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">스타터</h3>
              <p class="text-gray-500 text-sm mt-1">처음 시작하는 분께</p>
            </div>
            
            <div class="text-center mb-6">
              <span class="text-4xl font-bold text-gray-900">19,900</span>
              <span class="text-gray-500">원/월</span>
            </div>
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>월 <strong>50 크레딧</strong> 제공</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>5개 채널 콘텐츠 생성</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>무제한 콘텐츠 저장</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>이메일 지원</span>
              </li>
            </ul>
            
            <button onclick="selectPlan('starter')" class="w-full py-3 border-2 border-primary-500 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
              선택하기
            </button>
          </div>

          {/* 프로 - BEST */}
          <div class="bg-white rounded-2xl border-2 border-primary-500 p-8 shadow-xl relative">
            <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                BEST
              </span>
            </div>
            
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-star text-primary-500 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">프로</h3>
              <p class="text-gray-500 text-sm mt-1">성장하는 센터에 추천</p>
            </div>
            
            <div class="text-center mb-6">
              <span class="text-4xl font-bold text-primary-600">49,900</span>
              <span class="text-gray-500">원/월</span>
            </div>
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>월 <strong>150 크레딧</strong> 제공</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>5개 채널 콘텐츠 생성</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>무제한 콘텐츠 저장</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>우선 이메일 지원</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>콘텐츠 분석 리포트</span>
              </li>
            </ul>
            
            <button onclick="selectPlan('pro')" class="w-full py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors">
              선택하기
            </button>
          </div>

          {/* 비즈니스 */}
          <div class="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-building text-gray-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">비즈니스</h3>
              <p class="text-gray-500 text-sm mt-1">대량 생성이 필요한 분께</p>
            </div>
            
            <div class="text-center mb-6">
              <span class="text-4xl font-bold text-gray-900">99,900</span>
              <span class="text-gray-500">원/월</span>
            </div>
            
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>월 <strong>400 크레딧</strong> 제공</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>5개 채널 콘텐츠 생성</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>무제한 콘텐츠 저장</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>전담 매니저 지원</span>
              </li>
              <li class="flex items-center gap-3 text-gray-600">
                <i class="fas fa-check text-primary-500"></i>
                <span>API 연동 지원</span>
              </li>
            </ul>
            
            <button onclick="selectPlan('business')" class="w-full py-3 border-2 border-primary-500 text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
              선택하기
            </button>
          </div>
        </div>

        {/* 단건 충전 */}
        <div class="bg-white rounded-2xl border border-gray-200 p-8 max-w-md mx-auto">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-coins text-yellow-500 text-2xl"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900">단건 충전</h3>
            <p class="text-gray-500 text-sm mt-1">필요한 만큼만 충전하세요</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-6 text-center mb-6">
            <div class="flex items-center justify-center gap-4">
              <span class="text-3xl font-bold text-yellow-500">10</span>
              <span class="text-gray-500">크레딧</span>
              <span class="text-gray-400">=</span>
              <span class="text-3xl font-bold text-gray-900">5,900</span>
              <span class="text-gray-500">원</span>
            </div>
          </div>
          
          <button onclick="chargeCredits()" class="w-full py-3 bg-yellow-500 text-white rounded-xl font-semibold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2">
            <i class="fas fa-plus"></i>
            충전하기
          </button>
        </div>

        {/* 크레딧 사용 안내 */}
        <div class="mt-16 bg-gray-100 rounded-2xl p-8">
          <h3 class="text-lg font-bold text-gray-900 mb-6 text-center">크레딧 사용 안내</h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div class="bg-white rounded-xl p-4">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-heading text-blue-600"></i>
              </div>
              <p class="text-sm text-gray-600">블로그 제목</p>
              <p class="font-bold text-gray-900">1 크레딧</p>
            </div>
            <div class="bg-white rounded-xl p-4">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-file-alt text-green-600"></i>
              </div>
              <p class="text-sm text-gray-600">블로그 글</p>
              <p class="font-bold text-gray-900">5 크레딧</p>
            </div>
            <div class="bg-white rounded-xl p-4">
              <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-map-marker-alt text-emerald-600"></i>
              </div>
              <p class="text-sm text-gray-600">네이버 플레이스</p>
              <p class="font-bold text-gray-900">3 크레딧</p>
            </div>
            <div class="bg-white rounded-xl p-4">
              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-carrot text-orange-600"></i>
              </div>
              <p class="text-sm text-gray-600">당근마켓</p>
              <p class="font-bold text-gray-900">3 크레딧</p>
            </div>
            <div class="bg-white rounded-xl p-4">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <i class="fas fa-at text-purple-600"></i>
              </div>
              <p class="text-sm text-gray-600">스레드</p>
              <p class="font-bold text-gray-900">3 크레딧</p>
            </div>
          </div>
        </div>
      </main>

      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          function selectPlan(plan) {
            const planNames = {
              'starter': '스타터 (19,900원/월)',
              'pro': '프로 (49,900원/월)',
              'business': '비즈니스 (99,900원/월)'
            };
            alert('현재 ' + planNames[plan] + ' 요금제 결제 기능은 준비 중입니다.\\n\\n빠른 시일 내에 오픈할 예정입니다!');
          }

          function chargeCredits() {
            alert('현재 단건 충전 기능은 준비 중입니다.\\n\\n빠른 시일 내에 오픈할 예정입니다!');
          }

          document.addEventListener('DOMContentLoaded', async function() {
            try {
              await SupabaseAuth.init();
              const session = await SupabaseAuth.getSession();
              
              if (session) {
                const credits = await SupabaseAuth.getUserCredits(session.user.id);
                document.getElementById('currentCredits').textContent = credits;
              }
            } catch (error) {
              console.error('Page init error:', error);
            }
          });
        `
      }} />
    </div>
  )
}
