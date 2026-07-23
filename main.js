// Kakao Golf 랜딩페이지 - 기본 상호작용

document.addEventListener("DOMContentLoaded", () => {
  // 1) 예약 카드: Dosmetic / International 토글
  const toggleItems = document.querySelectorAll(".toggle div");
  toggleItems.forEach((item) => {
    item.addEventListener("click", () => {
      toggleItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");
    });
  });

  // 2) 코스 예약 카드: 날짜 pill 선택
  const datePills = document.querySelectorAll(".date-pill");
  datePills.forEach((pill) => {
    pill.addEventListener("click", () => {
      datePills.forEach((el) => el.classList.remove("active"));
      pill.classList.add("active");
    });
  });

  // 3) 예시용 버튼 클릭 안내 (실제 서비스 연결 전 임시 alert)
  const searchBtn = document.querySelector(".search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      alert("티타임 검색 기능은 준비 중입니다.");
    });
  }

  const signupBtns = document.querySelectorAll(
    ".signup-btn, .auth-row button:nth-child(2)",
  );
  signupBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("회원가입 페이지로 이동합니다. (준비 중)");
    });
  });

  const bookBtn = document.querySelector(".book-btn");
  if (bookBtn) {
    bookBtn.addEventListener("click", () => {
      alert("예약 페이지로 이동합니다. (준비 중)");
    });
  }

  // 4) 리뷰 캐러셀: 자동 슬라이드(무한루프) + 마우스/터치 드래그
  const track = document.querySelector(".reviews-track");
  if (track) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let hovering = false;

    const pointerDown = (x) => {
      isDown = true;
      track.style.cursor = "grabbing";
      startX = x - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };
    const pointerMove = (x) => {
      if (!isDown) return;
      const cx = x - track.offsetLeft;
      const walk = (cx - startX) * 1.2;
      track.scrollLeft = scrollLeft - walk;
    };
    const pointerUp = () => {
      isDown = false;
      track.style.cursor = "grab";
    };

    // 마우스 드래그
    track.addEventListener("mousedown", (e) => pointerDown(e.pageX));
    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      pointerMove(e.pageX);
    });
    track.addEventListener("mouseup", pointerUp);
    track.addEventListener("mouseleave", () => {
      pointerUp();
      hovering = false;
    });
    track.addEventListener("mouseenter", () => {
      hovering = true;
    });

    // 터치 드래그 (모바일 스와이프)
    track.addEventListener(
      "touchstart",
      (e) => pointerDown(e.touches[0].pageX),
      { passive: true },
    );
    track.addEventListener(
      "touchmove",
      (e) => pointerMove(e.touches[0].pageX),
      { passive: true },
    );
    track.addEventListener("touchend", pointerUp);

    // 자동 슬라이드: 카드 세트가 2번 반복되어 있으므로 절반 지점에서 자연스럽게 리셋
    const autoScroll = () => {
      if (!isDown && !hovering) {
        track.scrollLeft += 0.6;
        const half = track.scrollWidth / 2;
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half;
        }
      }
      requestAnimationFrame(autoScroll);
    };
    requestAnimationFrame(autoScroll);
  }

  // 5) AI 섹션 슬라이더 (4장, 화살표 + 도트 + 자동재생)
  const slider = document.querySelector(".ai-slider");
  if (slider) {
    const slidesTrack = slider.querySelector(".ai-slides");
    const slides = slider.querySelectorAll(".ai-slide");
    const dots = slider.querySelectorAll(".ai-dot");
    const prevBtn = slider.querySelector(".ai-arrow.prev");
    const nextBtn = slider.querySelector(".ai-arrow.next");
    const total = slides.length;
    let current = 0;
    let autoTimer = null;

    function goTo(index) {
      current = (index + total) % total;
      slidesTrack.style.transform = `translateX(-${current * (100 / total)}%)`;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
    }

    function next() {
      goTo(current + 1);
    }

    function prev() {
      goTo(current - 1);
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, 5000);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    nextBtn.addEventListener("click", () => {
      next();
      startAuto();
    });
    prevBtn.addEventListener("click", () => {
      prev();
      startAuto();
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        goTo(Number(dot.dataset.index));
        startAuto();
      });
    });

    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    goTo(0);
    startAuto();
  }

  // 6) pro-section 숫자 카운팅 애니메이션 (3M+, 500+, 12M+ 등)
  const statNums = document.querySelectorAll(".pro-section .stat-num");
  if (statNums.length) {
    const animateCount = (el, duration = 1500) => {
      const raw = el.textContent.trim();
      const match = raw.match(/^([\d.]+)(.*)$/);
      if (!match) return;
      const target = parseFloat(match[1]);
      const suffix = match[2];
      const hasDecimal = match[1].includes(".");
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out
        const current = target * eased;
        el.textContent =
          (hasDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = (hasDecimal ? target.toFixed(1) : target) + suffix;
        }
      };
      requestAnimationFrame(step);
    };

    const statObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    statNums.forEach((el) => statObserver.observe(el));
  }
  // 7) Steps 순차 등장
  const steps = document.querySelectorAll(".step");

  if (steps.length) {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((step, index) => {
              setTimeout(() => {
                step.classList.add("show");
              }, index * 300);
            });

            stepObserver.disconnect();
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    stepObserver.observe(document.querySelector(".steps-section"));
  }

  // Gift Cards 순차 등장

  const giftCards = document.querySelectorAll(".gift-card");

  if (giftCards.length) {
    const giftObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            giftCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("show");
              }, index * 220);
            });

            giftObserver.disconnect();
          }
        });
      },
      {
        threshold: 0.3,
      },
    );

    giftObserver.observe(document.querySelector(".gift-section"));
  }
});
