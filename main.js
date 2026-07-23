// Kakao Golf 랜딩페이지 - 기본 상호작용

document.addEventListener('DOMContentLoaded', () => {

  // 1) 예약 카드: Dosmetic / International 토글
  const toggleItems = document.querySelectorAll('.toggle div');
  toggleItems.forEach(item => {
    item.addEventListener('click', () => {
      toggleItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // 2) 코스 예약 카드: 날짜 pill 선택
  const datePills = document.querySelectorAll('.date-pill');
  datePills.forEach(pill => {
    pill.addEventListener('click', () => {
      datePills.forEach(el => el.classList.remove('active'));
      pill.classList.add('active');
    });
  });

  // 3) 예시용 버튼 클릭 안내 (실제 서비스 연결 전 임시 alert)
  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      alert('티타임 검색 기능은 준비 중입니다.');
    });
  }

  const signupBtns = document.querySelectorAll('.signup-btn, .auth-row button:nth-child(2)');
  signupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('회원가입 페이지로 이동합니다. (준비 중)');
    });
  });

  const bookBtn = document.querySelector('.book-btn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      alert('예약 페이지로 이동합니다. (준비 중)');
    });
  }

  // 4) 리뷰 캐러셀: 마우스 드래그로 스크롤
  const track = document.querySelector('.reviews-track');
  if (track) {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.style.cursor = 'grabbing';
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener('mouseleave', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });
    track.addEventListener('mouseup', () => {
      isDown = false;
      track.style.cursor = 'grab';
    });
    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.2;
      track.scrollLeft = scrollLeft - walk;
    });
  }

});

