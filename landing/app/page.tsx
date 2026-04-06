import { FaqAccordion } from "@/components/faq-accordion";
import { PageEvent } from "@/components/page-event";
import { PhoneMockup } from "@/components/phone-mockup";
import { ScrollTracker } from "@/components/scroll-tracker";
import { SiteFooter } from "@/components/site-footer";
import { StaggerGrid } from "@/components/stagger-grid";
import { TrackedLink } from "@/components/tracked-link";
import { TrackedSection } from "@/components/tracked-section";
import { howItWorks, landingFaqs, siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <main className="page-shell">
      <PageEvent eventName="page_view" />
      <ScrollTracker />

      <TrackedSection className="hero-shell" sectionId="hero">
        <div className="top-nav">
          <TrackedLink className="wordmark hero-anim-wordmark" href="/">
            {siteConfig.name}
          </TrackedLink>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-anim-h1">Break your bad habit.</h1>
            <p className="hero-tagline hero-anim-tagline">Enter $1 every time you break your streak.</p>
            <div className="hero-actions hero-anim-cta">
              <TrackedLink
                className="button button-primary"
                eventName="hero_cta_click"
                href="/start"
              >
                Start Your ARC
              </TrackedLink>
            </div>
          </div>

          <div className="hero-visual hero-anim-phone">
            <PhoneMockup />
          </div>
        </div>
      </TrackedSection>

      <TrackedSection className="section-card-grid" sectionId="how-it-works">
        <StaggerGrid className="three-up-grid">
          {howItWorks.map((item) => (
            <article className="feature-card" key={item.step}>
              <span className="feature-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </StaggerGrid>
      </TrackedSection>

      <TrackedSection className="section-card-grid" sectionId="faq-preview">
        <FaqAccordion items={landingFaqs} />
      </TrackedSection>

      <TrackedSection className="final-cta" sectionId="final-cta">
        <h2>Done waiting?</h2>
        <TrackedLink
          className="button button-primary final-cta-btn"
          eventName="final_cta_click"
          href="/start"
        >
          Start Your ARC
        </TrackedLink>
      </TrackedSection>

      <nav className="site-legal-nav" aria-label="Learn, terms, and privacy">
        <TrackedLink eventName="learn_more_click" href="/learn">
          Learn more
        </TrackedLink>
        <span className="site-legal-nav-sep" aria-hidden>
          ·
        </span>
        <TrackedLink href="/terms">Terms</TrackedLink>
        <span className="site-legal-nav-sep" aria-hidden>
          ·
        </span>
        <TrackedLink href="/privacy">Privacy</TrackedLink>
      </nav>

      <SiteFooter />
    </main>
  );
}
