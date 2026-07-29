# Prashant Portfolio

A modern and responsive personal portfolio website built to showcase my projects, technical skills, achievements, certifications, and contact information.

## Live Website

The portfolio is deployed on Vercel.

**Live Link:** Add your Vercel deployment link here

Example:

```text
https://prashant-ai-portfolio.vercel.app
```

## About the Portfolio

This portfolio represents my work as a Computer Science student and aspiring AI/ML Engineer. It includes information about my technical background, major projects, skills, resume, and ways to contact me.

The website is designed using HTML, CSS, and JavaScript with a clean, responsive, and professional interface.

## Features

* Responsive design for mobile, tablet, and desktop
* Professional hero section
* About Me section
* Technical skills section
* Project showcase
* Resume view and download option
* Contact form
* Social media and GitHub links
* Smooth scrolling and animations
* Modern portfolio interface

## Technologies Used

* HTML5
* CSS3
* JavaScript
* EmailJS
* Git
* GitHub
* Vercel

## Project Structure

```text
portfolio.2/
│
├── assets/
│   ├── hero_bg.jpg
│   ├── profile.jpg
│   └── resume.pdf
│
├── index.html
├── style.css
├── script.js
├── generate_pdf.py
├── .gitignore
└── README.md
```

## Contact Form Functionality

The contact form allows visitors to send messages directly from the portfolio.

EmailJS is used to connect the contact form with email services. When a visitor enters their name, email address, subject, and message, the message is delivered to the configured email inbox.

The contact system does not require a separate backend server.

## EmailJS Setup

To configure the contact form:

1. Create an account on EmailJS.
2. Connect an email service.
3. Create an email template.
4. Copy the following values:

   * Service ID
   * Template ID
   * Public Key
5. Add these values inside the contact-form configuration in `script.js`.

Do not add Gmail passwords, app passwords, or private API keys to the frontend code.

## Run Locally

Clone the repository:

```bash
git clone https://github.com/prashant-singh-78/portfolio-2.O.git
```

Open the project folder:

```bash
cd portfolio-2.O
```

Since this is a static website, you can open `index.html` directly in a browser.

For a better development experience, use the Live Server extension in Visual Studio Code.

## Deployment on Vercel

1. Sign in to Vercel using GitHub.
2. Import the `portfolio-2.O` repository.
3. Select `Other` as the framework preset.
4. Keep the root directory as `./`.
5. Leave the build command blank.
6. Leave the output directory blank.
7. Click Deploy.

After deployment, Vercel will provide a live website URL.

## Updating the Website

After making changes, use:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel will automatically deploy the latest changes after every successful GitHub push.

## Resume

The resume is available inside:

```text
assets/resume.pdf
```

Visitors can view or download it directly from the portfolio website.

## Author

**Prashant**

AI/ML Engineer
Computer Science Student

GitHub:
https://github.com/prashant-singh-78

Email:
[prashantbachhamadi@gmail.com](mailto:prashantbachhamadi@gmail.com)

## License

This project is created for personal portfolio and educational purposes.
