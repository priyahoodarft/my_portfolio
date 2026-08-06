/* ============================================================
   Priya Hooda — Portfolio Website
   script.js — Navigation, Theme, Animations, Form Validation
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Preloader ---------- */
  window.addEventListener("load", function () {
    const pre = document.getElementById("preloader");
    if (pre) {
      setTimeout(function () {
        pre.classList.add("hide");
      }, 500);
    }
  });

  /* ---------- Dark / Light Mode Toggle ---------- */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
    if (themeToggle) {
      themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  const savedTheme = localStorage.getItem("portfolio-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(current);
    });
  }

  /* ---------- Mobile Hamburger Menu ---------- */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- Active Nav Link (based on current page) ---------- */
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  /* ---------- Scroll Reveal Animations ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Animated Skill Bars ---------- */
  const skillBars = document.querySelectorAll(".progress span");
  function animateSkill(bar) {
    const w = parseInt(bar.getAttribute("data-width"), 10);
    bar.style.width = w + "%";
    const label = bar.closest(".skill-card").querySelector(".skill-percent");
    if (label) {
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        label.textContent = Math.floor(p * w) + "%";
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  }
  if ("IntersectionObserver" in window && skillBars.length) {
    const skillObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateSkill(entry.target);
          skillObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    skillBars.forEach(function (bar) { skillObs.observe(bar); });
  } else {
    skillBars.forEach(animateSkill);
  }

  /* ---------- Animated Counters ---------- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(progress * target);
      el.textContent = value + (el.getAttribute("data-suffix") || "");
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const counters = document.querySelectorAll(".counter");
  if ("IntersectionObserver" in window && counters.length) {
    const counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { counterObs.observe(c); });
  }

  /* ---------- Typing Animation (Home hero) ---------- */
  const typedEl = document.querySelector(".typed");
  if (typedEl) {
    const words = ["AI Engineer", "AI Trainer", "ML Enthusiast", "Educator"];
    let w = 0, c = 0, deleting = false;
    function type() {
      const word = words[w];
      typedEl.textContent = word.substring(0, c);
      if (!deleting && c < word.length) {
        c++;
        setTimeout(type, 90);
      } else if (deleting && c > 0) {
        c--;
        setTimeout(type, 45);
      } else {
        deleting = !deleting;
        if (!deleting) w = (w + 1) % words.length;
        setTimeout(type, 1200);
      }
    }
    type();
  }

  /* ---------- Scroll To Top Button ---------- */
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) scrollTop.classList.add("show");
      else scrollTop.classList.remove("show");
    });
    scrollTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Page Fade Transition ---------- */
  document.body.classList.add("page-fade");

  /* ---------- Contact Form Validation ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
    const success = form.querySelector(".form-success");

    function setError(input, group, message) {
      group.classList.add("error");
      const msg = group.querySelector(".error-msg");
      if (msg) msg.textContent = message;
    }
    function clearError(group) {
      group.classList.remove("error");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const phone = form.querySelector("#phone");
      const message = form.querySelector("#message");

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRe = /^[0-9+\-\s]{7,15}$/;

      if (!name.value.trim()) { setError(name, name.closest(".form-group"), "Please enter your name."); valid = false; }
      else clearError(name.closest(".form-group"));

      if (!emailRe.test(email.value.trim())) { setError(email, email.closest(".form-group"), "Enter a valid email address."); valid = false; }
      else clearError(email.closest(".form-group"));

      if (!phoneRe.test(phone.value.trim())) { setError(phone, phone.closest(".form-group"), "Enter a valid phone number."); valid = false; }
      else clearError(phone.closest(".form-group"));

      if (!message.value.trim()) { setError(message, message.closest(".form-group"), "Please enter your message."); valid = false; }
      else clearError(message.closest(".form-group"));

      if (valid) {
        if (success) success.style.display = "block";
        form.reset();
        setTimeout(function () { if (success) success.style.display = "none"; }, 4000);
      }
    });
  }
})();
