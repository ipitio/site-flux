(() => {
  const HEADER_SELECTOR = "[data-site-header]";
  const HIDE_SCROLL_TOP = 120;
  const REVEAL_SCROLL_DISTANCE = 72;

  const normalizePath = (path) => {
    if (!path || path === "/") {
      return "/";
    }

    return path.endsWith("/") ? path.slice(0, -1) : path;
  };

  const syncThemeIcons = (header) => {
    const isDarkMode = document.documentElement.classList.contains("dark");

    header
      .querySelectorAll("[data-theme-icon='dark']")
      .forEach((icon) => icon.classList.toggle("hidden", !isDarkMode));
    header
      .querySelectorAll("[data-theme-icon='light']")
      .forEach((icon) => icon.classList.toggle("hidden", isDarkMode));
  };

  const syncActiveLinks = (header) => {
    const currentPath = normalizePath(window.location.pathname);

    header.querySelectorAll("[data-nav-link]").forEach((link) => {
      const href = link.getAttribute("href") || "";
      const isActive = !href.includes("#") && normalizePath(new URL(href, window.location.origin).pathname) === currentPath;

      if (isActive) {
        link.setAttribute("aria-current", "page");
        link.setAttribute("data-active", "true");
      } else {
        link.removeAttribute("aria-current");
        link.removeAttribute("data-active");
      }
    });
  };

  const initHeader = () => {
    const header = document.querySelector(HEADER_SELECTOR);

    if (!header) {
      return;
    }

    syncThemeIcons(header);
    syncActiveLinks(header);

    const menu = header.querySelector("[data-mobile-menu]");

    if (menu) {
      menu.hidden = false;
    }

    if (header.dataset.bound === "true") {
      return;
    }

    header.dataset.bound = "true";

    const frame = header.querySelector("[data-site-header-frame]") || header;
    const menuToggle = header.querySelector("[data-menu-toggle]");
    const themeToggle = header.querySelector("[data-theme-toggle]");
    const openIcon = header.querySelector("[data-menu-icon='open']");
    const closedIcon = header.querySelector("[data-menu-icon='closed']");

    let isMenuOpen = false;
    let lastScrollTop = 0;
    let suppressHideUntil = 0;
    let isHeaderHidden = false;
    let hiddenScrollAnchor = 0;

    const setMenuState = (nextValue) => {
      isMenuOpen = nextValue;
      header.classList.toggle("is-menu-open", isMenuOpen);

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", String(isMenuOpen));
      }

      openIcon?.classList.toggle("hidden", !isMenuOpen);
      closedIcon?.classList.toggle("hidden", isMenuOpen);
      updateScrollState();
    };

    const suppressHide = (duration = 1600) => {
      suppressHideUntil = Date.now() + duration;
      header.classList.remove("is-hidden");
    };

    const updateScrollState = () => {
      const nextScrollTop = Math.max(window.scrollY || document.documentElement.scrollTop, 0);
      const isAtTop = nextScrollTop < 8;
      const isCompact = nextScrollTop > 20;
      const hideSuppressed = Date.now() < suppressHideUntil;
      const isScrollingDown = nextScrollTop > lastScrollTop;
      const isScrollingUp = nextScrollTop < lastScrollTop;

      if (isAtTop || hideSuppressed || isMenuOpen) {
        isHeaderHidden = false;
        hiddenScrollAnchor = nextScrollTop;
      } else if (isScrollingDown && nextScrollTop > HIDE_SCROLL_TOP) {
        isHeaderHidden = true;
        hiddenScrollAnchor = nextScrollTop;
      } else if (isHeaderHidden) {
        if (isScrollingUp && hiddenScrollAnchor - nextScrollTop >= REVEAL_SCROLL_DISTANCE) {
          isHeaderHidden = false;
          hiddenScrollAnchor = nextScrollTop;
        } else if (!isScrollingUp) {
          hiddenScrollAnchor = Math.max(hiddenScrollAnchor, nextScrollTop);
        }
      } else {
        hiddenScrollAnchor = nextScrollTop;
      }

      header.classList.toggle("is-at-top", isAtTop);
      header.classList.toggle("is-compact", isCompact);
      header.classList.toggle("is-hidden", isHeaderHidden);
      lastScrollTop = nextScrollTop;
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuState(false);
      }
    };

    const handleHeaderClick = (event) => {
      const target = event.target instanceof Element ? event.target.closest("a, button") : null;

      if (!target) {
        return;
      }

      if (target === menuToggle) {
        event.preventDefault();
        event.stopPropagation();
        suppressHide();
        setMenuState(!isMenuOpen);
        return;
      }

      if (target === themeToggle) {
        event.preventDefault();
        const nextTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";

        if (typeof window.__setSiteTheme === "function") {
          window.__setSiteTheme(nextTheme);
        } else {
          localStorage.setItem("theme", nextTheme);
          document.documentElement.classList.toggle("dark", nextTheme === "dark");
        }

        syncThemeIcons(header);
        return;
      }

      if (target.tagName === "A") {
        suppressHide();

        if (isMenuOpen) {
          setMenuState(false);
        }
      }
    };

    const handleDocumentClick = (event) => {
      if (
        isMenuOpen &&
        event.target instanceof Node &&
        !frame.contains(event.target)
      ) {
        setMenuState(false);
      }
    };

    const handleKeydown = (event) => {
      if (event.key === "Escape") {
        setMenuState(false);
      }
    };

    const handlePageChange = () => {
      syncActiveLinks(header);
      syncThemeIcons(header);
      updateScrollState();
    };

    handleResize();
    updateScrollState();

    header.addEventListener("click", handleHeaderClick);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", updateScrollState, { passive: true });
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("astro:after-swap", handlePageChange);
    document.addEventListener("astro:page-load", handlePageChange);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeader, { once: true });
  } else {
    initHeader();
  }

  document.addEventListener("astro:after-swap", initHeader);
  document.addEventListener("astro:page-load", initHeader);
})();