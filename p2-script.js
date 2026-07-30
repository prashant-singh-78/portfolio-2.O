/* ==========================================================================
   PRASHANT. PORTFOLIO - PRO UPGRADES FEATURE ENGINE (p2-script.js)
   Handles Recruiter Mode, Detailed Case Study Modals, Interactive Architecture
   Diagrams, Mini Project Demos, and Technical Challenges.
   All functions and CSS classes use 'p2' / 'p2-' prefix.
   ========================================================================== */

(function () {
    'use strict';

    // ----------------------------------------------------------------------
    // GLOBAL STATE & RECRUITER PREFERENCE
    // ----------------------------------------------------------------------
    const STORAGE_KEY_RECRUITER = 'portfolio2_recruiter_mode';
    let isRecruiterModeActive = false;

    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function () {
        p2InitRecruiterMode();
        p2InitCaseStudyListeners();
        p2InitChallengesSection();
        p2CheckUrlHash();
    });

    // ----------------------------------------------------------------------
    // 1. RECRUITER MODE ENGINE
    // ----------------------------------------------------------------------
    window.p2ToggleRecruiterMode = function () {
        isRecruiterModeActive = !isRecruiterModeActive;
        if (isRecruiterModeActive) {
            localStorage.setItem(STORAGE_KEY_RECRUITER, 'enabled');
        } else {
            localStorage.setItem(STORAGE_KEY_RECRUITER, 'disabled');
        }
        p2ApplyRecruiterModeState();
    };

    function p2InitRecruiterMode() {
        const savedState = localStorage.getItem(STORAGE_KEY_RECRUITER);
        if (savedState === 'enabled') {
            isRecruiterModeActive = true;
        } else {
            isRecruiterModeActive = false;
        }
        p2ApplyRecruiterModeState();
    }

    function p2ApplyRecruiterModeState() {
        const body = document.body;
        const navBtnText = document.getElementById('p2NavRecruiterText');
        let heroContainer = document.getElementById('p2RecruiterHeroBanner');

        if (!heroContainer) {
            p2RenderRecruiterHeroBanner();
            heroContainer = document.getElementById('p2RecruiterHeroBanner');
        }

        if (isRecruiterModeActive) {
            body.classList.add('p2-recruiter-mode-active');
            if (navBtnText) navBtnText.textContent = 'Exit Recruiter Mode';
            
            if (heroContainer) {
                heroContainer.style.display = 'block';
                heroContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Highlight top recruiter project cards
            const topIds = [4, 6, 12, 5, 1, 11];
            document.querySelectorAll('.project-card').forEach(card => {
                const id = parseInt(card.getAttribute('data-id'), 10);
                if (topIds.includes(id)) {
                    card.classList.add('p2-recruiter-highlight');
                }
            });

            p2ShowToastNotification('<i class="fa-solid fa-user-tie"></i> Recruiter Mode Enabled! Top 6 projects highlighted.', true);
        } else {
            body.classList.remove('p2-recruiter-mode-active');
            if (navBtnText) navBtnText.textContent = 'Recruiter Mode';
            if (heroContainer) {
                heroContainer.style.display = 'none';
            }

            document.querySelectorAll('.project-card').forEach(card => {
                card.classList.remove('p2-recruiter-highlight');
            });

            p2ShowToastNotification('<i class="fa-solid fa-rotate-left"></i> Returned to Standard Portfolio View', false);
        }
    }

    function p2ShowToastNotification(message, isSuccess = true) {
        let toast = document.getElementById('p2ToastNotification');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'p2ToastNotification';
            toast.style.position = 'fixed';
            toast.style.bottom = '2rem';
            toast.style.right = '2rem';
            toast.style.zIndex = '99999';
            toast.style.padding = '0.9rem 1.4rem';
            toast.style.borderRadius = '12px';
            toast.style.fontFamily = 'var(--font-mono)';
            toast.style.fontSize = '0.9rem';
            toast.style.fontWeight = '600';
            toast.style.boxShadow = '0 0 25px rgba(0,0,0,0.5)';
            toast.style.transition = 'all 0.3s ease';
            document.body.appendChild(toast);
        }

        if (isSuccess) {
            toast.style.background = 'rgba(255, 183, 3, 0.95)';
            toast.style.color = '#000';
            toast.style.border = '1px solid #ffb703';
        } else {
            toast.style.background = 'rgba(15, 23, 42, 0.95)';
            toast.style.color = '#fff';
            toast.style.border = '1px solid rgba(255,255,255,0.2)';
        }

        toast.innerHTML = message;
        toast.style.display = 'block';
        toast.style.opacity = '1';

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => { toast.style.display = 'none'; }, 300);
        }, 3000);
    }

    function p2RenderRecruiterHeroBanner() {
        const data = window.portfolio2Data ? window.portfolio2Data.recruiter : null;
        if (!data) return;

        const mainHero = document.getElementById('hero');
        if (!mainHero) return;

        const bannerDiv = document.createElement('div');
        bannerDiv.id = 'p2RecruiterHeroBanner';
        bannerDiv.className = 'p2-recruiter-banner glass-panel';

        let skillsPills = data.topSkills.map(s => `<span class="p2-pill">${s}</span>`).join('');
        let achievementsHTML = data.achievements.map(a => `
            <div class="p2-rec-achieve-item">
                <i class="fa-solid fa-award text-gold"></i>
                <div>
                    <strong>${a.title}</strong>
                    <p>${a.desc}</p>
                </div>
            </div>
        `).join('');

        bannerDiv.innerHTML = `
            <div class="p2-rec-banner-header">
                <div class="p2-rec-badge">
                    <span class="pulse-dot"></span> RECRUITER SUMMARY VIEW
                </div>
                <button class="p2-btn-exit-recruiter" onclick="p2ToggleRecruiterMode()">
                    <i class="fa-solid fa-xmark"></i> Exit Recruiter Mode
                </button>
            </div>

            <div class="p2-rec-banner-grid">
                <div class="p2-rec-col-main">
                    <h2 class="p2-rec-title">Executive Portfolio Brief</h2>
                    <p class="p2-rec-intro">${data.intro}</p>
                    
                    <div class="p2-rec-status">
                        <i class="fa-solid fa-circle-check text-green"></i>
                        <span>Status: <strong>${data.availability}</strong></span>
                    </div>

                    <div class="p2-rec-skills-wrapper">
                        <h4>Core Skill Highlights</h4>
                        <div class="p2-pills-row">${skillsPills}</div>
                    </div>

                    <div class="p2-rec-actions">
                        <a href="assets/resume.pdf" target="_blank" download class="btn btn-gold">
                            <i class="fa-solid fa-file-arrow-down"></i> Download Resume
                        </a>
                        <a href="#contact" class="btn btn-outline" onclick="p2ToggleRecruiterMode()">
                            <i class="fa-solid fa-paper-plane"></i> Contact / Hire Me
                        </a>
                    </div>
                </div>

                <div class="p2-rec-col-side">
                    <h4>Major Milestones & Achievements</h4>
                    <div class="p2-rec-achievements-list">
                        ${achievementsHTML}
                    </div>
                </div>
            </div>
        `;

        // Insert after main hero container
        mainHero.insertAdjacentElement('afterend', bannerDiv);
    }

    // ----------------------------------------------------------------------
    // 2. DETAILED CASE STUDIES MODAL ENGINE
    // ----------------------------------------------------------------------
    function p2InitCaseStudyListeners() {
        // Attach View Case Study buttons to target project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const idAttr = card.getAttribute('data-id');
            const projectId = parseInt(idAttr, 10);
            if (!projectId) return;

            // Check if this project has a case study
            if (window.portfolio2Data && window.portfolio2Data.caseStudies[projectId]) {
                const actionsContainer = card.querySelector('.project-actions');
                if (actionsContainer && !actionsContainer.querySelector('.btn-case-study')) {
                    const btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'btn-card-action btn-case-study p2-btn-cs';
                    btn.innerHTML = '<i class="fa-solid fa-book-open"></i> Case Study';
                    btn.onclick = function (e) {
                        e.stopPropagation();
                        p2OpenCaseStudy(projectId);
                    };
                    actionsContainer.appendChild(btn);
                }
            }
        });

        // Setup ESC key listener for modal close
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                p2CloseCaseStudyModal();
            }
        });
    }

    window.p2OpenCaseStudy = function (projectId) {
        const data = window.portfolio2Data ? window.portfolio2Data.caseStudies[projectId] : null;
        if (!data) return;

        let modal = document.getElementById('p2CaseStudyModal');
        if (!modal) {
            modal = p2CreateCaseStudyModalDOM();
        }

        const modalBody = document.getElementById('p2CaseStudyModalBody');
        if (!modalBody) return;

        // Render Features list
        const featuresHTML = data.features.map(f => `<li><i class="fa-solid fa-check text-gold"></i> ${f}</li>`).join('');

        // Render Challenges list
        const challengesHTML = data.challenges.map(c => `
            <div class="p2-cs-challenge-box">
                <strong class="text-gold"><i class="fa-solid fa-triangle-exclamation"></i> ${c.title}</strong>
                <p><strong>Problem:</strong> ${c.problem}</p>
                <p><strong>Solution:</strong> ${c.solution}</p>
            </div>
        `).join('');

        modalBody.innerHTML = `
            <div class="p2-cs-header">
                <div>
                    <span class="p2-cs-badge">${data.categoryTag}</span>
                    <h2 class="p2-cs-title">${data.title}</h2>
                </div>
                <div class="p2-cs-header-actions">
                    <a href="${data.pdfUrl}" target="_blank" download class="btn-card-action btn-live" style="background:var(--accent-gold); color:#000;">
                        <i class="fa-solid fa-file-pdf"></i> Download PDF
                    </a>
                    <button class="p2-cs-close-btn" onclick="p2CloseCaseStudyModal()">&times;</button>
                </div>
            </div>

            <div class="p2-cs-body-scroll">
                <!-- Overview & Problem Section -->
                <div class="p2-cs-section glass-panel">
                    <h3><i class="fa-solid fa-circle-info text-gold"></i> Project Overview</h3>
                    <p class="p2-cs-lead">${data.overview}</p>
                    <div class="p2-cs-meta-grid">
                        <div><strong>Problem Statement:</strong> <p>${data.problem}</p></div>
                        <div><strong>Target Audience:</strong> <p>${data.targetUsers}</p></div>
                        <div><strong>My Role:</strong> <p>${data.role}</p></div>
                    </div>
                </div>

                <!-- Features & Tech Stack -->
                <div class="p2-cs-grid-2col">
                    <div class="p2-cs-section glass-panel">
                        <h3><i class="fa-solid fa-star text-gold"></i> Core Capabilities</h3>
                        <ul class="p2-cs-feature-list">${featuresHTML}</ul>
                    </div>
                    <div class="p2-cs-section glass-panel">
                        <h3><i class="fa-solid fa-layer-group text-crimson"></i> Technical Stack</h3>
                        <div class="p2-cs-stack-list">
                            <div><strong>Frontend:</strong> <span>${data.techStack.frontend}</span></div>
                            <div><strong>Backend:</strong> <span>${data.techStack.backend}</span></div>
                            <div><strong>Database:</strong> <span>${data.techStack.database}</span></div>
                            <div><strong>AI / ML:</strong> <span>${data.techStack.aiMl}</span></div>
                            <div><strong>Authentication:</strong> <span>${data.techStack.auth}</span></div>
                            <div><strong>Deployment:</strong> <span>${data.techStack.deployment}</span></div>
                        </div>
                    </div>
                </div>

                <!-- Interactive Architecture Diagram (Feature 3) -->
                <div class="p2-cs-section glass-panel">
                    <h3><i class="fa-solid fa-diagram-project text-gold"></i> Interactive System Architecture Diagram</h3>
                    <p class="p2-cs-subtext">Click on any component node below to view technical execution details and protocol specifications.</p>
                    <div id="p2ArchDiagramContainer_${projectId}" class="p2-arch-diagram-wrapper"></div>
                </div>

                <!-- Safe Mini Project Interactive Demo (Feature 4) -->
                <div class="p2-cs-section glass-panel">
                    <h3><i class="fa-solid fa-laptop-code text-green"></i> Live Interactive Mini Demo</h3>
                    <p class="p2-cs-subtext">Experience a client-side simulated demonstration of key features.</p>
                    <div id="p2MiniDemoContainer_${projectId}" class="p2-mini-demo-wrapper"></div>
                </div>

                <!-- Technical Challenges & Results -->
                <div class="p2-cs-section glass-panel">
                    <h3><i class="fa-solid fa-shield-halved text-crimson"></i> Engineering Challenges & Solutions</h3>
                    ${challengesHTML}
                    <div class="p2-cs-result-box">
                        <i class="fa-solid fa-square-poll-vertical text-green"></i>
                        <div>
                            <strong>Validated Impact & Results:</strong>
                            <p>${data.results}</p>
                        </div>
                    </div>
                </div>

                <!-- Footer Action Bar -->
                <div class="p2-cs-footer-actions">
                    <a href="${data.liveUrl}" target="_blank" class="btn btn-gold">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Live Application
                    </a>
                    <a href="${data.githubUrl}" target="_blank" class="btn btn-outline">
                        <i class="fa-brands fa-github"></i> Inspect Source Code
                    </a>
                    <a href="${data.pdfUrl}" target="_blank" download class="btn btn-outline">
                        <i class="fa-solid fa-download"></i> Download 1-Page PDF
                    </a>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Render Architecture Diagram
        p2RenderArchDiagram(`p2ArchDiagramContainer_${projectId}`, data.architecture);

        // Render Mini Demo
        p2InitMiniDemo(`p2MiniDemoContainer_${projectId}`, data.demoType);
    };

    window.p2CloseCaseStudyModal = function () {
        const modal = document.getElementById('p2CaseStudyModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
        document.body.style.overflow = '';
    };

    function p2CreateCaseStudyModalDOM() {
        const modal = document.createElement('div');
        modal.id = 'p2CaseStudyModal';
        modal.className = 'p2-modal-overlay';
        modal.onclick = function (e) {
            if (e.target === modal) {
                p2CloseCaseStudyModal();
            }
        };

        const content = document.createElement('div');
        content.className = 'p2-modal-content glass-panel';
        content.id = 'p2CaseStudyModalBody';

        modal.appendChild(content);
        document.body.appendChild(modal);
        return modal;
    }

    // ----------------------------------------------------------------------
    // 3. INTERACTIVE ARCHITECTURE DIAGRAM ENGINE
    // ----------------------------------------------------------------------
    function p2RenderArchDiagram(containerId, archData) {
        const container = document.getElementById(containerId);
        if (!container || !archData) return;

        let nodesHTML = archData.nodes.map((n, idx) => `
            <div class="p2-arch-node-item">
                <button type="button" class="p2-arch-node ${idx === 0 ? 'active' : ''}" onclick="p2SelectArchNode('${containerId}', ${idx})">
                    <span class="node-index">0${idx + 1}</span>
                    <span class="node-title">${n.name}</span>
                </button>
                ${idx < archData.nodes.length - 1 ? '<div class="p2-arch-arrow"><i class="fa-solid fa-arrow-down-long"></i></div>' : ''}
            </div>
        `).join('');

        container.innerHTML = `
            <div class="p2-arch-flow-grid">
                <div class="p2-arch-nodes-column">
                    ${nodesHTML}
                </div>
                <div class="p2-arch-detail-panel" id="${containerId}_detail">
                    <div class="p2-arch-detail-badge"><i class="fa-solid fa-microchip"></i> COMPONENT SPECIFICATION</div>
                    <h4 id="${containerId}_title">${archData.nodes[0].name}</h4>
                    <p id="${containerId}_desc">${archData.nodes[0].desc}</p>
                </div>
            </div>
        `;

        // Store data reference on container for node clicks
        container._archNodes = archData.nodes;
    }

    window.p2SelectArchNode = function (containerId, index) {
        const container = document.getElementById(containerId);
        if (!container || !container._archNodes) return;

        const nodes = container._archNodes;
        const targetNode = nodes[index];
        if (!targetNode) return;

        // Update active class
        const nodeBtns = container.querySelectorAll('.p2-arch-node');
        nodeBtns.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update details panel
        const titleElem = document.getElementById(`${containerId}_title`);
        const descElem = document.getElementById(`${containerId}_desc`);
        if (titleElem) titleElem.textContent = targetNode.name;
        if (descElem) descElem.textContent = targetNode.desc;
    };

    // ----------------------------------------------------------------------
    // 4. MINI PROJECT DEMOS ENGINE
    // ----------------------------------------------------------------------
    function p2InitMiniDemo(containerId, demoType) {
        const container = document.getElementById(containerId);
        if (!container) return;

        switch (demoType) {
            case 'studyshield':
                p2RenderStudyShieldDemo(container);
                break;
            case 'mockmate':
                p2RenderMockmateDemo(container);
                break;
            case 'medicure':
                p2RenderMedicureDemo(container);
                break;
            case 'novaerp':
                p2RenderNovaErpDemo(container);
                break;
            case 'deta-hub':
                p2RenderDetaHubDemo(container);
                break;
            case 'skin-disease':
                p2RenderSkinDiseaseDemo(container);
                break;
            default:
                container.innerHTML = '<p class="p2-demo-msg">Interactive demo simulation ready.</p>';
                break;
        }
    }

    // --- StudyShield Demo ---
    function p2RenderStudyShieldDemo(container) {
        container.innerHTML = `
            <div class="p2-demo-card">
                <div class="p2-demo-header">
                    <span><i class="fa-solid fa-shield-halved text-gold"></i> Focus Timer & Site Blocker Simulation</span>
                    <span class="p2-demo-tag">MOCK DEMO</span>
                </div>
                <div class="p2-demo-timer-box">
                    <div class="p2-timer-display" id="p2TimerDisplay">25:00</div>
                    <div class="p2-timer-controls">
                        <button type="button" class="btn btn-gold btn-sm" onclick="p2ToggleDemoTimer(this)">Start Study Session</button>
                        <button type="button" class="btn btn-outline btn-sm" onclick="p2ResetDemoTimer()">Reset</button>
                    </div>
                </div>
                <div class="p2-demo-blocklist">
                    <strong style="display:block; margin-bottom:0.5rem; font-size:0.85rem;">Active Site Blockers:</strong>
                    <label class="p2-checkbox"><input type="checkbox" checked disabled> YouTube Recommendations Filter</label>
                    <label class="p2-checkbox"><input type="checkbox" checked disabled> Social Feeds (Instagram/Twitter)</label>
                    <label class="p2-checkbox"><input type="checkbox" checked disabled> Distracting News Portals</label>
                </div>
                <div class="p2-demo-log" id="p2TimerLog">Status: Ready to start deep work session.</div>
            </div>
        `;
    }

    let p2DemoTimerInterval = null;
    let p2DemoSeconds = 1500;

    window.p2ToggleDemoTimer = function (btn) {
        const timerDisplay = document.getElementById('p2TimerDisplay');
        const timerLog = document.getElementById('p2TimerLog');
        if (!timerDisplay) return;

        if (p2DemoTimerInterval) {
            clearInterval(p2DemoTimerInterval);
            p2DemoTimerInterval = null;
            btn.textContent = 'Resume Study Session';
            if (timerLog) timerLog.textContent = 'Session paused. Focus streak preserved!';
        } else {
            btn.textContent = 'Pause Session';
            if (timerLog) timerLog.textContent = '🔥 StudyShield Active: Distracting sites blocked in background!';
            p2DemoTimerInterval = setInterval(() => {
                p2DemoSeconds--;
                if (p2DemoSeconds <= 0) {
                    clearInterval(p2DemoTimerInterval);
                    p2DemoTimerInterval = null;
                    btn.textContent = 'Start Study Session';
                    timerDisplay.textContent = '00:00';
                    if (timerLog) timerLog.textContent = '🎉 Session Completed! Focus streak +1 gained!';
                    p2DemoSeconds = 1500;
                    return;
                }
                const mins = Math.floor(p2DemoSeconds / 60).toString().padStart(2, '0');
                const secs = (p2DemoSeconds % 60).toString().padStart(2, '0');
                timerDisplay.textContent = `${mins}:${secs}`;
            }, 1000);
        }
    };

    window.p2ResetDemoTimer = function () {
        if (p2DemoTimerInterval) {
            clearInterval(p2DemoTimerInterval);
            p2DemoTimerInterval = null;
        }
        p2DemoSeconds = 1500;
        const timerDisplay = document.getElementById('p2TimerDisplay');
        const timerLog = document.getElementById('p2TimerLog');
        if (timerDisplay) timerDisplay.textContent = '25:00';
        if (timerLog) timerLog.textContent = 'Status: Timer reset to 25 minutes.';
    };

    // --- MockMate Demo ---
    function p2RenderMockmateDemo(container) {
        container.innerHTML = `
            <div class="p2-demo-card">
                <div class="p2-demo-header">
                    <span><i class="fa-solid fa-robot text-gold"></i> AI Technical Viva Assessor Simulation</span>
                    <span class="p2-demo-tag">MOCK DEMO</span>
                </div>
                <div class="p2-demo-form-group">
                    <label>Select Target Interview Role:</label>
                    <select id="p2MockRoleSelect" onchange="p2UpdateMockQuestion(this.value)">
                        <option value="ai">AI / ML Engineer (Python & Computer Vision)</option>
                        <option value="fullstack">Full-Stack Web Developer (React & Node.js)</option>
                        <option value="data">Data Engineer (SQL & Data Pipelines)</option>
                    </select>
                </div>
                <div class="p2-demo-qbox" id="p2MockQBox">
                    <strong>AI Interviewer Question:</strong>
                    <p id="p2MockQText">"Explain how Convolutional Neural Networks (CNNs) extract spatial features using filter kernels."</p>
                </div>
                <textarea id="p2MockAnsInput" rows="2" placeholder="Type a brief sample answer to test AI evaluation..." style="width:100%; padding:0.6rem; border-radius:8px; background:rgba(0,0,0,0.4); color:#fff; border:1px solid var(--border-color); font-size:0.85rem; margin-bottom:0.6rem;"></textarea>
                <button type="button" class="btn btn-gold btn-sm" onclick="p2EvaluateMockAnswer()">Evaluate Response with AI</button>
                <div id="p2MockEvalResult" style="display:none; margin-top:0.8rem;" class="p2-demo-eval-box"></div>
            </div>
        `;
    }

    const p2MockQuestions = {
        ai: "Explain how Convolutional Neural Networks (CNNs) extract spatial features using filter kernels.",
        fullstack: "How does React's Virtual DOM reconciliation algorithm optimize rendering performance?",
        data: "Explain the key differences between SQL database normalization and data warehouse dimensional modeling."
    };

    window.p2UpdateMockQuestion = function (role) {
        const qText = document.getElementById('p2MockQText');
        const evalBox = document.getElementById('p2MockEvalResult');
        if (qText && p2MockQuestions[role]) {
            qText.textContent = `"${p2MockQuestions[role]}"`;
        }
        if (evalBox) evalBox.style.display = 'none';
    };

    window.p2EvaluateMockAnswer = function () {
        const input = document.getElementById('p2MockAnsInput');
        const evalBox = document.getElementById('p2MockEvalResult');
        if (!input || !evalBox) return;

        const text = input.value.trim();
        evalBox.style.display = 'block';
        evalBox.style.padding = '0.8rem';
        evalBox.style.borderRadius = '8px';
        evalBox.style.background = 'rgba(0, 240, 144, 0.1)';
        evalBox.style.border = '1px solid var(--accent-green)';
        evalBox.style.color = 'var(--text-main)';

        if (!text) {
            evalBox.innerHTML = `
                <strong class="text-gold"><i class="fa-solid fa-circle-info"></i> Sample AI Evaluation Preview:</strong>
                <p>Score: <strong>88/100 (Pass)</strong> — Model identified key domain concepts including feature map pooling, weights sharing, and non-linear activation functions.</p>
            `;
        } else {
            evalBox.innerHTML = `
                <strong class="text-green"><i class="fa-solid fa-circle-check"></i> Instant Answer Evaluation:</strong>
                <p>Score: <strong>92/100</strong> — Strong conceptual understanding demonstrated! Key technical terms successfully recognized by Mockmate AI.</p>
            `;
        }
    };

    // --- MediCure Demo ---
    function p2RenderMedicureDemo(container) {
        container.innerHTML = `
            <div class="p2-demo-card">
                <div class="p2-demo-header">
                    <span><i class="fa-solid fa-heart-pulse text-crimson"></i> Educational Symptom Checker Simulation</span>
                    <span class="p2-demo-tag">MOCK DEMO</span>
                </div>
                <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.6rem;">Select sample symptom profiles to view educational ML triage output:</p>
                <div class="p2-demo-symptom-chips">
                    <button type="button" class="p2-chip-btn active" onclick="p2RunMedicureTriage('fever', this)">Fever & Headache</button>
                    <button type="button" class="p2-chip-btn" onclick="p2RunMedicureTriage('cough', this)">Cold & Cough</button>
                    <button type="button" class="p2-chip-btn" onclick="p2RunMedicureTriage('fatigue', this)">Fatigue & Joint Pain</button>
                </div>
                <div id="p2MedicureResult" class="p2-demo-res-box" style="margin-top:0.8rem; padding:0.8rem; border-radius:8px; background:rgba(13,10,18,0.8); border:1px solid var(--border-color);">
                    <strong class="text-gold"><i class="fa-solid fa-book-medical"></i> Educational Guidance Preview:</strong>
                    <p>Suggested Category: <strong>Seasonal Viral Response</strong> (Probability: 89%)</p>
                    <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">Recommended Action: Stay hydrated, monitor temperature, and consult a certified healthcare professional if symptoms persist.</p>
                </div>
                <div class="p2-disclaimer-banner">
                    <i class="fa-solid fa-circle-exclamation text-crimson"></i>
                    <span><strong>Medical Disclaimer:</strong> This simulation is strictly for educational and portfolio demonstration purposes. It does not provide certified medical diagnosis or advice.</span>
                </div>
            </div>
        `;
    }

    window.p2RunMedicureTriage = function (type, btn) {
        const container = btn.parentElement;
        container.querySelectorAll('.p2-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const resBox = document.getElementById('p2MedicureResult');
        if (!resBox) return;

        if (type === 'fever') {
            resBox.innerHTML = `
                <strong class="text-gold"><i class="fa-solid fa-book-medical"></i> Educational Guidance Preview:</strong>
                <p>Suggested Category: <strong>Seasonal Viral Response</strong> (Probability: 89%)</p>
                <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">Recommended Action: Rest, stay hydrated, and consult a medical practitioner if fever exceeds 101°F.</p>
            `;
        } else if (type === 'cough') {
            resBox.innerHTML = `
                <strong class="text-gold"><i class="fa-solid fa-book-medical"></i> Educational Guidance Preview:</strong>
                <p>Suggested Category: <strong>Upper Respiratory Congestion</strong> (Probability: 92%)</p>
                <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">Recommended Action: Warm steam inhalation, throat lozenges, and clinical checkup if breathing is uncomfortable.</p>
            `;
        } else {
            resBox.innerHTML = `
                <strong class="text-gold"><i class="fa-solid fa-book-medical"></i> Educational Guidance Preview:</strong>
                <p>Suggested Category: <strong>General Exhaustion / Viral Prodrome</strong> (Probability: 84%)</p>
                <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.3rem;">Recommended Action: Ensure adequate sleep, hydration, and nutritional intake.</p>
            `;
        }
    };

    // --- NovaERP Demo ---
    function p2RenderNovaErpDemo(container) {
        container.innerHTML = `
            <div class="p2-demo-card">
                <div class="p2-demo-header">
                    <span><i class="fa-solid fa-chart-pie text-gold"></i> Enterprise Role-Based Dashboard Switcher</span>
                    <span class="p2-demo-tag">MOCK DEMO</span>
                </div>
                <div class="p2-demo-role-tabs">
                    <button type="button" class="p2-role-tab active" onclick="p2SwitchNovaRole('admin', this)">Super Admin</button>
                    <button type="button" class="p2-role-tab" onclick="p2SwitchNovaRole('hr', this)">HR Lead</button>
                    <button type="button" class="p2-role-tab" onclick="p2SwitchNovaRole('manager', this)">Dept Manager</button>
                </div>
                <div id="p2NovaDashboardContent" class="p2-demo-dash-view" style="margin-top:0.8rem;">
                    <div class="p2-dash-grid">
                        <div class="p2-dash-card"><span>TOTAL EMPLOYEES</span><strong>142</strong></div>
                        <div class="p2-dash-card"><span>MONTHLY PAYROLL</span><strong>$84,500</strong></div>
                        <div class="p2-dash-card"><span>ATTENDANCE RATE</span><strong>96.8%</strong></div>
                    </div>
                </div>
            </div>
        `;
    }

    window.p2SwitchNovaRole = function (role, btn) {
        const tabs = btn.parentElement.querySelectorAll('.p2-role-tab');
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');

        const dash = document.getElementById('p2NovaDashboardContent');
        if (!dash) return;

        if (role === 'admin') {
            dash.innerHTML = `
                <div class="p2-dash-grid">
                    <div class="p2-dash-card"><span>TOTAL EMPLOYEES</span><strong>142</strong></div>
                    <div class="p2-dash-card"><span>MONTHLY PAYROLL</span><strong>$84,500</strong></div>
                    <div class="p2-dash-card"><span>ATTENDANCE RATE</span><strong>96.8%</strong></div>
                </div>
            `;
        } else if (role === 'hr') {
            dash.innerHTML = `
                <div class="p2-dash-grid">
                    <div class="p2-dash-card"><span>OPEN RECRUITMENTS</span><strong>8 Roles</strong></div>
                    <div class="p2-dash-card"><span>LEAVE REQUESTS</span><strong>4 Pending</strong></div>
                    <div class="p2-dash-card"><span>NEW ONBOARDING</span><strong>12 Candidates</strong></div>
                </div>
            `;
        } else {
            dash.innerHTML = `
                <div class="p2-dash-grid">
                    <div class="p2-dash-card"><span>TEAM MEMBERS</span><strong>18 Engineers</strong></div>
                    <div class="p2-dash-card"><span>PROJECT SPRINT</span><strong>88% Done</strong></div>
                    <div class="p2-dash-card"><span>OVERTIME HOURS</span><strong>14 Hours</strong></div>
                </div>
            `;
        }
    };

    // --- Deta Hub Demo ---
    function p2RenderDetaHubDemo(container) {
        container.innerHTML = `
            <div class="p2-demo-card">
                <div class="p2-demo-header">
                    <span><i class="fa-solid fa-database text-gold"></i> Real-Time Dataset Directory Search</span>
                    <span class="p2-demo-tag">MOCK DEMO</span>
                </div>
                <input type="text" id="p2DetaSearchInput" oninput="p2FilterDetaDatasets(this.value)" placeholder="Filter sample datasets (e.g., Vision, NLP, Tabular)..." style="width:100%; padding:0.6rem; border-radius:8px; background:rgba(0,0,0,0.4); color:#fff; border:1px solid var(--border-color); font-size:0.85rem; margin-bottom:0.8rem;">
                <div id="p2DetaList" class="p2-demo-deta-list">
                    <div class="p2-deta-item"><strong>Skin Dermatological Images</strong> <span>Computer Vision • 4,200 Images</span></div>
                    <div class="p2-deta-item"><strong>Student Academic Performance</strong> <span>Structured CSV • 10,000 Rows</span></div>
                    <div class="p2-deta-item"><strong>Hindi Sentiment Speech Corpus</strong> <span>NLP / Audio • 15.2 GB</span></div>
                    <div class="p2-deta-item"><strong>Crop Disease & Soil Telemetry</strong> <span>AgriTech • 8,500 Records</span></div>
                </div>
            </div>
        `;
    }

    window.p2FilterDetaDatasets = function (query) {
        const list = document.getElementById('p2DetaList');
        if (!list) return;

        const items = list.querySelectorAll('.p2-deta-item');
        const q = query.toLowerCase().trim();

        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (q === '' || text.includes(q)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // --- Skin Disease Predictor Demo ---
    function p2RenderSkinDiseaseDemo(container) {
        container.innerHTML = `
            <div class="p2-demo-card">
                <div class="p2-demo-header">
                    <span><i class="fa-solid fa-microscope text-crimson"></i> Computer Vision CNN Model Analyzer</span>
                    <span class="p2-demo-tag">MOCK DEMO</span>
                </div>
                <p style="font-size:0.8rem; color:var(--text-muted); margin-bottom:0.6rem;">Select sample dermatological image input to test inference model pipeline:</p>
                <div class="p2-demo-img-selector">
                    <button type="button" class="p2-img-btn active" onclick="p2RunSkinInference('sample1', this)">Sample Image A (Eczema Pattern)</button>
                    <button type="button" class="p2-img-btn" onclick="p2RunSkinInference('sample2', this)">Sample Image B (Psoriasis Pattern)</button>
                </div>
                <div id="p2SkinOutput" class="p2-demo-skin-out" style="margin-top:0.8rem; padding:0.8rem; border-radius:8px; background:rgba(13,10,18,0.8); border:1px solid var(--border-color);">
                    <strong class="text-gold"><i class="fa-solid fa-brain"></i> CNN Model Prediction Breakdown:</strong>
                    <div style="margin-top:0.5rem;">
                        <div style="display:flex; justify-content:space-between; font-size:0.8rem;"><span>Eczema Classification</span><strong>94.2% Confidence</strong></div>
                        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 94.2%; background:var(--accent-gold);"></div></div>
                    </div>
                </div>
                <div class="p2-disclaimer-banner">
                    <i class="fa-solid fa-triangle-exclamation text-crimson"></i>
                    <span><strong>Notice:</strong> Outputs are simulated demonstration metrics for algorithm verification. Not a medical diagnosis.</span>
                </div>
            </div>
        `;
    }

    window.p2RunSkinInference = function (sample, btn) {
        const parent = btn.parentElement;
        parent.querySelectorAll('.p2-img-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const out = document.getElementById('p2SkinOutput');
        if (!out) return;

        if (sample === 'sample1') {
            out.innerHTML = `
                <strong class="text-gold"><i class="fa-solid fa-brain"></i> CNN Model Prediction Breakdown:</strong>
                <div style="margin-top:0.5rem;">
                    <div style="display:flex; justify-content:space-between; font-size:0.8rem;"><span>Eczema Feature Match</span><strong>94.2% Confidence</strong></div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 94.2%; background:var(--accent-gold);"></div></div>
                </div>
            `;
        } else {
            out.innerHTML = `
                <strong class="text-gold"><i class="fa-solid fa-brain"></i> CNN Model Prediction Breakdown:</strong>
                <div style="margin-top:0.5rem;">
                    <div style="display:flex; justify-content:space-between; font-size:0.8rem;"><span>Psoriasis Feature Match</span><strong>91.8% Confidence</strong></div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width: 91.8%; background:var(--accent-crimson);"></div></div>
                </div>
            `;
        }
    };

    // ----------------------------------------------------------------------
    // 5. ENGINEERING CHALLENGES SECTION ENGINE
    // ----------------------------------------------------------------------
    function p2InitChallengesSection() {
        const section = document.getElementById('challenges');
        if (!section) return;

        const challengesData = window.portfolio2Data ? window.portfolio2Data.challenges : [];
        if (!challengesData || challengesData.length === 0) return;

        const container = section.querySelector('.p2-challenges-grid');
        if (!container) return;

        let html = challengesData.map(c => `
            <div class="p2-challenge-card glass-panel" onclick="p2ToggleChallenge(this)">
                <div class="p2-challenge-header">
                    <div class="p2-ch-title-wrap">
                        <span class="p2-ch-badge">${c.category}</span>
                        <h3><i class="fa-solid fa-code-commit text-gold"></i> ${c.title}</h3>
                        <span class="p2-ch-project"><i class="fa-solid fa-diagram-project"></i> Project: ${c.project}</span>
                    </div>
                    <button type="button" class="p2-ch-toggle-btn" aria-label="Expand Challenge Details">
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>
                </div>
                <div class="p2-challenge-body">
                    <div class="p2-ch-detail-item">
                        <strong class="text-crimson"><i class="fa-solid fa-circle-exclamation"></i> Issue / Problem:</strong>
                        <p>${c.problem}</p>
                    </div>
                    <div class="p2-ch-detail-item">
                        <strong class="text-gold"><i class="fa-solid fa-bug"></i> Debugging Process:</strong>
                        <p>${c.debugging}</p>
                    </div>
                    <div class="p2-ch-detail-item">
                        <strong class="text-green"><i class="fa-solid fa-circle-check"></i> Final Solution:</strong>
                        <p>${c.solution}</p>
                    </div>
                    <div class="p2-ch-detail-item">
                        <strong><i class="fa-solid fa-lightbulb text-gold"></i> Key Takeaway & Learning:</strong>
                        <p>${c.learned}</p>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;
    }

    window.p2ToggleChallenge = function (cardElem) {
        if (!cardElem) return;
        cardElem.classList.toggle('expanded');
    };

    function p2CheckUrlHash() {
        const hash = window.location.hash;
        if (hash === '#recruiter') {
            if (!isRecruiterModeActive) {
                p2ToggleRecruiterMode();
            }
        }
    }

    // ----------------------------------------------------------------------
    // 6. RESUME CUSTOMIZER ENGINE
    // ----------------------------------------------------------------------
    let p2SelectedResumeRole = 'aiml';

    window.p2OpenResumeCustomizer = function () {
        const modal = document.getElementById('p2ResumeCustomizerModal');
        if (!modal) return;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        p2SelectResumeRole(p2SelectedResumeRole);
    };

    window.p2CloseResumeCustomizer = function () {
        const modal = document.getElementById('p2ResumeCustomizerModal');
        if (!modal) return;
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    window.p2SelectResumeRole = function (roleId) {
        p2SelectedResumeRole = roleId;

        // Update active tab buttons
        document.querySelectorAll('.p2-role-tab').forEach(btn => {
            if (btn.getAttribute('data-role') === roleId) {
                btn.className = 'btn btn-gold p2-role-tab active';
            } else {
                btn.className = 'btn btn-outline p2-role-tab';
            }
        });

        p2RenderCustomResumePreview(roleId);
    };

    function p2RenderCustomResumePreview(roleId) {
        const previewContainer = document.getElementById('p2CustomResumePreview');
        if (!previewContainer) return;

        const data = window.portfolio2ResumeData;
        if (!data || !data.roles || !data.roles[roleId]) return;

        const roleData = data.roles[roleId];

        // Format skills
        const skillsPills = roleData.topSkills.map(s => `<span class="p2-pill" style="border-color: var(--accent-gold); color: var(--accent-gold);">${s}</span>`).join(' ');

        // Format highlights
        const highlightsList = roleData.keyHighlights.map(h => `<li><i class="fa-solid fa-check text-gold" style="margin-right: 0.5rem;"></i>${h}</li>`).join('');

        previewContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem; border-bottom: 1px dashed rgba(255,255,255,0.15); padding-bottom: 1rem;">
                <div>
                    <h3 class="gradient-text" style="font-size: 1.4rem; margin-bottom: 0.2rem;">${data.candidateName}</h3>
                    <span style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--accent-gold);">${roleData.title}</span>
                </div>
                <div style="font-size: 0.82rem; color: var(--text-muted); text-align: right; font-family: var(--font-mono);">
                    <div><i class="fa-solid fa-envelope"></i> ${data.email}</div>
                    <div><i class="fa-solid fa-location-dot"></i> ${data.location}</div>
                </div>
            </div>

            <div style="margin-bottom: 1.2rem;">
                <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.4rem; color: var(--accent-gold);"><i class="fa-solid fa-user text-gold"></i> Tailored Executive Summary</h4>
                <p style="font-size: 0.88rem; color: var(--text-main); line-height: 1.6;">${roleData.summary}</p>
            </div>

            <div style="margin-bottom: 1.2rem;">
                <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.6rem; color: var(--accent-gold);"><i class="fa-solid fa-layer-group text-gold"></i> Targeted Core Competencies</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
                    ${skillsPills}
                </div>
            </div>

            <div style="margin-bottom: 1.2rem;">
                <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem; color: var(--accent-gold);"><i class="fa-solid fa-star text-gold"></i> Role-Specific Engineering Accomplishments</h4>
                <ul style="list-style: none; padding-left: 0; font-size: 0.88rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${highlightsList}
                </ul>
            </div>

            <div>
                <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.4rem; color: var(--accent-gold);"><i class="fa-solid fa-graduation-cap text-gold"></i> Education & Achievements</h4>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">${data.education[0].degree} — ${data.education[0].institution} (${data.education[0].period})</p>
            </div>
        `;
    }

    window.p2DownloadCustomizedResume = function () {
        const data = window.portfolio2ResumeData;
        const roleData = data && data.roles ? data.roles[p2SelectedResumeRole] : null;
        const roleTitle = roleData ? roleData.title : 'Tailored';

        // Trigger print/PDF view window for tailored layout
        const printWin = window.open('', '_blank');
        if (!printWin) {
            if (typeof p2ShowToastNotification === 'function') {
                p2ShowToastNotification('Please allow popups to download custom resume.', false);
            }
            return;
        }

        const previewContent = document.getElementById('p2CustomResumePreview').innerHTML;

        printWin.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Prashant_Singh_${roleTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Resume</title>
                <style>
                    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 2rem; color: #1e293b; line-height: 1.6; }
                    .gradient-text { color: #0f172a; }
                    .p2-pill { display: inline-block; padding: 3px 8px; border: 1px solid #0284c7; border-radius: 4px; font-size: 0.8rem; margin: 2px; }
                    @media print { body { padding: 0; } }
                </style>
            </head>
            <body>
                ${previewContent}
                <script>window.onload = function() { window.print(); };<\/script>
            </body>
            </html>
        `);
        printWin.document.close();

        if (typeof p2ShowToastNotification === 'function') {
            p2ShowToastNotification(\`<i class="fa-solid fa-wand-magic-sparkles"></i> Generated \${roleTitle} Tailored Resume!\`, true);
        }
    };

})();
