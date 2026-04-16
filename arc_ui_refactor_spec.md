# ARC UI Refactor Spec — Whoop IA × Nothing X Visual System

## Objective

Refactor the current ARC mobile UI away from “styled dark concept app” toward a **production-grade premium analytics interface**.

The governing design model is:

- **Whoop = information architecture**  
  Determines layout, metric hierarchy, grouping, density, and dashboard logic.
- **Nothing X = visual system**  
  Determines palette, typography attitude, contrast model, surface treatment, borders, and restraint.

This refactor is **not** a light polish pass. It is a systematic replacement of:
- font hierarchy
- spacing rhythm
- card/surface logic
- color usage
- border/shadow behavior
- CTA styling
- metrics composition
- list density
- component consistency

The current UI already has the correct product primitives:
- title
- duration/subtitle
- primary metric
- secondary metric
- relapse history
- fixed bottom nav + central CTA

The problem is the **presentation system**, not the feature set.

---

## Primary Problems in the Current Screen

### 1. Typography lacks a strict system
Current screen issues:
- heading weight is heavy, but subheading and metric labels do not belong to a clear scale
- letter spacing treatment is inconsistent
- some labels feel “dashboard,” others feel “template”
- numbers and labels do not share a coherent typographic logic

### 2. Surface model is muddy
Current screen issues:
- background reads as dark navy rather than intentional black system
- elevated surfaces are implied but not defined
- borders are soft/inconsistent
- depth feels decorative rather than material

### 3. Ring + metrics are visually disconnected
Current screen issues:
- the streak ring feels like a separate graphic dropped into the screen
- “$4 dedicated” sits beside it, but does not feel architecturally paired
- the two primary metrics do not operate as a unified hero section

### 4. CTA area is too close to “dribbble glossy pill”
Current screen issues:
- red button is directionally correct, but too soft/glossy and slightly cartoonish
- nav shell and CTA feel like different visual systems
- icon weights and containment are not fully disciplined

### 5. Relapse list is under-designed
Current screen issues:
- functionally clear, but visually generic
- spacing is acceptable but not premium
- rows do not exploit hierarchy strongly enough
- there is no deliberate black-on-black layering strategy

---

## Refactor Outcome

The target result should feel like:

- a **real premium consumer app**
- quiet, severe, controlled, high-contrast
- productized, not conceptual
- analytics-first
- black-on-black, not glow-on-black
- intentional, not overdesigned

The user should subconsciously read:
- “hardware-grade seriousness”
- “quantified self”
- “engineered restraint”

The user should **not** read:
- “indie hacker dark mode template”
- “crypto dashboard”
- “gaming UI”
- “Figma concept”
- “SaaS landing page in a phone frame”

---

# 1. Global Design System

## 1.1 Color Tokens

Replace all current dark/navy/purple-ish blacks with a hard monochrome-black system.

### Core neutrals
```ts
export const colors = {
  bg: "#050505",           // absolute app background
  surface: "#0A0A0A",      // cards / nav shells / modules
  surface2: "#111111",     // slightly elevated internal modules
  surface3: "#171717",     // rare, only for elevated controls
  border: "rgba(255,255,255,0.08)",
  borderSoft: "rgba(255,255,255,0.05)",
  text: "#F5F5F5",
  text2: "rgba(255,255,255,0.72)",
  text3: "rgba(255,255,255,0.45)",
  text4: "rgba(255,255,255,0.28)",
  success: "#7ED6A7",      // only when semantically required
  danger: "#D84B4B",       // less saturated than current red
  accentBlue: "#7FA8FF",   // for ring / cool metric accent
  accentBlueMuted: "rgba(127,168,255,0.18)",
}
```

### Hard rules
- No purple glow.
- No blue-black gradients as core background.
- No saturated red except in destructive or confession CTA contexts.
- Max 1 accent in a given section.
- Neutral contrast should do most of the work.

---

## 1.2 Background

### Current
The current app background reads slightly navy/blue and includes soft lighting.

### Change to
Use a flat near-black base with a very subtle radial wash only if necessary:
```css
background:
  radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0) 45%),
  #050505;
```

### Rules
- gradient must be nearly imperceptible
- no obvious spotlight effect
- no colored glows behind metrics or buttons

