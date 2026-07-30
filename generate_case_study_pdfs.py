import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

output_dir = os.path.join("assets", "case-studies")
os.makedirs(output_dir, exist_ok=True)

# Theme Colors matching portfolio design
DARK_BG = colors.HexColor('#070609')
TEAL = colors.HexColor('#008080')
GOLD = colors.HexColor('#ffb703')
CRIMSON = colors.HexColor('#ff2a5f')
TEXT_DARK = colors.HexColor('#1f2937')
LINE_COLOR = colors.HexColor('#008080')

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    'PDFTitle', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=18, leading=22, textColor=TEAL, alignment=0
)

subtitle_style = ParagraphStyle(
    'PDFSubtitle', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=9, leading=11, textColor=GOLD, alignment=0
)

header_right_style = ParagraphStyle(
    'PDFHeaderRight', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=TEXT_DARK, alignment=2
)

section_heading = ParagraphStyle(
    'PDFSecHead', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=TEAL, spaceAfter=2
)

body_style = ParagraphStyle(
    'PDFBodyText', parent=styles['Normal'],
    fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=TEXT_DARK
)

bold_body_style = ParagraphStyle(
    'PDFBoldBodyText', parent=styles['Normal'],
    fontName='Helvetica-Bold', fontSize=8.5, leading=11.5, textColor=TEXT_DARK
)

link_style = ParagraphStyle(
    'PDFLinkText', parent=styles['Normal'],
    fontName='Helvetica', fontSize=8, leading=10, textColor=TEAL
)

