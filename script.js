/* ==========================================================================
   PRASHANT. PORTFOLIO - DYNAMIC INTERACTIVE ENGINE
   ========================================================================== */

// Global Modal Handlers (Available Immediately)
window.toggleAIConsole = function() {
    const modal = document.getElementById('aiConsoleModal');
    const consoleInput = document.getElementById('aiConsoleInput');
    if (!modal) return;
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    } else {
        modal.classList.add('show');
        modal.style.display = 'flex';
        if (consoleInput) consoleInput.focus();
    }
};

window.closeAIConsole = function() {
    const modal = document.getElementById('aiConsoleModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
};

window.toggleAIChat = function() {
    const modal = document.getElementById('aiChatModal');
    if (!modal) return;
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    } else {
        modal.classList.add('show');
        modal.style.display = 'flex';
    }
};

window.closeAIChat = function() {
    const modal = document.getElementById('aiChatModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
    }
};

/* --------------------------------------------------------------------------
   1. INTERACTIVE NEURAL PARTICLE CANVAS
   -------------------------------------------------------------------------- */
function initNeuralCanvas() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouse = { x: width / 2, y: height / 2, radius: 180 };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    const particleCount = width > 768 ? 75 : 40;
    const particles = [];
    const colors = ['#ffb703', '#ff2a5f', '#ffbe0b', '#3a86ff'];

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 3.5 + 1.5;
            this.baseAlpha = Math.random() * 0.5 + 0.4;
            this.pulseSpeed = Math.random() * 0.03 + 0.01;
            this.pulseAngle = Math.random() * Math.PI * 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulseAngle += this.pulseSpeed;

            if (this.x < -10) this.x = width + 10;
            if (this.x > width + 10) this.x = -10;
            if (this.y < -10) this.y = height + 10;
            if (this.y > height + 10) this.y = -10;

            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
                const force = (mouse.radius - dist) / mouse.radius;
                this.x -= (dx / dist) * force * 2;
                this.y -= (dy / dist) * force * 2;
            }
        }

        draw() {
            const alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.25;
            ctx.save();
            ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.save();
                    ctx.globalAlpha = (1 - dist / 120) * 0.2;
                    ctx.strokeStyle = particles[i].color;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.restore();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------------------------------
   2. DYNAMIC PROJECTS DATA & RENDER ENGINE
   -------------------------------------------------------------------------- */
const projectsData = [
    {
        id: 1,
        title: "Deta Hub",
        category: "llm",
        categoryTag: "DATASET & AI PLATFORM",
        shortDesc: "Dataset discovery and management platform where users explore data by category, search resources, and access ML project data.",
        fullDesc: "Deta Hub is a comprehensive dataset discovery and management platform where users can explore datasets by category, search for specific data, and access resources for machine-learning projects. It includes authentication, database integration, smooth animations, and a responsive interface.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        tech: ["Next.js", "React", "TypeScript", "MongoDB", "Mongoose", "NextAuth", "Tailwind CSS", "Framer Motion"],
        liveUrl: "https://deta-hub.vercel.app",
        githubUrl: "https://github.com/prashant-singh-78"
    },
    {
        id: 2,
        title: "Snake Verse",
        category: "ai",
        categoryTag: "AI & COMPUTER VISION",
        shortDesc: "AI-powered deep-learning web application that identifies snake species from an uploaded image.",
        fullDesc: "Snake Verse is an AI-powered web application that identifies snake species from an uploaded image. The application preprocesses the image, passes it through a trained deep-learning CNN model, and displays the predicted snake species through a user-friendly interface.",
        image: "https://images.unsplash.com/photo-1531386151447-fd76ad50012f?auto=format&fit=crop&w=800&q=80",
        tech: ["Python", "Flask", "TensorFlow", "Keras", "NumPy", "Pillow", "HTML", "CSS", "JavaScript"],
        liveUrl: "https://snake-verse-five.vercel.app",
        githubUrl: "https://github.com/prashant-singh-78"
    },
    {
        id: 3,
        title: "Courses Platform — Skill.Nova",
        category: "web",
        categoryTag: "EDTECH PLATFORM",
        shortDesc: "Responsive online learning platform featuring career-oriented courses, guided learning paths, and AI chatbot.",
        fullDesc: "Skill.Nova is a responsive online learning platform that helps users explore career-oriented courses and guided learning paths. It includes course cards, mentor information, learner outcomes, counselling forms, FAQs and an interactive support chatbot.",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
        tech: ["React", "Vite", "JavaScript", "HTML", "CSS", "Lucide React", "bcrypt.js"],
        liveUrl: "https://courses-plateform.vercel.app",
        githubUrl: "https://github.com/prashant-singh-78"
    },
    {
        id: 4,
        title: "StudyShield",
        category: "web",
        categoryTag: "PRODUCTIVITY & CHROME EXTENSION",
        shortDesc: "Student productivity platform blocking distracting websites, YouTube Study Mode, focus streaks & leaderboards.",
        fullDesc: "StudyShield is a student productivity platform that blocks distracting websites during focused study sessions. Students can set a timer, activate YouTube Study Mode, track study history, maintain focus streaks and compare progress through a leaderboard.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
        tech: ["React", "Vite", "FastAPI", "Python", "SQLAlchemy", "SQLite", "JavaScript", "Manifest V3"],
        liveUrl: "https://github.com/prashant-singh-78/SWD.git",
        githubUrl: "https://github.com/prashant-singh-78/SWD.git"
    },
    {
        id: 5,
        title: "Management SaaS — NovaERP",
        category: "web",
        categoryTag: "ENTERPRISE SAAS",
        shortDesc: "Company management platform combining HR operations, attendance, payroll, CRM, inventory & role-based dashboards.",
        fullDesc: "NovaERP is a company management platform that combines HR operations, employee attendance, leave management, payroll, CRM, inventory and reporting in one system. It provides separate role-based dashboards for Super Admins, HR teams and Managers, along with audit logs and security controls.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Cloudflare Workers", "Cloudflare D1", "Drizzle ORM"],
        liveUrl: "https://management-saa-s-six.vercel.app",
        githubUrl: "https://github.com/prashant-singh-78"
    },
    {
        id: 6,
        title: "Mockmate",
        category: "llm",
        categoryTag: "AI INTERVIEW & SKILL PASSPORT",
        shortDesc: "AI-powered interview preparation & skill-verification platform with resume analysis & technical viva assessments.",
        fullDesc: "Mockmate is an AI-powered interview preparation and skill-verification platform. It conducts mock interviews, analyses resumes, evaluates coding challenges, performs technical viva assessments and creates an evidence-based Skill Passport that users can share with recruiters.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
        tech: ["React", "TypeScript", "Vite", "FastAPI", "Python", "SQLAlchemy", "PostgreSQL", "Alembic", "OpenAI API", "Pyodide"],
        liveUrl: "https://mockmate-sandy.vercel.app",
        githubUrl: "https://github.com/prashant-singh-78"
    },
    {
        id: 7,
        title: "AI Coach",
        category: "llm",
        categoryTag: "CAREER & ATS AI",
        shortDesc: "Intelligent career preparation platform with ATS resume scoring, job matching & Gemini AI interview practice.",
        fullDesc: "AI Coach is an intelligent career-preparation platform that helps users improve their interview and resume performance. It provides ATS resume scoring, job-description matching, AI-generated interview questions, technical and HR practice, personalised feedback and performance analytics.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        tech: ["React", "Vite", "FastAPI", "Python", "SQLAlchemy", "SQLite", "Google Gemini API", "spaCy", "Sentence Transformers", "JWT"],
        liveUrl: "https://ai-coach-ochre-pi.vercel.app",
        githubUrl: "https://github.com/prashant-singh-78"
    },
    {
        id: 8,
        title: "StreamLite",
        category: "web",
        categoryTag: "MEDIA STREAMING",
        shortDesc: "Subscription-based video platform with user authentication, video uploading & admin management dashboard.",
        fullDesc: "StreamLite is a subscription-based video platform where registered users can access premium video content. It supports user authentication, subscription-controlled access, video uploading, content viewing and an administrative dashboard for managing videos and users.",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=800&q=80",
        tech: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
        liveUrl: "https://streamlite-vrvp.vercel.app/",
        githubUrl: "https://github.com/prashant-singh-78"
    },
    {
        id: 9,
        title: "Anime Verse",
        category: "web",
        categoryTag: "INTERACTIVE WEB EXPERIENCE",
        shortDesc: "Naruto-themed interactive website with character exploration, battle logs, quiz & animated visual elements.",
        fullDesc: "Anime Verse is an interactive Naruto-themed website that allows fans to explore characters, villages and memorable battles. It also includes an engaging character quiz and animated visual elements that create an immersive anime experience.",
        image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "GitHub Pages"],
        liveUrl: "https://prashant-singh-78.github.io/anime-verse/",
        githubUrl: "https://github.com/prashant-singh-78/anime-verse"
    },
    {
        id: 10,
        title: "Image.ML",
        category: "ai",
        categoryTag: "MACHINE LEARNING CNN",
        shortDesc: "Machine-learning image classification project trained on custom dataset to differentiate cat vs non-cat images.",
        fullDesc: "Image.ML is a machine-learning image classification project trained on a custom dataset to differentiate cats from non-cat images. The system preprocesses uploaded images, runs them through a trained CNN model and returns a fast prediction result.",
        image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80",
        tech: ["Python", "TensorFlow", "Keras", "CNN", "NumPy", "Flask", "HTML", "CSS", "JavaScript"],
        liveUrl: "https://github.com/prashant-singh-78/image.ml.git",
        githubUrl: "https://github.com/prashant-singh-78/image.ml.git"
    },
    {
        id: 11,
        title: "Skin Disease Predictor",
        category: "ai",
        categoryTag: "HEALTHCARE AI",
        shortDesc: "AI-based medical application analyzing uploaded skin images and predicting multi-class skin conditions.",
        fullDesc: "The Skin Disease Predictor is an AI-based application that analyses uploaded skin images and predicts among multiple skin-condition classes. It preprocesses the image, passes it through a trained CNN model and returns the most likely prediction through a web interface.",
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
        tech: ["Python", "FastAPI", "TensorFlow", "Keras", "CNN", "NumPy", "Pillow", "OpenCV", "HTML", "CSS", "JavaScript"],
        liveUrl: "https://github.com/prashant-singh-78/skin-desease.ml.git",
        githubUrl: "https://github.com/prashant-singh-78/skin-desease.ml.git"
    },
    {
        id: 12,
        title: "Medicure",
        category: "ai",
        categoryTag: "SMART HEALTHCARE PLATFORM",
        shortDesc: "Smart healthcare platform with patient/doctor registration, emergency ambulance support & ML disease info.",
        fullDesc: "Medicure is a portable smart healthcare platform designed to make essential medical services more accessible. It brings together patient and doctor registration, emergency ambulance support, disease information, multilingual assistance, healing music and wellness resources within one digital system.",
        image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
        tech: ["React", "Vite", "JavaScript", "Python", "FastAPI", "Machine Learning", "HTML", "CSS"],
        liveUrl: "https://github.com/prashant-singh-78/medicure.git",
        githubUrl: "https://github.com/prashant-singh-78/medicure.git"
    },
    {
        id: 13,
        title: "Jarvis — Mikasa Voice Assistant",
        category: "llm",
        categoryTag: "AI VOICE ASSISTANT",
        shortDesc: "Desktop voice assistant automating computer tasks with speech recognition, Gemini API & MediaPipe gesture control.",
        fullDesc: "Jarvis, also known as Mikasa, is an AI-powered desktop voice assistant that automates everyday computer tasks. It can recognise voice commands, open applications and websites, perform web searches, control selected system functions and respond through text-to-speech.",
        image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=800&q=80",
        tech: ["Python", "SpeechRecognition", "PyAudio", "pyttsx3", "Google Gemini API", "OpenCV", "MediaPipe", "Pycaw", "PowerShell"],
        liveUrl: "https://github.com/prashant-singh-78/jarvis.git",
        githubUrl: "https://github.com/prashant-singh-78/jarvis.git"
    },
    {
        id: 14,
        title: "Krashi Kalyan",
        category: "ai",
        categoryTag: "AGRITECH & DATA INSIGHTS",
        shortDesc: "Agriculture support platform providing soil analysis, crop recommendations, disease risk & market prices.",
        fullDesc: "Krashi Kalyan is an agriculture-support platform that helps farmers make better decisions using digital tools and data insights. It provides soil analysis, crop recommendations, disease-risk information, weather updates, market-price comparison and water-management support through a farmer-friendly interface.",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
        tech: ["HTML", "CSS", "JavaScript", "Python", "Machine Learning", "Chart.js", "Weather APIs"],
        liveUrl: "https://github.com/prashant-singh-78/krashi-kalyan.git",
        githubUrl: "https://github.com/prashant-singh-78/krashi-kalyan.git"
    },
    {
        id: 15,
        title: "Weather Forecast App",
        category: "web",
        categoryTag: "REAL-TIME API WEB APP",
        shortDesc: "Real-time weather forecast application displaying live temperature, humidity & conditions for searched cities.",
        fullDesc: "The Weather Forecast App provides real-time weather information for a searched city. It retrieves live data from a weather API and displays temperature, humidity and current conditions such as rain, clouds or clear weather in a simple responsive interface.",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80",
        tech: ["HTML5", "CSS3", "JavaScript", "Weather API"],
        liveUrl: "https://prashant-singh-78.github.io/weather-forecast/",
        githubUrl: "https://github.com/prashant-singh-78/weather-forecast"
    },
    {
        id: 16,
        title: "Old Portfolio",
        category: "web",
        categoryTag: "PORTFOLIO WEBSITE",
        shortDesc: "Personal portfolio website showcasing background, technical skills, AI/ML projects and recruiter contact info.",
        fullDesc: "This personal portfolio website showcases my background, technical skills, projects and contact information. It uses a responsive design, smooth animations and organised project sections to give recruiters and visitors a quick overview of my work in AI, machine learning and web development.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        tech: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Vercel"],
        liveUrl: "https://prashant08.vercel.app/",
        githubUrl: "https://github.com/prashant-singh-78"
    }
];

