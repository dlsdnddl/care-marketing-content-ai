export const OnboardingPage = () => {
  return (
    <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      {/* 헤더 */}
      <header class="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div class="max-w-3xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <i class="fas fa-pen-fancy text-white text-lg"></i>
              </div>
              <span class="text-xl font-bold text-gray-900">케어콘텐츠<span class="text-primary-500">AI</span></span>
            </div>
            <span class="text-sm text-gray-500">센터 정보 등록</span>
          </div>
        </div>
      </header>
      
      {/* 진행 상태 바 */}
      <div class="bg-white border-b border-gray-100">
        <div class="max-w-3xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-600" id="stepLabel">1단계 / 7단계</span>
            <span class="text-sm text-gray-500" id="stepTitle">센터 이름</span>
          </div>
          <div class="flex gap-2">
            <div class="step-dot h-2 rounded-full bg-primary-500 flex-1 transition-all" data-step="1"></div>
            <div class="step-dot h-2 rounded-full bg-gray-200 flex-1 transition-all" data-step="2"></div>
            <div class="step-dot h-2 rounded-full bg-gray-200 flex-1 transition-all" data-step="3"></div>
            <div class="step-dot h-2 rounded-full bg-gray-200 flex-1 transition-all" data-step="4"></div>
            <div class="step-dot h-2 rounded-full bg-gray-200 flex-1 transition-all" data-step="5"></div>
            <div class="step-dot h-2 rounded-full bg-gray-200 flex-1 transition-all" data-step="6"></div>
            <div class="step-dot h-2 rounded-full bg-gray-200 flex-1 transition-all" data-step="7"></div>
          </div>
        </div>
      </div>
      
      {/* 채팅 영역 */}
      <main class="max-w-3xl mx-auto px-4 py-6 pb-32">
        <div id="chatContainer" class="space-y-4">
          {/* 초기 환영 메시지 */}
          <div class="flex gap-3 ai-message" data-step="0">
            <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i class="fas fa-robot text-white"></i>
            </div>
            <div class="flex-1">
              <div class="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 max-w-lg">
                <p class="text-gray-800 leading-relaxed">
                  안녕하세요, 원장님! 👋<br /><br />
                  케어콘텐츠AI의 브랜딩 인터뷰에 오신 것을 환영합니다.<br /><br />
                  지금부터 몇 가지 질문을 통해 원장님 센터만의 특별한 이야기를 들려주세요. 
                  이 정보를 바탕으로 원장님 센터에 딱 맞는 마케팅 콘텐츠를 만들어 드릴게요! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* 입력 영역 */}
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div class="max-w-3xl mx-auto px-4 py-4">
          {/* 예시 보기 영역 */}
          <div id="examplesContainer" class="hidden mb-3">
            <button 
              type="button" 
              onclick="toggleExamples()"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium mb-2 flex items-center gap-1"
            >
              <i class="fas fa-lightbulb"></i>
              <span id="exampleToggleText">예시 보기</span>
              <i class="fas fa-chevron-down text-xs" id="exampleToggleIcon"></i>
            </button>
            <div id="examplesList" class="hidden space-y-2">
              {/* 예시들이 여기에 동적으로 추가됨 */}
            </div>
          </div>
          
          {/* 입력 폼 */}
          <form id="inputForm" class="flex gap-3">
            <div class="flex-1 relative">
              <textarea 
                id="userInput"
                placeholder="답변을 입력해주세요..."
                rows="1"
                class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none overflow-hidden"
                style="min-height: 48px; max-height: 120px;"
              ></textarea>
            </div>
            <button 
              type="submit"
              id="sendBtn"
              class="bg-primary-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span class="hidden sm:inline">전송</span>
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
      
      {/* 완료 모달 */}
      <div id="completionModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 hidden">
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-xl">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-check text-green-500 text-4xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">등록이 완료되었습니다! 🎉</h2>
          <p class="text-gray-600 mb-6">
            원장님 센터의 소중한 이야기를 들려주셔서 감사합니다.<br />
            이제 맞춤형 마케팅 콘텐츠를 만들어 보세요!
          </p>
          <button 
            onclick="goToDashboard()"
            class="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors"
          >
            대시보드로 이동 <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
      
      {/* 로딩 오버레이 */}
      <div id="loadingOverlay" class="fixed inset-0 bg-white/80 flex items-center justify-center z-40">
        <div class="text-center">
          <i class="fas fa-spinner fa-spin text-4xl text-primary-500 mb-4"></i>
          <p class="text-gray-600">로딩 중...</p>
        </div>
      </div>
      
      {/* 온보딩 스크립트 */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // 질문 데이터
          const questions = [
            {
              step: 1,
              title: '센터 이름',
              question: '안녕하세요! 먼저 원장님께서 운영하시는 센터의 이름을 알려주시겠어요?',
              examples: [],
              field: 'centerName'
            },
            {
              step: 2,
              title: '시작의 계기',
              question: "왜 '시니어 케어' 분야를 선택하셨나요? 센터를 열게 된 계기가 있다면 들려주세요.",
              examples: [
                '부모님을 직접 모셨던 경험 때문에 시작하게 되었어요.',
                '병원 근무 시절 어르신들을 보며 더 나은 돌봄이 필요하다고 느꼈습니다.',
                '사회복지사로 일하며 요양 분야의 필요성을 절감했어요.'
              ],
              field: 'originStory'
            },
            {
              step: 3,
              title: '운영 철학',
              question: "원장님이 생각하시는 '진정한 돌봄'이란 무엇인가요?",
              examples: [
                '어르신의 하루가 의미 있도록 작은 것부터 챙기는 것이에요.',
                '내 집 같은 편안함 속에서 존엄성을 지키는 것이라 생각해요.',
                '어르신이 웃으실 수 있는 일상을 만들어 드리는 것입니다.'
              ],
              field: 'carePhilosophy'
            },
            {
              step: 4,
              title: '핵심 원칙',
              question: '우리 센터는 이것만큼은 절대 타협하지 않는다! 하는 원칙이 있나요?',
              examples: [
                '식사는 무조건 당일 조리, 신선한 재료만 사용합니다.',
                '어르신 의사를 먼저 여쭙고, 강요하지 않아요.',
                '보호자 연락은 당일 내에 반드시 회신합니다.'
              ],
              field: 'corePrinciple'
            },
            {
              step: 5,
              title: '차별화 디테일',
              question: '다른 센터와 다르게 우리 센터만 특별히 신경 쓰는 디테일이 있나요?',
              examples: [
                '어르신을 성함으로 불러드리고, 존댓말을 사용해요.',
                '매월 보호자와 1:1 통화로 상황을 공유합니다.',
                '어르신 취미에 맞춘 개별 프로그램을 운영해요.'
              ],
              field: 'uniqueDetail'
            },
            {
              step: 6,
              title: '최종 비전',
              question: '10년 후, 이 센터가 어떤 모습으로 기억되길 바라시나요?',
              examples: [
                '자녀들이 부모님 모시고 싶어하는 곳으로 기억되면 좋겠어요.',
                '지역의 어르신 사랑방 같은 따뜻한 곳이 되고 싶습니다.',
                '시니어 케어의 새로운 기준을 만드는 센터가 되고 싶어요.'
              ],
              field: 'vision'
            },
            {
              step: 7,
              title: '기타 강점',
              question: '마지막으로, 꼭 자랑하고 싶은 센터의 강점이 있다면 자유롭게 말씀해주세요!',
              examples: [
                '요양보호사 평균 근속 5년, 안정적인 돌봄을 제공합니다.',
                '센터 내 텃밭을 운영해서 어르신들이 직접 가꾸세요.',
                '물리치료사가 상주하여 재활 프로그램을 진행합니다.'
              ],
              field: 'otherStrengths'
            }
          ];
          
          // 상태 관리
          let currentStep = 1;
          let answers = {};
          let isExamplesOpen = false;
          
          // DOM 요소
          const chatContainer = document.getElementById('chatContainer');
          const inputForm = document.getElementById('inputForm');
          const userInput = document.getElementById('userInput');
          const sendBtn = document.getElementById('sendBtn');
          const examplesContainer = document.getElementById('examplesContainer');
          const examplesList = document.getElementById('examplesList');
          const stepLabel = document.getElementById('stepLabel');
          const stepTitle = document.getElementById('stepTitle');
          const loadingOverlay = document.getElementById('loadingOverlay');
          const completionModal = document.getElementById('completionModal');
          
          // 초기화
          document.addEventListener('DOMContentLoaded', async function() {
            try {
              await SupabaseAuth.init();
              
              // 인증 확인
              const session = await SupabaseAuth.getSession();
              if (!session) {
                window.location.href = '/login';
                return;
              }
              
              // 이미 센터 정보가 있으면 대시보드로
              const center = await SupabaseAuth.getUserCenter(session.user.id);
              if (center) {
                window.location.href = '/dashboard';
                return;
              }
              
              // 첫 질문 표시
              setTimeout(() => {
                showQuestion(1);
                hideLoading();
              }, 500);
              
            } catch (error) {
              console.error('Onboarding init error:', error);
              hideLoading();
            }
          });
          
          // 로딩 숨기기
          function hideLoading() {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
              loadingOverlay.style.display = 'none';
            }, 300);
          }
          
          // 질문 표시
          function showQuestion(step) {
            const question = questions[step - 1];
            if (!question) return;
            
            currentStep = step;
            updateProgress(step);
            
            // AI 질문 메시지 추가
            const messageHtml = \`
              <div class="flex gap-3 ai-message animate-fade-in" data-step="\${step}">
                <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-robot text-white"></i>
                </div>
                <div class="flex-1">
                  <div class="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 max-w-lg">
                    <p class="text-gray-800 leading-relaxed">\${question.question}</p>
                  </div>
                </div>
              </div>
            \`;
            
            chatContainer.insertAdjacentHTML('beforeend', messageHtml);
            
            // 예시 설정
            if (question.examples.length > 0) {
              examplesContainer.classList.remove('hidden');
              examplesList.innerHTML = question.examples.map(ex => \`
                <button 
                  type="button"
                  onclick="selectExample('\${ex.replace(/'/g, "\\\\'")}')"
                  class="block w-full text-left px-3 py-2 bg-gray-50 hover:bg-primary-50 rounded-lg text-sm text-gray-600 hover:text-primary-700 transition-colors"
                >
                  "\${ex}"
                </button>
              \`).join('');
            } else {
              examplesContainer.classList.add('hidden');
            }
            
            // 스크롤
            scrollToBottom();
            userInput.focus();
          }
          
          // 진행 상태 업데이트
          function updateProgress(step) {
            stepLabel.textContent = \`\${step}단계 / 7단계\`;
            stepTitle.textContent = questions[step - 1]?.title || '';
            
            document.querySelectorAll('.step-dot').forEach((dot, i) => {
              if (i + 1 <= step) {
                dot.classList.remove('bg-gray-200');
                dot.classList.add('bg-primary-500');
              } else {
                dot.classList.remove('bg-primary-500');
                dot.classList.add('bg-gray-200');
              }
            });
          }
          
          // 예시 토글
          function toggleExamples() {
            isExamplesOpen = !isExamplesOpen;
            examplesList.classList.toggle('hidden', !isExamplesOpen);
            document.getElementById('exampleToggleText').textContent = isExamplesOpen ? '예시 닫기' : '예시 보기';
            document.getElementById('exampleToggleIcon').style.transform = isExamplesOpen ? 'rotate(180deg)' : '';
          }
          
          // 예시 선택
          function selectExample(text) {
            userInput.value = text;
            userInput.style.height = 'auto';
            userInput.style.height = userInput.scrollHeight + 'px';
            isExamplesOpen = false;
            examplesList.classList.add('hidden');
            document.getElementById('exampleToggleText').textContent = '예시 보기';
            document.getElementById('exampleToggleIcon').style.transform = '';
            userInput.focus();
          }
          
          // 스크롤
          function scrollToBottom() {
            setTimeout(() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
              });
            }, 100);
          }
          
          // 사용자 답변 추가
          function addUserMessage(text) {
            const messageHtml = \`
              <div class="flex gap-3 justify-end user-message animate-fade-in" data-step="\${currentStep}">
                <div class="flex-1 flex justify-end">
                  <div class="bg-primary-500 text-white rounded-2xl rounded-tr-none p-4 shadow-sm max-w-lg">
                    <p class="leading-relaxed">\${text}</p>
                  </div>
                </div>
                <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-user text-gray-500"></i>
                </div>
              </div>
            \`;
            
            chatContainer.insertAdjacentHTML('beforeend', messageHtml);
            scrollToBottom();
          }
          
          // 폼 제출
          inputForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const text = userInput.value.trim();
            if (!text) return;
            
            // 답변 저장
            const question = questions[currentStep - 1];
            answers[question.field] = text;
            
            // 사용자 메시지 표시
            addUserMessage(text);
            
            // 입력 초기화
            userInput.value = '';
            userInput.style.height = '48px';
            
            // 다음 단계로
            if (currentStep < 7) {
              sendBtn.disabled = true;
              setTimeout(() => {
                showQuestion(currentStep + 1);
                sendBtn.disabled = false;
              }, 800);
            } else {
              // 완료 처리
              await completeOnboarding();
            }
          });
          
          // 온보딩 완료
          async function completeOnboarding() {
            sendBtn.disabled = true;
            
            // 완료 메시지
            const completeHtml = \`
              <div class="flex gap-3 ai-message animate-fade-in">
                <div class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-robot text-white"></i>
                </div>
                <div class="flex-1">
                  <div class="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 max-w-lg">
                    <p class="text-gray-800 leading-relaxed">
                      감사합니다! 원장님의 소중한 이야기를 잘 담았어요. 💝<br /><br />
                      센터 정보를 저장하고 있습니다...
                    </p>
                  </div>
                </div>
              </div>
            \`;
            chatContainer.insertAdjacentHTML('beforeend', completeHtml);
            scrollToBottom();
            
            try {
              // Supabase에 저장
              await SupabaseAuth.saveCenter(answers);
              
              // 완료 모달 표시
              setTimeout(() => {
                completionModal.classList.remove('hidden');
              }, 1500);
              
            } catch (error) {
              console.error('Save error:', error);
              
              const errorHtml = \`
                <div class="flex gap-3 ai-message animate-fade-in">
                  <div class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-exclamation text-white"></i>
                  </div>
                  <div class="flex-1">
                    <div class="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-red-200 max-w-lg">
                      <p class="text-red-600 leading-relaxed">
                        저장 중 오류가 발생했습니다. 다시 시도해주세요.<br />
                        <small class="text-gray-500">\${error.message}</small>
                      </p>
                    </div>
                  </div>
                </div>
              \`;
              chatContainer.insertAdjacentHTML('beforeend', errorHtml);
              scrollToBottom();
              sendBtn.disabled = false;
            }
          }
          
          // 대시보드로 이동
          function goToDashboard() {
            window.location.href = '/dashboard';
          }
          
          // textarea 자동 높이 조절
          userInput.addEventListener('input', function() {
            this.style.height = '48px';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
          });
          
          // Enter로 전송 (Shift+Enter는 줄바꿈)
          userInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              inputForm.dispatchEvent(new Event('submit'));
            }
          });
        `
      }} />
      
      {/* 스타일 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out forwards;
          }
          #loadingOverlay {
            transition: opacity 0.3s;
          }
        `
      }} />
    </div>
  )
}
