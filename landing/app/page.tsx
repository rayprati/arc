import { FaqAccordion } from "@/components/faq-accordion";
import { PageEvent } from "@/components/page-event";
import { PhoneMockup } from "@/components/phone-mockup";
import { ScrollTracker } from "@/components/scroll-tracker";
import { SiteFooter } from "@/components/site-footer";
import { TrackedLink } from "@/components/tracked-link";
import { TrackedSection } from "@/components/tracked-section";
import {
  commitmentLengths,
  habits,
  howItWorks,
  landingFaqs,
  privacyModes,
  siteConfig,
} from "@/lib/site";

export default function Home() {
  return (
    <main className="page-shell">
      <PageEvent eventName="page_view" />
      <ScrollTracker />

      <TrackedSection className="hero-shell" sectionId="hero">
        <div className="top-nav">
          <TrackedLink className="wordmark" href="/">
            {siteConfig.name}
          </TrackedLink>
          <nav className="nav-links">
            <TrackedLink eventName="learn_more_click" href="/learn">
              Learn More
            </TrackedLink>
            <TrackedLink href="/terms">Terms</TrackedLink>
            <TrackedLink href="/privacy">Privacy</TrackedLink>
          </nav>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="section-label">Early access now open</span>
            <h1>Break your bad habit. Put your money where your mouth is.</h1>
            <p className="hero-subcopy">
              A commitment app for people who are done pretending. Choose your habit,
              choose your mode, and make failure cost something.
            </p>

            <div className="hero-actions">
              <TrackedLink
                className="button button-primary"
                eventName="hero_cta_click"
                href="/start"
              >
                Start Your Arc
              </TrackedLink>
              <TrackedLink
                className="button button-secondary"
                eventName="learn_more_click"
                href="/learn"
              >
                Learn more
              </TrackedLink>
            </div>

            <div className="trust-line">
              <span>Private, friends-only, or public</span>
              <span>30-day and 1-year commitments</span>
              <span>Founding cohort open now</span>
            </div>

            <div className="hero-habits">
              {habits.map((habit) => (
                <span className="glass-pill" key={habit}>
                  {habit}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <PhoneMockup />
          </div>
        </div>
      </TrackedSection>

      <TrackedSection className="section-card-grid" sectionId="how-it-works">
        <div className="section-intro">
          <span className="section-label">How it works</span>
          <h2>Three clean steps. Real pressure.</h2>
          <p>Pick the vice. Choose the pressure. Let consequences do what reminders never could.</p>
        </div>
        <div className="three-up-grid">
          {howItWorks.map((item) => (
            <article className="feature-card" key={item.step}>
              <span className="feature-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </TrackedSection>

      <TrackedSection className="section-card-grid" sectionId="privacy-modes">
        <div className="section-intro">
          <span className="section-label">Privacy modes</span>
          <h2>Private if you want. Social if you need.</h2>
          <p>Arc widens the market by matching the pressure to the habit instead of forcing one mode on everyone.</p>
        </div>
        <div className="three-up-grid">
          {privacyModes.map((mode, index) => (
            <article className={`feature-card mode-card mode-${index + 1}`} key={mode.label}>
              <span className="glass-pill">{mode.label}</span>
              <h3>{mode.description}</h3>
              <p>{mode.detail}</p>
            </article>
          ))}
        </div>
      </TrackedSection>

      <TrackedSection className="section-split" sectionId="commitment-lengths">
        <div className="section-intro">
          <span className="section-label">Commitment lengths</span>
          <h2>30 days for a reset. One year for serious quitters.</h2>
          <p>These lengths make the mechanic concrete fast, especially on paid traffic coming in cold.</p>
        </div>
        <div className="dual-panel-grid">
          {commitmentLengths.map((length, index) => (
            <article className={`length-card ${index === 1 ? "featured" : ""}`} key={length.label}>
              <span className="length-badge">{length.label}</span>
              <h3>{length.description}</h3>
              <p>{length.detail}</p>
            </article>
          ))}
        </div>
      </TrackedSection>

      <TrackedSection className="section-split proof-shell" sectionId="product-proof">
        <div className="proof-copy">
          <span className="section-label">Why it hits harder</span>
          <h2>Weak habit apps ask nicely. Arc makes relapse feel real.</h2>
          <p>
            The concept works because it combines loss aversion, identity, and optional social
            visibility into one line that strangers understand instantly.
          </p>
          <ul className="proof-list">
            <li>Money changes behavior faster than vague intention.</li>
            <li>Friends-only mode adds pressure without forcing exposure.</li>
            <li>Public mode turns ego and shame into momentum.</li>
          </ul>
        </div>

        <div className="proof-panels">
          <article className="proof-card">
            <span className="metric-label">Example money lost</span>
            <strong>$143 this month</strong>
            <p>Direct loss aversion lands because the pain is legible in one glance.</p>
          </article>
          <article className="proof-card">
            <span className="metric-label">Friends waiting</span>
            <strong>7 people watching</strong>
            <p>Social pressure makes “just this once” a lot less private.</p>
          </article>
          <article className="proof-card">
            <span className="metric-label">Founding cohort</span>
            <strong>Hundreds waiting</strong>
            <p>Early access is open for disciplined quitters who want first access.</p>
          </article>
        </div>
      </TrackedSection>

      <TrackedSection className="section-card-grid" sectionId="faq-preview">
        <div className="section-intro">
          <span className="section-label">FAQ</span>
          <h2>Enough detail to reduce skepticism.</h2>
          <p>Everything else lives on the Learn More page so the landing page stays sharp.</p>
        </div>
        <FaqAccordion compact items={landingFaqs} />
      </TrackedSection>

      <TrackedSection className="final-cta" sectionId="final-cta">
        <span className="section-label">Founding release</span>
        <h2>Still waiting to get serious?</h2>
        <p>Enter your email for early access. Optional $1 pre-commit after signup.</p>
        <TrackedLink
          className="button button-primary"
          eventName="final_cta_click"
          href="/start"
        >
          Start Your Arc
        </TrackedLink>
      </TrackedSection>

      <SiteFooter />
    </main>
  );
}