projects_data = [
    {
        "filename": "deta-hub-case-study.pdf",
        "title": "Deta Hub",
        "subtitle": "DATASET DISCOVERY & AI RESOURCE PLATFORM",
        "overview": "Curated dataset discovery and management portal connecting data engineers and machine learning practitioners with structured datasets across CV, NLP, and tabular domains.",
        "problem": "ML developers spend excessive time searching for clean, verified, properly formatted datasets distributed across scattered web sources.",
        "solution": "Built a high-performance dataset catalog with real-time text search, category filtering, schema previews, and direct access links.",
        "features": [
            "Categorized directory (Computer Vision, NLP, Tabular, Audio)",
            "Instant client-side search with dynamic tag filter",
            "Dataset detail cards featuring sample rows & schema specs",
            "Developer dataset upload workflow with format verification"
        ],
        "arch": "React Interface → REST API Router → Search Indexing Engine → Metadata Store → Static File CDN",
        "tech": "React, Vite, JavaScript, HTML5, CSS3 Glassmorphism, Node.js API, Vercel",
        "role": "Lead Full-Stack Web Developer",
        "challenges": "Optimized catalog search indexing to maintain sub-16ms UI frame rates on mobile viewports during fast typing.",
        "results": "Accelerated dataset discovery for ML developers with instant category filtering.",
        "live": "https://deta-hub.vercel.app",
        "github": "https://github.com/prashant-singh-78"
    },
    {
        "filename": "snake-verse-case-study.pdf",
        "title": "Snake Verse",
        "subtitle": "AI & COMPUTER VISION SPECIES CLASSIFIER",
        "overview": "AI-powered deep-learning web application that identifies snake species from an uploaded image.",
        "problem": "Rapidly identifying venomous versus non-venomous snake species in nature is difficult for non-experts, creating severe safety risks.",
        "solution": "Built an end-to-end computer vision web app combining OpenCV image preprocessing with a trained TensorFlow CNN model.",
        "features": [
            "Drag-and-drop image upload with real-time browser preview",
            "Automated image pre-processing and color channel normalization",
            "Deep CNN multi-class species classification",
            "Venom risk severity warnings & safety guidelines"
        ],
        "arch": "Web UI → Flask Backend → OpenCV Preprocessor → TensorFlow CNN → Vercel Host",
        "tech": "Python, Flask, TensorFlow, Keras, OpenCV, NumPy, HTML, CSS, JavaScript",
        "role": "AI / ML Engineer & Web Developer",
        "challenges": "Handled wild image lighting variations via heavy data augmentation (rotations, brightness scaling, color jitter).",
        "results": "Instantaneous species prediction with clear safety risk indicators.",
        "live": "https://snake-verse-five.vercel.app",
        "github": "https://github.com/prashant-singh-78"
    },
    {
        "filename": "skill-nova-case-study.pdf",
        "title": "Courses Platform — Skill.Nova",
        "subtitle": "EDTECH PLATFORM & CAREER ROADMAPS",
        "overview": "Responsive online learning platform helping students explore career-oriented tech courses, guided learning roadmaps, and mentor profiles.",
        "problem": "Aspiring developers struggle to find structured career paths amidst unstructured online tutorials.",
        "solution": "Architected an interactive EdTech platform featuring guided career roadmaps, filterable course tracks, and support counseling.",
        "features": [
            "Interactive course directory with filterable career tracks",
            "Guided learning path visualization & syllabus roadmaps",
            "Mentor showcase, student testimonials, and outcome telemetry",
            "Integrated support counseling forms & guidance"
        ],
        "arch": "React Client → Express API Gateway → Course Catalog Store → Vercel Host",
        "tech": "React, Vite, JavaScript, Tailwind CSS, Lucide React, Express, Vercel",
        "role": "Full-Stack EdTech Architect",
        "challenges": "Optimized nested course curriculum rendering with React memoization.",
        "results": "Delivered an intuitive platform streamlining tech career path discovery.",
        "live": "https://courses-plateform.vercel.app",
        "github": "https://github.com/prashant-singh-78"
    },
    {
        "filename": "studyshield-case-study.pdf",
        "title": "StudyShield",
        "subtitle": "PRODUCTIVITY & CHROME EXTENSION PLATFORM",
        "overview": "Student productivity platform blocking distracting websites, featuring YouTube Study Mode, focus session timers, streaks & gamified leaderboards.",
        "problem": "Students lose study hours to social media notifications and algorithmic YouTube recommendations during critical study sessions.",
        "solution": "Built a Chrome Manifest V3 extension & web platform enforcing scheduled website blocks, YouTube feed removal, and focus telemetry.",
        "features": [
            "Scheduled site blocklist & custom block rules",
            "YouTube Study Mode stripping recommended video feeds",
            "Focus Pomodoro timer with automated history logging",
            "Gamified student focus streaks and leaderboards"
        ],
        "arch": "React / Extension Popup → FastAPI (Python) API Gateway → JWT Auth → SQLite DB → Analytics Engine",
        "tech": "React, Vite, FastAPI, Python, SQLite, SQLAlchemy, Chrome Manifest V3, Vercel",
        "role": "Lead Full-Stack Developer & Chrome Extension Architect",
        "challenges": "Manifest V3 background worker lifecycle termination fixed using persistent Alarm APIs & offscreen documents.",
        "results": "Proven zero false-positive site blocks and hundreds of recorded deep-work focus hours.",
        "live": "https://github.com/prashant-singh-78/SWD.git",
        "github": "https://github.com/prashant-singh-78/SWD.git"
    },
    {
        "filename": "novaerp-case-study.pdf",
        "title": "Management SaaS — NovaERP",
        "subtitle": "ENTERPRISE MULTI-TENANT SAAS PLATFORM",
        "overview": "Company management platform streamlining corporate HR operations, employee attendance, automated payroll processing, CRM, and role-based operational dashboards.",
        "problem": "SMEs rely on fragmented spreadsheets leading to attendance discrepancies, payroll errors, and zero real-time operational visibility.",
        "solution": "Architected a unified multi-tenant SaaS application with granular role-based permissions (Super Admin, HR, Manager) and automated payroll engines.",
        "features": [
            "Role-based dashboards (Super Admin, HR Specialist, Manager)",
            "Automated attendance tracking and leave approval workflows",
            "Dynamic salary receipt breakdown & payroll calculator",
            "Client CRM pipeline and system audit logs"
        ],
        "arch": "Next.js App Router → Serverless API Routes → RBAC Middleware → Drizzle ORM → Cloudflare D1 SQL DB",
        "tech": "Next.js, React, TypeScript, Tailwind CSS, Cloudflare Workers, Cloudflare D1, Drizzle ORM, Vercel",
        "role": "Full-Stack SaaS Architect",
        "challenges": "Enforced server-side middleware authorization to prevent unauthorized access across administrative routes.",
        "results": "Delivered responsive enterprise ERP handling multi-department operations with sub-100ms API response times.",
        "live": "https://management-saa-s-six.vercel.app",
        "github": "https://github.com/prashant-singh-78"
    },
    {
        "filename": "mockmate-case-study.pdf",
        "title": "Mockmate",
        "subtitle": "AI INTERVIEW & SKILL PASSPORT ENGINE",
        "overview": "AI-powered interview preparation platform evaluating candidate resumes, conducting technical viva assessments, and generating verifiable Skill Passports.",
        "problem": "Candidates lack realistic technical interview practice with instant feedback, while recruiters struggle to verify real skill levels.",
        "solution": "Architected an interactive evaluation system combining OpenAI LLM prompts, client-side Python execution via Pyodide, and automated scoring.",
        "features": [
            "Resume parsing & natural language skill extraction",
            "Dynamic technical viva & domain interview question generation",
            "Browser-based Pyodide Python execution sandbox",
            "Evidence-backed shareable Skill Passport generation"
        ],
        "arch": "React Client → FastAPI Gateway → Pyodide WASM Engine → OpenAI API → PostgreSQL DB → Vercel",
        "tech": "React, TypeScript, FastAPI, Python, PostgreSQL, Pyodide WASM, OpenAI API, Vercel",
        "role": "Creator & AI Engineer",
        "challenges": "Eliminated LLM grading inconsistencies via strict JSON evaluation rubrics and ran code safely on client via WebAssembly.",
        "results": "Sub-3-second technical answer evaluation with automated verifiable candidate Skill Passports.",
        "live": "https://mockmate-sandy.vercel.app",
        "github": "https://github.com/prashant-singh-78"
    },
    {
        "filename": "ai-coach-case-study.pdf",
        "title": "AI Coach",
        "subtitle": "CAREER & ATS AI PLATFORM",
        "overview": "Intelligent career-preparation platform helping users optimize ATS resumes, match job descriptions, and practice viva questions via Google Gemini API.",
        "problem": "Job applicants struggle to format resumes for ATS compliance and lack personalized feedback for technical rounds.",
        "solution": "Built an ATS optimization platform combining spaCy NLP keyword parsing with Google Gemini LLM mock interview generation.",
        "features": [
            "ATS resume scoring & missing keyword detection",
            "Job description skill matching using NLP semantic embeddings",
            "Gemini API dynamic interview question generation",
            "Real-time answer evaluation & performance feedback"
        ],
        "arch": "React Client → FastAPI Backend → spaCy NLP Engine → Gemini API → Vercel Host",
        "tech": "React, Vite, FastAPI, Python, Google Gemini API, spaCy, SQLite, Vercel",
        "role": "Lead AI Engineer",
        "challenges": "Built layout-aware PDF parsers to group text blocks correctly across multi-column resumes.",
        "results": "Boosted candidate ATS resume scoring match rates by over 40%.",
        "live": "https://ai-coach-ochre-pi.vercel.app",
        "github": "https://github.com/prashant-singh-78"
    },
    {
        "filename": "streamlite-case-study.pdf",
        "title": "StreamLite",
        "subtitle": "MEDIA STREAMING PLATFORM",
        "overview": "Subscription-based video streaming platform supporting user authentication, video playback, content uploads, and administrative video management.",
        "problem": "Building lightweight video streaming portals requires low-overhead video delivery and subscription access control.",
        "solution": "Developed a Node.js & MySQL media streaming platform with user roles and dynamic video streaming.",
        "features": [
            "User account registration & subscription management",
            "Optimized video player with smooth playback",
            "Admin dashboard for video uploading & content taxonomy"
        ],
        "arch": "Web Client → Node.js Server → MySQL DB → Media Storage → Vercel CDN",
        "tech": "HTML, CSS, JavaScript, Node.js, Express, MySQL, Vercel",
        "role": "Full-Stack Web Developer",
        "challenges": "Implemented video chunking to ensure smooth playback on slower mobile connections.",
        "results": "Delivered a fully responsive media streaming portal.",
        "live": "https://streamlite-vrvp.vercel.app/",
        "github": "https://github.com/prashant-singh-78"
    },
    {
        "filename": "anime-verse-case-study.pdf",
        "title": "Anime Verse",
        "subtitle": "INTERACTIVE WEB EXPERIENCE",
        "overview": "Naruto-themed interactive web portal allowing fans to explore characters, jutsu abilities, memorable battles, character quizzes, and animations.",
        "problem": "Generic fandom wiki pages lack interactive, visually engaging experiences and immersive lore exploration.",
        "solution": "Created a rich interactive client-side web application featuring character modals, audio FX, and trivia games.",
        "features": [
            "Interactive character cards with jutsu & backstory modals",
            "Dynamic trivia quiz with real-time score tracking",
            "Parallax scrolling animations and sound effects"
        ],
        "arch": "Browser Client → DOM Event Engine → Local Storage → GitHub Pages Host",
        "tech": "HTML5, CSS3, JavaScript ES6+, GitHub Pages",
        "role": "Frontend Experience Architect",
        "challenges": "Hardware-accelerated CSS transforms to preserve 60fps animations on mobile screens.",
        "results": "Engaged hundreds of anime fans with interactive web experiences.",
        "live": "https://prashant-singh-78.github.io/anime-verse/",
        "github": "https://github.com/prashant-singh-78/anime-verse"
    },
    {
        "filename": "image-ml-case-study.pdf",
        "title": "Image.ML",
        "subtitle": "MACHINE LEARNING CNN CLASSIFIER",
        "overview": "Machine-learning computer vision pipeline trained on a custom dataset to perform binary and multi-class image classification (Cat vs Non-Cat detection).",
        "problem": "Demonstrating end-to-end ML model training, evaluation, and web deployment with custom dataset pipelines.",
        "solution": "Trained a deep Convolutional Neural Network (CNN) in TensorFlow/Keras and served inference via a Flask REST API.",
        "features": [
            "Custom dataset ingestion and data augmentation pipeline",
            "Deep CNN architecture trained with Keras/TensorFlow",
            "Flask REST API serving real-time image evaluation predictions"
        ],
        "arch": "Web UI → Flask Gateway → NumPy Preprocessor → TensorFlow CNN → Render Host",
        "tech": "Python, TensorFlow, Keras, NumPy, OpenCV, Flask, HTML, CSS, JavaScript",
        "role": "Machine Learning Specialist",
        "challenges": "Applied Dropout layers and L2 regularization to prevent overfitting on limited training data.",
        "results": "Achieved over 90% classification accuracy on evaluation benchmarks.",
        "live": "https://github.com/prashant-singh-78/image.ml.git",
        "github": "https://github.com/prashant-singh-78/image.ml.git"
    },
    {
        "filename": "skin-disease-predictor-case-study.pdf",
        "title": "Skin Disease Predictor",
        "subtitle": "HEALTHCARE AI & COMPUTER VISION",
        "overview": "Deep-learning medical imaging application analyzing uploaded dermatological images to classify multi-class skin conditions using a Convolutional Neural Network.",
        "problem": "Dermatological consultations are often inaccessible in rural areas, delaying early identification of treatable conditions.",
        "solution": "Built a computer vision web pipeline with OpenCV preprocessing, TensorFlow CNN model inference, and detailed confidence score outputs.",
        "features": [
            "Image drag-and-drop uploader with client preview",
            "OpenCV image normalization and pre-processing pipeline",
            "Multi-class CNN model evaluation with confidence breakdown",
            "Educational dermatological reference & medical disclaimer"
        ],
        "arch": "Web Client → FastAPI Image Ingestion → OpenCV Preprocessor → TensorFlow CNN → Softmax Confidence Evaluator",
        "tech": "Python, FastAPI, TensorFlow, Keras, OpenCV, CNN Architecture, Render",
        "role": "AI / ML Developer & Model Specialist",
        "challenges": "Quantized model weights to TFLite format to reduce memory footprint by 65% for free-tier cloud deployment.",
        "results": "Lightweight computer vision model returning skin condition predictions in under 1.2 seconds.",
        "live": "https://github.com/prashant-singh-78/skin-desease.ml.git",
        "github": "https://github.com/prashant-singh-78/skin-desease.ml.git"
    },
    {
        "filename": "medicure-case-study.pdf",
        "title": "MediCure",
        "subtitle": "SMART HEALTHCARE & TRIAGE PLATFORM",
        "overview": "Integrated healthcare accessibility portal offering preliminary symptom-guided analysis, provider registrations, and emergency ambulance dispatch.",
        "problem": "Suburban areas face delayed preliminary healthcare advice, causing critical time loss during medical emergencies.",
        "solution": "Developed a full-stack platform featuring a Random Forest symptom classifier, patient/doctor portals, and emergency location dispatch.",
        "features": [
            "Interactive symptom triage checker (educational guidance)",
            "Patient & healthcare provider registration portals",
            "Emergency ambulance dispatcher mockup with location routing",
            "Medication directory and health precaution library"
        ],
        "arch": "React Frontend → FastAPI Backend → Scikit-Learn Classifier → Healthcare DB → Emergency Dispatcher",
        "tech": "React, FastAPI, Python, Scikit-Learn, Random Forest, SQLite/PostgreSQL, Render",
        "role": "Full-Stack & Machine Learning Lead",
        "challenges": "Integrated prominent medical disclaimers on all outputs and built standardized symptom encoding pipelines.",
        "results": "Delivered rapid symptom triage and emergency dispatch workflow coordination.",
        "live": "https://github.com/prashant-singh-78/medicure.git",
        "github": "https://github.com/prashant-singh-78/medicure.git"
    },
    {
        "filename": "jarvis-case-study.pdf",
        "title": "Jarvis — Mikasa Voice Assistant",
        "subtitle": "AI VOICE ASSISTANT & SYSTEM AUTOMATION",
        "overview": "AI-powered desktop voice assistant automating computer tasks with speech recognition, Google Gemini API intelligence, and MediaPipe gesture controls.",
        "problem": "Executing repetitive desktop tasks requires manual mouse and keyboard navigation.",
        "solution": "Built a Python desktop voice assistant leveraging Gemini API intent parsing, speech synthesis, and MediaPipe vision controls.",
        "features": [
            "Real-time speech recognition & text-to-speech voice synthesis",
            "Google Gemini API integration for intelligent intent parsing",
            "MediaPipe & OpenCV gesture recognition for touchless controls",
            "PowerShell system automation scripts for launching desktop apps"
        ],
        "arch": "Mic / Camera Input → Speech Engine → Gemini API → PowerShell Exec → Voice Output",
        "tech": "Python, Google Gemini API, SpeechRecognition, OpenCV, MediaPipe, PowerShell",
        "role": "Lead AI & Voice Developer",
        "challenges": "Calibrated dynamic ambient noise thresholds to prevent unwanted background command execution.",
        "results": "Delivered a hands-free desktop voice assistant executing system commands effortlessly.",
        "live": "https://github.com/prashant-singh-78/jarvis.git",
        "github": "https://github.com/prashant-singh-78/jarvis.git"
    },
    {
        "filename": "krashi-kalyan-case-study.pdf",
        "title": "Krashi Kalyan",
        "subtitle": "AGRITECH & DATA INSIGHTS PLATFORM",
        "overview": "Agriculture-support platform providing soil analysis, crop recommendation, crop disease risk information, weather updates, and market-price transparency.",
        "problem": "Farmers in rural regions lack real-time digital insights for optimal crop selection and direct market price comparisons.",
        "solution": "Developed an accessible agritech portal combining Scikit-Learn soil recommendation models with live weather APIs.",
        "features": [
            "Soil health parameter analyzer providing ML crop recommendations",
            "Weather forecast and disease risk advisory dashboard",
            "Market price comparison tool across regional mandis",
            "High-contrast multilingual farmer-friendly interface"
        ],
        "arch": "Farmer Web UI → FastAPI Service → Weather API → Scikit-Learn Model → Render Host",
        "tech": "HTML, CSS, JavaScript, Chart.js, Flask/FastAPI, Python, Scikit-Learn, Render",
        "role": "Agritech Platform Lead",
        "challenges": "Simplified UI with icon-based navigation for users with low digital literacy.",
        "results": "Created a comprehensive agricultural decision-support platform.",
        "live": "https://github.com/prashant-singh-78/krashi-kalyan.git",
        "github": "https://github.com/prashant-singh-78/krashi-kalyan.git"
    },
    {
        "filename": "weather-forecast-case-study.pdf",
        "title": "Weather Forecast App",
        "subtitle": "REAL-TIME API WEB APPLICATION",
        "overview": "Real-time weather forecast application displaying live temperature, humidity, wind speeds, and meteorological conditions for global cities.",
        "problem": "Users require instant, clean, reliable weather forecasting without invasive advertisements.",
        "solution": "Built a responsive glassmorphism web application consuming OpenWeatherMap REST APIs.",
        "features": [
            "Instant city search with auto-complete and error handling",
            "Live temperature, humidity, wind speed, and pressure metrics",
            "Dynamic background visuals matching current weather conditions",
            "Fully responsive glassmorphism UI layout"
        ],
        "arch": "Search UI → Fetch Layer → OpenWeatherMap API → Dynamic DOM Render → GitHub Pages",
        "tech": "HTML5, CSS3, JavaScript ES6, OpenWeatherMap API, GitHub Pages",
        "role": "Frontend Developer",
        "challenges": "Handled 404 API responses gracefully with user-friendly toast alerts.",
        "results": "Delivered a sleek weather dashboard with sub-second response times.",
        "live": "https://prashant-singh-78.github.io/weather-forecast/",
        "github": "https://github.com/prashant-singh-78/weather-forecast"
    },
    {
        "filename": "old-portfolio-case-study.pdf",
        "title": "Old Portfolio",
        "subtitle": "PORTFOLIO WEBSITE",
        "overview": "Personal developer portfolio website showcasing academic background, technical skills, AI/ML projects, and contact channels.",
        "problem": "Presenting a clean online presence to showcase software projects to recruiters.",
        "solution": "Created a dark theme developer portfolio featuring project galleries and contact links.",
        "features": [
            "Clean dark theme design system with smooth navigation",
            "Filterable project gallery showcasing web & AI applications",
            "Contact section with direct email integration and resume download"
        ],
        "arch": "Web Client → Vercel Global CDN",
        "tech": "HTML5, CSS3, JavaScript, Vercel",
        "role": "Developer & Designer",
        "challenges": "Ensured seamless mobile responsiveness across diverse device viewports.",
        "results": "Established an effective developer web portfolio.",
        "live": "https://prashant08.vercel.app/",
        "github": "https://github.com/prashant-singh-78"
    }
]

