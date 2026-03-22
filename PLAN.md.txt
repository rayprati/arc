# PRODUCT_DESIGN_PLAN.md

# Arc — Cursor Build Plan

## Purpose

This document is the execution spec for Cursor. The goal is to build the landing funnel and supporting pages for the first Arc validation test.

This is not a full product app build.
This is a premium conversion funnel.

Build for speed, polish, and trackability.

---

## Primary objective

Create a high-end landing page and supporting funnel that sells the concept:

**Break your bad habit. Put your money where your mouth is.**

Primary CTA:
**Start Your Arc**

CTA flow:
Landing page -> minimalist email capture page -> success modal:
**Email received. Pre-commit $1. Money returned if not spent.**

---

## Core deliverables

Cursor should build:

1. Landing page
2. Email capture page
3. Detail / Learn More page
4. Terms page
5. Privacy Policy page
6. Shared components / styles
7. Analytics events
8. Form handling
9. Success modal
10. Mobile-first responsive behavior

---

## Stack direction

Preferred implementation approach:
- Framer-ready or Framer-inspired design system
- exportable / portable front-end structure
- premium landing page quality
- animation-ready
- easy to wire to form backend and analytics

If coding directly:
- Next.js or static React acceptable
- Tailwind acceptable
- Motion library acceptable
- Keep dependencies light
- Prioritize performance and visual discipline

If producing assets:
- structure code so that Rive or similar hero animation can be dropped in
- allow phone mockup / UI animation section

---

## Brand and concept

### Brand name
Arc

### Product category
Consumer accountability / commitment app

### One-line pitch
Break your bad habit. Put your money where your mouth is.

### Key modes to visually communicate
- Private
- Friends Only
- Global

### Key durations to visually communicate
- 30 Days
- 1 Year

---

## Design system direction

### Overall aesthetic
- ultra-premium
- dark mode
- sleek, modern, expensive
- minimalist
- animated but controlled
- consumer-grade, high-trust, high-beauty

### Visual references in spirit
- premium fintech / elite wellness / modern consumer subscription products
- clean black glass
- polished, high-contrast typography
- subtle glow, not neon chaos
- motion that feels engineered, not decorative

### Avoid
- feature clutter
- startup gradient vomit
- cheap 3D overload
- gamified cartoon UI
- corporate SaaS blocks
- generic productivity dashboard look
- loud wellness aesthetic

### Suggested design tokens
- background: near-black / charcoal
- surface: dark elevated cards
- accent: one single disciplined accent color
- text: high contrast white / soft gray hierarchy
- border: subtle translucent lines
- radius: modern but not toyish
- shadows: soft, layered, restrained

### Motion guidelines
- text reveal on hero load
- subtle counter animation
- cards fade / slide in
- chips / toggles animate softly
- phone mockup float or parallax
- no jarring bounce
- no circus scroll hijack

---

## Information architecture

### Pages
1. `/` — landing page
2. `/start` — email capture page
3. `/learn` — detail / explanation page
4. `/terms` — terms and conditions
5. `/privacy` — privacy policy

Optional:
6. `/thanks` only if needed, but modal flow preferred
7. `/not-found`

---

## Landing page structure

### Section 1 — Hero
Purpose:
Immediate clarity and premium visual impression.

Required elements:
- brand mark / simple wordmark: Arc
- small nav with:
  - Learn More
  - Terms
  - Privacy
- hero headline
- hero subhead
- primary CTA button: Start Your Arc
- secondary text link: Learn more
- premium animated product visual / phone mockup
- trust / framing line

### Recommended hero copy
Headline:
**Break your bad habit. Put your money where your mouth is.**

Subhead:
**A commitment app for people who are done pretending. Choose your habit, choose your mode, and make failure cost something.**

CTA:
**Start Your Arc**

Secondary link:
**Learn more**

Trust line options:
- Private, friends-only, or public
- 30-day and 1-year commitments
- Early access now open


### Hero visual requirements
Show a polished fake UI artifact that includes:
- habit title
- streak counter
- money lost or money at risk
- privacy mode chips
- duration toggle
- leaderboard glimpse
- premium mobile framing

This can be static with motion overlays or partially animated.

---

### Section 2 — How it works
Purpose:
Explain the mechanic in 3 clean steps.

Suggested structure:
1. Pick the habit
2. Choose your mode
3. Pay when you fail

Optional short copy:
**Private if you want. Social if you need. Expensive when you break.**

Use icons or elegant micro-cards.

---

### Section 3 — Privacy modes
Purpose:
Make the concept feel real and broaden appeal.

Three cards:
- Private
- Friends Only
- Global

Each card should have:
- label
- one sentence
- tiny visual state

Example microcopy:
- **Private** — Your goal stays with you.
- **Friends Only** — Accountability without public exposure.
- **Global** — Public pressure for serious commitment.

