/* ==========================================================================
   PRASHANT. PORTFOLIO - RESUME CUSTOMIZER DATA LAYER (data/resume-customizer-data.js)
   Contains role profiles, skill priority matrices, and customizable resume sections.
   ========================================================================== */

(function () {
    'use strict';

    window.portfolio2ResumeData = {
        candidateName: "Prashant Singh",
        title: "AI Engineer & Full-Stack Developer",
        email: "prashantbachhamadi@gmail.com",
        phone: "+91 8824147878",
        location: "Jaipur, Rajasthan, India",
        github: "https://github.com/prashant-singh-78",
        linkedin: "https://www.linkedin.com/in/prashant-singh-7878-ai",
        
        roles: {
            aiml: {
                id: "aiml",
                title: "AI / Machine Learning Engineer",
                badge: "AI & Computer Vision Focus",
                summary: "Passionate AI Engineer specializing in Computer Vision (YOLOv8), Deep Learning (PyTorch, TensorFlow), and NLP. Winner of 1st Rank in VGU National Project Exhibition for real-world AI diagnostic systems.",
                topSkills: ["Python", "PyTorch", "TensorFlow", "YOLOv8", "OpenCV", "Scikit-Learn", "Flask APIs", "Docker", "Model Deployment"],
                featuredProjects: [4, 6, 12, 11], // StudyShield, MockMate, MediCure, Skin Disease Predictor
                keyHighlights: [
                    "Developed high-precision skin lesion diagnostic CNN model using PyTorch & OpenCV.",
                    "Implemented real-time YOLOv8 distraction detection for StudyShield focus monitor.",
                    "Trained custom NLP models for automated interview question synthesis in MockMate."
                ]
            },
            fullstack: {
                id: "fullstack",
                title: "Full-Stack Software Developer",
                badge: "Web & Enterprise SaaS Focus",
                summary: "Full-Stack Web Developer experienced in building high-performance web applications using modern JavaScript, HTML5/CSS3, Python Flask, Node.js, and SQL/NoSQL databases. Winner of Hackstorm 24-Hr Hackathon.",
                topSkills: ["JavaScript (ES6+)", "HTML5 & CSS3", "Python / Flask", "REST APIs", "PostgreSQL", "React", "Node.js", "Git & GitHub", "Vercel / Render"],
                featuredProjects: [5, 6, 4, 1], // NovaERP, MockMate, StudyShield, Deta Hub
                keyHighlights: [
                    "Architected NovaERP multi-tenant SaaS with role-based access control (RBAC).",
                    "Built responsive glassmorphism UI design systems with sub-50ms render performance.",
                    "Integrated secure JWT authentication and RESTful API endpoints for cross-platform apps."
                ]
            },
            datascience: {
                id: "datascience",
                title: "Data Scientist & Analytics Engineer",
                badge: "Data & ML Pipelines Focus",
                summary: "Data Scientist proficient in exploratory data analysis, feature engineering, predictive modeling, and data visualization. Skilled in managing large datasets and deploying reproducible data pipelines.",
                topSkills: ["Python", "Pandas & NumPy", "Scikit-Learn", "Matplotlib & Seaborn", "SQL", "Feature Engineering", "Data Cleaning", "Jupyter", "ETL Pipelines"],
                featuredProjects: [1, 11, 4, 12], // Deta Hub, Skin Disease Predictor, StudyShield, MediCure
                keyHighlights: [
                    "Created Deta Hub centralized dataset management platform for fast dataset exploration.",
                    "Preprocessed & augmented 10,000+ medical images for deep learning training pipelines.",
                    "Built automated model performance evaluation rubrics with ROC/AUC and confusion matrices."
                ]
            },
            backend: {
                id: "backend",
                title: "Backend & Systems Engineer",
                badge: "APIs & Infrastructure Focus",
                summary: "Backend Software Engineer focused on designing scalable REST APIs, database schemas, microservice architectures, and secure authentication pipelines with cloud deployment.",
                topSkills: ["Python / Flask", "PostgreSQL & SQLite", "RESTful API Design", "System Architecture", "Docker", "Authentication (JWT / OAuth)", "Linux CLI", "Git Workflow"],
                featuredProjects: [5, 4, 6, 1], // NovaERP, StudyShield, MockMate, Deta Hub
                keyHighlights: [
                    "Engineered multi-tenant database schemas with PostgreSQL Row Level Security (RLS).",
                    "Optimized API query execution speeds by 40% using indexed query strategies.",
                    "Configured continuous integration & deployment pipelines on Vercel and Render."
                ]
            }
        },

        education: [
            {
                degree: "Bachelor of Technology (B.Tech) - Computer Science & Engineering",
                institution: "Vivekananda Global University (VGU), Jaipur",
                period: "2022 - 2026",
                details: "CGPA: 8.5+ | Specialization in Artificial Intelligence & Machine Learning"
            }
        ],

        achievements: [
            "🏆 1st Rank Winner - VGU National Level Project Exhibition 2025",
            "🚀 Finalist - Rajasthan Digifest × TiE Hackathon 2025",
            "⚡ Champion - Hackstorm 24-Hour National Hackathon 2025"
        ]
    };
})();
