export const Footer = () => {
  return (
    <footer class="bg-gray-900 text-gray-400 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 로고 & 설명 */}
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <i class="fas fa-pen-fancy text-white text-lg"></i>
              </div>
              <span class="text-xl font-bold text-white">케어콘텐츠<span class="text-primary-400">AI</span></span>
            </div>
            <p class="text-sm leading-relaxed">
              방문요양센터의 마케팅 콘텐츠를 AI가 대신 작성해드립니다.<br />
              블로그, 네이버 플레이스, 당근마켓, 스레드까지 한 번에!
            </p>
          </div>
          
          {/* 서비스 */}
          <div>
            <h4 class="text-white font-semibold mb-4">서비스</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#features" class="hover:text-white transition-colors">기능 소개</a></li>
              <li><a href="#pricing" class="hover:text-white transition-colors">요금제</a></li>
              <li><a href="/dashboard" class="hover:text-white transition-colors">대시보드</a></li>
            </ul>
          </div>
          
          {/* 고객지원 */}
          <div>
            <h4 class="text-white font-semibold mb-4">고객지원</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition-colors">이용약관</a></li>
              <li><a href="#" class="hover:text-white transition-colors">개인정보처리방침</a></li>
              <li><a href="#" class="hover:text-white transition-colors">문의하기</a></li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© 2025 케어콘텐츠AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
