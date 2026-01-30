import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const LandingPage = () => {
  return (
    <div class="min-h-screen">
      <Header />
      
      {/* 히어로 섹션 */}
      <section class="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white py-20 lg:py-28">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              방문요양 마케팅,<br />
              <span class="text-primary-200">AI가 대신 써드립니다</span>
            </h1>
            <p class="text-lg sm:text-xl text-primary-100 mb-8 leading-relaxed">
              블로그 글, 네이버 플레이스 소개글, 당근마켓 홍보글까지<br class="hidden sm:block" />
              클릭 한 번으로 전문적인 마케팅 콘텐츠를 생성하세요.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/signup" class="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <i class="fas fa-rocket mr-2"></i>
                무료로 시작하기
              </a>
              <a href="#features" class="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
                기능 알아보기
              </a>
            </div>
            <p class="mt-6 text-primary-200 text-sm">
              <i class="fas fa-check mr-1"></i> 신용카드 없이 시작 가능
              <span class="mx-3">|</span>
              <i class="fas fa-check mr-1"></i> 첫 5회 무료 제공
            </p>
          </div>
        </div>
      </section>

      {/* 신뢰 배지 */}
      <section class="py-8 bg-white border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-wrap justify-center items-center gap-8 text-gray-500 text-sm">
            <div class="flex items-center gap-2">
              <i class="fas fa-shield-alt text-primary-500"></i>
              <span>안전한 데이터 보호</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-users text-primary-500"></i>
              <span>1,000+ 센터 이용중</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="fas fa-star text-primary-500"></i>
              <span>평균 만족도 4.8/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section id="features" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              5가지 핵심 기능
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              방문요양센터 마케팅에 필요한 모든 콘텐츠를 AI가 생성합니다
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 블로그 제목 */}
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-heading text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">블로그 제목 생성</h3>
              <p class="text-gray-600 mb-4">
                클릭을 부르는 매력적인 블로그 제목을 10개씩 생성합니다. SEO 최적화된 제목으로 검색 노출을 높이세요.
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <i class="fas fa-coins text-yellow-500 mr-2"></i>
                <span>1 크레딧 / 1회</span>
              </div>
            </div>

            {/* 블로그 글 */}
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-file-alt text-green-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">블로그 글 작성</h3>
              <p class="text-gray-600 mb-4">
                전문적이고 신뢰감 있는 블로그 글을 자동으로 작성합니다. 방문요양 관련 키워드로 최적화됩니다.
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <i class="fas fa-coins text-yellow-500 mr-2"></i>
                <span>5 크레딧 / 1회</span>
              </div>
            </div>

            {/* 네이버 플레이스 */}
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div class="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-map-marker-alt text-emerald-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">네이버 플레이스</h3>
              <p class="text-gray-600 mb-4">
                네이버 플레이스에 최적화된 센터 소개글을 생성합니다. 신뢰감과 전문성을 어필하세요.
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <i class="fas fa-coins text-yellow-500 mr-2"></i>
                <span>3 크레딧 / 1회</span>
              </div>
            </div>

            {/* 당근마켓 */}
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div class="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-carrot text-orange-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">당근마켓 홍보글</h3>
              <p class="text-gray-600 mb-4">
                지역 주민에게 친근하게 다가가는 당근마켓 홍보글을 작성합니다. 동네 이웃의 마음을 사로잡으세요.
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <i class="fas fa-coins text-yellow-500 mr-2"></i>
                <span>3 크레딧 / 1회</span>
              </div>
            </div>

            {/* 스레드 */}
            <div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <i class="fas fa-at text-purple-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">스레드/SNS 글</h3>
              <p class="text-gray-600 mb-4">
                스레드, 인스타그램에 올리기 좋은 짧고 임팩트 있는 글을 생성합니다. 해시태그도 함께 제공됩니다.
              </p>
              <div class="flex items-center text-sm text-gray-500">
                <i class="fas fa-coins text-yellow-500 mr-2"></i>
                <span>3 크레딧 / 1회</span>
              </div>
            </div>

            {/* CTA 카드 */}
            <div class="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white flex flex-col justify-center">
              <h3 class="text-xl font-bold mb-2">지금 바로 시작하세요!</h3>
              <p class="text-primary-100 mb-4">
                회원가입만 하면 5회 무료 이용권이 제공됩니다.
              </p>
              <a href="/signup" class="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-primary-50 transition-colors">
                무료 체험하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 요금제 섹션 */}
      <section id="pricing" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              합리적인 요금제
            </h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">
              센터 규모와 필요에 맞는 요금제를 선택하세요
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* 스타터 */}
            <div class="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 transition-colors">
              <div class="text-center mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">스타터</h3>
                <p class="text-gray-500 text-sm">처음 시작하는 센터에 추천</p>
              </div>
              <div class="text-center mb-6">
                <span class="text-4xl font-bold text-gray-900">19,900</span>
                <span class="text-gray-500">원/월</span>
              </div>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>월 30 크레딧</span>
                </li>
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>모든 기능 이용 가능</span>
                </li>
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>이메일 지원</span>
                </li>
              </ul>
              <a href="/signup" class="block w-full py-3 text-center border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                시작하기
              </a>
            </div>

            {/* 프로 - 인기 */}
            <div class="bg-white rounded-2xl p-8 border-2 border-primary-500 relative shadow-xl scale-105">
              <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span class="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  인기
                </span>
              </div>
              <div class="text-center mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">프로</h3>
                <p class="text-gray-500 text-sm">활발하게 운영하는 센터에 추천</p>
              </div>
              <div class="text-center mb-6">
                <span class="text-4xl font-bold text-gray-900">49,900</span>
                <span class="text-gray-500">원/월</span>
              </div>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>월 100 크레딧</span>
                </li>
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>모든 기능 이용 가능</span>
                </li>
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>우선 채팅 지원</span>
                </li>
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>콘텐츠 히스토리 저장</span>
                </li>
              </ul>
              <a href="/signup" class="block w-full py-3 text-center bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-600 transition-colors">
                시작하기
              </a>
            </div>

            {/* 비즈니스 */}
            <div class="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary-300 transition-colors">
              <div class="text-center mb-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">비즈니스</h3>
                <p class="text-gray-500 text-sm">여러 센터를 운영하는 분께 추천</p>
              </div>
              <div class="text-center mb-6">
                <span class="text-4xl font-bold text-gray-900">99,900</span>
                <span class="text-gray-500">원/월</span>
              </div>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>월 300 크레딧</span>
                </li>
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>모든 기능 이용 가능</span>
                </li>
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>전담 매니저 배정</span>
                </li>
                <li class="flex items-center text-gray-600">
                  <i class="fas fa-check text-primary-500 mr-3"></i>
                  <span>다중 센터 관리</span>
                </li>
              </ul>
              <a href="/signup" class="block w-full py-3 text-center border-2 border-primary-500 text-primary-600 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                시작하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section class="py-16 bg-gradient-to-r from-primary-600 to-primary-700">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-2xl lg:text-3xl font-bold text-white mb-4">
            마케팅 고민, 이제 AI에게 맡기세요
          </h2>
          <p class="text-primary-100 mb-8 text-lg">
            3분이면 가입 완료! 지금 바로 무료로 체험해보세요.
          </p>
          <a href="/signup" class="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-50 transition-all shadow-lg">
            무료로 시작하기 <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
