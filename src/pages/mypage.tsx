export const MyPage = () => {
  return (
    <div class="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center h-16">
            <a href="/dashboard" class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <i class="fas fa-arrow-left"></i>
              <span>대시보드</span>
            </a>
            <div class="flex-1 text-center">
              <h1 class="text-lg font-bold text-gray-900">마이페이지</h1>
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

      {/* 센터 정보 수정 모달 */}
      <div id="editCenterModal" class="hidden fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h3 class="text-lg font-bold text-gray-900">센터 정보 수정</h3>
            <button onclick="closeEditModal()" class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">센터 이름</label>
              <input type="text" id="editCenterName" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">시작의 계기</label>
              <textarea id="editOriginStory" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">운영 철학</label>
              <textarea id="editCarePhilosophy" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">핵심 원칙</label>
              <textarea id="editCorePrinciple" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">차별화 디테일</label>
              <textarea id="editUniqueDetail" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">비전</label>
              <textarea id="editVision" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">기타 강점</label>
              <textarea id="editOtherStrengths" rows="3" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"></textarea>
            </div>
          </div>
          <div class="p-6 border-t border-gray-100 flex gap-3">
            <button onclick="saveCenter()" id="saveCenterBtn" class="flex-1 py-3 bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors flex items-center justify-center gap-2">
              <i class="fas fa-save"></i>
              저장하기
            </button>
            <button onclick="closeEditModal()" class="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              취소
            </button>
          </div>
        </div>
      </div>

      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* 내 정보 */}
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 class="text-lg font-bold text-gray-900 mb-6">
            <i class="fas fa-user text-primary-500 mr-2"></i>
            내 정보
          </h2>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <span class="text-gray-600">이메일</span>
              <span id="userEmail" class="font-medium text-gray-900">-</span>
            </div>
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
              <span class="text-gray-600">이름</span>
              <span id="userName" class="font-medium text-gray-900">-</span>
            </div>
            <div class="flex items-center justify-between py-3">
              <span class="text-gray-600">가입일</span>
              <span id="userCreatedAt" class="font-medium text-gray-900">-</span>
            </div>
          </div>
        </div>

        {/* 업체 정보 */}
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-gray-900">
              <i class="fas fa-building text-primary-500 mr-2"></i>
              업체 정보
            </h2>
            <button onclick="openEditModal()" class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
              <i class="fas fa-edit"></i>
              수정
            </button>
          </div>
          
          <div id="centerInfo" class="space-y-4">
            <div class="py-3 border-b border-gray-100">
              <span class="text-sm text-gray-500 block mb-1">센터 이름</span>
              <span id="centerName" class="font-medium text-gray-900">-</span>
            </div>
            <div class="py-3 border-b border-gray-100">
              <span class="text-sm text-gray-500 block mb-1">시작의 계기</span>
              <span id="originStory" class="text-gray-700">-</span>
            </div>
            <div class="py-3 border-b border-gray-100">
              <span class="text-sm text-gray-500 block mb-1">운영 철학</span>
              <span id="carePhilosophy" class="text-gray-700">-</span>
            </div>
            <div class="py-3 border-b border-gray-100">
              <span class="text-sm text-gray-500 block mb-1">핵심 원칙</span>
              <span id="corePrinciple" class="text-gray-700">-</span>
            </div>
            <div class="py-3 border-b border-gray-100">
              <span class="text-sm text-gray-500 block mb-1">차별화 디테일</span>
              <span id="uniqueDetail" class="text-gray-700">-</span>
            </div>
            <div class="py-3 border-b border-gray-100">
              <span class="text-sm text-gray-500 block mb-1">비전</span>
              <span id="vision" class="text-gray-700">-</span>
            </div>
            <div class="py-3">
              <span class="text-sm text-gray-500 block mb-1">기타 강점</span>
              <span id="otherStrengths" class="text-gray-700">-</span>
            </div>
          </div>

          <div id="noCenterInfo" class="hidden text-center py-8">
            <i class="fas fa-building text-4xl text-gray-300 mb-4"></i>
            <p class="text-gray-500 mb-4">아직 센터 정보가 등록되지 않았습니다.</p>
            <a href="/onboarding" class="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors">
              <i class="fas fa-plus"></i>
              센터 정보 등록하기
            </a>
          </div>
        </div>

        {/* 크레딧 정보 */}
        <div class="bg-white rounded-2xl border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-lg font-bold text-gray-900">
              <i class="fas fa-coins text-primary-500 mr-2"></i>
              크레딧
            </h2>
            <a href="/pricing" class="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
              <i class="fas fa-plus"></i>
              충전하기
            </a>
          </div>
          
          {/* 현재 잔액 */}
          <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white mb-6">
            <p class="text-primary-100 text-sm mb-1">현재 잔액</p>
            <div class="flex items-baseline gap-2">
              <span class="text-4xl font-bold" id="creditBalance">--</span>
              <span class="text-primary-200">크레딧</span>
            </div>
          </div>

          {/* 크레딧 히스토리 */}
          <h3 class="text-sm font-semibold text-gray-700 mb-4">최근 사용 내역</h3>
          <div id="creditHistory" class="space-y-3">
            {/* 히스토리가 여기에 표시됩니다 */}
          </div>
          <div id="noCreditHistory" class="hidden text-center py-4 text-gray-500 text-sm">
            아직 사용 내역이 없습니다.
          </div>
        </div>

        {/* 로그아웃 */}
        <button onclick="handleLogout()" class="w-full py-4 border border-red-200 text-red-600 rounded-xl font-medium hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
          <i class="fas fa-sign-out-alt"></i>
          로그아웃
        </button>
      </main>

      {/* 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          let currentUser = null;
          let currentCenter = null;

          const contentTypeLabels = {
            'title': '블로그 제목',
            'blog': '블로그 글',
            'place': '네이버 플레이스',
            'carrot': '당근마켓',
            'thread': '스레드'
          };

          function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric'
            });
          }

          function formatDateTime(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: '2-digit', 
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            });
          }

          async function loadUserData() {
            try {
              const session = await SupabaseAuth.getSession();
              if (!session) {
                window.location.href = '/login';
                return;
              }

              currentUser = session.user;
              const userInfo = SupabaseAuth.formatUserInfo(currentUser);

              // 사용자 정보 표시
              document.getElementById('userEmail').textContent = currentUser.email;
              document.getElementById('userName').textContent = userInfo.name;
              document.getElementById('userCreatedAt').textContent = formatDate(currentUser.created_at);

              // 센터 정보 로드
              currentCenter = await SupabaseAuth.getUserCenter(currentUser.id);
              if (currentCenter) {
                document.getElementById('centerInfo').classList.remove('hidden');
                document.getElementById('noCenterInfo').classList.add('hidden');
                
                document.getElementById('centerName').textContent = currentCenter.center_name || '-';
                document.getElementById('originStory').textContent = currentCenter.origin_story || '-';
                document.getElementById('carePhilosophy').textContent = currentCenter.care_philosophy || '-';
                document.getElementById('corePrinciple').textContent = currentCenter.core_principle || '-';
                document.getElementById('uniqueDetail').textContent = currentCenter.unique_detail || '-';
                document.getElementById('vision').textContent = currentCenter.vision || '-';
                document.getElementById('otherStrengths').textContent = currentCenter.other_strengths || '-';
              } else {
                document.getElementById('centerInfo').classList.add('hidden');
                document.getElementById('noCenterInfo').classList.remove('hidden');
              }

              // 크레딧 정보 로드
              const credits = await SupabaseAuth.getUserCredits(currentUser.id);
              document.getElementById('creditBalance').textContent = credits;

              // 크레딧 히스토리 로드
              const history = await SupabaseAuth.getCreditHistory(currentUser.id, 5);
              if (history && history.length > 0) {
                document.getElementById('noCreditHistory').classList.add('hidden');
                document.getElementById('creditHistory').innerHTML = history.map(item => \`
                  <div class="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <span class="text-gray-900">\${contentTypeLabels[item.type] || item.type}</span>
                      <span class="text-xs text-gray-400 block">\${formatDateTime(item.created_at)}</span>
                    </div>
                    <span class="\${item.amount < 0 ? 'text-red-500' : 'text-green-500'} font-semibold">
                      \${item.amount > 0 ? '+' : ''}\${item.amount}
                    </span>
                  </div>
                \`).join('');
              } else {
                document.getElementById('noCreditHistory').classList.remove('hidden');
              }

            } catch (error) {
              console.error('Load user data error:', error);
            } finally {
              hideLoading();
            }
          }

          function openEditModal() {
            if (!currentCenter) return;
            
            document.getElementById('editCenterName').value = currentCenter.center_name || '';
            document.getElementById('editOriginStory').value = currentCenter.origin_story || '';
            document.getElementById('editCarePhilosophy').value = currentCenter.care_philosophy || '';
            document.getElementById('editCorePrinciple').value = currentCenter.core_principle || '';
            document.getElementById('editUniqueDetail').value = currentCenter.unique_detail || '';
            document.getElementById('editVision').value = currentCenter.vision || '';
            document.getElementById('editOtherStrengths').value = currentCenter.other_strengths || '';
            
            document.getElementById('editCenterModal').classList.remove('hidden');
          }

          function closeEditModal() {
            document.getElementById('editCenterModal').classList.add('hidden');
          }

          async function saveCenter() {
            const centerData = {
              centerName: document.getElementById('editCenterName').value.trim(),
              originStory: document.getElementById('editOriginStory').value.trim(),
              carePhilosophy: document.getElementById('editCarePhilosophy').value.trim(),
              corePrinciple: document.getElementById('editCorePrinciple').value.trim(),
              uniqueDetail: document.getElementById('editUniqueDetail').value.trim(),
              vision: document.getElementById('editVision').value.trim(),
              otherStrengths: document.getElementById('editOtherStrengths').value.trim()
            };

            if (!centerData.centerName) {
              SupabaseAuth.showToast('센터 이름을 입력해주세요', 'error');
              return;
            }

            document.getElementById('saveCenterBtn').disabled = true;

            try {
              await SupabaseAuth.updateCenter(currentCenter.id, centerData);
              currentCenter = { ...currentCenter, ...centerData };
              
              document.getElementById('centerName').textContent = centerData.centerName;
              document.getElementById('originStory').textContent = centerData.originStory || '-';
              document.getElementById('carePhilosophy').textContent = centerData.carePhilosophy || '-';
              document.getElementById('corePrinciple').textContent = centerData.corePrinciple || '-';
              document.getElementById('uniqueDetail').textContent = centerData.uniqueDetail || '-';
              document.getElementById('vision').textContent = centerData.vision || '-';
              document.getElementById('otherStrengths').textContent = centerData.otherStrengths || '-';
              
              closeEditModal();
              SupabaseAuth.showToast('센터 정보가 수정되었습니다', 'success');
            } catch (error) {
              console.error('Save center error:', error);
              SupabaseAuth.showToast('저장에 실패했습니다', 'error');
            } finally {
              document.getElementById('saveCenterBtn').disabled = false;
            }
          }

          async function handleLogout() {
            try {
              await SupabaseAuth.signOut();
              window.location.href = '/';
            } catch (error) {
              console.error('Logout error:', error);
              SupabaseAuth.showToast('로그아웃에 실패했습니다', 'error');
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
              await loadUserData();
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