---

### Section 4 — Commitment lengths
Purpose:
Show 30-day vs 1-year structure.

Two elegant panels or a segmented control:
- 30 Days
- 1 Year

Microcopy:
- **30 Days** — Fast reset. Lower-friction start.
- **1 Year** — Long horizon. Serious quitters only.

---

### Section 5 — Product proof / lifestyle framing
Purpose:
Create emotional pull and visual credibility.

Could include:
- money lost ticker example
- streak example
- public leaderboard example
- “quit with friends” visual
- short copy about financial pain + identity

This section should stay visual, not verbose.

---

### Section 6 — FAQ preview
Purpose:
Reduce confusion before click.

Questions:
- How does Arc work?
- Do I have to make my goal public?
- What kinds of habits can I use Arc for?
- What happens when I fail?
- Is this available yet?

Each answer should be concise with a link to Learn More.

---

### Section 7 — Final CTA
Repeat CTA with strong close.

Suggested headline:
**Still waiting to get serious?**

Button:
**Start Your Arc**

Small supporting line:
**Enter your email for early access. Optional $1 pre-commit after signup.**

---

## Email capture page (`/start`)

### Purpose
Maximum simplicity and zero distraction.

### Layout
- minimal dark background
- centered card or clean single-column module
- small Arc wordmark
- one-line header
- one email field
- one button
- tiny trust line
- no clutter

### Suggested copy
Header:
**Enter your email**

Subtext:
**Get early access to Arc.**

Field placeholder:
**you@example.com**

Button:
**Continue**

Trust line:
**No spam. Early access only.**

### On submit
Show modal:
**Email received. Pre-commit $1. Money returned if not spent.**

Modal buttons:
- **Pre-commit $1**
- **Skip for now**

Modal subtext options:
- **Reserve your spot and show you’re serious.**
- **Your $1 is only used if your commitment flow uses it.**

If a payment link is available, wire button to it.
If not available yet, the CTA can capture a “pre-commit interest” event.

---

## Learn More page (`/learn`)

### Purpose
Explain the product more fully for skeptical users and ad reviewers.

### Structure

#### Section 1 — Intro
Headline:
**A commitment device for quitting what keeps beating you.**

Subcopy:
Explain Arc in plain language.

#### Section 2 — How Arc works
Explain:
- pick a habit
- choose 30 days or 1 year
- choose Private / Friends Only / Global
- track your streak
- if you fail, you pay

#### Section 3 — Why it works
Position around:
- money changes behavior
- optional visibility increases accountability
- soft utilities fail because there is no consequence

#### Section 4 — Modes
Explain each privacy mode.

#### Section 5 — Commitment examples
Sample habit types:
- vaping
- porn
- drinking
- junk food
- skipping workouts
- doomscrolling

#### Section 6 — FAQ
Include:
- Is Arc live yet?
- Is my goal public by default?
- Can I use Arc privately?
- What happens if I never fail?
- How does the $1 pre-commit work?
- Is Arc for one habit at a time?
- Can I switch commitment lengths?
- Is this honor-code based?

#### Section 7 — CTA
Button:
**Start Your Arc**

---

## Terms page (`/terms`)

### Purpose
Basic legal credibility for ad platforms and user trust.

Cursor should generate a serious, professional starter Terms page that covers:
- early access status
- no guarantee of service availability
- user responsibilities
- payment / pre-commit disclaimers
- privacy mode descriptions
- acceptable use
- limitation of liability
- changes to service
- contact information placeholder

Do not write obvious nonsense.
Keep it clean and believable.

---

## Privacy Policy page (`/privacy`)

### Purpose
Basic trust and compliance posture.

Cursor should generate a serious starter Privacy page that covers:
- data collected
- email collection
- analytics / cookies
- event tracking
- possible payment link redirection
- communications
- user rights
- contact information placeholder

Again: clean, professional, no garbage filler.

---

## Copy blocks

### Hero headline options
Primary:
**Quit your vice or pay for it.**

Alternates:
- **Make failure cost something.**
- **The app that charges you when you slip.**
- **Done pretending you’ll quit for free?**

### Hero subhead options
Primary:
**A commitment app for people who are done pretending. Choose your habit, choose your mode, and make failure cost something.**

Alternate:
**Private, social, or public. Thirty days or a year. Arc turns willpower into a real commitment.**

### CTA button copy
Primary:
**Start Your Arc**

### Email page copy
Primary:
**Enter your email**

### Modal copy
Primary:
**Email received. Pre-commit $1. Money returned if not spent.**

### Learn page intro
Primary:
**Arc is a commitment device for quitting habits that keep winning. You choose what to stop. You choose how public it is. If you fail, it costs you.**

---

