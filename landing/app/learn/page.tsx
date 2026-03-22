import { FaqAccordion } from "@/components/faq-accordion";
import { PageEvent } from "@/components/page-event";
import { SiteFooter } from "@/components/site-footer";
import { TrackedLink } from "@/components/tracked-link";
import { TrackedSection } from "@/components/tracked-section";
import {
  commitmentLengths,
  habits,
  learnFaqs,
  privacyModes,
  siteConfig,
} from "@/lib/site";

export const metadata = {
  title: "Learn More",
  description: "Understand how Arc uses money and optional visibility to make bad habits harder to excuse.",
};

export default function LearnPage() {
  return (
    <main className="page-shell learn-shell">
      <PageEvent eventName="learn_page_view" />

      <header className="subpage-header">
        <TrackedLink className="wordmark" href="/">
          {siteConfig.name}
        </TrackedLink>
        <nav className="nav-links">
          <TrackedLink href="/terms">Terms</TrackedLink>
          <TrackedLink href="/privacy">Privacy</TrackedLink>
          <TrackedLink className="button button-secondary nav-button" href="/start">
            Start Your Arc
          </TrackedLink>
        </nav>
      </header>

      <TrackedSection className="page-lead" sectionId="learn-intro">
        <span className="section-label">How Arc works</span>
        <h1>A commitment device for quitting what keeps beating you.</h1>
        <p>
          Arc is a commitment device for quitting habits that keep winning. You choose what to
          stop. You choose how public it is. If you fail, it costs you.
        </p>
      </TrackedSection>

      <TrackedSection className="content-grid" sectionId="learn-mechanic">
        <article className="content-card">
          <h2>Pick a habit and make it legible.</h2>
          <p>
            Arc is strongest when the target is obvious: vaping, porn, drinking, junk food,
            skipping workouts, or doomscrolling. The product is not trying to be everything.
          </p>
          <div className="inline-chip-row">
            {habits.concat("Junk food").map((habit) => (
              <span className="glass-pill" key={habit}>
                {habit}
              </span>
            ))}
          </div>
        </article>

        <article className="content-card">
          <h2>Choose a horizon that feels real.</h2>
          <div className="stack-list">
            {commitmentLengths.map((length) => (
              <div className="stack-item" key={length.label}>
                <strong>{length.label}</strong>
                <p>{length.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </TrackedSection>

      <TrackedSection className="content-grid" sectionId="learn-why">
        <article className="content-card emphasis-card">
          <h2>Why it works</h2>
          <p>
            Money changes behavior. Optional visibility changes behavior even more. Soft utilities
            fail because there is no consequence when the craving wins.
          </p>
        </article>

        <article className="content-card">
          <h2>Modes</h2>
          <div className="stack-list">
            {privacyModes.map((mode) => (
              <div className="stack-item" key={mode.label}>
                <strong>{mode.label}</strong>
                <p>{mode.detail}</p>
              </div>
            ))}
          </div>
        </article>
      </TrackedSection>

      <TrackedSection className="content-card" sectionId="learn-faq">
        <span className="section-label">FAQ</span>
        <h2>Serious answers for skeptical users.</h2>
        <FaqAccordion items={learnFaqs} />
      </TrackedSection>

      <TrackedSection className="final-cta" sectionId="learn-cta">
        <span className="section-label">Founding cohort</span>
        <h2>Done pretending you&apos;ll quit for free?</h2>
        <p>Get early access and take the first step into a version of the product that actually bites back.</p>
        <TrackedLink
          className="button button-primary"
          eventName="learn_cta_click"
          href="/start"
        >
          Start Your Arc
        </TrackedLink>
      </TrackedSection>

      <SiteFooter />
    </main>
  );
}
