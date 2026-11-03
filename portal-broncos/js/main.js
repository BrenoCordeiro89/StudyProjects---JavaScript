function updateFooterYear() {
  const yearElements = document.querySelectorAll("[data-current-year]");

  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}

function initializeHeaderScroll() {
  const header = document.querySelector(".site-header");

  if (!header) {
    return;
  }

  const updateHeader = () => {
    const hasScrolled = window.scrollY > 40;

    header.classList.toggle("is-scrolled", hasScrolled);
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });
}

/* =========================================================
   SMOOTH INTERNAL NAVIGATION
   ========================================================= */

function initializeSmoothNavigation() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
}

/* =========================================================
   SECTION REVEAL ANIMATIONS
   ========================================================= */

function initializeSectionReveal() {
  const sections = document.querySelectorAll("main > section");

  if (!("IntersectionObserver" in window)) {
    sections.forEach((section) => {
      section.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  sections.forEach((section) => {
    section.classList.add("reveal-section");
    observer.observe(section);
  });
}

/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  updateFooterYear();
  initializeHeaderScroll();
  initializeSmoothNavigation();
  initializeSectionReveal();
});