---

## 1.3 Corner Radius System

Use only these radii:

- `radius-sm = 12px`
- `radius-md = 18px`
- `radius-lg = 24px`
- `radius-pill = 999px`

### Apply as follows
- analytics cards/modules: `18px`
- bottom nav shell: `24px`
- central admit button: `999px`
- small chips/badges: `999px`

Do not mix arbitrary 14/16/20/22 values unless there is a concrete reason.

---

## 1.4 Border + Shadow Model

### Borders
Use thin border lines, not obvious outlines:
```css
border: 1px solid rgba(255,255,255,0.08);
```

### Shadows
Very restrained. No glow shadows.

Use:
```css
box-shadow:
  0 1px 0 rgba(255,255,255,0.04) inset,
  0 10px 30px rgba(0,0,0,0.35);
```

### Never use
- blur glows
- neon edge light
- colored shadows
- embossed glossy button highlights

---

# 2. Typography System

## 2.1 Typeface Direction

Use a highly native, crisp sans stack. If using system:
```css
font-family:
  Inter,
  ui-sans-serif,
  -apple-system,
  BlinkMacSystemFont,
  "SF Pro Display",
  "SF Pro Text",
  sans-serif;
```

If you want the closest visual discipline to Nothing X while staying App Store-safe and implementation-light, use **Inter** with very careful weights and tracking.

---

## 2.2 Type Scale

### Display / screen title
- size: `46px` desktop comps / `42px` in export / `44px` max in production hero contexts
- **for this actual screen title use 22–24px**
- weight: `700`
- tracking: `-0.03em`
- line-height: `1.05`

### Section labels
- size: `12px`
- weight: `700`
- tracking: `0.16em`
- uppercase
- color: `text`

### Large metric
- size: `54px` if standalone hero, but in current ring use `32–36px`
- weight: `800`
- tracking: `-0.04em`
- line-height: `1`

### Secondary metric number
- size: `32px`
- weight: `700`
- tracking: `-0.03em`
- line-height: `1`

### Body primary
- size: `17px`
- weight: `600`
- line-height: `1.25`

### Body secondary
- size: `15px`
- weight: `500`
- line-height: `1.35`

### Small muted
- size: `13px`
- weight: `500`
- line-height: `1.3`

---

## 2.3 Exact Typography Changes on This Screen

### Screen title: “Stop Drinking”
Change to:
- size `24px`
- weight `700`
- letter-spacing `-0.03em`
- margin bottom `6px`

### Subtitle: “30 days”
Change to:
- size `15px`
- weight `500`
- color `text2`
- no more than `8px` below title

### Ring center number: “28d”
Change to:
- size `36px`
- weight `800`
- tracking `-0.04em`

### Ring center label: “STREAK”
Change to:
- size `11px`
- weight `700`
- letter-spacing `0.18em`
- color `text2`

### Secondary metric: “$4”
Change to:
- size `34px`
- weight `750`
- tracking `-0.03em`

### Secondary metric label: “DEDICATED”
Change to:
- size `11px`
- weight `700`
- letter-spacing `0.18em`
- color `text2`

### Section label: “RELAPSES”
Change to:
- size `12px`
- weight `700`
- tracking `0.16em`
- color `text`
- margin-bottom `22px`

### Relapse row left text: “28 days ago”
Change to:
- size `17px`
- weight `500`
- color `text`
- no extra decorative styling

### Relapse row right text: “-$1”
Change to:
- size `18px`
- weight `700`
- color `danger`
- tighter tracking `-0.02em`

---

# 3. Screen Layout Changes

## 3.1 Safe-Area Header Zone

### Current
The title stack is acceptable, but the gear icon is slightly too detached and the page top has dead air that does not feel intentional.

### Change to
Create a strict header container:
- top padding from safe area: `20px`
- horizontal padding: `24px`
- title stack aligned left
- settings icon aligned right on same baseline region as title block
- vertical alignment should feel balanced, not floating

Recommended structure:
```tsx
<header className="px-6 pt-safeTop pb-6 flex items-start justify-between">
  <div className="space-y-1.5">
    <h1>Stop Drinking</h1>
    <p>30 days</p>
  </div>
  <button>settings icon</button>
</header>
```

