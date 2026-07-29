import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

pdf_path = os.path.join("assets", "resume.pdf")
doc = SimpleDocTemplate(
    pdf_path,
    pagesize=letter,
    rightMargin=36,
    leftMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Colors matching original PDF screenshot
TEAL = colors.HexColor('#008080')
TEXT_DARK = colors.HexColor('#222222')
LINE_COLOR = colors.HexColor('#008080')

# Styles
name_style = ParagraphStyle(
    'PDFName',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    textColor=TEAL,
    alignment=1
)

sub_contact_style = ParagraphStyle(
    'PDFContactSub',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=14,
    textColor=TEXT_DARK,
    alignment=1
)

links_style = ParagraphStyle(
    'PDFLinks',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=TEXT_DARK,
    alignment=1
)

section_heading_style = ParagraphStyle(
    'PDFSectionHead',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=13,
    leading=16,
    textColor=TEXT_DARK,
    spaceAfter=4
)

body_text_style = ParagraphStyle(
    'PDFBody',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=13.5,
    textColor=TEXT_DARK
)

bold_text_style = ParagraphStyle(
    'PDFBoldBody',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=9.5,
    leading=13.5,
    textColor=TEXT_DARK
)

story = []

# --- Header ---
story.append(Paragraph("PRASHANT", name_style))
story.append(Spacer(1, 4))
story.append(Paragraph("+91 7627043971 &nbsp;&nbsp;&nbsp;&nbsp; JAIPUR,IN", sub_contact_style))
story.append(Spacer(1, 2))
story.append(Paragraph('<a href="mailto:prashantbachhamadi@gmail.com" color="#008080">prashantbachhamadi@gmail.com</a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="https://linkedin.com/in/prashant-singh-7047572a0" color="#008080">linkedin.com/in/prashant-singh-7047572a0</a> &nbsp;&nbsp;&nbsp;&nbsp; <a href="https://github.com/prashant-singh-78" color="#008080">github.com/prashant-singh-78</a>', links_style))
story.append(Spacer(1, 8))

# --- Objective ---
story.append(Paragraph("Objective", section_heading_style))
story.append(Paragraph("Passionate Machine Learning student with strong Python and AI skills. Interested in building intelligent AI solutions and automation systems.<br/>Eager to apply technical knowledge and problem-solving skills to real-world Machine Learning project.", body_text_style))
story.append(Spacer(1, 6))
story.append(HRFlowable(width="100%", thickness=1, color=LINE_COLOR, spaceAfter=8))

# --- Education ---
story.append(Paragraph("Education", section_heading_style))
story.append(Paragraph("<b>B.Tech.inComputerScienceAI, Arya Institute of Engineering Technology And Management, jaipur &nbsp;&nbsp;&nbsp;&nbsp; 2023 – Expected 2027</b>", body_text_style))
story.append(Spacer(1, 4))

edu_table_data = [
    [Paragraph("<b>Schooling</b>", body_text_style), Paragraph("<b>Class XII</b>", body_text_style), Paragraph("<b>Class X</b>", body_text_style)],
    [Paragraph("<b>Score</b>", body_text_style), Paragraph("87.77%", body_text_style), Paragraph("90%", body_text_style)]
]
edu_table = Table(edu_table_data, colWidths=[120, 120, 120])
edu_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
]))
story.append(edu_table)
story.append(Spacer(1, 6))
story.append(HRFlowable(width="100%", thickness=1, color=LINE_COLOR, spaceAfter=8))

