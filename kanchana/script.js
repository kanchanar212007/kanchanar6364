/**
 * KANCHANA R — EDITORIAL PORTFOLIO JAVASCRIPT
 * Interactive Engine: Custom Cursor, AI Chat, Project Modals, Filtering, Carousel
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==================== 1. LIVE TIME & CLOCK ====================
  function updateLiveClocks() {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', options) + ' IST';
    
    const headerClock = document.getElementById('live-clock');
    const footerClock = document.getElementById('footer-live-clock');

    if (headerClock) headerClock.textContent = timeString;
    if (footerClock) footerClock.textContent = timeString;
  }

  updateLiveClocks();
  setInterval(updateLiveClocks, 1000 * 30); // every 30 seconds

  // ==================== 2. CUSTOM CURSOR ====================
  const cursorDot = document.getElementById('cursor-dot');
  const cursorFollower = document.getElementById('cursor-follower');

  if (cursorDot && cursorFollower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(animateFollower);
    }
    requestAnimationFrame(animateFollower);

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-case-card, .skill-category-card, .service-card');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovered'));
    });
  } else {
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
  }

  // ==================== 3. SCROLL PROGRESS & HEADER SHADOW ====================
  const scrollProgressBar = document.getElementById('scroll-progress');
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    if (header) {
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // ==================== 4. MOBILE DRAWER NAVIGATION ====================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mob-link');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  mobileLinks.forEach((link) => link.addEventListener('click', closeDrawer));

  // ==================== 5. SKILL FILTERING ====================
  const skillTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-skill-filter');

      skillCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filterValue === 'all' || cat === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==================== 6. PROJECT FILTERING ====================
  const projectFilterBtns = document.querySelectorAll('.proj-filter-btn');
  const projectCards = document.querySelectorAll('.project-case-card');

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'grid';
          setTimeout(() => { card.style.opacity = '1'; }, 20);
        } else {
          card.style.opacity = '0';
          card.style.display = 'none';
        }
      });
    });
  });

  // ==================== 7. PROJECT DETAILS MODAL ====================
  const projectData = {
    '1': {
      title: 'Synthesis — AI Generative Design Engine',
      subtitle: 'Generative Diffusion & Vector Parametric Modeling Studio',
      image: 'assets/images/project-1.jpg',
      period: '2025 // Production Ready',
      tags: ['Generative AI', 'React 19', 'FastAPI', 'PyTorch', 'WebGL', 'Three.js'],
      overview: 'Synthesis is an end-to-end parametric design platform engineered for computational architects and industrial designers. It leverages fine-tuned diffusion models combined with geometric optimization algorithms to generate production-ready 3D shapes from natural language descriptions and spatial constraints in real time.',
      challenges: [
        'Optimizing sub-second latency for vector surface meshes generated dynamically in the browser.',
        'Constructing a custom WebGL viewport capable of handling 500,000+ polygons with fluid 60FPS camera orbit.',
        'Synchronizing asynchronous Python FastAPI generation tasks with React web workers.'
      ],
      metrics: [
        { label: 'Latency Reduction', value: '45%' },
        { label: 'Mesh Accuracy', value: '99.4%' },
        { label: 'Daily Active Generations', value: '10K+' }
      ]
    },
    '2': {
      title: 'Archi Estudio — Luxury Spatial Platform',
      subtitle: 'Editorial Brand Experience & WebGL Spatial Showroom',
      image: 'assets/images/project-2.jpg',
      period: '2025 // Client Work',
      tags: ['TypeScript', 'WebGL', 'Three.js', 'Node.js', 'Vercel', 'Tailored CSS'],
      overview: 'A bespoke digital showroom developed for a luxury Scandinavian interior architecture firm. Blends editorial fashion typography with seamless WebGL room configurators and ultra-fast static asset delivery.',
      challenges: [
        'Achieving a 99 Lighthouse Performance score while loading heavy 3D assets via progressive level-of-detail (LOD).',
        'Implementing fluid page transitions without interrupting ambient WebGL shader animations.',
        'Building an intuitive multilingual content management interface for non-technical curators.'
      ],
      metrics: [
        { label: 'Lighthouse Score', value: '99/100' },
        { label: 'Conversion Lift', value: '+68%' },
        { label: 'Page Load Speed', value: '0.6s' }
      ]
    },
    '3': {
      title: 'Nexus — High-Throughput Analytics Engine',
      subtitle: 'Distributed Telemetry & Algorithmic Anomaly Detection',
      image: 'assets/images/project-3.jpg',
      period: '2024 // Open Source & Production',
      tags: ['Go / Golang', 'Python', 'D3.js', 'Redis Cluster', 'Docker', 'TimescaleDB'],
      overview: 'Nexus is an industrial-grade telemetry engine engineered to ingest and analyze time-series data streams from distributed sensor networks. Includes predictive anomaly recognition and custom interactive D3 visualizations.',
      challenges: [
        'Handling burst telemetry spikes of 50,000 requests/sec with zero packet drop.',
        'Engineering custom time-decay caching algorithms with Redis clusters.',
        'Building responsive interactive line graphs supporting millions of coordinate points without UI lag.'
      ],
      metrics: [
        { label: 'Max Throughput', value: '50K req/s' },
        { label: 'Telemetry Latency', value: '<48ms' },
        { label: 'Memory Footprint', value: '-35%' }
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const viewModalBtns = document.querySelectorAll('.view-modal-btn');

  function openProjectModal(id) {
    const data = projectData[id];
    if (!data || !projectModal || !modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span style="font-family: var(--font-display); font-size: 0.7rem; letter-spacing: 0.2em; color: var(--accent-terracotta); font-weight: 700;">${data.period}</span>
        <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin: 0.4rem 0 0.2rem 0; color: var(--text-primary); line-height: 1.2;">${data.title}</h2>
        <p style="font-size: 0.95rem; color: var(--text-muted);">${data.subtitle}</p>
      </div>

      <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 2rem; border: 1px solid var(--border-light); aspect-ratio: 16/9;">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
        ${data.tags.map(tag => `<span style="font-size: 0.72rem; font-weight: 600; background: var(--bg-secondary); padding: 0.35rem 0.8rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">${tag}</span>`).join('')}
      </div>

      <div style="margin-bottom: 2rem;">
        <h4 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.6rem;">Executive Summary</h4>
        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7;">${data.overview}</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; background: var(--bg-secondary); padding: 1.4rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
        ${data.metrics.map(m => `
          <div style="text-align: center;">
            <span style="font-family: var(--font-serif); font-size: 1.8rem; font-weight: 700; color: var(--accent-terracotta); display: block;">${m.value}</span>
            <span style="font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-muted);">${m.label}</span>
          </div>
        `).join('')}
      </div>

      <div style="margin-bottom: 2.5rem;">
        <h4 style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 0.6rem;">Technical Highlights & Innovations</h4>
        <ul style="list-style: square; padding-left: 1.2rem; font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7;">
          ${data.challenges.map(c => `<li style="margin-bottom: 0.4rem;">${c}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: flex-end; border-top: 1px solid var(--border-light); padding-top: 1.5rem;">
        <a href="#contact" onclick="document.getElementById('project-modal').classList.remove('active'); document.body.style.overflow='';" class="editorial-btn primary-btn" style="padding: 0.7rem 1.4rem; font-size: 0.8rem;">
          <span>Discuss This Architecture</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  viewModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project-id');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });

  // ==================== 7.5. VIDEO DEMO REEL TABS ====================
  const videoTabs = document.querySelectorAll('.video-tab-btn');
  const videoPlayer = document.getElementById('portfolio-video-player');
  const videoCaption = document.querySelector('.reel-caption');

  videoTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      videoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const videoUrl = tab.getAttribute('data-video-url');
      const captionText = tab.getAttribute('data-caption');

      if (videoPlayer && videoUrl) {
        videoPlayer.src = videoUrl;
      }
      if (videoCaption && captionText) {
        videoCaption.textContent = captionText;
      }
    });
  });

  // ==================== 8. TESTIMONIALS CAROUSEL ====================
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('#carousel-dots .dot');
  const prevBtn = document.getElementById('prev-test-btn');
  const nextBtn = document.getElementById('next-test-btn');
  let currentSlide = 0;
  let carouselInterval;

  function showSlide(index) {
    if (!testimonialSlides.length) return;
    testimonialSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(slideIdx);
      resetTimer();
    });
  });

  function startTimer() {
    carouselInterval = setInterval(nextSlide, 7000);
  }

  function resetTimer() {
    clearInterval(carouselInterval);
    startTimer();
  }

  startTimer();

  // ==================== 9. INTERACTIVE AI CHAT ====================
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input-field');
  const chatMessages = document.getElementById('chat-messages');
  const clearChatBtn = document.getElementById('clear-chat-btn');
  const quickQueryBtns = document.querySelectorAll('.quick-query-btn');
  const openChatBtn = document.getElementById('open-chat-btn');

  // Scroll smoothly to AI section when Header "Ask AI" button clicked
  if (openChatBtn) {
    openChatBtn.addEventListener('click', () => {
      const chatSection = document.getElementById('ai-chat');
      if (chatSection) {
        chatSection.scrollIntoView({ behavior: 'smooth' });
        if (chatInput) setTimeout(() => chatInput.focus(), 600);
      }
    });
  }

  const aiKnowledge = [
    {
      keywords: ['stack', 'technologies', 'skills', 'programming', 'languages', 'tools', 'frontend', 'backend', 'frameworks'],
      response: "Kanchana specializes in **Full-Stack Engineering & AI Systems**. Her core stack comprises **JavaScript (ESNext), TypeScript, React / Next.js, Python (FastAPI/Django), Node.js, Go**, and database engines like **PostgreSQL, Redis, and MongoDB**. She also works extensively with PyTorch, Three.js/WebGL, and Docker CI/CD pipelines."
    },
    {
      keywords: ['synthesis', 'generative', 'ai project', 'mesh', '3d', 'diffusion'],
      response: "The **Synthesis AI Engine** is Kanchana’s flagship generative design platform. It combines diffusion models and real-time WebGL mesh rendering with a FastAPI backend to synthesize 3D spatial models dynamically from natural language constraints with 99.4% precision."
    },
    {
      keywords: ['hiring', 'available', 'internship', 'job', 'full-time', 'open', 'hire', 'work', 'recruit'],
      response: "Yes! Kanchana is **actively available** for full-time software engineering roles, 2026 graduate programs, and high-impact internships. She is based in Bangalore/Chennai and is open to remote and relocation opportunities. You can transmit a message through the contact form below or reach out via LinkedIn."
    },
    {
      keywords: ['contact', 'email', 'reach', 'message', 'touch', 'talk', 'linkedin', 'github'],
      response: "You can reach Kanchana directly at **kanchana.dev@example.com** or connect with her on **LinkedIn (linkedin.com/in/kanchana-r)** and check out her code repositories on **GitHub (github.com/kanchana-r)**."
    },
    {
      keywords: ['education', 'college', 'degree', 'gpa', 'university', 'grades', 'studies'],
      response: "Kanchana is completing her **Bachelor of Engineering in Computer Science & Engineering (2022–2026)** with a stellar **9.2/10 Cumulative GPA**. She is a Dean’s Merit Scholar and holds cloud microservices certifications from DeepLearning.AI and AWS."
    },
    {
      keywords: ['experience', 'intern', 'vanguard', 'work history', 'hackathon'],
      response: "Kanchana was a Software Engineering Intern at **Vanguard Tech Labs**, where she optimized microservices to reduce API latency by 34% and handled 2M+ daily pipeline records. She also leads engineering at the **University Innovation Hub** and won 1st Place in the National Smart City AI Hackathon."
    },
    {
      keywords: ['archi', 'architecture', 'estudio', 'luxury'],
      response: "**Archi Estudio 3D** is an editorial spatial web showcase Kanchana developed using Three.js and TypeScript, achieving a 99/100 Lighthouse performance score with sub-0.6s initial loads."
    },
    {
      keywords: ['nexus', 'analytics', 'telemetry', 'high throughput'],
      response: "**Nexus** is a distributed time-series telemetry engine built with Go and Python that processes over 50,000 real-time events per second with sub-50ms latency graphs and predictive anomaly detection."
    }
  ];

  function getAiResponse(userText) {
    const lower = userText.toLowerCase();
    for (const item of aiKnowledge) {
      if (item.keywords.some(k => lower.includes(k))) {
        return item.response;
      }
    }
    return "Thank you for asking! Kanchana is a versatile software engineer with experience across full-stack web architectures, distributed systems, and generative AI. Feel free to ask about her specific projects (Synthesis, Archi Estudio, Nexus), tech stack, education, or contact details!";
  }

  function appendChatMessage(sender, text, isUser = false) {
    if (!chatMessages) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;

    const senderTag = document.createElement('div');
    senderTag.className = 'msg-sender-tag';
    senderTag.textContent = sender;

    const bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    
    // Parse basic markdown bolding
    bubble.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    const timestamp = document.createElement('span');
    timestamp.className = 'msg-timestamp';
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.appendChild(senderTag);
    msgDiv.appendChild(bubble);
    msgDiv.appendChild(timestamp);

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserQuery(queryText) {
    if (!queryText.trim()) return;

    appendChatMessage('YOU', queryText, true);

    // Simulated Bot Typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot-message typing-indicator-msg';
    typingIndicator.innerHTML = `
      <div class="msg-sender-tag">KANCHANA AI</div>
      <div class="msg-bubble" style="color: var(--text-muted); font-style: italic;">
        Synthesizing knowledge response...
      </div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const reply = getAiResponse(queryText);
      appendChatMessage('KANCHANA AI', reply, false);
    }, 450);
  }

  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = chatInput.value.trim();
      if (query) {
        handleUserQuery(query);
        chatInput.value = '';
      }
    });
  }

  quickQueryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.getAttribute('data-query');
      if (q) handleUserQuery(q);
    });
  });

  if (clearChatBtn && chatMessages) {
    clearChatBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="chat-message bot-message">
          <div class="msg-sender-tag">KANCHANA AI</div>
          <div class="msg-bubble">
            Conversation reset. Ask me anything about Kanchana's software craft, projects, or background!
          </div>
          <span class="msg-timestamp">Just now</span>
        </div>
      `;
      showToast('AI conversation reset.');
    });
  }

  // ==================== 10. TOAST NOTIFICATION SYSTEM ====================
  const toast = document.getElementById('editorial-toast');
  const toastText = document.getElementById('toast-text');
  let toastTimeout;

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // ==================== 11. CONTACT FORM & CLIPBOARD COPY ====================
  const contactForm = document.getElementById('contact-form');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const feedbackDiv = document.getElementById('form-feedback');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('kanchana.dev@example.com').then(() => {
        showToast('Email address copied to clipboard: kanchana.dev@example.com');
      }).catch(() => {
        showToast('Email: kanchana.dev@example.com');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sender-name').value;
      const email = document.getElementById('sender-email').value;
      const subject = document.getElementById('sender-subject').value;

      const submitBtn = document.getElementById('contact-submit-btn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Transmitting...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Transmit Message</span> <i class="fa-solid fa-paper-plane"></i>';
        }
        contactForm.reset();
        showToast(`Thank you, ${name}! Your inquiry regarding "${subject}" has been transmitted.`);
        if (feedbackDiv) {
          feedbackDiv.innerHTML = `<span style="color: var(--accent-green); font-weight: 600;"><i class="fa-solid fa-circle-check"></i> Thank you! Your message was received. Kanchana will reply to ${email} promptly.</span>`;
        }
      }, 900);
    });
  }

  // ==================== 12. SMOOTH SCROLL REVEAL OBSERVER ====================
  const revealElements = document.querySelectorAll('.editorial-section, .hero-portrait-frame, .about-manifesto-card, .skill-category-card, .project-case-card, .service-card, .achievement-card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }

});
