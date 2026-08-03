// =============================================
// YASHVANTH REDDY - Clinical Supply Chain
// Portfolio JavaScript
// =============================================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ---- Active nav link ----
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.right = '24px';
    navLinks.style.background = 'rgba(10,14,26,0.98)';
    navLinks.style.padding = '16px';
    navLinks.style.borderRadius = '12px';
    navLinks.style.border = '1px solid rgba(255,255,255,0.1)';
    navLinks.style.zIndex = '1000';
  });
}

// ---- Particle canvas ----
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const particlesDiv = document.getElementById('particles');
if (particlesDiv) {
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  particlesDiv.appendChild(canvas);

  let particles = [];
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '0,196,204' : '15,76,129';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 100; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,196,204,${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// ---- Intersection Observer for scroll animations ----
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -60px 0px' };

// Fade-in animation
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.pillar-card, .proj-card, .edu-card, .timeline-card, .speaking-card, .contact-card').forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// ---- Animated counters ----
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.metric-number').forEach(el => {
  counterObserver.observe(el);
});

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1800;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    current = Math.min(Math.round(increment * step), target);
    el.textContent = prefix + current + suffix;
    if (step >= steps) clearInterval(timer);
  }, duration / steps);
}

// ---- Skill bars animation ----
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
          bar.style.width = width + '%';
        }, 200);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-bars').forEach(el => {
  skillBarObserver.observe(el);
});

// ---- Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navLinks.style.display === 'flex' && navLinks.style.flexDirection === 'column') {
        navLinks.style.display = 'none';
      }
    }
  });
});

// ---- Stagger animations for grid items ----
function staggerFadeIn(selector, delay = 100) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  elements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}

staggerFadeIn('.metric-card', 80);
staggerFadeIn('.proj-card', 100);
staggerFadeIn('.edu-card', 120);
staggerFadeIn('.pillar-card', 100);

// ===================== STORIES FILTER & EXPAND =====================
document.addEventListener('DOMContentLoaded', function () {
  // Filter buttons
  const filterBtns = document.querySelectorAll('.story-filter-btn');
  const storyCards = document.querySelectorAll('.story-card');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      storyCards.forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-value') === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Expand/collapse story bodies
  document.querySelectorAll('.story-expand-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var card = btn.closest('.story-card');
      var body = card.querySelector('.story-body');
      var isOpen = body.classList.contains('expanded');
      body.classList.toggle('expanded', !isOpen);
      btn.classList.toggle('open', !isOpen);
      btn.childNodes[0].textContent = isOpen ? 'Read full story ' : 'Close story ';
    });
  });
});
