/* ==========================================================================
   PRASHANT. PORTFOLIO - CENTRAL DATA LAYER (portfolio-data.js)
   Provides fallback & default data for Recruiter Mode, Detailed Case Studies,
   Interactive Architecture Diagrams, Mini Demos, and Technical Challenges.
   ========================================================================== */

window.portfolio2Data = {
    // ----------------------------------------------------------------------
    // 1. RECRUITER MODE CONFIGURATION
    // ----------------------------------------------------------------------
    recruiter: {
        intro: "AI Engineer & Full-Stack Developer specializing in Machine Learning, Computer Vision, and high-impact web applications. Proven track record winning national project exhibitions and hackathons with production-ready AI solutions.",
        availability: "Available for Full-Time AI/ML & Engineering Roles",
        hireEmail: "prashantbachhamadi@gmail.com",
        phone: "+91 7627043971",
        topSkills: [
            "Python & Flask", "TensorFlow & PyTorch", "YOLOv8 Computer Vision", 
            "Scikit-learn & ML Pipelines", "React & Next.js", "SQL & Database Design", 
            "Git & Linux CLI", "REST APIs & Cloud Deployment"
        ],
        topProjectIds: [4, 6, 12, 5, 1, 11], // StudyShield, MockMate, MediCure, Management SaaS / NovaERP, Deta Hub, Skin Disease Predictor
        achievements: [
            {
                title: "1st Rank Winner – VGU National Project Exhibition (2025)",
                desc: "Secured top position for demonstrating an accurate, real-world AI/ML product prototype with live jury validation."
            },
            {
                title: "Finalist – Rajasthan Digifest × TiE Hackathon (2025)",
                desc: "Recognized among top state-wide engineering teams for building scalable digital solutions."
            },
            {
                title: "Champion – Hackstorm 24-Hour National Hackathon (2025)",
                desc: "Built and deployed a full-stack AI platform within 24 hours under live evaluation."
            },
            {
                title: "Graduation Certificate – Edu Chain Builders Connect (2025)",
                desc: "Completed specialized certification in AI integration & decentralized architectures."
            }
        ]
    },

    // ----------------------------------------------------------------------
    // 2. DETAILED CASE STUDIES (6 TARGET PROJECTS)
    // ----------------------------------------------------------------------
    caseStudies: {
        4: { // StudyShield
            id: 4,
            slug: "studyshield",
            title: "StudyShield",
            categoryTag: "PRODUCTIVITY & CHROME EXTENSION",
            overview: "StudyShield is an intelligent student productivity platform and browser extension designed to eliminate digital distractions, block non-educational websites, provide a distraction-free YouTube Study Mode, track study sessions, and reward consistent focus with leaderboards.",
            problem: "Students frequently lose hours of study time due to social media notifications, algorithmic YouTube recommendations, and impulsive web browsing habits, leading to broken concentration and poor task completion.",
            targetUsers: "Students, self-directed learners, researchers, and competitive exam candidates seeking structured deep-work environments.",
            role: "Lead Full-Stack Developer & Extension Architect",
            features: [
                "Customizable website blocklist with scheduled focus sessions",
                "YouTube Study Mode that strips recommended video feeds and comments",
                "Pomodoro focus timer with automated session history logging",
                "Streak counter and gamified student leaderboard",
                "Cross-device sync for blocking settings and session telemetry"
            ],
            techStack: {
                frontend: "React, Vite, Tailwind CSS, JavaScript",
                backend: "FastAPI, Python",
                database: "SQLite, SQLAlchemy ORM",
                aiMl: "Heuristic pattern analysis for distraction detection",
                auth: "JWT (JSON Web Tokens) Session Management",
                deployment: "Vercel (Frontend), Render (Backend API), Chrome Web Store Manifest V3"
            },
            architecture: {
                flow: ["Chrome Extension / Web UI", "FastAPI Gateway", "JWT Auth Middleware", "SQLite Database", "Distraction Analytics Engine", "Vercel / Render Host"],
                nodes: [
                    { name: "Chrome Extension / Web UI", desc: "Manifest V3 background worker & React popup dashboard monitoring active tabs and focus timers." },
                    { name: "FastAPI Gateway", desc: "Asynchronous Python API handling timer sync, streak logic, and site blocklist rules." },
                    { name: "JWT Auth Middleware", desc: "Validates bearer tokens to ensure secure student session data isolation." },
                    { name: "SQLite Database", desc: "Relational database storing user profiles, blocklists, completed sessions, and streak counts." },
                    { name: "Distraction Analytics Engine", desc: "Calculates focus scores, streak decay, and leaderboard rankings." },
                    { name: "Vercel / Render Host", desc: "Production hosting environment configured for low-latency API response times." }
                ]
            },
            challenges: [
                {
                    title: "Chrome Extension Manifest V3 Service Worker Lifecycle",
                    problem: "Manifest V3 service workers terminate after short periods of inactivity, causing focus timers to stop unexpectedly.",
                    solution: "Implemented persistent alarm APIs and offscreen document state syncing so study timers run reliably in the background."
                },
                {
                    title: "Bypassing YouTube Recommendation Feeds",
                    problem: "YouTube dynamically updates DOM elements, making traditional static CSS blocking brittle.",
                    solution: "Engineered MutationObserver scripts that dynamically remove recommendation grids while preserving video playback functionality."
                }
            ],
            results: "Successfully enabled hundreds of focused study hours with zero false-positive web blocks during active testing.",
            pdfUrl: "assets/case-studies/studyshield-case-study.pdf",
            liveUrl: "https://github.com/prashant-singh-78/SWD.git",
            githubUrl: "https://github.com/prashant-singh-78/SWD.git",
            demoType: "studyshield"
        },

        6: { // MockMate
            id: 6,
            slug: "mockmate",
            title: "Mockmate",
            categoryTag: "AI INTERVIEW & SKILL PASSPORT",
            overview: "Mockmate is an AI-driven interview preparation and technical skill verification engine. It evaluates candidate resumes, generates tailored coding and viva assessment questions, conducts simulated interviews, and issues an evidence-backed Skill Passport.",
            problem: "Candidates often lack realistic technical interview practice with instant feedback, while recruiters struggle to verify true technical capabilities beyond standard resume claims.",
            targetUsers: "Computer science graduates, job seekers, bootcamp students, and technical recruiters.",
            role: "Creator & AI Engineer",
            features: [
                "Resume parsing and skill extraction via natural language processing",
                "Dynamic role-specific viva and technical interview question generation",
                "Browser-based Python code execution sandbox via Pyodide",
                "In-depth candidate response evaluation with actionable feedback scores",
                "Shareable, verifiable Skill Passport certificate generation"
            ],
            techStack: {
                frontend: "React, TypeScript, Vite, Tailwind CSS",
                backend: "FastAPI, Python",
                database: "PostgreSQL, SQLAlchemy, Alembic",
                aiMl: "OpenAI GPT API & Custom prompt evaluation pipelines",
                auth: "OAuth 2.0 & JWT Authentication",
                deployment: "Vercel (Frontend), Render (FastAPI Backend), Neon PostgreSQL"
            },
            architecture: {
                flow: ["React Frontend Client", "FastAPI Backend", "Pyodide WASM Sandbox", "OpenAI LLM Engine", "PostgreSQL DB", "Vercel Deployment"],
                nodes: [
                    { name: "React Frontend Client", desc: "Interactive UI for interview sessions, voice input, code editor, and Skill Passport view." },
                    { name: "FastAPI Backend", desc: "RESTful services coordinating prompt engineering, evaluation scoring, and user management." },
                    { name: "Pyodide WASM Sandbox", desc: "Client-side WebAssembly environment running untrusted candidate Python code safely inside the browser." },
                    { name: "OpenAI LLM Engine", desc: "LLM pipeline for generating domain questions, scoring answer depth, and providing feedback." },
                    { name: "PostgreSQL DB", desc: "Stores candidate attempt histories, scoring rubrics, resume tokens, and passport badges." },
                    { name: "Vercel Deployment", desc: "Global CDN hosting frontend with zero-latency edge rendering." }
                ]
            },
            challenges: [
                {
                    title: "LLM Hallucination in Technical Grading",
                    problem: "Generic LLM prompts occasionally produced erratic or overly lenient grading scores for technical responses.",
                    solution: "Designed strict multi-turn evaluation rubrics with explicit JSON schema responses to ensure consistent and fair scoring."
                },
                {
                    title: "Safe Code Execution Without Heavy Servers",
                    problem: "Running backend Docker containers for candidate code execution was cost-prohibitive for a prototype.",
                    solution: "Integrated Pyodide WebAssembly in the browser to execute Python code safely on the user's client machine without backend security risks."
                }
            ],
            results: "Engineered an end-to-end interview platform capable of processing technical evaluations in under 3 seconds per response.",
            pdfUrl: "assets/case-studies/mockmate-case-study.pdf",
            liveUrl: "https://mockmate-sandy.vercel.app",
            githubUrl: "https://github.com/prashant-singh-78",
            demoType: "mockmate"
        },

        12: { // MediCure
            id: 12,
            slug: "medicure",
            title: "MediCure",
            categoryTag: "SMART HEALTHCARE PLATFORM",
            overview: "MediCure is an integrated healthcare accessibility platform offering symptom-guided health analysis, patient-doctor registration modules, emergency ambulance dispatch tools, and AI/ML informational insights.",
            problem: "Access to preliminary health guidance and emergency medical coordination is often delayed in suburban areas, leading to unguided self-medication and critical time loss during emergencies.",
            targetUsers: "General public seeking preliminary health education, patients, doctors, and medical service coordinators.",
            role: "Full-Stack & Machine Learning Lead",
            features: [
                "Interactive symptom checker providing preliminary educational health information",
                "Patient and healthcare provider portal with appointment workflow",
                "Emergency medical request dispatcher mockup with location sharing",
                "Medication reference search and health precaution library",
                "High-contrast, accessible UI designed for medical urgency"
            ],
            techStack: {
                frontend: "React, CSS Modules, FontAwesome Icons",
                backend: "FastAPI, Python",
                database: "SQLite / PostgreSQL",
                aiMl: "Scikit-Learn Multi-Class Disease Classifier",
                auth: "Session Tokens & Role-Based Access Control (Patient/Doctor)",
                deployment: "Vercel (Frontend), Render (Python ML Backend)"
            },
            architecture: {
                flow: ["React Web App", "FastAPI Backend", "Scikit-Learn ML Model", "Healthcare DB", "Emergency Dispatcher", "Render Cloud"],
                nodes: [
                    { name: "React Web App", desc: "Responsive user dashboard supporting patient registration, symptom intake, and provider views." },
                    { name: "FastAPI Backend", desc: "High-performance Python backend managing triage workflows and ML inference requests." },
                    { name: "Scikit-Learn ML Model", desc: "Trained Random Forest classifier mapping symptom patterns to educational condition profiles." },
                    { name: "Healthcare DB", desc: "Encrypted storage for user registrations, emergency contact records, and clinic directories." },
                    { name: "Emergency Dispatcher", desc: "Automated routing logic matching emergency location requests to nearby medical services." },
                    { name: "Render Cloud", desc: "Hosted Python service hosting ML model binaries and RESTful APIs." }
                ]
            },
            challenges: [
                {
                    title: "Ensuring Medical Safety & Clear Disclaimers",
                    problem: "Risk of users confusing machine learning output with actual certified medical diagnosis.",
                    solution: "Implemented mandatory, visible educational disclaimers and explicit warnings on every prediction response screen."
                },
                {
                    title: "Categorical Symptom Encoding Mismatches",
                    problem: "Inconsistent user inputs led to missing feature inputs in the ML pipeline.",
                    solution: "Built standardized multi-select symptom tags and missing-value imputation in the Python preprocessing pipeline."
                }
            ],
            results: "Created a seamless health assistant platform combining rapid symptom triage with emergency dispatch workflows.",
            pdfUrl: "assets/case-studies/medicure-case-study.pdf",
            liveUrl: "https://github.com/prashant-singh-78/medicure.git",
            githubUrl: "https://github.com/prashant-singh-78/medicure.git",
            demoType: "medicure"
        },

        5: { // Management SaaS / NovaERP
            id: 5,
            slug: "novaerp",
            title: "Management SaaS — NovaERP",
            categoryTag: "ENTERPRISE SAAS",
            overview: "NovaERP is a multi-tenant enterprise management platform designed to streamline corporate HR operations, employee attendance, automated payroll calculation, client relationship management (CRM), and role-based operational dashboards.",
            problem: "Small-to-midsize businesses rely on fragmented spreadsheets and disconnected software tools, leading to operational inefficiencies, payroll errors, and lack of real-time audit visibility.",
            targetUsers: "Company executives, HR administrators, department managers, and operations teams.",
            role: "Full-Stack SaaS Architect",
            features: [
                "Role-based dashboards for Super Admin, HR Specialist, Manager, and Employee",
                "Automated attendance tracking and leave request approval pipeline",
                "Salary breakdown and payroll receipt generation system",
                "Client lead CRM pipeline with status tracking",
                "Audit logs and strict role-level security permissions"
            ],
            techStack: {
                frontend: "Next.js (App Router), React, TypeScript, Tailwind CSS",
                backend: "Cloudflare Workers / Serverless Functions",
                database: "Cloudflare D1 SQL, Drizzle ORM",
                aiMl: "Operational analytics & automated report summaries",
                auth: "Custom JWT & Role-Based Access Control (RBAC)",
                deployment: "Vercel Edge Platform"
            },
            architecture: {
                flow: ["Next.js App Router", "Serverless API Routes", "RBAC Auth Middleware", "Drizzle ORM Layer", "Cloudflare D1 SQL DB", "Vercel Global CDN"],
                nodes: [
                    { name: "Next.js App Router", desc: "Server-side and client-rendered interface for multi-role corporate management." },
                    { name: "Serverless API Routes", desc: "Edge functions processing attendance calculations, leave approvals, and payroll data." },
                    { name: "RBAC Auth Middleware", desc: "Strict security gateway verifying permissions per user role before exposing sensitive endpoints." },
                    { name: "Drizzle ORM Layer", desc: "Type-safe database ORM managing complex enterprise relations and migrations." },
                    { name: "Cloudflare D1 SQL DB", desc: "High-performance distributed SQL database storing enterprise records." },
                    { name: "Vercel Global CDN", desc: "Edge deployment infrastructure ensuring fast loading speeds for global enterprise users." }
                ]
            },
            challenges: [
                {
                    title: "Multi-Role UI Permission Leakage",
                    problem: "Preventing non-HR users from manually accessing administrative routes or API endpoints.",
                    solution: "Implemented server-side middleware validation on Next.js routes along with row-level database authorization checks."
                },
                {
                    title: "Complex Payroll Formula Edge Cases",
                    problem: "Handling dynamic overtime, tax withholdings, and partial-month pro-rated calculations accurately.",
                    solution: "Architected isolated pure-function payroll calculators covered by comprehensive test cases."
                }
            ],
            results: "Delivered a fully responsive, enterprise-grade ERP dashboard handling multi-department operations seamlessly.",
            pdfUrl: "assets/case-studies/novaerp-case-study.pdf",
            liveUrl: "https://management-saa-s-six.vercel.app",
            githubUrl: "https://github.com/prashant-singh-78",
            demoType: "novaerp"
        },

        1: { // Deta Hub
            id: 1,
            slug: "deta-hub",
            title: "Deta Hub",
            categoryTag: "DATASET & AI PLATFORM",
            overview: "Deta Hub is a specialized dataset discovery, sharing, and management platform connecting data engineers and ML practitioners. Users can browse curated datasets by category, review schema details, search resources, and download structured ML data.",
            problem: "Machine learning developers spend up to 40% of project time searching for clean, verified, properly categorized datasets distributed across unorganized file repositories.",
            targetUsers: "AI researchers, data scientists, ML developers, and academic projects.",
            role: "Lead Full-Stack Web Developer",
            features: [
                "Categorized dataset directory (Computer Vision, NLP, Structured Data, Audio)",
                "Instant search with dynamic query filtering and tag matching",
                "Dataset detail cards featuring sample rows, schema definitions, and file sizes",
                "User upload workflow with validation for dataset submissions",
                "Modern dark glassmorphic UI optimized for technical productivity"
            ],
            techStack: {
                frontend: "React, Vite, JavaScript, CSS3 Glassmorphism",
                backend: "Node.js REST API",
                database: "MongoDB / Static JSON Store",
                aiMl: "Metadata indexing & dataset recommendation algorithms",
                auth: "JWT Authentication",
                deployment: "Vercel Deployment Pipeline"
            },
            architecture: {
                flow: ["React Client Interface", "REST API Router", "Search & Filter Engine", "Metadata Store", "Static File CDN", "Vercel Platform"],
                nodes: [
                    { name: "React Client Interface", desc: "Responsive catalog browser with real-time text filter and category chips." },
                    { name: "REST API Router", desc: "Node.js endpoints serving dataset metadata, category listings, and user submissions." },
                    { name: "Search & Filter Engine", desc: "In-memory indexing for instantaneous keyword searches across dataset descriptions." },
                    { name: "Metadata Store", desc: "Structured store preserving dataset tags, author information, file formats, and download counts." },
                    { name: "Static File CDN", desc: "Fast storage provider serving dataset preview samples and compressed downloads." },
                    { name: "Vercel Platform", desc: "Cloud platform delivering continuous deployment and asset caching." }
                ]
            },
            challenges: [
                {
                    title: "Large Dataset Catalog Search Performance",
                    problem: "Traditional array searching caused UI lag on mobile devices when filtering large dataset catalogs.",
                    solution: "Implemented debounced inputs and indexed search lookup structures to maintain sub-16ms frame rates during typing."
                },
                {
                    title: "Standardizing Heterogeneous Data Formats",
                    problem: "Datasets arrived in conflicting formats (CSV, JSON, Parquet, Images).",
                    solution: "Designed a universal dataset metadata schema standardizing format tags, column names, and license types."
                }
            ],
            results: "Built a lightning-fast dataset discovery interface enabling instant filtering across technical categories.",
            pdfUrl: "assets/case-studies/deta-hub-case-study.pdf",
            liveUrl: "https://deta-hub.vercel.app",
            githubUrl: "https://github.com/prashant-singh-78",
            demoType: "deta-hub"
        },

        11: { // Skin Disease Predictor
            id: 11,
            slug: "skin-disease-predictor",
            title: "Skin Disease Predictor",
            categoryTag: "HEALTHCARE AI & COMPUTER VISION",
            overview: "Skin Disease Predictor is a deep-learning medical imaging application that analyzes uploaded dermatological images to predict multi-class skin conditions using a trained Convolutional Neural Network (CNN).",
            problem: "Dermatological consultations are often inaccessible in rural regions, leading to delayed identification of treatable skin conditions.",
            targetUsers: "Healthcare workers, telemedicine platforms, and educational medical researchers.",
            role: "AI / ML Developer & Model Specialist",
            features: [
                "Uploaded image ingestion and automated preprocessing (scaling, normalization, noise reduction)",
                "Multi-class CNN classification output with confidence percentage scores",
                "Dermatological reference information and recommended care steps",
                "Non-diagnostic medical disclaimer banner ensuring ethical AI deployment",
                "Fast, responsive web portal for seamless mobile and desktop image uploads"
            ],
            techStack: {
                frontend: "HTML5, CSS3, JavaScript, FontAwesome",
                backend: "FastAPI / Flask, Python",
                database: "Local File System / SQLite",
                aiMl: "TensorFlow, Keras, OpenCV, CNN Architecture",
                auth: "Public Access with Rate-Limiting",
                deployment: "Render / Vercel API Container"
            },
            architecture: {
                flow: ["Web Upload UI", "FastAPI Image Ingestion", "OpenCV Preprocessor", "TensorFlow CNN Model", "Confidence Evaluator", "Render Host"],
                nodes: [
                    { name: "Web Upload UI", desc: "Drag-and-drop file uploader supporting PNG/JPG images with instant browser preview." },
                    { name: "FastAPI Image Ingestion", desc: "Receives raw binary image data, validates dimensions, and strips EXIF metadata." },
                    { name: "OpenCV Preprocessor", desc: "Resizes image to 224x224, normalizes pixel values [0,1], and applies color space alignment." },
                    { name: "TensorFlow CNN Model", desc: "Deep convolutional network evaluating spatial feature maps for multi-class classification." },
                    { name: "Confidence Evaluator", desc: "Softmax output processor returning probability distributions and top predicted classes." },
                    { name: "Render Host", desc: "Containerized Python environment serving TensorFlow model inference endpoints." }
                ]
            },
            challenges: [
                {
                    title: "Deploying Heavy Model Weights on Free Host Tiers",
                    problem: "TensorFlow model binaries exceeded memory limits on standard free-tier hosting servers.",
                    solution: "Quantized weights to FP16 format and converted the model to TFLite format, reducing file size by 65% with less than 0.5% accuracy loss."
                },
                {
                    title: "Image Lighting and Angle Variations",
                    problem: "Uncontrolled mobile photos with low lighting degraded raw classification confidence.",
                    solution: "Enhanced model robustness using data augmentation (random rotations, contrast adjustments, and brightness scaling) during training."
                }
            ],
            results: "Engineered a lightweight computer vision pipeline delivering inference results in under 1.2 seconds.",
            pdfUrl: "assets/case-studies/skin-disease-predictor-case-study.pdf",
            liveUrl: "https://github.com/prashant-singh-78/skin-desease.ml.git",
            githubUrl: "https://github.com/prashant-singh-78/skin-desease.ml.git",
            demoType: "skin-disease"
        }
    },

    // ----------------------------------------------------------------------
    // 3. ENGINEERING CHALLENGES & SOLUTIONS (10 EXPANDABLE CARDS)
    // ----------------------------------------------------------------------
    challenges: [
        {
            id: 1,
            title: "Connecting Vercel Frontend with Render Backend (CORS & Cold Starts)",
            project: "Mockmate / MediCure",
            category: "DEPLOYMENT & NETWORK",
            problem: "Cross-Origin Resource Sharing (CORS) errors blocked frontend fetch calls, and Render free-tier cold starts caused 504 gateway timeouts on initial requests.",
            debugging: "Inspected network tab headers, verified preflight OPTIONS responses, and benchmarked API latency during cold start warm-up periods.",
            solution: "Configured explicit `CORSMiddleware` origins in FastAPI allowing Vercel domains, and implemented a frontend retry fallback with a silent wake-up ping on initial page load.",
            learned: "Handling asynchronous infrastructure states gracefully improves UX drastically compared to displaying generic fetch failure errors."
        },
        {
            id: 2,
            title: "Resolving Complex CORS & Origin Header Mismatches",
            project: "StudyShield API",
            category: "SECURITY & API",
            problem: "Browser extension requests sent from Chrome extension origins (`chrome-extension://...`) were rejected by strict server security headers.",
            debugging: "Analyzed request origin headers in browser developer tools and cross-referenced server middleware logs.",
            solution: "Added dynamic regex matching for extension IDs in the FastAPI wildcard CORS policy.",
            learned: "Browser extension networking requires treating extension origins as distinct non-http clients."
        },
        {
            id: 3,
            title: "Deploying TensorFlow Models on Serverless & Constrained Hosts",
            project: "Skin Disease Predictor / Image.ML",
            category: "MACHINE LEARNING",
            problem: "Standard TensorFlow Python packages exceeded memory and storage limits on cloud host instances.",
            debugging: "Profiled memory usage during model import and monitored RAM spikes during soft-max inference passes.",
            solution: "Converted full TensorFlow Keras models to TensorFlow Lite (`.tflite`) format and used `tflite_runtime` for lightweight inference.",
            learned: "Model optimization and quantization are mandatory steps for production deployment on edge servers."
        },
        {
            id: 4,
            title: "Managing Large ML Model Binaries & Git LFS Limits",
            project: "Image.ML & AI Models",
            category: "GIT & STORAGE",
            problem: "Git pushes were rejected due to GitHub's strict 100MB file size limit for model weight files.",
            debugging: "Traced commit history with `git-sizer` to pinpoint large uncompressed binary objects.",
            solution: "Configured Git Large File Storage (`git-lfs`) for `.h5` and `.pkl` files and moved binary model distribution to remote cloud storage buckets.",
            learned: "Source code repositories should contain code only; binary model artifacts belong in specialized object storage."
        },
        {
            id: 5,
            title: "Fixing Auth JWT Expiration & Refresh Token Loops",
            project: "Management SaaS / NovaERP",
            category: "AUTHENTICATION",
            problem: "Expired JWT tokens caused infinite redirect loops between dashboard routes and login pages.",
            debugging: "Traced Next.js middleware execution order and checked local storage token decryption timers.",
            solution: "Implemented silent token validation in middleware with automatic session cleanup and clear user redirection upon token expiry.",
            learned: "Robust auth middleware must handle expired, malformed, and missing tokens idempotently."
        },
        {
            id: 6,
            title: "Managing Environment Variables Securely Across Environments",
            project: "Full-Stack Portfolio Projects",
            category: "DEVOPS & SECURITY",
            problem: "API keys were at risk of leak when deploying static frontend apps that interact with backend services.",
            debugging: "Audited client-side bundle source maps to verify no hidden server secret keys were baked into static JS bundles.",
            solution: "Strictly separated public keys (`VITE_` / `NEXT_PUBLIC_`) from backend-only secrets, using `.env.example` templates for git tracking.",
            learned: "Never expose secret keys on the frontend; always proxy sensitive third-party API calls through secure backend endpoints."
        },
        {
            id: 7,
            title: "Database Schema Migrations in Live Production",
            project: "Mockmate & NovaERP",
            category: "DATABASE ARCHITECTURE",
            problem: "Adding new fields to production tables broke active client connections during deployment.",
            debugging: "Reviewed SQL query migration logs and tested migration scripts on local database copies.",
            solution: "Used Alembic (Python) and Drizzle ORM migrations with non-breaking nullable columns and backward-compatible default values.",
            learned: "Always execute non-destructive database migrations first before updating dependent application code."
        },
        {
            id: 8,
            title: "Responsive HUD Grid Design Across Mobile Viewports",
            problem: "Complex sci-fi HUD elements and dynamic particle canvases suffered performance lag and layout breaking on small 320px screens.",
            debugging: "Tested layouts on Chrome DevTools viewport simulator and real mobile devices across multiple resolutions.",
            solution: "Used CSS flexbox/grid layout fallbacks, dynamic `clamp()` font sizes, and reduced particle counts automatically on screens below 768px.",
            learned: "Design for mobile viewports from day one with graceful feature degradation for lower-power devices."
        },
        {
            id: 9,
            title: "Handling Third-Party API Rate Limits & Timeouts",
            project: "AI Coach / Gemini Integration",
            category: "API PERFORMANCE",
            problem: "Frequent LLM requests triggered 429 Too Many Requests errors from third-party APIs during peak usage.",
            debugging: "Logged HTTP status response codes and timing metrics for outgoing API calls.",
            solution: "Built exponential backoff retry algorithms with cached responses for duplicate user queries.",
            learned: "Caching and client-side throttling protect external API quotas and improve response latency for users."
        },
        {
            id: 10,
            title: "Git Branching & Deployment Sync Across Vercel Builds",
            project: "Portfolio & Micro-apps",
            category: "VERSION CONTROL",
            problem: "Direct commits to main caused accidental production deployment triggers while features were still being tested.",
            debugging: "Examined Vercel build log triggers and branch deployment rules.",
            solution: "Established strict feature branch workflows (`feature/*`) with preview deployments before merging into `main`.",
            learned: "Feature branches ensure production stability and allow thorough isolated testing before live deployment."
        }
    ]
};
