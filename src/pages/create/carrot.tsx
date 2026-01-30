export const CreateCarrotPage = () => {
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
                당근마켓 홍보글 <span class="text-primary-500 text-sm font-medium">(3 크레딧)</span>
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
          <p class="text-gray-900 font-semibold">당근마켓 글 생성 중...</p>
          <p class="text-gray-500 text-sm mt-2">AI가 친근한 홍보글을 작성하고 있어요</p>
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
          <p class="text-gray-500 text-sm mb-6">당근마켓 홍보글 생성에는 3 크레딧이 필요합니다.</p>
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
            <i class="fas fa-carrot text-orange-500 mr-2"></i>
            당근마켓 홍보글
          </h2>
          
          <div class="space-y-4">
            {/* 업체명 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                업체명 <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="businessName"
                placeholder="센터 이름이 자동으로 입력됩니다"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors bg-gray-50"
                readonly
              />
            </div>

            {/* 지역 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                지역 <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="region"
                placeholder="예: 강남구, 서초동, 역삼역 인근"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* 원본 내용 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                원본 내용 <span class="text-gray-400 text-xs">(블로그 글에서 변환할 경우)</span>
              </label>
              <textarea 
                id="sourceContent"
                rows="4"
                placeholder="블로그 글에서 넘어온 경우 자동으로 입력됩니다. 직접 입력하셔도 됩니다."
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
              ></textarea>
            </div>

            {/* 블로그 주소 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                블로그 주소 <span class="text-gray-400 text-xs">(선택 - 마지막에 CTA로 사용)</span>
              </label>
              <input 
                type="url" 
                id="blogUrl"
                placeholder="예: https://blog.naver.com/your-blog"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* 유형 선택 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                글 유형
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="relative">
                  <input type="radio" name="type" value="A" class="peer sr-only" checked />
                  <div class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all">
                    <h4 class="font-semibold text-gray-900">A. 이웃 소개</h4>
                    <p class="text-xs text-gray-500 mt-1">친근하게 이웃에게 인사</p>
                  </div>
                </label>
                <label class="relative">
                  <input type="radio" name="type" value="B" class="peer sr-only" />
                  <div class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all">
                    <h4 class="font-semibold text-gray-900">B. 고민 해결</h4>
                    <p class="text-xs text-gray-500 mt-1">문제 상황 공감형</p>
                  </div>
                </label>
                <label class="relative">
                  <input type="radio" name="type" value="C" class="peer sr-only" />
                  <div class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-orange-500 peer-checked:bg-orange-50 transition-all">
                    <h4 class="font-semibold text-gray-900">C. 혜택 알림</h4>
                    <p class="text-xs text-gray-500 mt-1">이벤트/특별 서비스</p>
                  </div>
                </label>
              </div>
            </div>

            {/* 생성 버튼 */}
            <button 
              onclick="generateCarrot()"
              id="generateBtn"
              class="w-full py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <i class="fas fa-magic"></i>
              당근마켓 글 생성하기
            </button>
          </div>
        </div>

        {/* 결과 영역 */}
        <div id="resultArea" class="hidden space-y-6">
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold text-gray-900">
                <i class="fas fa-carrot text-orange-500 mr-2"></i>
                생성된 당근마켓 글
              </h2>
              <div class="flex gap-2">
                <button onclick="copyAll()" class="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm flex items-center gap-1 transition-colors">
                  <i class="fas fa-copy"></i>
                  전체 복사
                </button>
                <button onclick="regenerate()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm flex items-center gap-1 transition-colors">
                  <i class="fas fa-redo"></i>
                  다시 생성
                </button>
              </div>
            </div>

            {/* 제목 */}
            <div class="mb-6">
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm font-medium text-gray-600">제목 (30자 내외)</label>
                <button onclick="copyTitle()" class="text-xs text-primary-500 hover:text-primary-600">
                  <i class="fas fa-copy mr-1"></i>복사
                </button>
              </div>
              <div id="resultTitle" class="p-4 bg-orange-50 rounded-xl text-orange-900 font-semibold">
                {/* 제목이 여기에 표시됩니다 */}
              </div>
            </div>

            {/* 본문 */}
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm font-medium text-gray-600">본문 (500~600자)</label>
                <button onclick="copyBody()" class="text-xs text-primary-500 hover:text-primary-600">
                  <i class="fas fa-copy mr-1"></i>복사
                </button>
              </div>
              <div id="resultBody" class="p-4 bg-gray-50 rounded-xl text-gray-800 whitespace-pre-line leading-relaxed">
                {/* 본문이 여기에 표시됩니다 */}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          let userCredits = 0;
          let generatedTitle = '';
          let generatedBody = '';
          let centerInfo = null;

          function closeCreditModal() {
            document.getElementById('creditModal').classList.add('hidden');
          }

          async function checkCredits(required = 3) {
            try {
              const session = await SupabaseAuth.getSession();
              if (!session) {
                window.location.href = '/login';
                return false;
              }
              userCredits = await SupabaseAuth.getUserCredits(session.user.id);
              return userCredits >= required;
            } catch (error) {
              console.error('Credit check error:', error);
              return false;
            }
          }

          async function generateCarrot() {
            const businessName = document.getElementById('businessName').value.trim();
            const region = document.getElementById('region').value.trim();
            const sourceContent = document.getElementById('sourceContent').value.trim();
            const blogUrl = document.getElementById('blogUrl').value.trim();
            const type = document.querySelector('input[name="type"]:checked').value;

            if (!region) {
              SupabaseAuth.showToast('지역을 입력해주세요', 'error');
              return;
            }

            const hasCredits = await checkCredits(3);
            if (!hasCredits) {
              document.getElementById('modalCreditBalance').textContent = userCredits;
              document.getElementById('creditModal').classList.remove('hidden');
              return;
            }

            document.getElementById('loadingOverlay').classList.remove('hidden');
            document.getElementById('generateBtn').disabled = true;

            try {
              const result = await GeminiAPI.generateCarrotPost(businessName, region, sourceContent, blogUrl, type, centerInfo);
              
              if (!result || !result.title || !result.body) {
                throw new Error('글 생성에 실패했습니다');
              }

              generatedTitle = result.title;
              generatedBody = result.body;

              await SupabaseAuth.deductCredits(3, 'carrot', '당근마켓: ' + businessName);

              await SupabaseAuth.saveContent({
                type: 'carrot',
                title: result.title,
                content: result.title + '\\n\\n' + result.body,
                metadata: { businessName, region, blogUrl, type }
              });

              document.getElementById('resultTitle').textContent = result.title;
              document.getElementById('resultBody').textContent = result.body;
              document.getElementById('resultArea').classList.remove('hidden');
              
              SupabaseAuth.showToast('당근마켓 글이 생성되었습니다!', 'success');

            } catch (error) {
              console.error('Generate error:', error);
              if (error.message === 'INSUFFICIENT_CREDITS') {
                document.getElementById('modalCreditBalance').textContent = userCredits;
                document.getElementById('creditModal').classList.remove('hidden');
              } else {
                SupabaseAuth.showToast('오류가 발생했습니다. 다시 시도해주세요.', 'error');
              }
            } finally {
              document.getElementById('loadingOverlay').classList.add('hidden');
              document.getElementById('generateBtn').disabled = false;
            }
          }

          async function copyTitle() {
            if (generatedTitle) await SupabaseAuth.copyToClipboard(generatedTitle);
          }

          async function copyBody() {
            if (generatedBody) await SupabaseAuth.copyToClipboard(generatedBody);
          }

          async function copyAll() {
            if (generatedTitle && generatedBody) {
              await SupabaseAuth.copyToClipboard(generatedTitle + '\\n\\n' + generatedBody);
            }
          }

          function regenerate() {
            generateCarrot();
          }

          document.addEventListener('DOMContentLoaded', async function() {
            try {
              await SupabaseAuth.init();
              const session = await SupabaseAuth.getSession();
              
              if (!session) {
                window.location.href = '/login';
                return;
              }
              
              centerInfo = await SupabaseAuth.getUserCenter(session.user.id);
              if (centerInfo && centerInfo.center_name) {
                document.getElementById('businessName').value = centerInfo.center_name;
              }
              
              const urlParams = new URLSearchParams(window.location.search);
              const content = urlParams.get('content');
              if (content) {
                document.getElementById('sourceContent').value = decodeURIComponent(content);
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
