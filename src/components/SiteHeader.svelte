<svelte:options runes={true} />

<script lang="ts">
  import { cubicInOut, cubicOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";

  type NavItem = {
    href: string;
    label: string;
  };

  let {
    ctaHref,
    ctaLabel = "Get Involved",
    currentPath,
    items,
    label,
    shortName,
  } = $props<{
    ctaHref?: string;
    ctaLabel?: string;
    currentPath: string;
    items: ReadonlyArray<NavItem>;
    label: string;
    shortName: string;
  }>();

  let navElement = $state<HTMLElement | null>(null);
  let lastScrollTop = $state(0);
  let isAtTop = $state(true);
  let isCompact = $state(false);
  let isDarkMode = $state(false);
  let isHidden = $state(false);
  let isMenuOpen = $state(false);
  let suppressHideUntil = $state(0);

  let shellClass = $derived.by(() => {
    const spacing = isCompact ? "py-3" : "py-4";

    if (isAtTop) {
      if (isMenuOpen) {
        return `mt-0 w-full rounded-none border-x-0 border-t-0 border-b bg-[rgb(var(--surface-card)/0.84)] px-4 shadow-none backdrop-blur-2xl sm:px-6 lg:px-8 ${spacing}`;
      }

      return `mt-0 w-full rounded-none border-0 bg-[var(--surface-base)] px-4 shadow-none backdrop-blur-none sm:px-6 lg:px-8 ${spacing}`;
    }

    return `mt-4 w-[calc(min(100%-0.5rem,84rem))] rounded-[28px] border bg-[rgb(var(--surface-card)/0.84)] px-4 shadow-panel backdrop-blur-2xl sm:w-[calc(min(100%-1rem,84rem))] sm:px-5 lg:w-[calc(min(100%-1.5rem,84rem))] lg:px-6 ${spacing}`;
  });

  const logoSrc = "/logo.webp";

  let normalizedPath = $derived.by(() => {
    if (!currentPath || currentPath === "/") {
      return "/";
    }

    return currentPath.endsWith("/") ? currentPath.slice(0, -1) : currentPath;
  });

  function normalizeHref(href: string) {
    const [path] = href.split("#");

    if (!path || path === "/") {
      return "/";
    }

    return path.endsWith("/") ? path.slice(0, -1) : path;
  }

  function isActive(href: string) {
    if (href.includes("#")) {
      return false;
    }

    return normalizedPath === normalizeHref(href);
  }

  function setTheme(nextTheme: "dark" | "light") {
    isDarkMode = nextTheme === "dark";
    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle("dark", isDarkMode);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    themeColor?.setAttribute("content", isDarkMode ? "#151008" : "#f6eedb");
  }

  function toggleTheme() {
    setTheme(isDarkMode ? "light" : "dark");
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function suppressHide(duration = 1600) {
    suppressHideUntil = Date.now() + duration;
    isHidden = false;
  }

  function handleNavAction() {
    suppressHide();
    closeMenu();
  }

  onMount(() => {
    const storedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const preferredTheme =
      storedTheme ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    setTheme(preferredTheme);

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    const handleScroll = () => {
      const nextScrollTop = window.scrollY || document.documentElement.scrollTop;
      const hideSuppressed = Date.now() < suppressHideUntil;

      isAtTop = nextScrollTop < 8;
      isCompact = nextScrollTop > 20;

      if (nextScrollTop < 8) {
        isHidden = false;
      } else if (hideSuppressed || isMenuOpen) {
        isHidden = false;
      } else if (!isMenuOpen) {
        if (nextScrollTop > lastScrollTop && nextScrollTop > 120) {
          isHidden = true;
        } else if (nextScrollTop < lastScrollTop) {
          isHidden = false;
        }
      }

      lastScrollTop = Math.max(nextScrollTop, 0);
    };

    const handleClick = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        navElement &&
        event.target instanceof Node &&
        !navElement.contains(event.target)
      ) {
        closeMenu();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<header class={`fixed inset-x-0 top-0 z-50 flex justify-center will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isHidden ? "-translate-y-[calc(100%+1rem)]" : "translate-y-0"}`}>
  <div bind:this={navElement} class={`transition-[width,margin,border-radius,box-shadow,padding,background-color,backdrop-filter,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${shellClass}`}>
    <div class="flex h-11 items-center justify-between gap-4 md:grid md:h-auto md:min-h-[3.2rem] md:grid-cols-[auto_1fr_auto] md:items-center">
      <a class="flex h-11 min-w-0 items-center gap-3" href="/">
        <img alt={`${shortName} logo`} class="h-10 w-10 rounded-full border border-black/10 object-cover shadow-sm dark:border-white/10 sm:h-11 sm:w-11" src={logoSrc} />
        <div class="hidden min-w-0 flex-col justify-center self-center leading-[1.05] sm:flex">
          <p class="font-brand truncate text-[1.5rem] uppercase tracking-[0.18em] leading-none text-[var(--ink)]">
            {shortName}
          </p>
          <p class="truncate text-[0.68rem] font-semibold uppercase tracking-[0.24em] leading-none text-[var(--muted)]">
            {label}
          </p>
        </div>
        <span class="font-brand self-center text-[1.5rem] uppercase tracking-[0.18em] leading-none text-[var(--ink)] sm:hidden">
          {shortName}
        </span>
      </a>

      <nav class="hidden items-center justify-center gap-1 md:flex md:justify-self-center">
        {#each items as item}
          <a class={`rounded-full px-4 py-2 text-sm font-semibold transition ${isActive(item.href) ? "bg-amber-600 text-white shadow-lg shadow-amber-950/20" : "text-[var(--muted)] hover:bg-black/5 hover:text-amber-700 dark:hover:bg-white/5 dark:hover:text-amber-200"}`} href={item.href} onclick={handleNavAction}>
            {item.label}
          </a>
        {/each}
      </nav>

      <div class="flex h-11 shrink-0 items-center gap-2 md:justify-self-end">
        {#if ctaHref}
          <a class="hidden h-11 items-center justify-center rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold leading-none text-white transition hover:bg-amber-500 md:inline-flex" href={ctaHref} onclick={() => suppressHide()}>
            {ctaLabel}
          </a>
        {/if}

        <button aria-label="Toggle theme" class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-white/60 leading-none text-[var(--ink)] transition hover:border-amber-500/40 hover:text-amber-700 dark:bg-black/20 dark:hover:text-amber-200" onclick={toggleTheme} type="button">
          {#if isDarkMode}
            <svg aria-hidden="true" class="block h-5 w-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3c0 4.97 4.03 9 9 9Z"></path>
            </svg>
          {:else}
            <svg aria-hidden="true" class="block h-5 w-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </svg>
          {/if}
        </button>

        <button aria-expanded={isMenuOpen} aria-label="Toggle navigation menu" class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-white/60 leading-none text-[var(--ink)] transition hover:border-amber-500/40 hover:text-amber-700 dark:bg-black/20 dark:hover:text-amber-200 md:hidden" onclick={() => (isMenuOpen = !isMenuOpen)} type="button">
          {#if isMenuOpen}
            <svg aria-hidden="true" class="block h-5 w-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          {:else}
            <svg aria-hidden="true" class="block h-5 w-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" viewBox="0 0 24 24">
              <path d="M4 12h16"></path>
              <path d="M4 6h16"></path>
              <path d="M4 18h16"></path>
            </svg>
          {/if}
        </button>
      </div>
    </div>

    {#if isMenuOpen}
      <div class="mt-4 overflow-hidden md:hidden" in:slide={{ duration: 220, easing: cubicOut }} out:slide={{ duration: 180, easing: cubicInOut }}>
        <nav class="border-t border-[var(--line)] pt-4">
          <div class="flex flex-col gap-2">
            {#if ctaHref}
              <a class="mb-2 inline-flex items-center justify-center rounded-2xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-500" href={ctaHref} onclick={handleNavAction}>
                {ctaLabel}
              </a>
            {/if}

            {#each items as item}
              <a class={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive(item.href) ? "bg-amber-600 text-white" : "text-[var(--muted)] hover:bg-black/5 hover:text-amber-700 dark:hover:bg-white/5 dark:hover:text-amber-200"}`} href={item.href} onclick={handleNavAction}>
                {item.label}
              </a>
            {/each}
          </div>
        </nav>
      </div>
    {/if}
  </div>
</header>