function initProjectsGrid() {
    const grid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('projectSearchInput');
    const countBadge = document.getElementById('searchCountBadge');
    if (!grid) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function filterAndRender() {
        const cards = grid.querySelectorAll('.project-card');
        let visibleCount = 0;
        const totalCount = cards.length;

        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
            const tag = card.querySelector('.project-tag')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.hover-desc')?.textContent.toLowerCase() || '';
            const techText = Array.from(card.querySelectorAll('.tech-pill')).map(t => t.textContent.toLowerCase()).join(' ');

            const matchesCategory = (activeFilter === 'all') || (category === activeFilter);
            
            let matchesSearch = true;
            if (searchQuery.trim() !== '') {
                const query = searchQuery.toLowerCase().trim();
                matchesSearch = title.includes(query) || tag.includes(query) || desc.includes(query) || techText.includes(query);
            }

            if (matchesCategory && matchesSearch) {
                card.classList.remove('hidden');
                card.style.display = '';
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        if (countBadge) {
            countBadge.textContent = `${visibleCount} of ${totalCount} Projects`;
        }
    }

    // Filter Buttons Event Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter') || 'all';
            filterAndRender();
        });
    });

    // Search Input Event Listener
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterAndRender();
        });
    }

    // Attach 3D Tilt Movement & Card Modal Click Handlers to All Project Cards
    const cards = grid.querySelectorAll('.project-card');
    cards.forEach(card => {
        const id = parseInt(card.getAttribute('data-id'), 10);
        
        card.addEventListener('click', () => {
            openProjectModal(id);
        });

        // 3D Perspective Tilt on Mouse Movement
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            card.style.transition = 'transform 0.05s ease-out, box-shadow 0.2s ease, border-color 0.2s ease';
            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.4s ease-out, box-shadow 0.4s ease, border-color 0.4s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0deg) scale(1)';
        });
    });

    filterAndRender();
}

