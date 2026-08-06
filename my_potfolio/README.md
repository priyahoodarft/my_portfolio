# Priya Hooda — Personal Portfolio Website

A modern, fully responsive, multi-page personal portfolio for **Priya Hooda — AI Engineer & AI Trainer**.

## Features

- 8 separate pages (no single-scroll site): Home, About, Skills, Education, Experience, Projects, Certifications, Contact
- Light / Dark mode toggle (saved to `localStorage`)
- Responsive design (Desktop, Tablet, Mobile) with hamburger menu
- Glassmorphism, animated hero, typing animation, scroll-reveal, animated counters, skill progress bars
- Resume download button, social media links, scroll-to-top button
- Contact form with JavaScript validation
- Smooth page transitions and preloader

## Folder Structure

```
my_potfolio/
├── index.html
├── about.html
├── skills.html
├── education.html
├── experience.html
├── projects.html
├── certifications.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    ├── images/      (profile.png, favicon.png, project images)
    └── resume/      (Priya_Hooda_Resume.pdf)
```

## How to Run in VS Code

1. Open VS Code.
2. `File` → `Open Folder` → select the `my_potfolio` folder.
3. Install the **Live Server** extension (by Ritwick Dey) if not already installed.
4. Right-click `index.html` → **Open with Live Server**.
   - Or click "Go Live" in the bottom-right status bar.
5. The site opens at `http://127.0.0.1:5500/`.

> Alternatively, double-click any `.html` file to open it in your browser.

## Customizing with Your Real Data

1. **Resume**: place your resume PDF at `assets/resume/Priya_Hooda_Resume.pdf`.
2. **Profile photo**: replace `assets/images/profile.png`.
3. **Project images**: replace `assets/images/project1.png`, `project2.png`, `project3.png`.
4. **Favicon**: replace `assets/images/favicon.png`.
5. **Text content**: edit the relevant `.html` pages and update name, summary, education, skills, experience, projects, certifications, and contact details.
6. **Social links**: update the LinkedIn/GitHub/Twitter/Instagram URLs in each page's `.social-icons` section and in `contact.html`.

> All images use an `onerror` fallback placeholder, so the site renders even before you add your own images.

## Notes

- Content currently uses placeholder text matching an AI Engineer / AI Trainer profile. Replace it with your real resume details.
- No build step or dependencies required — pure HTML/CSS/JS.
