export const CreateTitlePage = () => {
  return (
    <div class="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center h-16">
            <a href="/dashboard" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <i class="fas fa-arrow-left"></i>
              <span>뒤로</span>
            </a>
            <div class="flex-1 text-center">
              <h1 class="text-lg font-bold text-gray-900">
                블로그 제목 생성 <span class="text-primary-500 text-sm font-medium">(1 크레딧)</span>
              </h1>
            </div>
            <div class="w-16"></div>
          </div>
        </div>
      </header>
      
      {/* 로딩 오버레이 */}
      <div id="loadingOverlay" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
          <i class="fas fa-spinner fa-spin text-4xl text-primary-500 mb-4"></i>
          <p class="text-gray-900 font-semibold">제목 생성 중...</p>
          <p class="text-gray-500 text-sm mt-2">AI가 매력적인 제목을 만들고 있어요</p>
        </div>
      </div>

      {/* 크레딧 부족 모달 */}
      <div id="creditModal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-coins text-red-500 text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">크레딧이 부족합니다</h3>
          <p class="text-gray-600 mb-2">현재 잔액: <span id="modalCreditBalance" class="font-semibold text-primary-500">0</span> 크레딧</p>
          <p class="text-gray-500 text-sm mb-6">블로그 제목 생성에는 1 크레딧이 필요합니다.</p>
          <div class="flex gap-3">
            <button onclick="closeCreditModal()" class="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              취소
            </button>
            <a href="/pricing" class="flex-1 px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-center">
              충전하러 가기
            </a>
          </div>
        </div>
      </div>

      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 입력 폼 */}
        <div class="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 class="text-lg font-bold text-gray-900 mb-6">
            <i class="fas fa-heading text-blue-500 mr-2"></i>
            블로그 제목 생성
          </h2>
          
          <div class="space-y-4">
            {/* 메인 키워드 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                메인 키워드 <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="mainKeyword"
                placeholder="예: 방문요양, 어르신 돌봄, 장기요양등급"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* 주제 힌트 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                주제 힌트 <span class="text-gray-400 text-xs">(선택)</span>
              </label>
              <input 
                type="text" 
                id="topicHint"
                placeholder="예: 초보 보호자를 위한, 비용 절감, 신청 방법"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* 지역 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                지역 <span class="text-gray-400 text-xs">(선택)</span>
              </label>
              <input 
                type="text" 
                id="region"
                placeholder="예: 강남구, 서울, 부산"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* 생성 버튼 */}
            <button 
              onclick="generateTitles()"
              id="generateBtn"
              class="w-full py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <i class="fas fa-magic"></i>
              제목 15개 생성하기
            </button>
          </div>
        </div>

        {/* 결과 영역 */}
        <div id="resultArea" class="hidden">
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold text-gray-900">
                <i class="fas fa-list-ol text-blue-500 mr-2"></i>
                생성된 제목
              </h2>
              <button onclick="copyAllTitles()" class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                <i class="fas fa-copy"></i>
                전체 복사
              </button>
            </div>
            
            <div id="titlesList" class="space-y-3">
              {/* 제목들이 여기에 표시됩니다 */}
            </div>
          </div>
        </div>
      </main>

      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          let userCredits = 0;
          let generatedTitles = [];

          // 크레딧 모달 닫기
          function closeCreditModal() {
            document.getElementById('creditModal').classList.add('hidden');
          }

          // 크레딧 확인
          async function checkCredits() {
            try {
              const session = await SupabaseAuth.getSession();
              if (!session) {
                window.location.href = '/login';
                return false;
              }
              
              userCredits = await SupabaseAuth.getUserCredits(session.user.id);
              return userCredits >= 1;
            } catch (error) {
              console.error('Credit check error:', error);
              return false;
            }
          }

          // 제목 생성
          async function generateTitles() {
            const mainKeyword = document.getElementById('mainKeyword').value.trim();
            const topicHint = document.getElementById('topicHint').value.trim();
            const region = document.getElementById('region').value.trim();

            if (!mainKeyword) {
              SupabaseAuth.showToast('메인 키워드를 입력해주세요', 'error');
              return;
            }

            // 크레딧 확인
            const hasCredits = await checkCredits();
            if (!hasCredits) {
              document.getElementById('modalCreditBalance').textContent = userCredits;
              document.getElementById('creditModal').classList.remove('hidden');
              return;
            }

            // 로딩 시작
            document.getElementById('loadingOverlay').classList.remove('hidden');
            document.getElementById('generateBtn').disabled = true;

            try {
              // Gemini API 호출
              console.log('Calling Gemini API...');
              const titles = await GeminiAPI.generateBlogTitles(mainKeyword, topicHint, region);
              console.log('API response:', titles);
              
              if (!titles || titles.length === 0) {
                throw new Error('제목 생성에 실패했습니다');
              }

              generatedTitles = titles;

              // 결과 표시 먼저 (사용자가 결과 확인 가능하도록)
              displayTitles(titles);
              document.getElementById('resultArea').classList.remove('hidden');

              // 크레딧 차감 및 콘텐츠 저장 (생성 성공 후)
              try {
                await SupabaseAuth.deductCredits(1, 'title', '블로그 제목 생성: ' + mainKeyword);
                await SupabaseAuth.saveContent({
                  type: 'title',
                  title: '블로그 제목 생성: ' + mainKeyword,
                  content: titles.join('\\n'),
                  metadata: { mainKeyword, topicHint, region }
                });
              } catch (saveError) {
                console.error('Save error (content already displayed):', saveError);
              }
              
              SupabaseAuth.showToast('제목이 생성되었습니다!', 'success');

            } catch (error) {
              console.error('Generate error:', error);
              if (error.message === 'INSUFFICIENT_CREDITS') {
                document.getElementById('modalCreditBalance').textContent = userCredits;
                document.getElementById('creditModal').classList.remove('hidden');
              } else {
                SupabaseAuth.showToast('오류: ' + (error.message || '다시 시도해주세요.'), 'error');
              }
            } finally {
              document.getElementById('loadingOverlay').classList.add('hidden');
              document.getElementById('generateBtn').disabled = false;
            }
          }

          // 제목 목록 표시
          function displayTitles(titles) {
            const container = document.getElementById('titlesList');
            container.innerHTML = titles.map((title, index) => \`
              <div class="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                <span class="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center text-sm font-semibold">
                  \${index + 1}
                </span>
                <p class="flex-1 text-gray-800 leading-relaxed">\${title}</p>
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onclick="copyTitle(\${index})" class="p-2 text-gray-400 hover:text-primary-500 transition-colors" title="복사">
                    <i class="fas fa-copy"></i>
                  </button>
                  <a href="/create/blog?title=\${encodeURIComponent(title)}" class="p-2 text-gray-400 hover:text-green-500 transition-colors" title="이 제목으로 글쓰기">
                    <i class="fas fa-pen"></i>
                  </a>
                </div>
              </div>
            \`).join('');
          }

          // 개별 제목 복사
          async function copyTitle(index) {
            if (generatedTitles[index]) {
              await SupabaseAuth.copyToClipboard(generatedTitles[index]);
            }
          }

          // 전체 제목 복사
          async function copyAllTitles() {
            if (generatedTitles.length > 0) {
              const text = generatedTitles.map((t, i) => \`\${i + 1}. \${t}\`).join('\\n');
              await SupabaseAuth.copyToClipboard(text);
            }
          }

          // 페이지 로드 시 인증 확인
          document.addEventListener('DOMContentLoaded', async function() {
            try {
              await SupabaseAuth.init();
              const session = await SupabaseAuth.getSession();
              
              if (!session) {
                window.location.href = '/login';
                return;
              }
              
              // URL에서 키워드 파라미터 확인
              const urlParams = new URLSearchParams(window.location.search);
              const keyword = urlParams.get('keyword');
              if (keyword) {
                document.getElementById('mainKeyword').value = keyword;
              }
            } catch (error) {
              console.error('Page init error:', error);
              window.location.href = '/login';
            }
          });
        `
      }} />
    </div>
  )
}
