<svelte:options runes={true} />

<script lang="ts">
  let {
    publicKey,
    serviceId,
    templateId,
    successMessage = "Message sent. FLUX will be in touch soon.",
    errorMessage = "The message could not be sent. Please try again in a moment.",
    sendingMessage = "Sending your message...",
    messagePlaceholder = "Tell FLUX how we can help...",
    namePlaceholder = "Azer Baijan",
  } = $props<{
    publicKey: string;
    serviceId: string;
    templateId: string;
    successMessage?: string;
    errorMessage?: string;
    sendingMessage?: string;
    messagePlaceholder?: string;
    namePlaceholder?: string;
  }>();

  let fromName = $state("");
  let replyTo = $state("");
  let message = $state("");

  let nameError = $state("");
  let emailError = $state("");
  let messageError = $state("");
  let submitState = $state<"error" | "idle" | "sending" | "success">("idle");
  let submitMessage = $state("");

  function resetErrors() {
    nameError = "";
    emailError = "";
    messageError = "";
  }

  function validate() {
    resetErrors();

    if (!fromName.trim()) {
      nameError = "Please share your name.";
    }

    if (!replyTo.trim()) {
      emailError = "Please share your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(replyTo.trim())) {
      emailError = "Please use a valid email address.";
    }

    if (!message.trim()) {
      messageError = "Please include a message.";
    } else if (message.trim().length < 10) {
      messageError = "Please provide at least 10 characters of context.";
    }

    return !nameError && !emailError && !messageError;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (!validate()) {
      submitState = "error";
      submitMessage = "Please correct the highlighted fields and try again.";
      return;
    }

    submitState = "sending";
    submitMessage = sendingMessage;

    try {
      const emailjs = await import("@emailjs/browser").then((module) => module.default);

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fromName.trim(),
          message: message.trim(),
          reply_to: replyTo.trim(),
        },
        {
          publicKey,
        }
      );

      submitState = "success";
      submitMessage = successMessage;
      fromName = "";
      replyTo = "";
      message = "";
      resetErrors();
    } catch {
      submitState = "error";
      submitMessage = errorMessage;
    }
  }
</script>

<form class="rounded-[2rem] border border-[var(--line)] bg-[rgb(var(--surface-card)/0.82)] p-6 shadow-panel backdrop-blur-xs sm:p-8" onsubmit={handleSubmit}>
  <div class="space-y-6">
    <div>
      <label class="mb-2 block text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]" for="from_name">
        Your Name
      </label>
      <input
        aria-invalid={nameError ? "true" : "false"}
        bind:value={fromName}
        autocomplete="name"
        class="w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-base text-slate-900 outline-hidden transition-shadow duration-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 dark:bg-black/20 dark:text-slate-50"
        id="from_name"
        name="from_name"
        oninput={() => (nameError = "")}
        placeholder={namePlaceholder}
        type="text"
      />
      {#if nameError}
        <p class="mt-2 text-sm text-red-700 dark:text-red-300">{nameError}</p>
      {/if}
    </div>

    <div>
      <label class="mb-2 block text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]" for="reply_to">
        Email
      </label>
      <input
        aria-invalid={emailError ? "true" : "false"}
        bind:value={replyTo}
        autocomplete="email"
        class="w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-base text-slate-900 outline-hidden transition-shadow duration-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 dark:bg-black/20 dark:text-slate-50"
        id="reply_to"
        inputmode="email"
        name="reply_to"
        oninput={() => (emailError = "")}
        placeholder="v@lid.email"
        type="email"
      />
      {#if emailError}
        <p class="mt-2 text-sm text-red-700 dark:text-red-300">{emailError}</p>
      {/if}
    </div>

    <div>
      <label class="mb-2 block text-sm font-semibold uppercase tracking-[0.28em] text-[var(--muted)]" for="message">
        Message
      </label>
      <textarea
        aria-invalid={messageError ? "true" : "false"}
        bind:value={message}
        class="min-h-40 w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-base text-slate-900 outline-hidden transition-shadow duration-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15 dark:bg-black/20 dark:text-slate-50"
        id="message"
        name="message"
        oninput={() => (messageError = "")}
        placeholder={messagePlaceholder}
      ></textarea>
      {#if messageError}
        <p class="mt-2 text-sm text-red-700 dark:text-red-300">{messageError}</p>
      {/if}
    </div>

    {#if submitMessage}
      <div aria-live="polite" class={`rounded-2xl px-4 py-3 text-sm font-medium ${submitState === "success" ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200" : submitState === "error" ? "bg-red-500/15 text-red-800 dark:text-red-200" : "bg-amber-500/15 text-amber-800 dark:text-amber-200"}`}>
        {submitMessage}
      </div>
    {/if}

    <button class="inline-flex w-full items-center justify-center rounded-full bg-amber-700 px-5 py-3 text-base font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-amber-800 disabled:cursor-not-allowed disabled:bg-amber-900/60" disabled={submitState === "sending"} type="submit">
      {submitState === "sending" ? "Sending..." : "Send Message"}
    </button>
  </div>
</form>