# --- Skills ---
story.append(Paragraph("Skills", section_heading_style))
skills_table_data = [
    [
        Paragraph("<b>Languages &<br/>Frameworks:</b>", bold_text_style),
        Paragraph("<b>AI &<br/>Data Science:</b>", bold_text_style),
        Paragraph("<b>Tools &<br/>Platforms</b>", bold_text_style),
        Paragraph("<b>Soft Skills</b>", bold_text_style)
    ],
    [
        Paragraph("Python<br/>C<br/>Flask<br/>SQL", body_text_style),
        Paragraph("NumPy,<br/>Matplotlib<br/>Scikit-learn<br/>Pandas<br/>YOLOv8", body_text_style),
        Paragraph("Git,<br/>Linux<br/>Arduino IDE<br/>Cursor<br/>Visual Studio", body_text_style),
        Paragraph("Leader ship<br/>Communicaon<br/>ProblemSolving", body_text_style)
    ]
]
skills_table = Table(skills_table_data, colWidths=[130, 130, 130, 130])
skills_table.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('LEFTPADDING', (0,0), (-1,-1), 0),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
]))
story.append(skills_table)
story.append(Spacer(1, 6))
story.append(HRFlowable(width="100%", thickness=1, color=LINE_COLOR, spaceAfter=8))

# --- Projects ---
story.append(Paragraph("Projects", section_heading_style))

p_list = [
    ("Portable Hospital AI | Python, Flask, TensorFlow, Machine Learning | Jan 2026 – Mar 2026",
     "Developed an AI-powered healthcare platform with medicine recommendations, BMI analysis, and multiple health assessment features.<br/>Integrated machine learning models to deliver real-time predictions and support preliminary healthcare decisions."),
    
    ("Krashi Kalyan | Python, Machine Learning, Flask | Nov 2025 – Jan 2026",
     "Built an AI-based agriculture platform for crop recommendations and smart farming assistance.<br/>Integrated machine learning models to improve agricultural decision-making."),
    
    ("Data Hub | Python, Flask, SQL | Sept 2025 – Oct 2025",
     "Developed a platform connecting data providers with clients for secure dataset sharing.<br/>Implemented authentication, dataset management, and role-based access control."),
    
    ("StreamLite | Next.js, TypeScript, Tailwind CSS, Supabase | May 2025 – Jun 2025",
     "Built a responsive streaming platform with secure authentication and real-time backend integration.<br/>Optimized performance and user experience using modern web technologies."),
    
    ("E-Commerce Website | HTML, CSS, JavaScript, Python, Flask, SQLite | Aug 2024 – Oct 2024",
     "Developed a full-stack e-commerce platform with user authentication, product management, and shopping cart functionality.<br/>Implemented a responsive interface and secure database integration for efficient order management.")
]

for title_line, desc in p_list:
    story.append(Paragraph(f'<font color="#008080">■</font> <b>{title_line}</b>', body_text_style))
    story.append(Paragraph(f'&nbsp;&nbsp;&nbsp;<i>{desc}</i>', body_text_style))
    story.append(Spacer(1, 5))

story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=1, color=LINE_COLOR, spaceAfter=8))

# --- Certificates ---
story.append(Paragraph("Certificates", section_heading_style))
certs = [
    "Winner– VGUNational Project Exhibition (2025)",
    "Hackstorm 24-Hour Hackathon (Oct–Nov 2025)",
    "Rajasthan Digifest × TiE Hackathon (Dec 2025)",
    "Edu Chain Builders Connect – Graduation Certificate (2025)",
    "Sphinx'25 Hackathon, MNIT Jaipur (Sept 2024)"
]
for c in certs:
    story.append(Paragraph(f'<font color="#008080">■</font> {c}', body_text_style))
    story.append(Spacer(1, 2))

story.append(Spacer(1, 4))
story.append(HRFlowable(width="100%", thickness=1, color=LINE_COLOR, spaceAfter=8))

# --- Experience ---
story.append(Paragraph("Experience", section_heading_style))
exps = [
    "Participatedinmultiple hackathons, successfully developing AI and Python-based solutions within strict deadlines.",
    "Mentored students in Python programming, helping them build strong programming fundamentals through hands on coding sessions",
    "Collaborated with teams in fast-paced environments, enhancing technical, communication, and teamwork skills while delivering projects within limited timeframes."
]
for exp in exps:
    story.append(Paragraph(f'<font color="#008080">➔</font> {exp}', body_text_style))
    story.append(Spacer(1, 3))

doc.build(story)
print("Exact 1-to-1 PDF Resume created at assets/resume.pdf")