for p in projects_data:
    pdf_file_path = os.path.join(output_dir, p["filename"])
    doc = SimpleDocTemplate(
        pdf_file_path, pagesize=letter,
        rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36
    )
    story = []

    # Header Row (Title & Contact)
    header_data = [
        [
            Paragraph(f"<b>{p['title']}</b>", title_style),
            Paragraph("<b>PRASHANT | AI ENGINEER</b><br/>prashantbachhamadi@gmail.com<br/>+91 7627043971", header_right_style)
        ]
    ]
    header_table = Table(header_data, colWidths=[340, 200])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 2))
    story.append(Paragraph(f"<b>{p['subtitle']}</b>", subtitle_style))
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.5, color=LINE_COLOR, spaceAfter=6))

    # Overview & Problem / Solution
    story.append(Paragraph("Project Overview", section_heading))
    story.append(Paragraph(p["overview"], body_style))
    story.append(Spacer(1, 4))

    prob_data = [
        [Paragraph("<b>Problem Statement:</b>", bold_body_style), Paragraph(p["problem"], body_style)],
        [Paragraph("<b>Solution Implemented:</b>", bold_body_style), Paragraph(p["solution"], body_style)],
        [Paragraph("<b>My Technical Role:</b>", bold_body_style), Paragraph(p["role"], body_style)]
    ]
    prob_table = Table(prob_data, colWidths=[120, 420])
    prob_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(prob_table)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceAfter=6))

    # Key Features & Tech Stack Table
    story.append(Paragraph("Main Features & Technical Stack", section_heading))
    
    feature_bullets = "<br/>".join([f"• {f}" for f in p["features"]])
    tech_data = [
        [
            Paragraph("<b>Core Features:</b><br/>" + feature_bullets, body_style),
            Paragraph(f"<b>Technologies Used:</b><br/>{p['tech']}<br/><br/><b>Architecture Flow:</b><br/>{p['arch']}", body_style)
        ]
    ]
    tech_table = Table(tech_data, colWidths=[270, 270])
    tech_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceAfter=6))

    # Technical Challenges & Results
    story.append(Paragraph("Technical Challenge & Results", section_heading))
    story.append(Paragraph(f"<b>Key Engineering Challenge:</b> {p['challenges']}", body_style))
    story.append(Spacer(1, 3))
    story.append(Paragraph(f"<b>Validated Results:</b> {p['results']}", body_style))
    story.append(Spacer(1, 6))
    story.append(HRFlowable(width="100%", thickness=1, color=LINE_COLOR, spaceAfter=6))

    # Links & Footer
    links_text = f'<b>Live Demo:</b> <a href="{p["live"]}" color="#008080">{p["live"]}</a> &nbsp;&nbsp;|&nbsp;&nbsp; <b>GitHub:</b> <a href="{p["github"]}" color="#008080">{p["github"]}</a> &nbsp;&nbsp;|&nbsp;&nbsp; <b>Portfolio:</b> prashant08.vercel.app'
    story.append(Paragraph(links_text, link_style))

    doc.build(story)
    print(f"Generated case study PDF: {pdf_file_path}")

print("All 6 One-Page Case Study PDFs generated successfully.")
