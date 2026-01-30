export const HistoryPage = () => {
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
              <h1 class="text-lg font-bold text-gray-900">콘텐츠 히스토리</h1>
            </div>
            <div class="w-16"></div>
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

      {/* 콘텐츠 상세 모달 */}
      <div id="contentModal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <span id="modalType" class="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-2">
                유형
              </span>
              <h3 id="modalTitle" class="text-lg font-bold text-gray-900">제목</h3>
            </div>
            <button onclick="closeModal()" class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-6">
            <div id="modalContent" class="prose max-w-none text-gray-700 whitespace-pre-line">
              내용
            </div>
          </div>
          <div class="p-6 border-t border-gray-100 flex gap-3">
            <button onclick="copyModalContent()" class="flex-1 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
              <i class="fas fa-copy"></i>
              복사하기
            </button>
            <button onclick="closeModal()" class="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              닫기
            </button>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <div id="deleteModal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 text-center max-w-sm mx-4">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-trash-alt text-red-500 text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">콘텐츠 삭제</h3>
          <p class="text-gray-600 mb-6">정말 이 콘텐츠를 삭제하시겠습니까?</p>
          <div class="flex gap-3">
            <button onclick="closeDeleteModal()" class="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
              취소
            </button>
            <button onclick="confirmDelete()" class="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              삭제
            </button>
          </div>
        </div>
      </div>

      <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 필터 탭 */}
        <div class="bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div class="flex flex-wrap gap-2">
            <button onclick="filterContents('all')" data-filter="all" class="filter-btn px-4 py-2 rounded-lg font-medium text-sm transition-colors bg-primary-500 text-white">
              전체
            </button>
            <button onclick="filterContents('title')" data-filter="title" class="filter-btn px-4 py-2 rounded-lg font-medium text-sm transition-colors text-gray-600 hover:bg-gray-100">
              <i class="fas fa-heading mr-1"></i>제목
            </button>
            <button onclick="filterContents('blog')" data-filter="blog" class="filter-btn px-4 py-2 rounded-lg font-medium text-sm transition-colors text-gray-600 hover:bg-gray-100">
              <i class="fas fa-file-alt mr-1"></i>블로그
            </button>
            <button onclick="filterContents('place')" data-filter="place" class="filter-btn px-4 py-2 rounded-lg font-medium text-sm transition-colors text-gray-600 hover:bg-gray-100">
              <i class="fas fa-map-marker-alt mr-1"></i>플레이스
            </button>
            <button onclick="filterContents('carrot')" data-filter="carrot" class="filter-btn px-4 py-2 rounded-lg font-medium text-sm transition-colors text-gray-600 hover:bg-gray-100">
              <i class="fas fa-carrot mr-1"></i>당근
            </button>
            <button onclick="filterContents('thread')" data-filter="thread" class="filter-btn px-4 py-2 rounded-lg font-medium text-sm transition-colors text-gray-600 hover:bg-gray-100">
              <i class="fas fa-at mr-1"></i>스레드
            </button>
          </div>
        </div>

        {/* 콘텐츠 목록 */}
        <div id="contentsList" class="space-y-4">
          {/* 콘텐츠가 여기에 표시됩니다 */}
        </div>

        {/* 빈 상태 */}
        <div id="emptyState" class="hidden bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <i class="fas fa-inbox text-6xl text-gray-200 mb-4"></i>
          <h3 class="text-xl font-bold text-gray-900 mb-2">콘텐츠가 없습니다</h3>
          <p class="text-gray-500 mb-6">아직 생성된 콘텐츠가 없습니다.</p>
          <a href="/dashboard" class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
            <i class="fas fa-plus"></i>
            콘텐츠 생성하러 가기
          </a>
        </div>
      </main>

      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          let allContents = [];
          let currentFilter = 'all';
          let deleteTargetId = null;
          let currentModalContent = '';

          const contentTypeStyles = {
            'title': { icon: 'fa-heading', bg: 'bg-blue-100', text: 'text-blue-700', label: '블로그 제목' },
            'blog': { icon: 'fa-file-alt', bg: 'bg-green-100', text: 'text-green-700', label: '블로그 글' },
            'place': { icon: 'fa-map-marker-alt', bg: 'bg-emerald-100', text: 'text-emerald-700', label: '네이버 플레이스' },
            'carrot': { icon: 'fa-carrot', bg: 'bg-orange-100', text: 'text-orange-700', label: '당근마켓' },
            'thread': { icon: 'fa-at', bg: 'bg-purple-100', text: 'text-purple-700', label: '스레드' }
          };

          function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            });
          }

          function truncateText(text, maxLength = 100) {
            if (!text) return '';
            return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
          }

          async function loadContents() {
            try {
              const session = await SupabaseAuth.getSession();
              if (!session) {
                window.location.href = '/login';
                return;
              }

              allContents = await SupabaseAuth.getContents(session.user.id, null, 100);
              renderContents();
            } catch (error) {
              console.error('Load contents error:', error);
              SupabaseAuth.showToast('콘텐츠를 불러오는데 실패했습니다', 'error');
            } finally {
              hideLoading();
            }
          }

          function filterContents(type) {
            currentFilter = type;
            
            // 버튼 스타일 업데이트
            document.querySelectorAll('.filter-btn').forEach(btn => {
              if (btn.dataset.filter === type) {
                btn.classList.remove('text-gray-600', 'hover:bg-gray-100');
                btn.classList.add('bg-primary-500', 'text-white');
              } else {
                btn.classList.remove('bg-primary-500', 'text-white');
                btn.classList.add('text-gray-600', 'hover:bg-gray-100');
              }
            });

            renderContents();
          }

          function renderContents() {
            const container = document.getElementById('contentsList');
            const emptyState = document.getElementById('emptyState');
            
            const filteredContents = currentFilter === 'all' 
              ? allContents 
              : allContents.filter(c => c.type === currentFilter);

            if (filteredContents.length === 0) {
              container.innerHTML = '';
              emptyState.classList.remove('hidden');
              return;
            }

            emptyState.classList.add('hidden');
            container.innerHTML = filteredContents.map(content => {
              const style = contentTypeStyles[content.type] || contentTypeStyles['blog'];
              return \`
                <div class="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
                  <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 \${style.bg} rounded-xl flex items-center justify-center">
                      <i class="fas \${style.icon} \${style.text} text-lg"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2 mb-1">
                        <span class="inline-flex items-center px-2 py-0.5 \${style.bg} \${style.text} rounded text-xs font-medium">
                          \${style.label}
                        </span>
                        <span class="text-xs text-gray-400">\${formatDate(content.created_at)}</span>
                      </div>
                      <h3 class="font-semibold text-gray-900 mb-1 truncate">\${content.title || '제목 없음'}</h3>
                      <p class="text-sm text-gray-500 line-clamp-2">\${truncateText(content.content, 150)}</p>
                    </div>
                    <div class="flex-shrink-0 flex items-center gap-2">
                      <button onclick="openModal('\${content.id}')" class="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors" title="보기">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button onclick="copyContent('\${content.id}')" class="p-2 text-gray-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors" title="복사">
                        <i class="fas fa-copy"></i>
                      </button>
                      <button onclick="openDeleteModal('\${content.id}')" class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="삭제">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              \`;
            }).join('');
          }

          function openModal(contentId) {
            const content = allContents.find(c => c.id === contentId);
            if (!content) return;

            const style = contentTypeStyles[content.type] || contentTypeStyles['blog'];
            
            document.getElementById('modalType').innerHTML = \`<i class="fas \${style.icon} mr-1"></i>\${style.label}\`;
            document.getElementById('modalType').className = \`inline-flex items-center gap-2 px-3 py-1 \${style.bg} \${style.text} rounded-full text-sm font-medium mb-2\`;
            document.getElementById('modalTitle').textContent = content.title || '제목 없음';
            document.getElementById('modalContent').textContent = content.content;
            currentModalContent = content.content;
            
            document.getElementById('contentModal').classList.remove('hidden');
          }

          function closeModal() {
            document.getElementById('contentModal').classList.add('hidden');
          }

          async function copyModalContent() {
            if (currentModalContent) {
              await SupabaseAuth.copyToClipboard(currentModalContent);
            }
          }

          async function copyContent(contentId) {
            const content = allContents.find(c => c.id === contentId);
            if (content) {
              await SupabaseAuth.copyToClipboard(content.content);
            }
          }

          function openDeleteModal(contentId) {
            deleteTargetId = contentId;
            document.getElementById('deleteModal').classList.remove('hidden');
          }

          function closeDeleteModal() {
            deleteTargetId = null;
            document.getElementById('deleteModal').classList.add('hidden');
          }

          async function confirmDelete() {
            if (!deleteTargetId) return;

            try {
              await SupabaseAuth.deleteContent(deleteTargetId);
              allContents = allContents.filter(c => c.id !== deleteTargetId);
              renderContents();
              SupabaseAuth.showToast('콘텐츠가 삭제되었습니다', 'success');
            } catch (error) {
              console.error('Delete error:', error);
              SupabaseAuth.showToast('삭제에 실패했습니다', 'error');
            } finally {
              closeDeleteModal();
            }
          }

          function hideLoading() {
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
              loadingOverlay.style.transition = 'opacity 0.3s';
              loadingOverlay.style.opacity = '0';
              setTimeout(() => {
                loadingOverlay.style.display = 'none';
              }, 300);
            }
          }

          document.addEventListener('DOMContentLoaded', async function() {
            try {
              await SupabaseAuth.init();
              await loadContents();
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
