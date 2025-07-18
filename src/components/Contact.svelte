<script>
  export let base = "";
  import emailjs from "@emailjs/browser";
  import Icon from "@iconify/svelte";

  const sendEmail = (e) => {
    if (
      e.target.from_name.value === "" ||
      e.target.reply_to.value === "" ||
      e.target.message.value === ""
    ) {
      alert("All fields are required");
      return;
    }

    const email = e.target.reply_to.value;
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      alert("Invalid email");
      return;
    }

    if (e.target.message.value.length < 10) {
      alert("Message must be at least 10 characters");
      return;
    }

    emailjs
      .sendForm("default_service", "template_q6eacvl", e, {
        publicKey: "mBmfip1GWcajmtanJ",
      })
      .then((result) => {
        alert("Message sent");
      })
      .catch((error) => {
        alert("Message failed to send");
      });
  };
</script>

<div>
  <div>
    <h1 class="pt-4 text-3xl lg:text-5xl font-bold mb-10 sm:mb-16 text-center">
      Contact Us
    </h1>
    <div id="contact" class="flex flex-col items-center pb-3">
      <form class="w-full max-w-lg" on:submit|preventDefault={sendEmail}>
        <div class="flex flex-wrap -mx-3 mb-3 md:mb-2">
          <div class="w-full md:w-1/2 px-3">
            <label
              for="from_name"
              class="block uppercase tracking-wide text-xs font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="from_name"
              id="from_name"
              class="appearance-none block w-full text-stone-900 bg-gray-200 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Azer Baijan"
            />
          </div>
          <div class="w-full md:w-1/2 px-3">
            <label
              for="reply_to"
              class="block uppercase tracking-wide text-xs font-bold mb-2"
            >
              Email
            </label>
            <input
              name="reply_to"
              id="reply_to"
              type="email"
              class="appearance-none block w-full text-stone-900 bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="v@lid.email"
            />
          </div>
        </div>
        <div class="w-full mb-8 sm:mb-6">
          <label
            for="message"
            class="block uppercase tracking-wide text-xs font-bold mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            class="appearance-none block w-full text-stone-900 bg-gray-200 border border-gray-200 rounded py-3 px-4 md:mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            placeholder="At least 10 characters..."
          ></textarea>
        </div>
        <div class="flex items-center justify-around">
          <input
            type="submit"
            class="w-full text-white text-2xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-black rounded-2xl p-5 text-center md:mt-3 mb-2"
            value="Submit"
          />
        </div>
      </form>
    </div>
  </div>
  <div class="mx-4 sm:mx-0 my-4 flex flex-col sm:flex-row gap-4 justify-center">
    <div class="ring-2 ring-blue-500/50 rounded-2xl p-4 text-center">
      <h1 class="text-2xl font-bold">Who We Are</h1>
      <h2 class="text-xl">Our mission and vision</h2>
      <a href={base + "/about"}>
        <button
          type="button"
          class="w-full text-white text-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-black rounded-2xl p-5 text-center mt-5 mb-2"
        >
          <Icon icon="ic:round-people-alt" class="w-8 h-8 inline mb-0.5" />
          Learn More
        </button>
      </a>
    </div>
    <div class="ring-2 ring-green-500/50 rounded-2xl p-4 text-center">
      <h1 class="text-2xl font-bold">Grow With Us</h1>
      <h2 class="text-xl">As a mentor or mentee</h2>
      <a href={base + "/join"}>
        <button
          type="button"
          class="w-full text-white text-2xl bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-black rounded-2xl p-5 text-center mt-5 mb-2"
        >
          <Icon icon="ic:round-group-add" class="w-8 h-8 inline mb-0.5" />
          Get Involved
        </button>
      </a>
    </div>
  </div>
</div>

<style>
  #contact {
    margin: 0 0 auto 0;
  }

  @media (max-width: 640px) {
    #contact {
      margin: 0 5vw auto 5vw;
    }
  }
</style>
