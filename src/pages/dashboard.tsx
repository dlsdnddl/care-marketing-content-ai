import { Header } from '../components/Header'

export const DashboardPage = () => {
  return (
    <div class="min-h-screen bg-gray-50">
      <Header isLoggedIn={true} />
      
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 인사말 */}
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900" id="greeting">
            안녕하세요, <span id="centerName">센터</span> 원장님!
          </h1>
          <p class="text-gray-600 mt-1">오늘도 효과적인 마케팅 콘텐츠를 만들어보세요.</p>
        </div>

        {/* 크레딧 현황 */}
        <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 mb-8 text-white">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p class="text-primary-100 text-sm mb-1">보유 크레딧</p>
              <div class="flex items-baseline gap-2">
                <span class="text-4xl font-bold" id="creditBalance">15</span>
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
                <tbody class="divide-y divide-gray-100">
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
          // 로그인 체크 및 사용자 정보 로드
          document.addEventListener('DOMContentLoaded', function() {
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            
            if (!user) {
              window.location.href = '/login';
              return;
            }
            
            document.getElementById('centerName').textContent = user.centerName || '센터';
            document.getElementById('creditBalance').textContent = user.credits || 15;
          });
        `
      }} />
    </div>
  )
}
