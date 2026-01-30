// 케어콘텐츠AI 메인 JavaScript

// DOM 로드 완료 시 실행
document.addEventListener('DOMContentLoaded', function() {
  // 스무스 스크롤 (앵커 링크)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 카드 호버 효과
  document.querySelectorAll('.card-hover').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // 페이드인 애니메이션
  const fadeElements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));
});

// 유틸리티 함수: 텍스트 복사
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('클립보드에 복사되었습니다!');
  }).catch(err => {
    console.error('복사 실패:', err);
    alert('복사에 실패했습니다.');
  });
}

// 유틸리티 함수: 로그아웃
function logout() {
  localStorage.removeItem('user');
  window.location.href = '/';
}

// 유틸리티 함수: 로그인 상태 확인
function isLoggedIn() {
  return localStorage.getItem('user') !== null;
}

// 유틸리티 함수: 사용자 정보 가져오기
function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

console.log('케어콘텐츠AI - 방문요양 마케팅 AI 도우미');