### Settings icon
- use a 20–22px icon
- stroke width consistent with tab icons
- place inside a ghost circular hit target only if needed for usability, otherwise leave visually bare
- color `text`

---

## 3.2 Hero Metrics Block

### Current
The ring and $4 metric feel adjacent, not architecturally unified.

### Change to
Build a dedicated hero module section with two columns:
- left: dominant ring metric
- right: secondary metric stack
- both vertically centered relative to each other
- contained within one invisible horizontal system, not two independent objects

Spacing:
- top margin from subtitle block: `28px`
- left/right page padding: `24px`
- gap between ring and secondary metric: `28px`

### Responsive ratio
- ring occupies ~62% of hero width
- side metric occupies ~38%

#### Suggested structure
```tsx
<section className="px-6 mt-7">
  <div className="flex items-center gap-7">
    <div className="shrink-0">
      <StreakRing />
    </div>
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="metricNumber">$4</div>
      <div className="metricLabel">DEDICATED</div>
    </div>
  </div>
</section>
```

---

## 3.3 Ring Component Refactor

### Current
Ring is directionally good, but:
- stroke weight feels slightly generic
- endpoint styling feels app-template-like
- center content needs more precision

### Change to
The ring should feel like a hardware dashboard element.

#### Ring spec
- size: `156px`
- stroke width: `12px`
- track color: `rgba(255,255,255,0.08)`
- progress color: `#7FA8FF`
- linecap: `round`
- progress arc start angle around 135°
- overall completion should visually reflect progress, but do not exaggerate with bright glow

### Center layout
Inside ring:
- `28d` centered both axes
- label beneath by `4px`

### Remove
- any outer glow
- any halo behind the ring
- any drop-shadow that makes it look like a sticker

### Optional refinement
Use a subtle inner radial darkening inside the ring container so the center feels grounded:
```css
background: radial-gradient(circle at 50% 45%, rgba(255,255,255,0.02), rgba(255,255,255,0) 65%);
```

---

## 3.4 Divider After Hero

### Current
Divider is acceptable but timid and not integrated into the design system.

### Change to
Use:
- `height: 1px`
- `background: rgba(255,255,255,0.08)`
- top margin: `28px`
- bottom margin: `28px`
- width: `calc(100% - 48px)`
- aligned to page padding

This divider should indicate dashboard section transition.

---

## 3.5 Relapse History List

### Current
Plain but not resolved enough. It feels like placeholder body content.

### Change to
Turn the relapse area into a dense black-on-black analytics list.

#### Container
Do **not** put the whole list in a heavy bordered card. That would make the screen too card-y.
Instead:
- keep it page-integrated
- use row spacing and dividers for structure

#### Row spec
Each row:
- height `52px`
- left aligned timestamp
- right aligned money loss
- vertical padding `14px`
- no avatar, no chip, no decorative icon

#### Divider logic
- 1px divider between rows using `borderSoft`
- no divider above the first row if section label is already present
- keep list quiet

#### Left cell
- `17px`, weight `500`, color `text`

#### Right cell
- `18px`, weight `700`, color `danger`

This area should feel closer to **ledger / event log** than “social feed.”

---

# 4. Bottom Navigation + Admit CTA

## 4.1 Overall Shell

### Current
Reasonable concept. Needs harder discipline and less softness.

### Change to
Bottom shell should feel like a black hardware tray.

#### Shell spec
- position fixed above safe area
- width: `calc(100% - 32px)`
- max-width aligned to device content width
- height: `76px`
- background: `#0A0A0A`
- border: `1px solid rgba(255,255,255,0.08)`
- radius: `24px`
- shadow:
```css
0 1px 0 rgba(255,255,255,0.04) inset,
0 20px 40px rgba(0,0,0,0.4)
```

### Internal layout
Three-part layout:
- left icon zone
- center CTA
- right icon zone

Use symmetric spacing, not approximate placement.

---

## 4.2 Admit CTA Button

### Current
The button is conceptually strong but aesthetically too soft and slightly toy-like.

### Change to
Keep the red CTA. Make it stricter, denser, more serious.