/* --------------------------------------------------------------------------
   PROJECT MODAL CONTROL
   -------------------------------------------------------------------------- */
let globalOpenProjectModal = null;

function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    window.openProjectModal = function(id) {
        const project = projectsData.find(p => p.id === id);
        if (!project || !modal || !modalBody) return;

        modalBody.innerHTML = `
            <span class="project-tag">${project.categoryTag}</span>
            <h2 style="font-family: var(--font-heading); font-size: 2rem; margin: 0.5rem 0 1rem 0;">${project.title}</h2>
            <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 280px; object-fit: cover; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid var(--border-color);">
            <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem;">${project.fullDesc}</p>
            <h4 style="margin-bottom: 0.8rem;">Technologies Used:</h4>
            <div class="project-tech-stack" style="margin-bottom: 2rem;">
                ${project.tech.map(t => `<span class="tech-badge" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">${t}</span>`).join('')}
            </div>
            <div style="display: flex; gap: 1rem;">
                <a href="${project.liveUrl}" target="_blank" class="btn btn-gold">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> Launch Live Application
                </a>
                <a href="${project.githubUrl}" target="_blank" class="btn btn-outline">
                    <i class="fa-brands fa-github"></i> View GitHub Repo
                </a>
            </div>
        `;

        modal.classList.add('active');
    };

    if (modalClose) {
        modalClose.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
}

/* --------------------------------------------------------------------------
   3. NAVBAR SCROLL EFFECT
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
}

/* --------------------------------------------------------------------------
   4. SCI-FI HUD MODE TOGGLE
   -------------------------------------------------------------------------- */
function initHUDToggle() {
    const btn = document.getElementById('hudToggleBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        document.body.classList.toggle('hud-active');
        const isActive = document.body.classList.contains('hud-active');
        btn.querySelector('.hud-btn-text').textContent = isActive ? "Fluid Mode" : "HUD Mode";
    });
}

/* --------------------------------------------------------------------------
   5. PHOTO UPLOAD PREVIEW UTILITY
   -------------------------------------------------------------------------- */
function initPhotoUpload() {
    const input = document.getElementById('photoUploadInput');
    const profileImg = document.getElementById('userProfileImg');

    if (input && profileImg) {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    profileImg.src = event.target.result;
                    showToast("Profile picture updated!");
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

/* --------------------------------------------------------------------------
   6. STAT COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    window.addEventListener('scroll', () => {
        const aboutSection = document.getElementById('about');
        if (!aboutSection || animated) return;

        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            animated = true;
            statNumbers.forEach(num => {
                const target = parseInt(num.dataset.target, 10);
                let current = 0;
                const increment = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        num.textContent = target;
                        clearInterval(timer);
                    } else {
                        num.textContent = current;
                    }
                }, 30);
            });
        }
    });
}

/* --------------------------------------------------------------------------
   7. CONTACT FORM HANDLING & TOAST
   -------------------------------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Transmission received! Thank you for reaching out.");
        form.reset();
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

/* --------------------------------------------------------------------------
   8. REAL-TIME UTC LIVE CLOCK
   -------------------------------------------------------------------------- */
function initLiveClock() {
    const clock = document.getElementById('liveClock');
    if (!clock) return;

    function updateTime() {
        const now = new Date();
        const utcString = now.toUTCString().split(' ')[4];
        clock.textContent = `UTC ${utcString} | OPERATIONAL`;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

/* --------------------------------------------------------------------------
   9. PRASHANT_AI INTERACTIVE TERMINAL ENGINE
   -------------------------------------------------------------------------- */
window.toggleAIConsole = function() {
    const modal = document.getElementById('aiConsoleModal');
    const consoleInput = document.getElementById('aiConsoleInput');
    if (!modal) return;
    modal.classList.toggle('show');
    if (modal.classList.contains('show') && consoleInput) {
        consoleInput.focus();
    }
};

window.closeAIConsole = function() {
    const modal = document.getElementById('aiConsoleModal');
    if (modal) {
        modal.classList.remove('show');
    }
};

window.execAICommand = function(rawCmd) {
    const consoleBody = document.getElementById('aiConsoleBody');
    const consoleInput = document.getElementById('aiConsoleInput');
    if (!rawCmd || !consoleBody) return;

    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Append User Input Log
    const userLog = document.createElement('div');
    userLog.className = 'console-log';
    userLog.innerHTML = `<p><span class="prompt-symbol">PRASHANT_AI&gt;</span> <span class="user-cmd-msg">${escapeHTML(rawCmd)}</span></p>`;
    consoleBody.appendChild(userLog);

    let respHTML = '';

    switch (cmd) {
        case 'help':
            respHTML = `
                <p class="ai-resp-msg">Available Commands:</p>
                <p class="sys-msg">• <span class="cmd-highlight">skills</span> : View primary AI/ML tech stack & toolset</p>
                <p class="sys-msg">• <span class="cmd-highlight">projects</span> : List featured AI/ML applications & live links</p>
                <p class="sys-msg">• <span class="cmd-highlight">resume</span> : Download Prashant's official PDF resume</p>
                <p class="sys-msg">• <span class="cmd-highlight">contact</span> : Get email, phone, location & socials</p>
                <p class="sys-msg">• <span class="cmd-highlight">about</span> : Brief summary of academic background</p>
                <p class="sys-msg">• <span class="cmd-highlight">clear</span> : Clear console logs</p>
            `;
            break;

        case 'skills':
            respHTML = `
                <p class="ai-resp-msg">🚀 Primary Tech Stack:</p>
                <p class="sys-msg">Python • C • Flask • SQL • NumPy • Pandas • Matplotlib • Scikit-learn • YOLOv8 • Git • Linux • Arduino IDE • Cursor • VS Code</p>
            `;
            break;

        case 'projects':
            respHTML = `
                <p class="ai-resp-msg">💼 16 Featured AI & Full-Stack Projects Ready:</p>
                <p class="sys-msg">1. Deta Hub (deta-hub.vercel.app)</p>
                <p class="sys-msg">2. Snake Verse (snake-verse-five.vercel.app)</p>
                <p class="sys-msg">3. Skill.Nova Platform (courses-plateform.vercel.app)</p>
                <p class="sys-msg">4. StudyShield (github.com/prashant-singh-78/SWD)</p>
                <p class="sys-msg">5. NovaERP SaaS (management-saa-s-six.vercel.app)</p>
                <p class="sys-msg">6. Mockmate AI (mockmate-sandy.vercel.app)</p>
                <p class="sys-msg">7. AI Coach (ai-coach-ochre-pi.vercel.app)</p>
                <p class="sys-msg">8. StreamLite (streamlite-vrvp.vercel.app)</p>
            `;
            break;

        case 'resume':
            respHTML = `
                <p class="ai-resp-msg">📄 Downloading Prashant's Official Resume PDF...</p>
            `;
            window.open('assets/resume.pdf', '_blank');
            break;

        case 'contact':
            respHTML = `
                <p class="ai-resp-msg">📬 Contact Telemetry:</p>
                <p class="sys-msg">Email: prashantbachhamadi@gmail.com</p>
                <p class="sys-msg">Phone: +91 7627043971</p>
                <p class="sys-msg">Location: Jaipur, Rajasthan, India</p>
                <p class="sys-msg">LinkedIn: linkedin.com/in/prashant-singh-7047572a0</p>
                <p class="sys-msg">Instagram: @prashant_singh_08__</p>
            `;
            break;

        case 'about':
            respHTML = `
                <p class="ai-resp-msg">🎓 Academic Profile:</p>
                <p class="sys-msg">B.Tech in Computer Science (AI) at Arya Institute of Engineering Technology And Management, Jaipur (2023-2027).</p>
                <p class="sys-msg">Class XII: 87.77% | Class X: 90.00%</p>
                <p class="sys-msg">Trophies: Winner - VGU National Exhibition 2025, Rajasthan Digifest × TiE Finalist.</p>
            `;
            break;

        case 'clear':
            consoleBody.innerHTML = `
                <div class="console-log">
                    <p class="sys-msg"><span class="prompt-user">SYSTEM:</span> Terminal cleared. Type <span class="cmd-highlight">'help'</span> for command menu.</p>
                </div>
            `;
            if (consoleInput) consoleInput.value = '';
            return;

        default:
            respHTML = `
                <p class="ai-resp-msg" style="border-left-color: var(--accent-crimson);">Unknown command '${escapeHTML(rawCmd)}'. Type <span class="cmd-highlight">'help'</span> for list of commands.</p>
            `;
            break;
    }

    const respLog = document.createElement('div');
    respLog.className = 'console-log';
    respLog.innerHTML = respHTML;
    consoleBody.appendChild(respLog);

    consoleBody.scrollTop = consoleBody.scrollHeight;
    if (consoleInput) consoleInput.value = '';
};

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

function initAIConsoleTerminal() {
    const modal = document.getElementById('aiConsoleModal');
    const closeBtn = document.getElementById('aiConsoleClose');
    if (!modal) return;

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    }
}

/* --------------------------------------------------------------------------
   10. NEURAL ARCHITECTURE LAB CANVAS VISUALIZER
   -------------------------------------------------------------------------- */
function initNeuralLabVisualizer() {
    const canvas = document.getElementById('neuralVisualizerCanvas');
    const lrSlider = document.getElementById('lrSlider');
    const lrVal = document.getElementById('lrVal');
    const hiddenUnitsSlider = document.getElementById('hiddenUnitsSlider');
    const unitsVal = document.getElementById('unitsVal');
    const speedSlider = document.getElementById('speedSlider');
    const speedVal = document.getElementById('speedVal');
    const btnPulse = document.getElementById('btnPulsePass');
    const btnReset = document.getElementById('btnResetWeights');
    const telemetryLoss = document.getElementById('telemetryLoss');
    const telemetryAcc = document.getElementById('telemetryAcc');

    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = canvas.parentElement.clientWidth || 600;
    let height = canvas.height = canvas.parentElement.clientHeight || 340;

    window.addEventListener('resize', () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
    });

    let hiddenCount = parseInt(hiddenUnitsSlider ? hiddenUnitsSlider.value : 6, 10);
    let speed = parseInt(speedSlider ? speedSlider.value : 2, 10);
    let pulses = [];

    // Sliders Event Listeners
    if (lrSlider && lrVal) {
        lrSlider.addEventListener('input', (e) => {
            lrVal.textContent = parseFloat(e.target.value).toFixed(3);
        });
    }

    if (hiddenUnitsSlider && unitsVal) {
        hiddenUnitsSlider.addEventListener('input', (e) => {
            hiddenCount = parseInt(e.target.value, 10);
            unitsVal.textContent = hiddenCount;
        });
    }

    if (speedSlider && speedVal) {
        speedSlider.addEventListener('input', (e) => {
            speed = parseInt(e.target.value, 10);
            speedVal.textContent = speed + 'x';
        });
    }

    // Expose global trigger functions
    window.runNeuralForwardPass = function() {
        triggerForwardPass();
    };

    window.resetNeuralWeights = function() {
        pulses = [];
        if (telemetryLoss) telemetryLoss.textContent = (Math.random() * 0.05 + 0.01).toFixed(4);
        if (telemetryAcc) telemetryAcc.textContent = (98.5 + Math.random() * 1.2).toFixed(1) + '%';
        triggerForwardPass();
    };

    function triggerForwardPass() {
        const inputNodes = 4;

        for (let i = 0; i < inputNodes; i++) {
            for (let j = 0; j < hiddenCount; j++) {
                pulses.push({ layer: 0, from: i, to: j, progress: 0, speed: 0.015 * speed });
            }
        }
    }

    function drawNetwork() {
        ctx.clearRect(0, 0, width, height);

        const layers = [4, hiddenCount, 3];
        const layerX = [width * 0.18, width * 0.5, width * 0.82];
        const nodes = [];

        // Build Node Coordinates
        layers.forEach((count, lIdx) => {
            const layerNodes = [];
            const spacing = height / (count + 1);
            for (let i = 0; i < count; i++) {
                layerNodes.push({ x: layerX[lIdx], y: spacing * (i + 1) });
            }
            nodes.push(layerNodes);
        });

        // Draw Weights (Connections)
        for (let l = 0; l < nodes.length - 1; l++) {
            const currLayer = nodes[l];
            const nextLayer = nodes[l + 1];

            currLayer.forEach(fromNode => {
                nextLayer.forEach(toNode => {
                    ctx.beginPath();
                    ctx.moveTo(fromNode.x, fromNode.y);
                    ctx.lineTo(toNode.x, toNode.y);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                });
            });
        }

        // Draw & Update Data Pulses
        for (let p = pulses.length - 1; p >= 0; p--) {
            const pulse = pulses[p];
            const fromNode = nodes[pulse.layer][pulse.from];
            const toNode = nodes[pulse.layer + 1][pulse.to];

            pulse.progress += pulse.speed;

            if (pulse.progress >= 1) {
                if (pulse.layer === 0 && pulse.progress >= 1) {
                    for (let k = 0; k < nodes[2].length; k++) {
                        pulses.push({ layer: 1, from: pulse.to, to: k, progress: 0, speed: 0.018 * speed });
                    }
                }
                pulses.splice(p, 1);
                continue;
            }

            const currX = fromNode.x + (toNode.x - fromNode.x) * pulse.progress;
            const currY = fromNode.y + (toNode.y - fromNode.y) * pulse.progress;

            ctx.beginPath();
            ctx.arc(currX, currY, 4, 0, Math.PI * 2);
            ctx.fillStyle = pulse.layer === 0 ? '#ffb703' : '#ff2a5f';
            ctx.shadowBlur = 10;
            ctx.shadowColor = pulse.layer === 0 ? '#ffb703' : '#ff2a5f';
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        // Draw Nodes
        nodes.forEach((layerNodes, lIdx) => {
            layerNodes.forEach(node => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
                ctx.fillStyle = lIdx === 0 ? '#ffb703' : lIdx === 1 ? '#ff2a5f' : '#27c93f';
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });
        });

        requestAnimationFrame(drawNetwork);
    }

    triggerForwardPass();
    drawNetwork();
}

/* --------------------------------------------------------------------------
   11. PRASHANT AI CONVERSATIONAL AVATAR CHATBOT ENGINE
   -------------------------------------------------------------------------- */
window.toggleAIChat = function() {
    const modal = document.getElementById('aiChatModal');
    if (!modal) return;
    modal.classList.toggle('show');
};

window.closeAIChat = function() {
    const modal = document.getElementById('aiChatModal');
    if (modal) modal.classList.remove('show');
};

window.sendAIChat = function(questionText) {
    const chatBody = document.getElementById('aiChatBody');
    const chatInput = document.getElementById('aiChatInput');
    if (!questionText || !chatBody) return;

    const query = questionText.trim();
    if (!query) return;

    // Append User Message Bubble
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-bubble user-msg';
    userMsg.textContent = query;
    chatBody.appendChild(userMsg);

    if (chatInput) chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Typing response simulation
    setTimeout(() => {
        let aiResp = "";
        const lowerQ = query.toLowerCase();

        if (lowerQ.includes('hire') || lowerQ.includes('why')) {
            aiResp = "Prashant brings strong expertise in PyTorch, YOLOv8, Flask, and Full-Stack AI integration. He has won 1st Place at VGU Exhibition 2025 and built 16+ production projects!";
        } else if (lowerQ.includes('yolo') || lowerQ.includes('pytorch') || lowerQ.includes('experience')) {
            aiResp = "Prashant has extensive experience building computer vision pipelines with YOLOv8 (e.g. Skin Disease Predictor, Image.ML) and custom PyTorch / Scikit-learn ML models!";
        } else if (lowerQ.includes('available') || lowerQ.includes('availability') || lowerQ.includes('role')) {
            aiResp = "Yes! Prashant is actively seeking AI/ML Engineer & Data Science roles. You can contact him directly at prashantbachhamadi@gmail.com or +91 7627043971.";
        } else {
            aiResp = `Thanks for asking about "${query}"! Prashant specializes in AI/ML solutions, model deployment, and full-stack web applications. Feel free to download his resume or drop an email!`;
        }

        const aiMsg = document.createElement('div');
        aiMsg.className = 'chat-bubble ai-msg';
        aiMsg.textContent = aiResp;
        chatBody.appendChild(aiMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 300);
}

/* --------------------------------------------------------------------------
   12. HACKATHON MILESTONE ROADMAP INTERACTIVE ENGINE
   -------------------------------------------------------------------------- */
window.selectTimelineMilestone = function(key, element) {
    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => item.classList.remove('active'));

    if (element) {
        element.classList.add('active');
    }

    const titleEl = document.getElementById('tdTitle');
    const descEl = document.getElementById('tdDesc');
    const detailBox = document.getElementById('timelineDetailBox');

    if (!detailBox || !titleEl || !descEl) return;

    const data = {
        sphinx: {
            title: "Sphinx'25 National Tech Fest — MNIT Jaipur (2024)",
            desc: "Represented AI/ML division in annual technical fest solving complex algorithmic logic and deep learning pipeline challenges."
        },
        hackstorm: {
            title: "Hackstorm 24-Hour Rapid Prototyping Hackathon (2025)",
            desc: "Architected and deployed a full-stack AI web application within a 24-hour non-stop development sprint evaluated by industry experts."
        },
        digifest: {
            title: "Rajasthan Digifest × TiE Hackathon Finalist (2025)",
            desc: "Selected as state finalist among hundreds of engineering teams building scalable digital solutions for public governance and AI impact."
        },
        educhain: {
            title: "Edu Chain Builders Connect Certification (2025)",
            desc: "Earned official graduation credential specializing in decentralized Web3 architectures, AI agents, and smart contract integration."
        },
        vgu: {
            title: "1st Place Winner – VGU National Project Exhibition (2025)",
            desc: "Secured First Prize among top engineering teams at Vivekananda Global University by demonstrating a high-accuracy, real-world AI/ML product prototype with live jury validation."
        }
    };

    const target = data[key] || data.vgu;
    titleEl.textContent = target.title;
    descEl.textContent = target.desc;
    detailBox.style.animation = 'none';
    void detailBox.offsetWidth;
    detailBox.style.animation = 'fadeInUp 0.3s ease forwards';
};

// Master Initialization Function
function initAllPortfolioModules() {
    try { if (typeof initNeuralCanvas === 'function') initNeuralCanvas(); } catch(e) {}
    try { if (typeof initHUDMode === 'function') initHUDMode(); } catch(e) {}
    try { if (typeof initMobileNav === 'function') initMobileNav(); } catch(e) {}
    try { if (typeof initNavbarScroll === 'function') initNavbarScroll(); } catch(e) {}
    try { if (typeof initProjectsGrid === 'function') initProjectsGrid(); } catch(e) {}
    try { if (typeof initProjectModal === 'function') initProjectModal(); } catch(e) {}
    try { if (typeof initPhotoUpload === 'function') initPhotoUpload(); } catch(e) {}
    try { if (typeof initStatsCounter === 'function') initStatsCounter(); } catch(e) {}
    try { if (typeof initContactForm === 'function') initContactForm(); } catch(e) {}
    try { if (typeof initLiveClock === 'function') initLiveClock(); } catch(e) {}
    try { if (typeof initAIConsoleTerminal === 'function') initAIConsoleTerminal(); } catch(e) {}
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllPortfolioModules);
} else {
    initAllPortfolioModules();
}
