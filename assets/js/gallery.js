/* ==================================================
   СТРОИТЕЛВАРНА - GALLERY.JS
   Project cards generation + filter
   ================================================== */

(function () {
    'use strict';

    // Project data with SVG placeholders
    const projects = [
        {
            title: 'Реконструкция на покрив – ж.к. Аспарухово',
            category: 'roofing',
            categoryLabel: 'Покриви',
            location: 'Варна, Аспарухово',
            desc: 'Пълна реконструкция на плосък покрив с битумна мембрана и нова топлоизолация 100mm XPS.',
            duration: '18 дни',
            area: '240 м²',
            color: '#0F2A44',
            accent: '#00AEEF'
        },
        {
            title: 'Вентилирана фасада – офис сграда Девня',
            category: 'facade',
            categoryLabel: 'Фасади',
            location: 'Девня',
            desc: 'Монтаж на вентилирана фасада с композитни панели и минерална вата 80mm.',
            duration: '32 дни',
            area: '850 м²',
            color: '#1a3a5c',
            accent: '#00AEEF'
        },
        {
            title: 'Пълен ремонт на апартамент – Владиславово',
            category: 'interior',
            categoryLabel: 'Вътрешни',
            location: 'Варна, Владиславово',
            desc: 'Пълен ремонт на ключ с нови ВиК, ел. инсталация, паркет, баня и кухня.',
            duration: '75 дни',
            area: '95 м²',
            color: '#0F2A44',
            accent: '#E8DCC4'
        },
        {
            title: 'Метална конструкция – навес Аксаково',
            category: 'commercial',
            categoryLabel: 'Бизнес',
            location: 'Аксаково',
            desc: 'Проектиране и монтаж на метален навес за паркинг с 12 места.',
            duration: '21 дни',
            area: '180 м²',
            color: '#1a3a5c',
            accent: '#00AEEF'
        },
        {
            title: 'Хидроизолация на тераса – Виница',
            category: 'roofing',
            categoryLabel: 'Покриви',
            location: 'Варна, Виница',
            desc: 'Хидроизолация на тераса с полиуретанова система и плочки 30х30.',
            duration: '8 дни',
            area: '45 м²',
            color: '#0F2A44',
            accent: '#00AEEF'
        },
        {
            title: 'Покрив винкел фалц – къща Кривня',
            category: 'roofing',
            categoryLabel: 'Покриви',
            location: 'с. Кривня',
            desc: 'Нов покрив клик профил винкел фалц с улучи и покривни прозорци VELUX.',
            duration: '14 дни',
            area: '210 м²',
            color: '#1a3a5c',
            accent: '#00AEEF'
        },
        {
            title: 'VRF климатизация – магазин Вараполис',
            category: 'commercial',
            categoryLabel: 'Бизнес',
            location: 'Варна, Вараполис',
            desc: 'Инсталация на VRF система GREE 60HP за търговски обект 1500 м².',
            duration: '12 дни',
            area: '1500 м²',
            color: '#0F2A44',
            accent: '#00AEEF'
        },
        {
            title: 'Подово отопление – къща Слънчев ден',
            category: 'interior',
            categoryLabel: 'Вътрешни',
            location: 'кв. Слънчев ден',
            desc: 'Подово отопление UPONOR на 2 етажа с термогидравлична развалка.',
            duration: '9 дни',
            area: '180 м²',
            color: '#1a3a5c',
            accent: '#E8DCC4'
        },
        {
            title: 'Реновация на офис – бул. Сливница',
            category: 'commercial',
            categoryLabel: 'Бизнес',
            location: 'Варна, центръм',
            desc: 'Пълен ремонт на офис помещения 280 м² със стъклени прегради и акустични тавани.',
            duration: '28 дни',
            area: '280 м²',
            color: '#0F2A44',
            accent: '#00AEEF'
        }
    ];

    // SVG generator per category
    function projectSVG(project, idx) {
        const c = project.color;
        const a = project.accent;
        const seed = idx + 1;
        const variant = (idx % 4);

        if (variant === 0) {
            // Building facade
            return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="pg${seed}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${c}"/>
                        <stop offset="100%" stop-color="${c}" stop-opacity="0.6"/>
                    </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#pg${seed})"/>
                <rect x="60" y="60" width="280" height="200" fill="${c}" stroke="${a}" stroke-width="2"/>
                <rect x="80" y="80" width="40" height="50" fill="${a}" opacity="0.7"/>
                <rect x="140" y="80" width="40" height="50" fill="${a}" opacity="0.7"/>
                <rect x="200" y="80" width="40" height="50" fill="${a}" opacity="0.7"/>
                <rect x="260" y="80" width="40" height="50" fill="${a}" opacity="0.7"/>
                <rect x="80" y="150" width="40" height="50" fill="${a}" opacity="0.5"/>
                <rect x="140" y="150" width="40" height="50" fill="${a}" opacity="0.5"/>
                <rect x="200" y="150" width="40" height="50" fill="${a}" opacity="0.5"/>
                <rect x="260" y="150" width="40" height="50" fill="${a}" opacity="0.5"/>
                <rect x="180" y="210" width="40" height="50" fill="${a}"/>
                <line x1="0" y1="260" x2="400" y2="260" stroke="${a}" stroke-width="1" opacity="0.4"/>
                <circle cx="60" cy="40" r="20" fill="${a}" opacity="0.15"/>
                <circle cx="340" cy="30" r="14" fill="${a}" opacity="0.2"/>
            </svg>`;
        } else if (variant === 1) {
            // Roof
            return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="pg${seed}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${c}"/>
                        <stop offset="100%" stop-color="${a}" stop-opacity="0.3"/>
                    </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#pg${seed})"/>
                <polygon points="50,180 200,80 350,180 350,260 50,260" fill="${c}" stroke="${a}" stroke-width="2"/>
                <polygon points="50,180 200,80 350,180" fill="${a}" opacity="0.3"/>
                <line x1="80" y1="200" x2="200" y2="120" stroke="${a}" stroke-width="1.5" opacity="0.6"/>
                <line x1="200" y1="120" x2="320" y2="200" stroke="${a}" stroke-width="1.5" opacity="0.6"/>
                <line x1="110" y1="220" x2="200" y2="155" stroke="${a}" stroke-width="1" opacity="0.4"/>
                <line x1="200" y1="155" x2="290" y2="220" stroke="${a}" stroke-width="1" opacity="0.4"/>
                <rect x="170" y="200" width="60" height="60" fill="${a}" opacity="0.7"/>
                <rect x="180" y="220" width="40" height="40" fill="${c}"/>
                <circle cx="200" cy="60" r="14" fill="${a}" opacity="0.3"/>
            </svg>`;
        } else if (variant === 2) {
            // Interior room
            return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="pg${seed}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${c}"/>
                        <stop offset="100%" stop-color="${c}" stop-opacity="0.7"/>
                    </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#pg${seed})"/>
                <rect x="0" y="220" width="400" height="80" fill="${a}" opacity="0.4"/>
                <rect x="40" y="80" width="120" height="140" fill="${a}" opacity="0.6"/>
                <rect x="50" y="90" width="100" height="120" fill="${c}"/>
                <rect x="60" y="100" width="35" height="40" fill="${a}" opacity="0.4"/>
                <rect x="105" y="100" width="35" height="40" fill="${a}" opacity="0.4"/>
                <rect x="200" y="100" width="160" height="100" fill="${a}" opacity="0.3"/>
                <circle cx="280" cy="150" r="30" fill="${a}" opacity="0.5"/>
                <rect x="180" y="180" width="180" height="40" fill="${a}" opacity="0.5"/>
                <circle cx="200" cy="50" r="25" fill="${a}" opacity="0.3"/>
                <circle cx="200" cy="50" r="15" fill="${a}" opacity="0.5"/>
            </svg>`;
        } else {
            // Construction/metal
            return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="pg${seed}" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="${c}"/>
                        <stop offset="100%" stop-color="${c}" stop-opacity="0.8"/>
                    </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#pg${seed})"/>
                <line x1="60" y1="260" x2="60" y2="80" stroke="${a}" stroke-width="6"/>
                <line x1="340" y1="260" x2="340" y2="80" stroke="${a}" stroke-width="6"/>
                <line x1="60" y1="80" x2="340" y2="80" stroke="${a}" stroke-width="6"/>
                <line x1="60" y1="260" x2="340" y2="260" stroke="${a}" stroke-width="6"/>
                <line x1="60" y1="80" x2="340" y2="260" stroke="${a}" stroke-width="3" opacity="0.6"/>
                <line x1="340" y1="80" x2="60" y2="260" stroke="${a}" stroke-width="3" opacity="0.6"/>
                <line x1="120" y1="80" x2="120" y2="260" stroke="${a}" stroke-width="2" opacity="0.4"/>
                <line x1="200" y1="80" x2="200" y2="260" stroke="${a}" stroke-width="2" opacity="0.4"/>
                <line x1="280" y1="80" x2="280" y2="260" stroke="${a}" stroke-width="2" opacity="0.4"/>
                <rect x="50" y="250" width="20" height="20" fill="${a}"/>
                <rect x="330" y="250" width="20" height="20" fill="${a}"/>
                <circle cx="200" cy="50" r="18" fill="${a}" opacity="0.3"/>
            </svg>`;
        }
    }

    function renderProjects(filter = 'all') {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        grid.innerHTML = '';
        const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
        filtered.forEach((project, idx) => {
            const card = document.createElement('article');
            card.className = 'project-card reveal';
            card.style.transitionDelay = (idx * 0.05) + 's';
            card.innerHTML = `
                <div class="project-card__image">
                    <span class="project-card__category">${project.categoryLabel}</span>
                    ${projectSVG(project, idx)}
                </div>
                <div class="project-card__body">
                    <div class="project-card__location">
                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        ${project.location}
                    </div>
                    <h3 class="project-card__title">${project.title}</h3>
                    <p class="project-card__desc">${project.desc}</p>
                    <div class="project-card__meta">
                        <div class="project-card__meta-stat">
                            Срок: <strong>${project.duration}</strong>
                        </div>
                        <div class="project-card__meta-stat">
                            Площ: <strong>${project.area}</strong>
                        </div>
                        <a href="#quote" class="project-card__link">
                            <span>Виж</span>
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 5l7 7-7 7v-4H3v-6h11V5z"/></svg>
                        </a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
            // Animate in
            setTimeout(() => card.classList.add('is-visible'), 50);
        });
    }

    // Init
    renderProjects();

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');
            renderProjects(btn.dataset.filter);
        });
    });

})();