#### Button spec
- height `52px`
- min-width `132px`
- horizontal padding `28px`
- background `#C92B2B`
- pressed state `#B82424`
- text color `#FFFFFF`
- border: none
- radius: `999px`
- shadow:
```css
0 8px 24px rgba(0,0,0,0.28)
```

#### Typography
- size `17px`
- weight `700`
- tracking `0.08em`
- uppercase

### Remove
- glossy highlight
- red glow
- orange tint
- over-rounded floating candy look

This should feel like a severe action button, not a candy capsule.

---

## 4.3 Nav Icons

### Current
Close, but consistency can improve.

### Change to
- icon size `22px`
- stroke width standardized
- inactive icons `rgba(255,255,255,0.9)`
- no multicolor accents
- no inconsistent containment

If using Lucide / Heroicons / custom line icons, pick one set and lock it.

### Horizontal spacing
- left/right side icon centers should align symmetrically around the CTA

---

# 5. Specific Structural Refactor for This Screen

## Required final order on screen

1. Header
   - title
   - subtitle
   - settings icon

2. Hero analytics block
   - ring = streak
   - side metric = money dedicated

3. Divider

4. Relapses section label

5. Relapse event list

6. Bottom nav tray
   - social icon
   - admit CTA
   - trophy icon

This order is already mostly present. The refactor is about strict systemization.

---

# 6. Remove / Replace List

## Remove entirely
- any purple
- any ambient colored glow
- any blue-black gradient that reads “gaming UI”
- any soft glassmorphism
- any ornamental drop shadow around ring or CTA
- any inconsistent icon stroke widths
- any decorative visual effects not tied to information hierarchy

## Replace with
- monochrome black surfaces
- one cool accent for metric ring
- one restrained danger red for monetary loss / admit action
- contrast-based layering
- strict typography scale
- grid-based spacing rhythm

---

# 7. Spacing System

Use an 8pt base grid only.

## Token set
- 4
- 8
- 12
- 16
- 24
- 32

Avoid 10, 14, 18, 22 unless there is a concrete local reason.

## This screen recommended spacing
- page horizontal padding: `24`
- title to subtitle: `6–8`
- header to hero: `28`
- ring to side metric: `28`
- hero to divider: `28`
- divider to section label: `28`
- section label to first row: `22`
- row gap: use height/divider, not arbitrary vertical whitespace
- bottom content clearance above nav: at least `112`

---

# 8. Tailwind Token Proposal

Add or update design tokens to make the refactor maintainable.

```ts
// tailwind.config or tokens file
export const arcTheme = {
  colors: {
    bg: "#050505",
    surface: "#0A0A0A",
    surface2: "#111111",
    surface3: "#171717",
    border: "rgba(255,255,255,0.08)",
    borderSoft: "rgba(255,255,255,0.05)",
    text: "#F5F5F5",
    text2: "rgba(255,255,255,0.72)",
    text3: "rgba(255,255,255,0.45)",
    danger: "#D84B4B",
    cta: "#C92B2B",
    ctaPressed: "#B82424",
    ring: "#7FA8FF",
  },
  borderRadius: {
    sm: "12px",
    md: "18px",
    lg: "24px",
    pill: "999px",
  },
  boxShadow: {
    surface: "0 1px 0 rgba(255,255,255,0.04) inset, 0 10px 30px rgba(0,0,0,0.35)",
    tray: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px rgba(0,0,0,0.4)",
    cta: "0 8px 24px rgba(0,0,0,0.28)",
  }
}
```

---

# 9. Component-Level Implementation Instructions for Cursor

## Task 1 — Replace global color system
Search for:
- navy / dark blue background values
- purple shadows / glows
- gradient-based dark panels
- overly saturated red variants

Replace them with the token system above.

---

## Task 2 — Refactor page container
For the page containing the current `Stop Drinking` screen:
- set base background to `bg`
- remove decorative lighting
- enforce horizontal padding `24px`
- ensure enough bottom padding so fixed nav does not overlap content

---

## Task 3 — Rebuild the header
- title and subtitle on left
- settings icon right
- clean alignment
- use the typography specs exactly

---

## Task 4 — Refactor the analytics hero section
- create a single section wrapper
- make ring and money metric part of one unified layout
- use fixed gap `28px`
- vertically center them
- restyle the ring to match the spec

---

