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



/* ===== MULTI-ITEM CART ===== */
const orderRows = document.querySelectorAll('.order-item-row');
const orderTotalEl = document.getElementById('orderTotal');
let cartTotal = 0;

orderRows.forEach(row => {
  const decBtn = row.querySelector('.decrement');
  const incBtn = row.querySelector('.increment');
  const qtyEl = row.querySelector('.qty-count');

  decBtn && decBtn.addEventListener('click', () => {
    let qty = parseInt(qtyEl.innerText);
    if (qty > 0) { qtyEl.innerText = --qty; updateTotal(); }
  });

  incBtn && incBtn.addEventListener('click', () => {
    let qty = parseInt(qtyEl.innerText);
    if (qty < 20) { qtyEl.innerText = ++qty; updateTotal(); }
  });
});

function updateTotal() {
  cartTotal = 0;
  orderRows.forEach(row => {
    const qty = parseInt(row.querySelector('.qty-count').innerText);
    const price = parseInt(row.getAttribute('data-price'));
    cartTotal += qty * price;
  });
  if (orderTotalEl) orderTotalEl.innerText = `₹${cartTotal}`;
}

/* ===== WHATSAPP ORDER SUBMIT ===== */
const orderForm = document.getElementById('orderForm');
if (orderForm) {
  orderForm.addEventListener('submit', e => {
    e.preventDefault();

    if (cartTotal === 0) {
      alert('Please select at least one item to order!');
      return;
    }

    const name = document.getElementById('customerName')?.value || '';
    const phone = document.getElementById('customerPhone')?.value || '';
    const address = document.getElementById('customerAddress')?.value || '';
    const message = document.getElementById('customerMessage')?.value || '';

    let itemsStr = '';
    orderRows.forEach(row => {
      const qty = parseInt(row.querySelector('.qty-count').innerText);
      const name = row.getAttribute('data-name');
      const price = parseInt(row.getAttribute('data-price'));
      if (qty > 0) itemsStr += `%0A• ${name}  x${qty} (₹${price * qty})`;
    });

    const phoneNumber = '918976108492';
    const msg = [
      'Hello Noumeer Delights!%0A',
      '*New Order Request*%0A',
      '------------------------%0A',
      `*Name:* ${name}%0A`,
      `*Phone:* ${phone}%0A`,
      `*Address:* ${address}%0A%0A`,
      `*Items Ordered:*${itemsStr}%0A%0A`,
      `*Total Amount:* ₹${cartTotal}%0A%0A`,
      `*Special Request:* ${message || 'None'}%0A`,
      '------------------------%0A',
      'Looking forward to my order!'
    ].join('');

    window.open(`https://wa.me/${phoneNumber}?text=${msg}`, '_blank');
  });
}
