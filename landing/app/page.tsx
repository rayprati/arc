import { FaqAccordion } from "@/components/faq-accordion";
import { PageEvent } from "@/components/page-event";
import { PhoneMockup } from "@/components/phone-mockup";
import { ScrollTracker } from "@/components/scroll-tracker";
import { SiteFooter } from "@/components/site-footer";
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
          <TrackedLink className="wordmark" href="/">
            {siteConfig.name}
          </TrackedLink>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <h1>Break your bad habit.</h1>
            <p className="hero-tagline">Enter $1 every time you break your streak.</p>
            <p className="hero-tagline">Honor code.</p>
            <p className="hero-footnote">Press the red button. Do it now.</p>
            <div className="hero-actions">
              <TrackedLink
                className="button button-primary"
                eventName="hero_cta_click"
                href="/start"
              >
                Start Your Arc
              </TrackedLink>
            </div>
          </div>

          <div className="hero-visual">
            <PhoneMockup />
          </div>
        </div>
      </TrackedSection>

      <TrackedSection className="section-card-grid" sectionId="how-it-works">
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

      <TrackedSection className="section-card-grid" sectionId="faq-preview">
        <FaqAccordion items={landingFaqs} />
      </TrackedSection>

      <nav className="nav-cards-grid" aria-label="Site navigation">
        <TrackedLink className="nav-card" eventName="learn_more_click" href="/learn">
          <span className="nav-card-title">Learn More</span>
          <p>How Arc works, the mechanics, and what to expect from early access.</p>
        </TrackedLink>
        <TrackedLink className="nav-card" href="/terms">
          <span className="nav-card-title">Terms</span>
          <p>How the commitment and payment mechanics work legally.</p>
        </TrackedLink>
        <TrackedLink className="nav-card" href="/privacy">
          <span className="nav-card-title">Privacy</span>
          <p>What data Arc collects and how it is handled.</p>
        </TrackedLink>
      </nav>

      <TrackedSection className="final-cta" sectionId="final-cta">
        <h2>Done pretending?</h2>
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
