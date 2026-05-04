export const organization = {
  name: "Fireborne Leaders United for eXcellence",
  shortName: "FLUX",
  sublabel: "Azerbaijani mentorship collective",
  description:
    "FLUX is a mentorship initiative that helps Azerbaijani students navigate study-abroad decisions, career questions, and community building with guidance from people who have already done it.",
  tagline: "Guiding each other, growing together, building Azerbaijan's future.",
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/join", label: "Join" },
    { href: "/contact", label: "Contact" },
  ],
  hero: {
    eyebrow: "Fireborne Leaders United for eXcellence",
    title: "FLUX",
    intro:
      "FLUX connects Azerbaijani students with mentors who understand the real demands of applications, adaptation, and long-term professional growth. The goal is practical guidance, honest perspective, and a stronger pipeline of people who can give back.",
    image: "/arch.webp",
  },
  stats: [
    { label: "Mentorship model", value: "1:1" },
    { label: "Perspective", value: "Global" },
    { label: "Focus", value: "Azeri youth" },
  ],
  highlights: [
    {
      title: "Mentor with context",
      description:
        "Students hear from Azerbaijanis who have already navigated admissions, relocation, and academic life abroad.",
      href: "/join",
      label: "Become a mentor",
      icon: "ic:round-school",
      tone: "amber",
    },
    {
      title: "Prepare with clarity",
      description:
        "FLUX helps students replace vague advice with practical next steps on applications, field choices, and long-term planning.",
      href: "/about",
      label: "Read the mission",
      icon: "ic:round-insights",
      tone: "rose",
    },
    {
      title: "Build the network",
      description:
        "The community grows when mentors, mentees, and collaborators keep knowledge circulating instead of letting it stay private.",
      href: "/contact",
      label: "Start a conversation",
      icon: "ic:round-chat-bubble",
      tone: "emerald",
    },
  ],
  about: {
    mission:
      "FLUX exists to guide Azerbaijani youth toward world-class education and meaningful careers through mentorship, shared experience, and community.",
    vision:
      "The long-term aim is an Azerbaijan where students with global experience stay connected to one another and use that experience to strengthen the country.",
    story: [
      "FLUX started from a simple observation: Azerbaijani students often have the ambition to study abroad, but not always the access to grounded, credible guidance from people who have recently taken that path themselves.",
      "That gap shows up everywhere. Applications feel opaque, relocation feels overwhelming, and high-cost programs can promise certainty without understanding the student's actual goals. FLUX was built to counter that with direct mentorship and a culture of sharing what works.",
      "The larger point is not only getting into a program. It is building a durable network of Azerbaijanis who can support one another across disciplines, help the next cohort move faster, and turn education into long-term contribution.",
    ],
  },
  join: {
    intro:
      "FLUX grows when experience is passed forward deliberately. Mentors, mentees, and collaborators each strengthen the network in different ways.",
    mentorTitle: "Become a mentor",
    mentorBody:
      "If you are Azerbaijani and studying abroad, or have already completed your studies, FLUX welcomes mentors who can share honest advice, join community programming, and help students make sharper decisions.",
    menteeTitle: "Become a mentee",
    menteeBody:
      "Students who want guidance on studying abroad, choosing a path, or understanding life in a new academic environment can reach out directly and start the conversation.",
    communityTitle: "Strengthen the community",
    communityBody:
      "FLUX also benefits from volunteers, speakers, and collaborators who can contribute workshops, resources, or operational support.",
    primaryCta: { href: "/contact", label: "Reach out to FLUX" },
    secondaryCta: { href: "/about", label: "See the full story" },
  },
  contact: {
    title: "Start a conversation",
    intro:
      "Use the form to ask about mentorship, volunteering, partnerships, or student support. A short, concrete message makes follow-up faster.",
    serviceId: "default_service",
    templateId: "template_q6eacvl",
    publicKey: "mBmfip1GWcajmtanJ",
    prompts: [
      {
        title: "Say who you are",
        detail:
          "Let FLUX know whether you are a student, mentor, collaborator, or supporter so the message goes to the right person quickly.",
      },
      {
        title: "Name the kind of help you need",
        detail:
          "Application guidance, career perspective, community involvement, and partnerships usually need different follow-up.",
      },
      {
        title: "Add useful context",
        detail:
          "A few details about your field, timeline, or question will make the first response much more specific.",
      },
    ],
  },
  footer: {
    creditLabel: "Site by",
    creditHref: "https://github.com/ipitio",
    creditText: "ipitio",
  },
} as const;

export type NavigationItem = (typeof organization.navigation)[number];