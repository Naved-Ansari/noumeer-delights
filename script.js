// ============================================================
//  Noumeer Delights — Main Script
// ============================================================

/* ===== PRELOADER ===== */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
    }, 1200);
  }
});

/* ===== SCROLL PROGRESS BAR ===== */
const scrollProgressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (scrollProgressBar) {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = progress + '%';
  }
}, { passive: true });

/* ===== STICKY HEADER ===== */
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 50);
  }, { passive: true });
}

/* ===== MOBILE MENU TOGGLE ===== */
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navBackdrop = document.getElementById('nav-backdrop');
const navItems = document.querySelectorAll('.nav-links li a');

function closeNav() {
  navLinks && navLinks.classList.remove('active');
  navBackdrop && navBackdrop.classList.remove('active');
  if (mobileMenu) mobileMenu.innerHTML = '<span></span><span></span><span></span>';
}

if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navBackdrop && navBackdrop.classList.toggle('active', isOpen);
    mobileMenu.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<span></span><span></span><span></span>';
  });
}

navBackdrop && navBackdrop.addEventListener('click', closeNav);
navItems.forEach(item => item.addEventListener('click', closeNav));



/* ===== COOKIE CONSENT ===== */
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
const cookieDecline = document.getElementById('cookie-decline');

if (cookieBanner) {
  const consent = localStorage.getItem('cookie-consent');
  if (!consent) {
    setTimeout(() => cookieBanner.classList.add('show'), 1800);
  }

  const dismissBanner = (choice) => {
    cookieBanner.classList.remove('show');
    localStorage.setItem('cookie-consent', choice);
  };

  cookieAccept && cookieAccept.addEventListener('click', () => dismissBanner('accepted'));
  cookieDecline && cookieDecline.addEventListener('click', () => dismissBanner('declined'));
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    if (el.getBoundingClientRect().top < windowHeight - 80) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll();

/* ===== STATS COUNTER ANIMATION ===== */
const statNumbers = document.querySelectorAll('.stat-number[data-target]');

const animateCounter = (el) => {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

/* ===== FAQ ACCORDION ===== */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (question && answer) {
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAnswer = other.querySelector('.faq-answer');
          otherAnswer && otherAnswer.classList.remove('open');
          const otherBtn = other.querySelector('.faq-question');
          otherBtn && otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle this one
      item.classList.toggle('active', !isOpen);
      answer.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  }
});



/* ===== WHATSAPP ORDER SUBMIT ===== */
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = document.getElementById('customerName')?.value || '';
    const phone = document.getElementById('customerPhone')?.value || '';
    const address = document.getElementById('customerAddress')?.value || '';
    const message = document.getElementById('customerMessage')?.value || '';

    const phoneNumber = '918976108492';
    const msg = [
      'Hello Noumeer Delights!%0A',
      '*New Order Inquiry*%0A',
      '------------------------%0A',
      `*Name:* ${name}%0A`,
      `*Phone:* ${phone}%0A`,
      `*Address:* ${address}%0A%0A`,
      `*Details / Inquiry:* ${message || 'I would like to order delicious desserts.'}%0A`,
      '------------------------%0A',
      'Looking forward to your reply!'
    ].join('');

    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
  });
}

/* ===== HERO BACKGROUND SLIDER ===== */
const heroSlides = document.querySelectorAll('.hero-bg-slide');
const heroDots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
let slideInterval = null;

function goToSlide(index) {
  heroSlides[currentSlide]?.classList.remove('active');
  heroDots[currentSlide]?.classList.remove('active');
  currentSlide = (index + heroSlides.length) % heroSlides.length;
  heroSlides[currentSlide]?.classList.add('active');
  heroDots[currentSlide]?.classList.add('active');
}

function startSlider() {
  slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
}

function resetSlider() {
  clearInterval(slideInterval);
  startSlider();
}

if (heroSlides.length > 0) {
  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      resetSlider();
    });
  });
  startSlider();
}

/* ===== HERO PARTICLES ===== */
(function () {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('hero-particles');
  if (!container) return;

  container.appendChild(canvas);
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';

  const particles = [];
  const PARTICLE_COUNT = 55;

  function resize() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: -(Math.random() * 0.5 + 0.2),
      alpha: Math.random() * 0.5 + 0.1,
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 166, 35, ${p.alpha})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      // Reset when out of bounds
      if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
    });
    requestAnimationFrame(drawParticles);
  }

  drawParticles();
})();

/* ===== MENU TABS ===== */
const menuTabs = document.querySelectorAll('.menu-tab');
const menuPanels = document.querySelectorAll('.menu-panel');

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.getAttribute('data-category');

    // Update tab active state
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update panel active state
    menuPanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === `panel-${category}`) {
        panel.classList.add('active');
        // Re-trigger reveal animations for newly shown items
        panel.querySelectorAll('.reveal').forEach(el => {
          el.classList.remove('active');
          setTimeout(() => el.classList.add('active'), 50);
        });
      }
    });
  });
});
