export const CreateBlogPage = () => {
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
                블로그 글 작성 <span class="text-primary-500 text-sm font-medium">(5 크레딧)</span>
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
          <p class="text-gray-900 font-semibold">블로그 글 작성 중...</p>
          <p class="text-gray-500 text-sm mt-2">AI가 전문적인 글을 작성하고 있어요 (약 30초 소요)</p>
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
          <p class="text-gray-500 text-sm mb-6">블로그 글 작성에는 5 크레딧이 필요합니다.</p>
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
            <i class="fas fa-file-alt text-green-500 mr-2"></i>
            블로그 글 작성
          </h2>
          
          <div class="space-y-4">
            {/* 주제/제목 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                주제 또는 제목 <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="blogTitle"
                placeholder="예: 방문요양 서비스 신청 방법 총정리"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              <p class="text-xs text-gray-400 mt-1">* 제목 생성에서 넘어온 경우 자동으로 입력됩니다</p>
            </div>

            {/* 상위노출 키워드 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                상위노출 키워드 <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="seoKeyword"
                placeholder="예: 방문요양 신청, 장기요양등급, 재가급여"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              <p class="text-xs text-gray-400 mt-1">* 글 내에 6-8회 자연스럽게 포함됩니다</p>
            </div>

            {/* 서비스/업체명 */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                서비스/업체명 <span class="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id="businessName"
                placeholder="센터 이름을 입력하세요"
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              <p class="text-xs text-gray-400 mt-1">* 센터 정보가 있으면 자동으로 입력됩니다. 수정 가능합니다.</p>
            </div>

            {/* 생성 버튼 */}
            <button 
              onclick="generateBlog()"
              id="generateBtn"
              class="w-full py-4 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <i class="fas fa-magic"></i>
              블로그 글 생성하기
            </button>
          </div>
        </div>

        {/* 결과 영역 */}
        <div id="resultArea" class="hidden space-y-6">
          {/* 생성된 글 */}
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold text-gray-900">
                <i class="fas fa-file-alt text-green-500 mr-2"></i>
                생성된 블로그 글
              </h2>
              <div class="flex gap-2">
                <button onclick="copyBlog()" class="px-4 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm flex items-center gap-1 transition-colors">
                  <i class="fas fa-copy"></i>
                  복사
                </button>
                <button onclick="regenerateBlog()" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium text-sm flex items-center gap-1 transition-colors">
                  <i class="fas fa-redo"></i>
                  다시 생성
                </button>
              </div>
            </div>
            
            <div id="blogContent" class="prose prose-lg max-w-none">
              {/* 블로그 글이 여기에 표시됩니다 */}
            </div>
          </div>

          {/* 채널 변환 */}
          <div class="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 class="text-lg font-bold text-gray-900 mb-4">
              <i class="fas fa-exchange-alt text-purple-500 mr-2"></i>
              다른 채널로 변환하기
            </h2>
            <p class="text-gray-600 text-sm mb-4">이 블로그 글을 다른 플랫폼에 맞게 변환해보세요.</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button onclick="convertToChannel('place')" class="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                <i class="fas fa-map-marker-alt"></i>
                <span>네이버 플레이스</span>
                <span class="text-xs opacity-70">(3크레딧)</span>
              </button>
              <button onclick="convertToChannel('carrot')" class="flex items-center justify-center gap-2 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
                <i class="fas fa-carrot"></i>
                <span>당근마켓</span>
                <span class="text-xs opacity-70">(3크레딧)</span>
              </button>
              <button onclick="convertToChannel('thread')" class="flex items-center justify-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                <i class="fas fa-at"></i>
                <span>스레드</span>
                <span class="text-xs opacity-70">(3크레딧)</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          let userCredits = 0;
          let generatedBlog = '';
          let centerInfo = null;

          // 크레딧 모달 닫기
          function closeCreditModal() {
            document.getElementById('creditModal').classList.add('hidden');
          }

          // 크레딧 확인
          async function checkCredits(required = 5) {
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

          // 블로그 글 생성
          async function generateBlog() {
            const blogTitle = document.getElementById('blogTitle').value.trim();
            const seoKeyword = document.getElementById('seoKeyword').value.trim();
            const businessName = document.getElementById('businessName').value.trim();

            if (!blogTitle) {
              SupabaseAuth.showToast('주제 또는 제목을 입력해주세요', 'error');
              return;
            }
            if (!seoKeyword) {
              SupabaseAuth.showToast('상위노출 키워드를 입력해주세요', 'error');
              return;
            }

            // 크레딧 확인
            const hasCredits = await checkCredits(5);
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
              console.log('Calling Gemini API for blog...');
              const blog = await GeminiAPI.generateBlogPost(blogTitle, seoKeyword, businessName, centerInfo);
              console.log('API response received');
              
              if (!blog) {
                throw new Error('블로그 글 생성에 실패했습니다');
              }

              generatedBlog = blog;

              // 결과 표시 먼저 (사용자가 결과 확인 가능하도록)
              displayBlog(blog);
              document.getElementById('resultArea').classList.remove('hidden');

              // 크레딧 차감 및 콘텐츠 저장 (생성 성공 후)
              try {
                await SupabaseAuth.deductCredits(5, 'blog', '블로그 글 작성: ' + blogTitle);
                await SupabaseAuth.saveContent({
                  type: 'blog',
                  title: blogTitle,
                  content: blog,
                  metadata: { seoKeyword, businessName }
                });
              } catch (saveError) {
                console.error('Save error (content already displayed):', saveError);
              }
              
              SupabaseAuth.showToast('블로그 글이 생성되었습니다!', 'success');

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

          // 블로그 글 표시
          function displayBlog(content) {
            const container = document.getElementById('blogContent');
            // Markdown 형식을 HTML로 변환 (간단한 처리)
            const html = content
              .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>')
              .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
              .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mb-6">$1</h1>')
              .replace(/\\*\\*(.+?)\\*\\*/g, '<strong class="font-semibold">$1</strong>')
              .replace(/\\n\\n/g, '</p><p class="text-gray-700 leading-relaxed mb-4">')
              .replace(/\\n/g, '<br>');
            
            container.innerHTML = '<p class="text-gray-700 leading-relaxed mb-4">' + html + '</p>';
          }

          // 블로그 글 복사
          async function copyBlog() {
            if (generatedBlog) {
              await SupabaseAuth.copyToClipboard(generatedBlog);
            }
          }

          // 다시 생성
          function regenerateBlog() {
            generateBlog();
          }

          // 채널 변환
          function convertToChannel(channel) {
            if (!generatedBlog) {
              SupabaseAuth.showToast('변환할 블로그 글이 없습니다', 'error');
              return;
            }
            // 긴 콘텐츠는 sessionStorage에 저장
            sessionStorage.setItem('blogContent', generatedBlog);
            window.location.href = '/create/' + channel + '?fromBlog=true';
          }

          // 페이지 로드 시
          document.addEventListener('DOMContentLoaded', async function() {
            try {
              await SupabaseAuth.init();
              const session = await SupabaseAuth.getSession();
              
              if (!session) {
                window.location.href = '/login';
                return;
              }
              
              // 센터 정보 로드
              centerInfo = await SupabaseAuth.getUserCenter(session.user.id);
              if (centerInfo && centerInfo.center_name) {
                document.getElementById('businessName').value = centerInfo.center_name;
              }
              
              // URL에서 제목 파라미터 확인
              const urlParams = new URLSearchParams(window.location.search);
              const title = urlParams.get('title');
              if (title) {
                document.getElementById('blogTitle').value = title;
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
