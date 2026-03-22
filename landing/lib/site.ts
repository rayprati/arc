export const siteConfig = {
  name: "Arc",
  title: "Arc | Break your bad habit. Put your money where your mouth is.",
  description:
    "Arc is a premium commitment app for people who are done pretending. Choose your habit, choose your mode, and make failure cost something.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "legal@arc-app.com",
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
    body: "Choose the thing that keeps beating you: vaping, porn, drinking, skipping workouts, or endless scrolling.",
  },
  {
    step: "02",
    title: "Choose your mode",
    body: "Keep it private, lock in a friends-only circle, or make the commitment public when shame works better than privacy.",
  },
  {
    step: "03",
    title: "Pay when you fail",
    body: "Arc turns relapse into a consequence instead of another promise. Private if you want. Social if you need. Expensive when you break.",
  },
];

export const leaderboardRows = [
  { name: "M. Chen", habit: "Vaping", streak: "42d" },
  { name: "J. Park", habit: "Drinking", streak: "19d" },
  { name: "D. Lewis", habit: "Doomscrolling", streak: "12d" },
];

export const landingFaqs = [
  {
    question: "How does Arc work?",
    answer:
      "You pick a habit, choose a commitment length, choose how public it is, and use consequences instead of vague intention to stay clean.",
  },
  {
    question: "Do I have to make my goal public?",
    answer:
      "No. Arc is built around Private, Friends Only, and Global modes so you can choose the amount of pressure you actually want.",
  },
  {
    question: "What kinds of habits can I use Arc for?",
    answer:
      "The first release is designed for clear, high-emotion habits such as vaping, porn, drinking, junk food, skipping workouts, and doomscrolling.",
  },
  {
    question: "What happens when I fail?",
    answer:
      "The commitment is supposed to cost something. Arc is testing money-based consequences because soft utilities rarely change behavior on their own.",
  },
  {
    question: "Is this available yet?",
    answer:
      "Arc is opening early access now. Enter your email to join the founding cohort and get first access when the commitment flow goes live.",
  },
];

export const learnFaqs = [
  ...landingFaqs,
  {
    question: "What happens if I never fail?",
    answer:
      "Then Arc did its job. The point is to make the downside feel real enough that you do not want to trigger it in the first place.",
  },
  {
    question: "How does the $1 pre-commit work?",
    answer:
      "It is a lightweight seriousness check for early access. If the payment flow is active, the pre-commit button will route you there. If not, Arc still records your intent.",
  },
  {
    question: "Is Arc for one habit at a time?",
    answer:
      "The concept is strongest when one commitment stays unambiguous. The early product direction is one habit commitment at a time.",
  },
  {
    question: "Can I switch commitment lengths?",
    answer:
      "The product direction treats the length as part of the seriousness of the promise, so switches are likely to be limited and intentional.",
  },
  {
    question: "Is this honor-code based?",
    answer:
      "For the validation phase, yes. Arc is testing desire for the mechanism first. Perfect enforcement is not required to learn whether the market wants stronger consequences.",
  },
];

export const legalNav = [
  { href: "/learn", label: "Learn More" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];
