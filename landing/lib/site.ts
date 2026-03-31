export const siteConfig = {
  name: "ARC",
  title: "ARC | Break your bad habit. Put your money where your mouth is.",
  description:
    "ARC is a premium commitment app for people who are done pretending. Choose your habit, choose your mode, and make failure cost something.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "chatgpt2792025@gmail.com",
};

export const habits = [
  "Vaping",
  "Porn",
  "Drinking",
  "Skipping the gym",
  "Doomscrolling",
];

export const privacyModes = [
  {
    label: "Private",
    description: "Your goal stays with you.",
    detail:
      "Ideal for sensitive habits, lower-friction starts, and anyone who wants consequences without exposure.",
  },
  {
    label: "Friends Only",
    description: "Accountability without public exposure.",
    detail:
      "Keep the goal private from the public while letting a trusted circle add pressure when willpower slips.",
  },
  {
    label: "Global",
    description: "Public pressure for serious commitment.",
    detail:
      "For users who want status, shame, and spectacle to make failure feel expensive before the money even moves.",
  },
];

export const commitmentLengths = [
  {
    label: "30 Days",
    description: "Fast reset. Lower-friction start.",
    detail:
      "Built for people who want a clean, immediate reset without committing to a full lifestyle rewrite on day one.",
  },
  {
    label: "1 Year",
    description: "Long horizon. Serious quitters only.",
    detail:
      "For higher-stakes habits and users who want the commitment to feel heavy enough that backing out is embarrassing.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Pick the habit",
    body: "Choose the thing that keeps beating you: vaping, porn, drinking, skipping workouts, endless scrolling, etc.",
  },
  {
    step: "02",
    title: "Choose your mode",
    body: "Keep it private, lock in a friends-only circle, or, preferably, make the commitment public when shame works better than willpower.",
  },
  {
    step: "03",
    title: "Consequence when you fail",
    body: "ARC turns relapse into a consequence instead of another promise. Social if you want. Private if you need. Serious when you break.",
  },
];

export const leaderboardRows = [
  { name: "M. Chen", habit: "Vaping", lost: "$143" },
  { name: "J. Park", habit: "Drinking", lost: "$87" },
  { name: "D. Lewis", habit: "Doomscrolling", lost: "$34" },
];

export const landingFaqs = [
  {
    question: "How does ARC work?",
    answer:
      "You pick a habit, choose a commitment length, and use consequences instead of vague intention to stay clean. Every time you break your streak, you enter $1. Honor code. The money isn't the point. The ownership is.",
  },
  {
    question: "Do I have to make my goal public?",
    answer:
      "No. ARC is built around Private, Friends Only, and Global modes so you can choose the amount of pressure you actually want.",
  },
  {
    question: "What kinds of habits can I use ARC for?",
    answer:
      "Whatever you want. You write the habit you're trying to break. Then you break it. It's that simple.",
  },
  {
    question: "What happens when I fail?",
    answer:
      "You admit it, you log the dollar, and you start again. That's it. No lecture, no reset screen, no motivation quote. You own your outcome.",
  },
  {
    question: "Is this available yet?",
    answer:
      "ARC is opening early access now. Enter your email to join the founding cohort and get first access when the app goes live in the coming weeks.",
  },
  {
    question: "Where does the money go?",
    answer:
      "After basic costs to support ARC, a portion of proceeds go toward Hazelden Betty Ford Foundation to help addiction survivors.",
  },
];

export const learnFaqs = [
  ...landingFaqs,
  {
    question: "What happens if I never fail?",
    answer:
      "Then ARC did its job. The point is to make the downside feel real enough that you do not want to trigger it in the first place.",
  },
  {
    question: "Is ARC for one habit at a time?",
    answer: "Yes.",
  },
  {
    question: "Can I switch commitment lengths?",
    answer:
      "Yes. You can give up on a goal and set a different one with new settings. If you want.",
  },
  {
    question: "Is this honor-code based?",
    answer:
      "Yes. There is no app that does the hard work for you. You own your outcome. ARC just helps keep you accountable, with notifications and consequences.",
  },
];

export const legalNav = [
  { href: "/learn", label: "Learn More" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];
