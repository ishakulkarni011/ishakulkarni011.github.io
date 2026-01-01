// =========================
// Smooth scroll + close sidebar on mobile
// =========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });

    const sidebar = document.getElementById("sidebar-active");
    if (sidebar && sidebar.checked) sidebar.checked = false;
  });
});

// =========================
// Footer year
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// =========================
// Theme toggle (localStorage)
// =========================
function applyTheme(theme) {
  document.body.classList.toggle("darktheme", theme === "dark");

  const themeIcon = document.getElementById("themeIcon");
  if (themeIcon) {
    themeIcon.classList.toggle("fa-moon", theme !== "dark");
    themeIcon.classList.toggle("fa-sun", theme === "dark");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const storedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(storedTheme);

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("darktheme");
      const newTheme = isDark ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  }
});

// =========================
// Scroll spy: highlight active nav link
// =========================
function observeSections() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a.nav-a");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const id = entry.target.id;
      navLinks.forEach(a => a.classList.remove("active"));

      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add("active");
    });
  }, { root: null, threshold: 0.55 });

  sections.forEach(sec => observer.observe(sec));
}

document.addEventListener("DOMContentLoaded", observeSections);

// =========================
// Experience "Details" toggle
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".exp-details-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".exp-card");
      const details = card.querySelector(".exp-details");

      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      details.hidden = isOpen;
    });
  });
});

// =========================
// Projects filter (All / SDE / ML)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card2");

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");

      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach(card => {
        const categories = (card.getAttribute("data-category") || "").split(" ");
        const show = filter === "all" || categories.includes(filter);
        card.style.display = show ? "block" : "none";
      });
    });
  });
});

// =========================
// Contact form simulation
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;

    status.textContent = "Sending message...";
    status.classList.remove("ok", "err");
    status.classList.add("pending");

    setTimeout(() => {
      status.textContent = "Thank you! Your message has been sent successfully.";
      status.classList.remove("pending");
      status.classList.add("ok");
      form.reset();
    }, 1200);
  });
});
