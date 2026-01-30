export const DashboardPage = () => {
  return (
    <div class="min-h-screen bg-gray-50">
      {/* 대시보드 헤더 */}
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            {/* 로고 */}
            <a href="/" class="flex items-center gap-2">
              <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <i class="fas fa-pen-fancy text-white text-lg"></i>
              </div>
              <span class="text-xl font-bold text-gray-900">케어콘텐츠<span class="text-primary-500">AI</span></span>
            </a>
            
            {/* 우측 메뉴 */}
            <div class="flex items-center gap-4">
              {/* 크레딧 표시 */}
              <div class="flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-full">
                <i class="fas fa-coins text-primary-500"></i>
                <span class="font-semibold text-primary-700" id="headerCredits">--</span>
                <span class="text-primary-600 text-sm">크레딧</span>
              </div>
              
              {/* 사용자 드롭다운 */}
              <div class="relative" id="userDropdown">
                <button 
                  type="button"
                  onclick="toggleDropdown()"
                  class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <i class="fas fa-user-circle text-2xl"></i>
                  <span class="hidden sm:inline font-medium" id="headerUserName">사용자</span>
                  <i class="fas fa-chevron-down text-xs"></i>
                </button>
                
                {/* 드롭다운 메뉴 */}
                <div id="dropdownMenu" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <a href="#" onclick="alert('마이페이지는 준비 중입니다'); return false;" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-user mr-2"></i>마이페이지
                  </a>
                  <a href="#" onclick="alert('설정은 준비 중입니다'); return false;" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <i class="fas fa-cog mr-2"></i>설정
                  </a>
                  <hr class="my-1 border-gray-100" />
                  <button onclick="handleLogout()" class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    <i class="fas fa-sign-out-alt mr-2"></i>로그아웃
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* 로딩 오버레이 */}
      <div id="loadingOverlay" class="fixed inset-0 bg-white/80 flex items-center justify-center z-40">
        <div class="text-center">
          <i class="fas fa-spinner fa-spin text-4xl text-primary-500 mb-4"></i>
          <p class="text-gray-600">로딩 중...</p>
        </div>
      </div>
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 인사말 */}
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900" id="greeting">
            안녕하세요, <span id="centerName">센터</span> 원장님!
          </h1>
          <p class="text-gray-600 mt-1" id="greetingSubtext">오늘도 효과적인 마케팅 콘텐츠를 만들어보세요.</p>
        </div>

        {/* 센터 등록 알림 (센터명이 없는 경우) */}
        <div id="centerAlert" class="hidden bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
          <div class="flex items-start gap-3">
            <i class="fas fa-exclamation-circle text-yellow-500 mt-0.5"></i>
            <div>
              <h3 class="font-semibold text-yellow-800">센터 정보를 등록해주세요</h3>
              <p class="text-yellow-700 text-sm mt-1">마이페이지에서 센터 정보를 등록하면 더 맞춤화된 콘텐츠를 생성할 수 있습니다.</p>
              <button onclick="alert('마이페이지는 준비 중입니다')" class="mt-2 text-yellow-800 font-medium text-sm hover:underline">
                센터 정보 등록하기 →
              </button>
            </div>
          </div>
        </div>

        {/* 크레딧 현황 */}
        <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-8 text-white">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p class="text-primary-100 text-sm mb-1">보유 크레딧</p>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold" id="creditBalance">--</span>
                <span class="text-primary-200">크레딧</span>
              </div>
            </div>
            <a href="#" onclick="alert('충전 기능은 준비 중입니다'); return false;" class="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              <i class="fas fa-plus"></i>
              크레딧 충전하기
            </a>
          </div>
        </div>

        {/* 기능 카드 그리드 */}
        <section class="mb-12">
          <h2 class="text-xl font-bold text-gray-900 mb-6">콘텐츠 생성하기</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 블로그 제목 */}
            <button onclick="alert('블로그 제목 생성 기능은 준비 중입니다')" class="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-300 hover:shadow-lg transition-all text-left group">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-heading text-blue-600 text-2xl"></i>
                </div>
                <div class="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <i class="fas fa-coins text-yellow-500"></i>
                  <span>1</span>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">블로그 제목 생성</h3>
              <p class="text-gray-600 text-sm">클릭을 부르는 매력적인 블로그 제목 10개를 생성합니다</p>
            </button>

            {/* 블로그 글 */}
            <button onclick="alert('블로그 글 작성 기능은 준비 중입니다')" class="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-300 hover:shadow-lg transition-all text-left group">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-file-alt text-green-600 text-2xl"></i>
                </div>
                <div class="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <i class="fas fa-coins text-yellow-500"></i>
                  <span>5</span>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">블로그 글 작성</h3>
              <p class="text-gray-600 text-sm">전문적이고 신뢰감 있는 블로그 포스팅을 작성합니다</p>
            </button>

            {/* 네이버 플레이스 */}
            <button onclick="alert('네이버 플레이스 소개글 기능은 준비 중입니다')" class="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-300 hover:shadow-lg transition-all text-left group">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-map-marker-alt text-emerald-600 text-2xl"></i>
                </div>
                <div class="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <i class="fas fa-coins text-yellow-500"></i>
                  <span>3</span>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">네이버 플레이스</h3>
              <p class="text-gray-600 text-sm">네이버 플레이스에 최적화된 센터 소개글을 생성합니다</p>
            </button>

            {/* 당근마켓 */}
            <button onclick="alert('당근마켓 홍보글 기능은 준비 중입니다')" class="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-300 hover:shadow-lg transition-all text-left group">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-carrot text-orange-600 text-2xl"></i>
                </div>
                <div class="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <i class="fas fa-coins text-yellow-500"></i>
                  <span>3</span>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">당근마켓 홍보글</h3>
              <p class="text-gray-600 text-sm">지역 주민에게 친근하게 다가가는 홍보글을 작성합니다</p>
            </button>

            {/* 스레드/SNS */}
            <button onclick="alert('스레드/SNS 글 기능은 준비 중입니다')" class="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-300 hover:shadow-lg transition-all text-left group">
              <div class="flex items-start justify-between mb-4">
                <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <i class="fas fa-at text-purple-600 text-2xl"></i>
                </div>
                <div class="flex items-center gap-1 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  <i class="fas fa-coins text-yellow-500"></i>
                  <span>3</span>
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2">스레드/SNS 글</h3>
              <p class="text-gray-600 text-sm">스레드, 인스타그램용 짧고 임팩트 있는 글을 생성합니다</p>
            </button>

            {/* 요금제 업그레이드 */}
            <a href="/#pricing" class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200 hover:border-primary-400 transition-all text-left group flex flex-col justify-center">
              <div class="text-center">
                <div class="w-14 h-14 bg-primary-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <i class="fas fa-crown text-white text-2xl"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">요금제 업그레이드</h3>
                <p class="text-gray-600 text-sm">더 많은 크레딧으로 더 많은 콘텐츠를 생성하세요</p>
              </div>
            </a>
          </div>
        </section>

        {/* 최근 생성 콘텐츠 */}
        <section>
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">최근 생성 콘텐츠</h2>
            <a href="#" onclick="alert('전체보기는 준비 중입니다'); return false;" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
              전체보기 <i class="fas fa-arrow-right ml-1"></i>
            </a>
          </div>
          
          <div class="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">유형</th>
                    <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">제목</th>
                    <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">생성일</th>
                    <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">액션</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100" id="contentTableBody">
                  {/* 목업 데이터 1 */}
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <i class="fas fa-file-alt text-xs"></i>
                        블로그 글
                      </span>
                    </td>
                    <td class="px-6 py-4 text-gray-900">방문요양 서비스, 어르신의 일상을 지키는 따뜻한 손길</td>
                    <td class="px-6 py-4 text-gray-500 text-sm">2025.01.28</td>
                    <td class="px-6 py-4">
                      <button onclick="alert('복사되었습니다!')" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        <i class="fas fa-copy mr-1"></i> 복사
                      </button>
                    </td>
                  </tr>
                  
                  {/* 목업 데이터 2 */}
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        <i class="fas fa-heading text-xs"></i>
                        블로그 제목
                      </span>
                    </td>
                    <td class="px-6 py-4 text-gray-900">어르신 건강관리 블로그 제목 10가지</td>
                    <td class="px-6 py-4 text-gray-500 text-sm">2025.01.27</td>
                    <td class="px-6 py-4">
                      <button onclick="alert('복사되었습니다!')" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        <i class="fas fa-copy mr-1"></i> 복사
                      </button>
                    </td>
                  </tr>

                  {/* 목업 데이터 3 */}
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        <i class="fas fa-carrot text-xs"></i>
                        당근마켓
                      </span>
                    </td>
                    <td class="px-6 py-4 text-gray-900">[강남구] 어르신 돌봄이 필요하신가요? 행복한 방문요양센터입니다</td>
                    <td class="px-6 py-4 text-gray-500 text-sm">2025.01.26</td>
                    <td class="px-6 py-4">
                      <button onclick="alert('복사되었습니다!')" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        <i class="fas fa-copy mr-1"></i> 복사
                      </button>
                    </td>
                  </tr>

                  {/* 목업 데이터 4 */}
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        <i class="fas fa-map-marker-alt text-xs"></i>
                        네이버 플레이스
                      </span>
                    </td>
                    <td class="px-6 py-4 text-gray-900">행복한 방문요양센터 - 네이버 플레이스 소개글</td>
                    <td class="px-6 py-4 text-gray-500 text-sm">2025.01.25</td>
                    <td class="px-6 py-4">
                      <button onclick="alert('복사되었습니다!')" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        <i class="fas fa-copy mr-1"></i> 복사
                      </button>
                    </td>
                  </tr>

                  {/* 목업 데이터 5 */}
                  <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4">
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        <i class="fas fa-at text-xs"></i>
                        스레드
                      </span>
                    </td>
                    <td class="px-6 py-4 text-gray-900">어르신의 미소가 우리의 보람입니다 #방문요양 #노인돌봄</td>
                    <td class="px-6 py-4 text-gray-500 text-sm">2025.01.24</td>
                    <td class="px-6 py-4">
                      <button onclick="alert('복사되었습니다!')" class="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        <i class="fas fa-copy mr-1"></i> 복사
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* 대시보드 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          let currentUser = null;
          
          // 드롭다운 토글
          function toggleDropdown() {
            const menu = document.getElementById('dropdownMenu');
            menu.classList.toggle('hidden');
          }

          // 외부 클릭 시 드롭다운 닫기
          document.addEventListener('click', function(e) {
            const dropdown = document.getElementById('userDropdown');
            const menu = document.getElementById('dropdownMenu');
            if (dropdown && !dropdown.contains(e.target)) {
              menu.classList.add('hidden');
            }
          });

          // 로그아웃 처리
          async function handleLogout() {
            try {
              await SupabaseAuth.signOut();
              window.location.href = '/';
            } catch (error) {
              console.error('Logout error:', error);
              alert('로그아웃 중 오류가 발생했습니다.');
            }
          }

          // 사용자 정보 업데이트
          function updateUserInfo(user) {
            const userInfo = SupabaseAuth.formatUserInfo(user);
            if (!userInfo) return;
            
            currentUser = userInfo;
            
            // 이름 업데이트
            const nameEl = document.getElementById('headerUserName');
            if (nameEl) nameEl.textContent = userInfo.name;
            
            // 센터명 업데이트
            const centerEl = document.getElementById('centerName');
            const greetingSubtext = document.getElementById('greetingSubtext');
            const centerAlert = document.getElementById('centerAlert');
            
            if (userInfo.centerName) {
              if (centerEl) centerEl.textContent = userInfo.centerName;
              if (centerAlert) centerAlert.classList.add('hidden');
            } else {
              if (centerEl) centerEl.textContent = userInfo.name + '님의';
              if (greetingSubtext) greetingSubtext.textContent = '센터 정보를 등록하면 더 맞춤화된 콘텐츠를 생성할 수 있습니다.';
              if (centerAlert) centerAlert.classList.remove('hidden');
            }
            
            // 크레딧 업데이트
            const creditEl = document.getElementById('creditBalance');
            const headerCreditEl = document.getElementById('headerCredits');
            if (creditEl) creditEl.textContent = userInfo.credits;
            if (headerCreditEl) headerCreditEl.textContent = userInfo.credits;
          }

          // 페이지 로드 시 실행
          document.addEventListener('DOMContentLoaded', async function() {
            try {
              await SupabaseAuth.init();
              
              // 인증 확인
              const isAuthenticated = await SupabaseAuth.requireAuth('/login');
              if (!isAuthenticated) return;
              
              // 사용자 정보 로드
              const user = await SupabaseAuth.getCurrentUser();
              if (user) {
                updateUserInfo(user);
              }
              
              // 로딩 오버레이 숨기기
              const loadingOverlay = document.getElementById('loadingOverlay');
              if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                  loadingOverlay.style.display = 'none';
                }, 300);
              }
              
            } catch (error) {
              console.error('Dashboard init error:', error);
              window.location.href = '/login';
            }
          });
          
          // 인증 상태 변경 감지
          SupabaseAuth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
              window.location.href = '/login';
            } else if (event === 'SIGNED_IN' && session?.user) {
              updateUserInfo(session.user);
            }
          });
        `
      }} />
    </div>
  )
}
