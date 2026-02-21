/* ===================================
   HIGH-TECH PORTFOLIO — INTERACTIONS
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ========== DATA FETCHING & POPULATION ========== */
  async function fetchAboutData() {
    try {
      const response = await fetch('data/about.json');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      populateData(data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  function populateData(data) {
    // Hero Section
    if (data.ชื่อจริง) document.getElementById('heroName').textContent = data.ชื่อจริง;
    if (data.title) document.getElementById('heroTitle').innerHTML = data.title;
    if (data.heroDescription) document.getElementById('heroDesc').textContent = data.heroDescription;

    // Stats
    if (data.stats) {
      const projects = document.getElementById('statProjects');
      const techStack = document.getElementById('statTechStack');
      const experience = document.getElementById('statExperience');

      if (projects) {
        projects.dataset.target = data.stats.projects;
        projects.textContent = '0';
      }
      if (techStack) {
        techStack.dataset.target = data.stats.techStack;
        techStack.textContent = '0';
      }
      if (experience) {
        experience.dataset.target = data.stats.yearsExperience;
        experience.textContent = '0';
      }
    }

    // About Section
    const aboutTextContainer = document.getElementById('aboutTextContainer');
    if (aboutTextContainer && data.bio) {
      // Find the highlights container to preserve it
      const highlights = document.getElementById('aboutHighlightsContainer');
      aboutTextContainer.innerHTML = '';
      data.bio.forEach(text => {
        const p = document.createElement('p');
        p.innerHTML = text; // Using innerHTML to allow <strong> tags etc.
        aboutTextContainer.appendChild(p);
      });
      if (highlights) aboutTextContainer.appendChild(highlights);
    }

    // About Highlights
    if (data.highlights) {
      const highlightsContainer = document.getElementById('aboutHighlightsContainer');
      if (highlightsContainer) {
        highlightsContainer.innerHTML = '';
        data.highlights.forEach(h => {
          const card = document.createElement('div');
          card.className = 'highlight-card';
          card.innerHTML = `
            <div class="highlight-icon">${h.icon}</div>
            <h4>${h.title}</h4>
            <p>${h.description}</p>
          `;
          highlightsContainer.appendChild(card);
        });
      }
    }

    // Terminal
    const terminalCode = document.querySelector('.terminal-body code');
    if (terminalCode) {
      const terminalData = {
        name: data.ชื่อจริง,
        nickname: data.ชื่อเล่น,
        age: data.age,
        from: data.location,
        target: "KMUTT — Applied CS", // Defaulting as it's not in JSON but in original
        passion: data.interests || [],
        motto: "ตั้งเป้าให้ใหญ่ ได้ 80% ก็ยังดี",
        dream: "สร้างนวัตกรรมระดับโลก 🌍"
      };

      // Formatting the JSON string for display
      const jsonStr = JSON.stringify(terminalData, null, 2);
      // Syntax highlighting for the terminal (simplified)
      let highlighted = jsonStr
        .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
        .replace(/: "([^"]+)"/g, ': <span class="json-str">"$1"</span>')
        .replace(/: (\d+)/g, ': <span class="json-num">$1</span>');

      terminalCode.dataset.originalHtml = highlighted;
      terminalCode.dataset.originalText = jsonStr;

      // If the effect hasn't run yet, the observer will use these.
      // If it already ran, we might need to manually trigger or just leave it for next load.
    }

    // Skills Section
    const skillsGrid = document.getElementById('skillsGrid');
    if (skillsGrid && data.skills) {
      skillsGrid.innerHTML = '';
      Object.keys(data.skills).forEach(key => {
        const cat = data.skills[key];
        const catDiv = document.createElement('div');
        catDiv.className = 'skill-category';

        let itemsHtml = '';
        cat.items.forEach(item => {
          itemsHtml += `<div class="skill-chip"><span class="chip-icon">${item.icon}</span> ${item.name}</div>`;
        });

        catDiv.innerHTML = `
          <h3 class="skill-category-title">
            <span class="cat-icon">${cat.icon}</span> ${cat.title}
          </h3>
          <div class="skill-bar-container">
            <div class="skill-bar-label">${cat.title} Expertise</div>
            <div class="skill-bar">
              <div class="skill-bar-fill" style="--percent:80%"><span>80%</span></div>
            </div>
          </div>
          <div class="skill-items">${itemsHtml}</div>
        `;
        skillsGrid.appendChild(catDiv);
      });
    }

    // Projects Section
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid && data.projects) {
      projectsGrid.innerHTML = '';
      data.projects.forEach(p => {
        const article = document.createElement('article');
        article.className = 'project-card reveal';
        article.setAttribute('data-tilt', '');

        const tagsHtml = p.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        article.innerHTML = `
          <div class="project-image">
            <div class="project-img-placeholder" style="--hue:${p.hue || 200}">
              <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.5" width="64" height="64">
                <rect x="10" y="28" width="44" height="20" rx="4" />
                <circle cx="20" cy="52" r="5" />
                <circle cx="44" cy="52" r="5" />
                <path d="M28 28v-8h8v8M32 12v8M24 16h16" />
              </svg>
            </div>
            <div class="project-overlay">
              <div class="overlay-links">
                <a href="${p.github}" target="_blank" rel="noopener" class="overlay-btn" title="Source Code">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.21 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.333-1.723-1.333-1.723-1.09-.73.083-.715.083-.715 1.205.083 1.838 1.215 1.838 1.215 1.07 1.802 2.807 1.281 3.492.98.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.228-3.164-.123-.298-.532-1.497.117-3.12 0 0 1.001-.314 3.28 1.209A11.5 11.5 0 0 1 12 6.844c1.02.005 2.047.136 3.006.398 2.277-1.523 3.276-1.209 3.276-1.209.651 1.623.242 2.822.12 3.12.765.825 1.226 1.877 1.226 3.164 0 4.53-2.805 5.527-5.475 5.817.43.364.814 1.084.814 2.184 0 1.576-.014 2.846-.014 3.232 0 .316.216.683.825.567C20.565 21.917 24 17.497 24 12.292 24 5.78 18.627.5 12 .5z" />
                  </svg>
                </a>
                <a href="${p.demo}" target="_blank" rel="noopener" class="overlay-btn" title="Live Demo">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div class="project-info">
            <h3 class="project-name">${p.name}</h3>
            <p class="project-desc">${p.description}</p>
            <div class="project-tags">${tagsHtml}</div>
          </div>
        `;
        projectsGrid.appendChild(article);
      });

      // Re-initialize tilt for new cards
      initializeTilt();
    }

    // Contact
    if (data.contact) {
      const email = document.getElementById('contactEmail');
      const phone = document.getElementById('contactPhone');
      const location = document.getElementById('contactLocation');
      const status = document.getElementById('contactStatus');

      if (email) {
        email.href = `mailto:${data.contact.email}`;
        email.textContent = data.contact.email;
      }
      if (phone) {
        phone.href = `tel:${data.contact.phone}`;
        phone.textContent = data.contact.phone;
      }
      if (location) location.textContent = data.location;
      if (status) status.textContent = data.contact.status;
    }

    // Social Links
    if (data.social) {
      const navGithub = document.getElementById('navGithub');
      const socialGithub = document.getElementById('socialGithub');
      const socialLinkedin = document.getElementById('socialLinkedin');
      const socialFacebook = document.getElementById('socialFacebook');

      if (navGithub && data.social.github) navGithub.href = data.social.github;
      if (socialGithub && data.social.github) socialGithub.href = data.social.github;
      if (socialLinkedin && data.social.linkedin) socialLinkedin.href = data.social.linkedin;
      if (socialFacebook && data.social.facebook) socialFacebook.href = data.social.facebook;
    }
  }

  function initializeTilt() {
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  fetchAboutData();

  /* ========== PARTICLE SYSTEM ========== */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: -1000, y: -1000 };

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
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.5 ? 188 : 262; // cyan or purple
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x += (dx / dist) * force * 2;
        this.y += (dy / dist) * force * 2;
      }

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
      ctx.fill();
    }
  }

  const particleCount = Math.min(120, Math.floor(window.innerWidth * window.innerHeight / 12000));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ========== CURSOR GLOW ========== */
  const cursorGlow = document.getElementById('cursorGlow');
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  /* ========== NAVBAR ========== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section, .hero');

  window.addEventListener('scroll', () => {
    // Scrolled class
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active link
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 200;
      if (window.scrollY >= top) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  /* ========== MOBILE MENU ========== */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  /* ========== REVEAL ON SCROLL ========== */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  /* ========== COUNTER ANIMATION ========== */
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let count = 0;
        const speed = Math.max(1, Math.floor(2000 / target));
        const timer = setInterval(() => {
          count++;
          el.textContent = count;
          if (count >= target) clearInterval(timer);
        }, speed);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  /* ========== SMOOTH SCROLL ========== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ========== PROJECT CARD TILT ========== */
  initializeTilt();

  /* ========== CONTACT FORM ========== */
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>✓ Message Sent!</span>';
    btn.style.background = 'linear-gradient(135deg, #00e676, #00e5ff)';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      contactForm.reset();
    }, 2500);
  });

  /* ========== TERMINAL TYPING EFFECT ========== */
  const terminalBody = document.querySelector('.terminal-body code');
  if (terminalBody) {
    let typed = false;

    const termObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !typed) {
          typed = true;
          let i = 0;
          const typeSpeed = 12;

          // Use data-driven data if available, otherwise original
          const textToType = terminalBody.dataset.originalText || terminalBody.textContent;
          const htmlToSet = terminalBody.dataset.originalHtml || terminalBody.innerHTML;

          terminalBody.innerHTML = '';
          terminalBody.textContent = '';

          function typeChar() {
            if (i < textToType.length) {
              terminalBody.textContent += textToType.charAt(i);
              i++;
              setTimeout(typeChar, typeSpeed);
            } else {
              terminalBody.innerHTML = htmlToSet;
            }
          }
          typeChar();
          termObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    termObserver.observe(terminalBody.closest('.terminal'));
  }

});
