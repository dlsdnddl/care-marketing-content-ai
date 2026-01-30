export const CreateThreadPage = () => {
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
                스레드/SNS 글 <span class="text-primary-500 text-sm font-medium">(3 크레딧)</span>
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
          <p class="text-gray-900 font-semibold">스레드 타래 생성 중...</p>
          <p class="text-gray-500 text-sm mt-2">AI가 임팩트 있는 글을 작성하고 있어요</p>
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
          <p class="text-gray-500 text-sm mb-6">스레드 글 생성에는 3 크레딧이 필요합니다.</p>
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
            <i class="fas fa-at text-purple-500 mr-2"></i>
            스레드/SNS 글
          </h2>
          
          <div class="space-y-4">
            {/* 원본 내용 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                원본 내용 <span class="text-red-500">*</span>
              </label>
              <textarea 
                id="sourceContent"
                rows="6"
                placeholder="블로그 글에서 넘어온 경우 자동으로 입력됩니다.&#10;직접 입력할 경우, 스레드로 변환할 내용을 입력해주세요."
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none"
              ></textarea>
            </div>

            {/* 전략 선택 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                스레드 전략
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="relative">
                  <input type="radio" name="strategy" value="A" class="peer sr-only" checked />
                  <div class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 transition-all">
                    <h4 class="font-semibold text-gray-900">A. 스토리텔링</h4>
                    <p class="text-xs text-gray-500 mt-1">일화/경험담 형식</p>
                  </div>
                </label>
                <label class="relative">
                  <input type="radio" name="strategy" value="B" class="peer sr-only" />
                  <div class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 transition-all">
                    <h4 class="font-semibold text-gray-900">B. 정보 공유</h4>
                    <p class="text-xs text-gray-500 mt-1">팁/노하우 리스트</p>
                  </div>
                </label>
                <label class="relative">
                  <input type="radio" name="strategy" value="C" class="peer sr-only" />
                  <div class="p-4 border-2 border-gray-200 rounded-xl cursor-pointer peer-checked:border-purple-500 peer-checked:bg-purple-50 transition-all">
                    <h4 class="font-semibold text-gray-900">C. 감성 공감</h4>
                    <p class="text-xs text-gray-500 mt-1">공감/위로 형식</p>
                  </div>
                </label>
              </div>
            </div>

            {/* 생성 버튼 */}
            <button 
              onclick="generateThread()"
              id="generateBtn"
              class="w-full py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <i class="fas fa-magic"></i>
              스레드 타래 생성하기
            </button>
          </div>
        </div>

        {/* 결과 영역 */}
        <div id="resultArea" class="hidden space-y-6">
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold text-gray-900">
                <i class="fas fa-at text-purple-500 mr-2"></i>
                생성된 스레드 타래
              </h2>
              <div class="flex gap-2">
                <button onclick="copyAllThreads()" class="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm flex items-center gap-1 transition-colors">
                  <i class="fas fa-copy"></i>
                  전체 복사
                </button>
                <button onclick="regenerate()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm flex items-center gap-1 transition-colors">
                  <i class="fas fa-redo"></i>
                  다시 생성
                </button>
              </div>
            </div>

            {/* 스레드 목록 */}
            <div id="threadsList" class="space-y-4">
              {/* 스레드들이 여기에 표시됩니다 */}
            </div>
          </div>
        </div>
      </main>

      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          let userCredits = 0;
          let generatedThreads = [];
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

          async function generateThread() {
            const sourceContent = document.getElementById('sourceContent').value.trim();
            const strategy = document.querySelector('input[name="strategy"]:checked').value;

            if (!sourceContent) {
              SupabaseAuth.showToast('원본 내용을 입력해주세요', 'error');
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
              const threads = await GeminiAPI.generateThreads(sourceContent, strategy, centerInfo);
              
              if (!threads || threads.length === 0) {
                throw new Error('스레드 생성에 실패했습니다');
              }

              generatedThreads = threads;

              await SupabaseAuth.deductCredits(3, 'thread', '스레드 타래 생성');

              await SupabaseAuth.saveContent({
                type: 'thread',
                title: '스레드 타래 (' + threads.length + '개)',
                content: threads.join('\\n\\n---\\n\\n'),
                metadata: { strategy, threadCount: threads.length }
              });

              displayThreads(threads);
              document.getElementById('resultArea').classList.remove('hidden');
              
              SupabaseAuth.showToast('스레드가 생성되었습니다!', 'success');

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

          function displayThreads(threads) {
            const container = document.getElementById('threadsList');
            container.innerHTML = threads.map((thread, index) => \`
              <div class="relative p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div class="absolute top-3 left-3 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  \${index + 1}
                </div>
                <div class="ml-10 pr-10">
                  <p class="text-gray-800 whitespace-pre-line leading-relaxed">\${thread}</p>
                </div>
                <button 
                  onclick="copyThread(\${index})" 
                  class="absolute top-3 right-3 p-2 text-purple-400 hover:text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                  title="복사"
                >
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            \`).join('');
          }

          async function copyThread(index) {
            if (generatedThreads[index]) {
              await SupabaseAuth.copyToClipboard(generatedThreads[index]);
            }
          }

          async function copyAllThreads() {
            if (generatedThreads.length > 0) {
              const text = generatedThreads.map((t, i) => \`[\${i + 1}/\${generatedThreads.length}]\\n\${t}\`).join('\\n\\n');
              await SupabaseAuth.copyToClipboard(text);
            }
          }

          function regenerate() {
            generateThread();
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
