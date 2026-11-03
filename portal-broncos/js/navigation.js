/* =========================================================
   DENVER BRONCOS BRAZIL
   NAVIGATION JAVASCRIPT
   ========================================================= */

/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initializeMobileNavigation() {
  const menuToggle = document.querySelector("#menu-toggle");
  const mainNavigation = document.querySelector("#main-navigation");

  if (!menuToggle || !mainNavigation) {
    return;
  }

  const navigationLinks = mainNavigation.querySelectorAll("a");

  /* Open and close the mobile menu */

  function toggleNavigation(forceClose = false) {
    const isCurrentlyOpen = mainNavigation.classList.contains("is-open");

    const shouldOpen = forceClose ? false : !isCurrentlyOpen;

    mainNavigation.classList.toggle("is-open", shouldOpen);
    menuToggle.classList.toggle("is-active", shouldOpen);

    menuToggle.setAttribute("aria-expanded", String(shouldOpen));

    menuToggle.setAttribute(
      "aria-label",
      shouldOpen ? "Fechar menu" : "Abrir menu",
    );
  }

  /* Menu button */

  menuToggle.addEventListener("click", () => {
    toggleNavigation();
  });

  /* Close menu after selecting a navigation link */

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleNavigation(true);
    });
  });

  /* Close menu when clicking outside */

  document.addEventListener("click", (event) => {
    const clickedInsideNavigation = mainNavigation.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNavigation && !clickedToggle) {
      toggleNavigation(true);
    }
  });

  /* Close menu with Escape */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    const isOpen = mainNavigation.classList.contains("is-open");

    if (isOpen) {
      toggleNavigation(true);
      menuToggle.focus();
    }
  });

  /* Close menu when returning to desktop layout */

  const desktopBreakpoint = window.matchMedia("(min-width: 851px)");

  desktopBreakpoint.addEventListener("change", (event) => {
    if (event.matches) {
      toggleNavigation(true);
    }
  });

  /* Initial accessibility state */

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

/* =========================================================
   ACTIVE NAVIGATION LINK
   ========================================================= */

function initializeActiveNavigation() {
  const navigationLinks = document.querySelectorAll(
    ".navigation-list a[href^='#']",
  );

  const sections = Array.from(navigationLinks)
    .map((link) => {
      const targetId = link.getAttribute("href");

      return document.querySelector(targetId);
    })
    .filter(Boolean);

  if (!sections.length || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => {
          return second.intersectionRatio - first.intersectionRatio;
        });

      if (!visibleSections.length) {
        return;
      }

      const activeSectionId = visibleSections[0].target.id;

      navigationLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeSectionId}`;

        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px",
      threshold: [0, 0.2, 0.4, 0.6],
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeMobileNavigation();
  initializeActiveNavigation();
});