## Task 5 — Rebuild the ring
- set diameter to `156px`
- set stroke width `12px`
- track `rgba(255,255,255,0.08)`
- progress `#7FA8FF`
- no glow
- center text restyled per spec

---

## Task 6 — Rebuild the relapses list
- remove any card container if present
- use quiet ledger rows
- set row height `52px`
- use soft separators
- left timestamp / right amount
- keep list integrated into page

---

## Task 7 — Rebuild bottom nav tray
- consistent shell
- consistent icon size and weight
- more severe CTA
- no glossy treatment
- better black-on-black tray styling

---

# 10. Suggested Implementation Prompt for Cursor

Use the following prompt directly in Cursor:

---

You are refactoring an existing mobile app screen to a stricter premium design system.

Target design logic:
- Whoop = information architecture
- Nothing X = visual system

This means:
- keep the dashboard/analytics structure
- replace the visual language with a severe monochrome black-on-black system
- no decorative glow, no purple, no soft gaming aesthetic
- premium consumer app, not dev tool, not dribbble concept

Refactor the current “Stop Drinking” screen with these exact requirements:

1. Global color system
- background: #050505
- surface: #0A0A0A
- elevated surface: #111111 / #171717 only when necessary
- border: rgba(255,255,255,0.08)
- primary text: #F5F5F5
- secondary text: rgba(255,255,255,0.72)
- tertiary text: rgba(255,255,255,0.45)
- danger red: #D84B4B
- CTA red: #C92B2B
- ring accent: #7FA8FF

2. Remove visual effects
- remove all purple glow
- remove neon accents
- remove glossy button styling
- remove obvious gradients unless nearly imperceptible
- no glassmorphism

3. Typography
- title “Stop Drinking”: 24px, 700, -0.03em
- subtitle “30 days”: 15px, 500, secondary text
- ring number “28d”: 36px, 800, -0.04em
- ring label “STREAK”: 11px, 700, 0.18em uppercase
- side metric “$4”: 34px, 750, -0.03em
- side label “DEDICATED”: 11px, 700, 0.18em uppercase
- section label “RELAPSES”: 12px, 700, 0.16em uppercase
- relapse row left text: 17px, 500
- relapse row right text: 18px, 700, danger red

4. Layout
- page horizontal padding: 24px
- strict 8pt spacing grid
- header: title/subtitle left, settings icon right
- hero section: ring on left, money metric on right, aligned as one section
- divider below hero
- relapses label
- relapse list
- fixed bottom nav tray

5. Ring
- 156px diameter
- 12px stroke
- track rgba(255,255,255,0.08)
- progress #7FA8FF
- round linecap
- no glow
- centered content

6. Relapse list
- no heavy card wrapper
- quiet ledger styling
- row height about 52px
- subtle dividers
- left timestamp, right amount
- clean density

7. Bottom nav
- shell background #0A0A0A
- border 1px rgba(255,255,255,0.08)
- radius 24px
- serious black hardware-tray feel
- center admit CTA = solid #C92B2B pill, no gloss, no glow
- icon size 22px and consistent stroke weight

8. Final quality bar
The result should feel:
- hardware-grade
- premium
- restrained
- engineered
- severe
- consumer-facing

The result must not feel:
- playful
- gamified
- crypto
- SaaS dashboard
- dribbble concept
- glowy

Please edit the relevant components and styles directly. Prefer reusable tokens over one-off inline styles. Keep the current content and structure, but replace the entire visual system accordingly.

---

# 11. Acceptance Criteria

The refactor is successful only if all of the following are true:

- the screen reads primarily as **black, not navy**
- the title/metrics/list all feel like one typographic family
- the ring feels integrated, not pasted in
- the relapse list feels intentional and premium despite being simple
- the bottom CTA feels severe and strong, not glossy or toy-like
- the entire screen feels quieter and more expensive than before
- almost all hierarchy is created by spacing, weight, and contrast rather than effects

---

# 12. Final Directional Warning

Do **not** add more design.
Do **not** add decorative flourishes.
Do **not** solve this by adding gradients, shadows, badges, or ornamental layers.

The premium jump will come from:
- fewer colors
- stricter type
- harder black values
- tighter spacing logic
- stronger visual discipline

Not from more style.

