/* ==========================================================================
   NITHIYA D — PORTFOLIO SCRIPT
   Modular vanilla JS. No frameworks, no build step.
   ========================================================================== */
   emailjs.init({
    publicKey: "6-ie_SgKgN0iweh2A",
});

'use strict';


document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     0. DATA — edit these arrays to update Skills / Projects
     ============================================================ */
  const SKILLS = [
    { name:'Java', cat:'languages', icon:'☕', level:80 },
    { name:'Python', cat:'languages', icon:'🐍', level:88 },
    { name:'JavaScript', cat:'languages', icon:'JS', level:85 },
    { name:'C', cat:'languages', icon:'C', level:75 },
    { name:'SQL', cat:'languages', icon:'▤', level:82 },
    { name:'Dart', cat:'languages', icon:'◆', level:70 },

    { name:'React.js', cat:'frontend', icon:'⚛', level:85 },
    { name:'React Native', cat:'frontend', icon:'⚛', level:75 },
    { name:'Flutter', cat:'frontend', icon:'◆', level:72 },
    { name:'HTML5 / CSS3', cat:'frontend', icon:'◧', level:90 },

    { name:'Node.js', cat:'backend', icon:'⬢', level:80 },
    { name:'Express.js', cat:'backend', icon:'▤', level:78 },
    { name:'REST APIs', cat:'backend', icon:'⇄', level:82 },
    { name:'JWT Auth', cat:'backend', icon:'⚿', level:75 },

    { name:'MySQL', cat:'database', icon:'▥', level:80 },
    { name:'Firebase Firestore', cat:'database', icon:'🔥', level:78 },
    { name:'Prisma ORM', cat:'database', icon:'▦', level:70 },

    { name:'Pandas', cat:'data', icon:'▤', level:85 },
    { name:'NumPy', cat:'data', icon:'#', level:80 },
    { name:'Scikit-learn', cat:'data', icon:'✦', level:75 },
    { name:'Power BI', cat:'data', icon:'📊', level:72 },
    { name:'Hugging Face', cat:'data', icon:'🤗', level:65 },

    { name:'Git &amp; GitHub', cat:'tools', icon:'⌥', level:85 },
    { name:'AWS Cloud', cat:'tools', icon:'☁', level:68 },
    { name:'VS Code', cat:'tools', icon:'▢', level:92 },
    { name:'Postman', cat:'tools', icon:'➤', level:80 },

    { name:'Problem Solving', cat:'soft', icon:'♟', level:90 },
    { name:'Communication', cat:'soft', icon:'💬', level:85 },
    { name:'Teamwork', cat:'soft', icon:'🤝', level:88 },
    { name:'Adaptability', cat:'soft', icon:'⟲', level:85 },
  ];

  const PROJECTS = [
   
    {
      title:'Life Auto-Pilot System',
      year:'2026',
      cat:'mobile',
      desc:'An AI-inspired productivity app that generates optimised daily schedules and dynamically reschedules tasks based on priority, deadlines and available time.',
      tech:['Flutter','Dart','Material Design','OOP'],
      image:'assets/images/project-lifeauto.png',
      github:'https://github.com/Nithiya17006/life_autopilot_v2',
      demo:'#'
    },
    {
      title:'EduBot — Educational Platform',
      year:'2025',
      cat:'web',
      desc:'An AI-powered learning platform supporting 12+ engineering subjects with personalised quiz generation and real-time progress tracking.',
      tech:['React','Firebase Auth','Firestore'],
      image:'assets/images/project-edubot.png',
      github:'https://github.com/Nithiya17006/EDUBOT',
      demo:'https://youtu.be/fRP0rjb46ic'
    },
    {
      title:'AI Inner Voice',
      year:'2025',
      cat:'ai',
      desc:'A conversational AI web app integrating speech recognition and natural-language response generation using Hugging Face models.',
      tech:['Python','Hugging Face','Speech Recognition'],
      image:'assets/images/project-innervoice.png',
    },
    {
      title:'Money Diary',
      year:'2025',
      cat:'mobile',
      desc:'A cross-platform expense tracking app with categorisation and an analytics dashboard for everyday financial tracking.',
      tech:['React Native','Expo','AsyncStorage'],
      image:'assets/images/project-moneyplanner.png',
      github:'https://github.com/Nithiya17006/Money-tracker',
      demo:'#'
    },
    {
      title:'Pet Adoption Platform',
      year:'2025',
      cat:'web',
      desc:'A Java-based MVC web application for pet adoption listings with secure authentication and full CRUD database operations.',
      tech:['Java','Servlets','JDBC','MySQL'],
      image:'assets/images/project-petadoption.png',
      github:'https://github.com/Nithiya17006/Pet-adoption',
      demo:'#'
    },
  ];

  const TECH_MARQUEE = ['Java','Python','JavaScript','React.js','Node.js','Flutter','React Native','MySQL','Firebase','Pandas','Scikit-learn','Power BI','AWS','Git'];

  /* ============================================================
     1. PRELOADER
     ============================================================ */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 500);
  });
  // Safety net in case 'load' is slow/never fires cleanly
  setTimeout(() => preloader && preloader.classList.add('hidden'), 3500);

  /* ============================================================
     2. CUSTOM CURSOR
     ============================================================ */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  if (window.matchMedia('(hover:hover)').matches) {
    let ringX = 0, ringY = 0, dotX = 0, dotY = 0;
    window.addEventListener('mousemove', (e) => { dotX = e.clientX; dotY = e.clientY; });
    (function loop(){
      ringX += (dotX - ringX) * 0.18;
      ringY += (dotY - ringY) * 0.18;
      if (cursorDot){ cursorDot.style.left = dotX + 'px'; cursorDot.style.top = dotY + 'px'; }
      if (cursorRing){ cursorRing.style.left = ringX + 'px'; cursorRing.style.top = ringY + 'px'; }
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('cursor-active'));
      el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('cursor-active'));
    });
  }

  /* ============================================================
     3. SCROLL PROGRESS BAR
     ============================================================ */
  const scrollBar = document.getElementById('scrollProgressBar');
  function updateScrollProgress(){
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    if (scrollBar) scrollBar.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', updateScrollProgress, { passive:true });

  /* ============================================================
     4. AMBIENT PARTICLE BACKGROUND (gold dust)
     ============================================================ */
  const canvas = document.getElementById('particleCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resizeCanvas(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    function initParticles(){
      const count = Math.min(70, Math.floor(window.innerWidth / 22));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.5 + 0.15
      }));
    }
    function drawParticles(){
      ctx.clearRect(0,0,canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
        ctx.fill();
      });
      if (!prefersReducedMotion) requestAnimationFrame(drawParticles);
    }
    resizeCanvas(); initParticles();
    if (!prefersReducedMotion) drawParticles(); else drawParticles();
    window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
  }

  /* ============================================================
     5. NAVIGATION — scroll state, active link, mobile menu
     ============================================================ */
  const nav = document.getElementById('mainNav');
  document.addEventListener('scroll', () => {
    if (window.scrollY > 40) nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.25)';
    else nav.style.boxShadow = 'none';
  }, { passive:true });

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main .section, .hero');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(l => l.classList.toggle('active-link', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  /* ============================================================
     6. THEME TOGGLE (dark / light) — persists for this session
     ============================================================ */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = sessionStorage.getItem('nd-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    if (next === 'dark') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', 'light');
    sessionStorage.setItem('nd-theme', next === 'dark' ? '' : 'light');
  });

  /* ============================================================
     7. HERO TYPING ANIMATION
     ============================================================ */
  const typingEl = document.getElementById('typingText');
  const phrases = ['full-stack web apps.', 'cross-platform mobile apps.', 'data-driven insights.', 'clean, reliable software.'];
  let phraseIndex = 0, charIndex = 0, deleting = false;
  function typeLoop(){
    const current = phrases[phraseIndex];
    if (!deleting){
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length){ deleting = true; setTimeout(typeLoop, 1600); return; }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0){ deleting = false; phraseIndex = (phraseIndex+1) % phrases.length; }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  if (typingEl) typeLoop();

  /* ============================================================
     8. INTERACTIVE PROFILE CREST — mouse parallax tilt
     ============================================================ */
  const crestFrame = document.getElementById('crestFrame');
  if (crestFrame && window.matchMedia('(hover:hover)').matches) {
    crestFrame.addEventListener('mousemove', (e) => {
      const rect = crestFrame.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      crestFrame.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.03)`;
    });
    crestFrame.addEventListener('mouseleave', () => {
      crestFrame.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    });
  }
  // Broader page mouse parallax on the whole hero visual for a "floating" feel
  const heroVisual = document.querySelector('.hero-visual');
  document.addEventListener('mousemove', (e) => {
    if (!heroVisual || window.scrollY > window.innerHeight) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const y = (e.clientY / window.innerHeight - 0.5) * 14;
    heroVisual.style.transform = `translate(${x}px, ${y}px)`;
  });

  /* ============================================================
     9. SCROLL REVEAL (IntersectionObserver)
     ============================================================ */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting){
        setTimeout(() => entry.target.classList.add('revealed'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ============================================================
     10. ANIMATED COUNTERS
     ============================================================ */
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const isDecimal = el.dataset.decimal === 'true';
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = (isDecimal ? value.toFixed(1) : Math.floor(value)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ============================================================
     11. TIMELINE SEAL POP-IN
     ============================================================ */
  const seals = document.querySelectorAll('.timeline-seal');
  const sealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.transition = 'transform .5s var(--ease, ease), opacity .5s ease';
        entry.target.style.transform = 'scale(1)';
        entry.target.style.opacity = '1';
        sealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  seals.forEach(s => sealObserver.observe(s));

  /* ============================================================
     12. SKILLS — render + progress bars + category tabs
     ============================================================ */
  const skillsGrid = document.getElementById('skillsGrid');
  const skillsTabs = document.getElementById('skillsTabs');

  function renderSkills(){
    skillsGrid.innerHTML = SKILLS.map(s => `
      <div class="skill-card glass" data-cat="${s.cat}" data-reveal>
        <div class="skill-card-head">
          <span class="skill-icon">${s.icon}</span>
          <span class="skill-name">${s.name}</span>
        </div>
        <div class="skill-bar-track"><div class="skill-bar-fill" data-level="${s.level}"></div></div>
        <span class="skill-pct">${s.level}%</span>
      </div>
    `).join('');

    // Re-observe reveal + animate bars once visible
    const cards = skillsGrid.querySelectorAll('.skill-card');
    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          entry.target.classList.add('revealed');
          const fill = entry.target.querySelector('.skill-bar-fill');
          if (fill) fill.style.width = fill.dataset.level + '%';
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold:0.2 });
    cards.forEach(c => barObserver.observe(c));
  }
  renderSkills();

  skillsTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.skills-tab');
    if (!btn) return;
    skillsTabs.querySelectorAll('.skills-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    skillsGrid.querySelectorAll('.skill-card').forEach(card => {
      card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
    });
  });

  /* ============================================================
     13. PROJECTS — render + filter + search
     ============================================================ */
  const projectsGrid = document.getElementById('projectsGrid');
  const projectFilters = document.getElementById('projectFilters');
  const projectSearch = document.getElementById('projectSearch');

  function renderProjects(){
    projectsGrid.innerHTML = PROJECTS.map(p => `
      <article class="project-card" data-cat="${p.cat}" data-search="${(p.title + ' ' + p.tech.join(' ')).toLowerCase()}" data-reveal>
        <div class="project-media">
          <img src="${p.image}" alt="${p.title} preview" loading="lazy">
          <span class="project-year">${p.year}</span>
        </div>
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-tech">${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <div class="project-actions">
            <a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>
          </div>
        </div>
      </article>
    `).join('');
    projectsGrid.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));
  }
  renderProjects();

  function filterProjects(){
    const activeFilter = projectFilters.querySelector('.filter-btn.active').dataset.filter;
    const query = projectSearch.value.trim().toLowerCase();
    projectsGrid.querySelectorAll('.project-card').forEach(card => {
      const matchesFilter = activeFilter === 'all' || card.dataset.cat === activeFilter;
      const matchesSearch = !query || card.dataset.search.includes(query);
      card.classList.toggle('hidden', !(matchesFilter && matchesSearch));
    });
  }
  projectFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    projectFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterProjects();
  });
  projectSearch.addEventListener('input', filterProjects);

  /* ============================================================
     14. TECH MARQUEE
     ============================================================ */
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const doubled = [...TECH_MARQUEE, ...TECH_MARQUEE];
    marqueeTrack.innerHTML = doubled.map(t => `<span class="marquee-item">${t}</span>`).join('');
  }

  /* ============================================================
     15. RIPPLE BUTTON EFFECT
     ============================================================ */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size/2) + 'px';
      circle.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });

  /* ============================================================
     16. CONTACT FORM VALIDATION (client-side, EmailJS-ready)
     ============================================================ */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function validateField(field){
    const row = field.closest('.form-row');
    const errorEl = row.querySelector('.form-error');
    let message = '';
    if (field.validity.valueMissing) message = 'This field is required.';
    else if (field.validity.typeMismatch) message = 'Please enter a valid email address.';
    else if (field.validity.tooShort) message = `Please enter at least ${field.minLength} characters.`;
    row.classList.toggle('error', !!message);
    errorEl.textContent = message;
    return !message;
  }

  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => { if (field.closest('.form-row').classList.contains('error')) validateField(field); });
  });

 form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('input, textarea');
    let valid = true;

    fields.forEach(f => {
        if (!validateField(f)) valid = false;
    });

    if (!valid) {
        formStatus.textContent = 'Please fix the highlighted fields.';
        formStatus.className = 'form-status error';
        return;
    }

    emailjs.sendForm(
        "service_pwbedlm",
        "template_k4r1gpn",
        form
    )
    .then(() => {

        formStatus.textContent = "Message sent successfully!";
        formStatus.className = "form-status success";
        form.reset();

    })
    .catch((error) => {

        formStatus.textContent = "Failed to send message. Please try again.";
        formStatus.className = "form-status error";
        console.error(error);

    });

});

  /* ============================================================
     17. SCROLL TO TOP BUTTON
     ============================================================ */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  document.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive:true });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  /* ============================================================
     18. FLOATING ACTION MENU
     ============================================================ */
  const fabToggle = document.getElementById('fabToggle');
  const fabMenu = document.getElementById('fabMenu');
  fabToggle.addEventListener('click', () => {
    fabMenu.classList.toggle('open');
    fabToggle.classList.toggle('open');
  });

  /* ============================================================
     19. DYNAMIC CURRENT YEAR
     ============================================================ */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ============================================================
     20. KEYBOARD SHORTCUTS
     — "g" then a key jumps to a section; "/" focuses project search
     ============================================================ */
  let gPressed = false;
  window.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA'){
      e.preventDefault();
      projectSearch.focus();
      return;
    }
    if (e.key.toLowerCase() === 'g'){ gPressed = true; setTimeout(() => gPressed = false, 800); return; }
    if (gPressed){
      const map = { h:'#home', a:'#about', s:'#skills', p:'#projects', c:'#contact' };
      const target = map[e.key.toLowerCase()];
      if (target) document.querySelector(target)?.scrollIntoView({ behavior:'smooth' });
      gPressed = false;
    }
  });

  /* ============================================================
     21. IMAGE FALLBACK — crest photo won't break if swapped file missing
     ============================================================ */
  const crestPhoto = document.getElementById('crestPhoto');
  if (crestPhoto){
    crestPhoto.addEventListener('error', function(){
      this.src = 'assets/images/profile-placeholder.svg';
    });
  }

});