## Components Cursor should build

### Global
- Navbar
- Footer
- CTA button style
- card system
- chip / tag component
- section wrapper
- modal component
- FAQ accordion
- analytics utility
- form input component

### Hero visual components
- phone mockup container
- fake streak card
- fake money-lost counter
- fake leaderboard list
- privacy mode chips
- duration switch

### Optional animated components
- count-up number
- reveal-on-scroll wrappers
- floating gradient / light overlays
- subtle parallax hero

Keep all motion restrained.

---

## UI data guidance

Cursor may use mock UI data inside the hero product visualization, for example:
- streak count
- money lost count
- leaderboard rows
- example habits

You are welcome to write things such as:
- “Xxx users signed up”
- “hundreds waiting”
- “trusted by hundreds”


---

## Form behavior

### Email input validation
- basic valid email check
- error state
- loading state
- success state

### Submit behavior
- capture email
- fire analytics event
- show success modal
- optionally store UTM params

### Modal behavior
- track modal shown
- track pre-commit click
- track skip click
- allow close
- accessible keyboard behavior

---

## Analytics requirements

Cursor must wire event tracking hooks for:

### Landing page
- page_view
- hero_cta_click
- learn_more_click
- final_cta_click
- section_view events if possible
- scroll_depth milestones

### Email page
- page_view_start
- email_submit_started
- email_submit_success
- email_submit_error

### Modal
- precommit_modal_shown
- precommit_click
- precommit_skip
- precommit_close

### Learn page
- learn_page_view
- learn_cta_click

### Event metadata
Include where possible:
- page path
- timestamp
- UTM source
- UTM medium
- UTM campaign
- creative id if passed through query params

---

## UTM handling

Cursor should preserve and pass UTM params across:
- landing page
- email page
- modal actions

At minimum preserve:
- utm_source
- utm_medium
- utm_campaign
- utm_content

This matters because we need to know which creative drove which behavior.

---

## Responsive behavior

This build must be mobile-first because traffic is likely to come from social ads.

### Mobile requirements
- hero must feel premium on mobile
- CTA visible early
- visual should not dominate load time
- no layout shift garbage
- spacing disciplined
- fast first paint
- forms easy to use with thumb

### Desktop requirements
- still polished
- more breathing room
- stronger visual composition
- product mockup can expand

---

## Accessibility / quality baseline

- semantic HTML
- keyboard-focus states
- adequate contrast
- reduced-motion respect if possible
- image optimization
- decent performance
- no broken links
- no dead CTA paths

This is not charity work. It still needs to be competent.

---

## Performance priorities

Because this is a paid-traffic funnel:
- optimize hero asset sizes
- lazy-load nonessential visuals
- keep JS light
- avoid loading giant 3D libraries unless absolutely necessary
- compress images
- prefer polished 2D motion over bloated 3D if performance degrades

---

## Suggested build order

### Phase 1 — foundation
- routing
- base styles
- typography
- colors
- layout shell
- reusable button / cards / input components

### Phase 2 — landing page
- hero
- how it works
- modes
- durations
- FAQ preview
- final CTA

### Phase 3 — email capture page
- form
- submit states
- modal
- event tracking

### Phase 4 — learn page
- expanded explanation
- FAQ
- CTA

### Phase 5 — legal
- terms
- privacy

### Phase 6 — analytics + UTM plumbing
- all events
- param persistence
- testing

### Phase 7 — polish
- animation smoothing
- responsive QA
- performance cleanup

---

## QA checklist

Cursor should verify:
- all buttons work
- all links resolve
- forms validate
- email submit fires event
- modal opens correctly
- pre-commit button works or routes correctly
- UTM params persist
- mobile layout is clean
- copy has no embarrassing typos
- legal pages exist and load
- footer links are correct

---

## Out-of-scope for this build

Do not build:
- user accounts
- auth
- real leaderboard backend
- real payment charge logic unless trivial
- real friend graph
- real in-app habit tracking
- deep CMS
- admin dashboard
- referral program
- ambassador system

This is a landing funnel, not the full company.

---

## Final quality bar

The page should feel like:
- a real consumer product
- premium enough to justify paid acquisition
- simple enough to convert fast
- detailed enough to reduce skepticism
- polished enough that investors and smart friends do not laugh

The page should not feel like:
- a hacked-together indie experiment
- generic SaaS
- a design student's motion showcase
- a fake self-help app
- a bloated feature brochure

---

## Final instruction to Cursor

Build a visually elite, dark, minimalist, motion-polished conversion funnel for Arc. The landing page must communicate the concept instantly, the email page must be frictionless, the learn page must add legitimacy, and the legal pages must exist for trust and ad review. Track the funnel cleanly. Keep the design premium. Keep the interaction simple. Keep the copy sharp.

