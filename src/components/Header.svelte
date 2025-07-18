<script is:inline>
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { onClickOutside } from "runed";
  let headerWrapper = null;

  onMount(() => {
    handleResize();
    setTheme(localStorage.theme);

    // set an event handler to call handleMenu(false) when the user clicks outside of the menu
    headerWrapper = document.querySelector("#header-wrapper");
    onClickOutside(
      () => headerWrapper,
      () => {
        if (showing) {
          handleMenu(false);
        }
      }
    );
    // set an event handler to call handleMenu(false) when the user presses the escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && showing) {
        handleMenu(false);
      }
    });
  });

  export let base = "";
  let lastScrollTop = 0; //last scroll position
  let hideNav = false;
  let showMenu = 0; //show menu icon on mobile
  let st = 0; //scroll position
  let showing = false; //showing menu

  function setTheme(theme) {
    if (theme) {
      localStorage.theme = theme;
    }

    theme = localStorage.theme;
    if (theme === "dark") {
      if (!document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
      }
    } else if (theme === "light") {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
      }
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }

  function toggleTheme() {
    setTheme(
      document.documentElement.classList.contains("dark") ? "light" : "dark"
    );
  }

  function handleScroll() {
    st = window.scrollY || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 400 && !showing) hideNav = true;
    else hideNav = false;
    lastScrollTop = st;
    handleMenu(false);

    if (st > 0) {
      document.querySelector("header").classList.remove("top-1", "rounded-2xl");
      document
        .querySelector("header")
        .classList.add("h-24", "pt-11", "-top-4", "shadow-2xl");
      document.querySelector("#header-wrapper").classList.remove("mx-4");
    } else {
      document
        .querySelector("header")
        .classList.remove("h-24", "pt-11", "-top-4", "shadow-2xl");
      document.querySelector("header").classList.add("top-1", "rounded-2xl");
      document.querySelector("#header-wrapper").classList.add("mx-4");
    }
  }

  function handleResize() {
    if (window.innerWidth < 640) showMenu = 2;
    else {
      showMenu = 1;
      handleMenu(false);
    }
  }

  function handleMenu(show = null) {
    let expandedHeight = "h-56";
    if (document.querySelector("header").classList.contains("-top-4"))
      expandedHeight = "h-64";
    if (show === null) {
      showing = !document
        .querySelector("header")
        .classList.contains(expandedHeight);
      document.querySelector("header").classList.toggle(expandedHeight);
    } else {
      showing = show;
      if (show) document.querySelector("header").classList.add(expandedHeight, "shadow-2xl");
      else {
        document.querySelector("header").classList.remove(expandedHeight);
        if (!hideNav) document.querySelector("header").classList.remove("shadow-2xl");
      }
    }
    if (showing) {
      document.querySelector("#nav-menu").classList.remove("opacity-0", "mt-0");
      document.querySelector("#nav-menu").classList.add("opacity-100", "mt-4");
    } else {
      document.querySelector("#nav-menu").classList.remove("opacity-100", "mt-4");
      document.querySelector("#nav-menu").classList.add("opacity-0", "mt-0");
    }
  }
</script>

<svelte:window on:scroll={handleScroll} on:resize={handleResize} />

<div
  id="header-wrapper"
  bind:this={headerWrapper}
  class="mx-4 sticky -top-2 z-[1000] h-28 transition-[transform, translate] transition-discrete duration-500 sm:duration-300"
>
  <header
    class:scrolled={hideNav}
    class="text-black dark:text-white top-1 h-16 overflow-hidden absolute w-full p-4 mb-5 ring-2 dark:ring-orange-200/50 ring-orange-950/50 bg-orange-100/60 dark:bg-stone-900/60 transition-[background-color, border-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, height] transition-discrete duration-500 sm:duration-300 rounded-2xl backdrop-blur-3xl"
  >
    <!-- logo, nav icon, theme-->
    <div class="grid grid-cols-[6fr_1fr_1fr] gap-x-4 mb-2">
      <a
        href={base + "/"}
        style="font-family: 'Rubik Mono One';"
        class="flex gap-4 font-black content-center header-name w-fit"
      >
        <img
          src={base + "/logo.ico"}
          class="h-8 w-8 mr-0.5 sm:mr-0 ring-2 dark:ring-orange-200/50 ring-orange-950/50 rounded-full"
          alt="logo"
        />
        FLUX
      </a>

      {#if showMenu !== 1}
        {#if showing}
          <nav
            class="w-max flex flex-wrap gap-4 space-x-4 pt-0.5"
            on:click={() => handleMenu(false)}
            on:keypress={() => handleMenu(false)}
          >
            <slot name="close" />
          </nav>
        {:else}
          <nav
            class="w-max flex flex-wrap gap-4 space-x-4 pt-0.5"
            on:click={() => handleMenu(true)}
            on:keypress={() => handleMenu(true)}
          >
            <slot name="menu" />
          </nav>
        {/if}
      {:else}
        <nav
          class="w-max flex flex-wrap gap-4 items-center justify-center space-x-4 pb-1"
        >
          <a href={base + "/about"} class="header-link font-normal">About</a>
          <a href={base + "/join"} class="header-link font-normal">Join</a>
          <a href={base + "/contact"} class="header-link font-normal">Contact</a
          >
        </nav>
      {/if}

      <button on:click={toggleTheme} title="Theme" class="pb-1">
        <slot name="theme" />
      </button>
    </div>
    <!-- mobile nav menu-->
    <div
      id="nav-menu"
      class="text-black dark:text-white opacity-0 border-t border-black dark:border-white mt-0 pt-7 flex flex-col gap-4 items-center justify-start w-full wrap-anywhere overflow-auto transition-[opacity, transition] transition-discrete duration-500 sm:duration-300"
    >
      <a href={base + "/about"} class="header-link font-normal" on:click={() => handleMenu(false)} on:keypress={() => handleMenu(false)}>About</a>
      <a href={base + "/join"} class="header-link font-normal" on:click={() => handleMenu(false)} on:keypress={() => handleMenu(false)}>Join</a>
      <a href={base + "/contact"} class="header-link font-normal" on:click={() => handleMenu(false)} on:keypress={() => handleMenu(false)}>Contact</a>
    </div>
  </header>
</div>

<style>
  .scrolled {
    transform: translate(0, calc(-100% - 1rem));
  }

  .header-name {
    font-family: Lato, sans-serif;
    font-size: 1.5em;
  }

  .header-link {
    font-family: Lato, sans-serif;
    font-size: 1em;
  }

  .header-link:hover {
    text-decoration: underline;
  }
</style>
