export const Header = ({ showLogin = true, isLoggedIn = false }: { showLogin?: boolean, isLoggedIn?: boolean }) => {
  return (
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
          
          {/* 네비게이션 */}
          {showLogin && !isLoggedIn && (
            <div class="flex items-center gap-4">
              <a href="/login" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                로그인
              </a>
              <a href="/signup" class="bg-primary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                무료로 시작하기
              </a>
            </div>
          )}
          
          {isLoggedIn && (
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2 bg-primary-50 px-3 py-1.5 rounded-full">
                <i class="fas fa-coins text-primary-500"></i>
                <span class="font-semibold text-primary-700">15 크레딧</span>
              </div>
              <a href="/dashboard" class="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                <i class="fas fa-user-circle text-2xl"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
