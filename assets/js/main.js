/* ==================================================
   СТРОИТЕЛВАРНА - MAIN.JS
   Nav, scroll effects, particles,
   before/after slider, counters, form
   ================================================== */

(function () {
    'use strict';

    /* ===== Scroll Progress Bar ===== */
    const scrollProgress = document.getElementById('scrollProgress');
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    // Active Nav Link - define FIRST so updateScroll can call it
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');

    function updateActiveNav() {
        const scrollPos = (window.pageYOffset || document.documentElement.scrollTop) + 120;
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('is-active');
            const href = link.getAttribute('href');
            if (href === '#' + current) {
                link.classList.add('is-active');
            }
        });
    }

    function updateScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (scrollProgress) scrollProgress.style.width = progress + '%';

        // Header shrink
        if (header) {
            header.classList.toggle('is-scrolled', scrollTop > 30);
        }

        // Back to top
        if (backToTop) {
            backToTop.classList.toggle('is-visible', scrollTop > 600);
        }

        // Active nav link based on section in view
        updateActiveNav();

        // Parallax on hero building - disabled on mobile for performance
        if (window.innerWidth > 768) {
            const building = document.querySelector('.hero__bg-layer--building');
            if (building && scrollTop < window.innerHeight) {
                building.style.transform = `translateY(${scrollTop * 0.3}px)`;
            }
        }
    }

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    /* ===== Mobile Menu (hamburger + .mobile-menu) ===== */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    function openMenu() {
        if (!mobileMenu || !hamburger) return;
        mobileMenu.classList.add('open');
        mobileMenuBackdrop && mobileMenuBackdrop.classList.add('open');
        hamburger.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        if (!mobileMenu || !hamburger) return;
        mobileMenu.classList.remove('open');
        mobileMenuBackdrop && mobileMenuBackdrop.classList.remove('open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('menu-open');
    }

    function toggleMenu() {
        if (!mobileMenu) return;
        if (mobileMenu.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Click on hamburger → toggle .open + aria-expanded
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Click on close button → close
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }

    // Click on backdrop → close
    if (mobileMenuBackdrop) {
        mobileMenuBackdrop.addEventListener('click', closeMenu);
    }

    // Click on any link inside mobile-menu → close
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // Escape key → close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
            closeMenu();
        }
    });

    /* ===== Smooth Scroll for anchor links ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = 100;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* ===== Hero Particles ===== */
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        // Reduced particles for better mobile performance
        const w = window.innerWidth;
        const particleCount = w < 480 ? 8 : (w < 768 ? 12 : 25);
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    /* ===== Counter Animation ===== */
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const start = performance.now();
        el.classList.add('is-counting');

        function step(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.floor(eased * target);
            el.textContent = value.toLocaleString('bg-BG');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target.toLocaleString('bg-BG');
                el.classList.remove('is-counting');
            }
        }
        requestAnimationFrame(step);
    }

    /* ===== Scroll Reveal ===== */
    const revealElements = document.querySelectorAll(
        '.service-card, .testimonial, .process__step, .partner, .project-card, .trustbar__item, .section-head, .quote__contact'
    );
    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ===== Before/After Slider ===== */
    const baSlider = document.getElementById('baSlider');
    const baHandle = document.getElementById('baHandle');
    const beforeImg = document.querySelector('.ba-slider__img--before');

    if (baSlider && baHandle && beforeImg) {
        let isDragging = false;

        function setSliderPosition(x) {
            const rect = baSlider.getBoundingClientRect();
            let percent = ((x - rect.left) / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));
            beforeImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
            baHandle.style.left = percent + '%';
        }

        baSlider.addEventListener('mousedown', (e) => {
            isDragging = true;
            setSliderPosition(e.clientX);
            e.preventDefault();
        });
        document.addEventListener('mousemove', (e) => {
            if (isDragging) setSliderPosition(e.clientX);
        });
        document.addEventListener('mouseup', () => { isDragging = false; });

        // Touch
        baSlider.addEventListener('touchstart', (e) => {
            isDragging = true;
            setSliderPosition(e.touches[0].clientX);
        });
        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                setSliderPosition(e.touches[0].clientX);
                e.preventDefault();
            }
        }, { passive: false });
        document.addEventListener('touchend', () => { isDragging = false; });

        // Initial position 50%
        setSliderPosition(baSlider.getBoundingClientRect().left + baSlider.getBoundingClientRect().width / 2);
    }

    /* ===== Back to Top ===== */
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ===== Cookie Banner ===== */
    const cookieBanner = document.getElementById('cookieBanner');
    if (cookieBanner) {
        const accepted = localStorage.getItem('cookieConsent');
        if (!accepted) {
            setTimeout(() => cookieBanner.classList.add('is-visible'), 2000);
        }
        document.getElementById('cookieAccept')?.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'all');
            cookieBanner.classList.remove('is-visible');
        });
        document.getElementById('cookieDecline')?.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('is-visible');
        });
    }

    /* ===== Quote Form Submit ===== */
    const quoteForm = document.getElementById('quoteForm');
    const formSuccess = document.getElementById('formSuccess');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button[type="submit"]');
            btn.classList.add('is-loading');
            // Simulate sending
            setTimeout(() => {
                btn.classList.remove('is-loading');
                quoteForm.reset();
                if (formSuccess) formSuccess.classList.add('is-visible');
                setTimeout(() => formSuccess?.classList.remove('is-visible'), 6000);
            }, 1500);
        });
    }

    /* ===== Language Switcher (basic) ===== */
    const langBtns = document.querySelectorAll('.lang-switcher__btn');
    const translations = {
        bg: {
            'Начало': 'Начало', 'Услуги': 'Услуги', 'Процес': 'Процес',
            'Проекти': 'Проекти', 'Калкулатор': 'Калкулатор',
            'Отзиви': 'Отзиви', 'Контакти': 'Контакти'
        },
        en: {
            'Начало': 'Home', 'Услуги': 'Services', 'Процес': 'Process',
            'Проекти': 'Projects', 'Калкулатор': 'Calculator',
            'Отзиви': 'Reviews', 'Контакти': 'Contacts'
        },
        ru: {
            'Начало': 'Главная', 'Услуги': 'Услуги', 'Процес': 'Процесс',
            'Проекти': 'Проекты', 'Калкулатор': 'Калькулятор',
            'Отзиви': 'Отзывы', 'Контакти': 'Контакты'
        }
    };
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            const lang = btn.dataset.lang;
            if (lang === 'bg') {
                // Original language - just restore from data-original if exists
                navLinks.forEach(link => {
                    if (link.dataset.original) link.textContent = link.dataset.original;
                });
            } else {
                navLinks.forEach(link => {
                    if (!link.dataset.original) link.dataset.original = link.textContent;
                    const original = link.dataset.original;
                    if (translations[lang][original]) {
                        link.textContent = translations[lang][original];
                    }
                });
            }
        });
    });

    /* ===== Service card subtle parallax on mouse move ===== */
    const serviceCards = document.querySelectorAll('.service-card');
    if (window.innerWidth > 992) {
        serviceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const rotateX = (y / rect.height) * -3;
                const rotateY = (x / rect.width) * 3;
                card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

})();
