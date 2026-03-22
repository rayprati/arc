import { SiteFooter } from "@/components/site-footer";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Privacy",
  description: "Arc privacy policy and data handling overview.",
};

export default function PrivacyPage() {
  return (
    <main className="page-shell legal-shell">
      <header className="subpage-header">
        <TrackedLink className="wordmark" href="/">
          {siteConfig.name}
        </TrackedLink>
        <TrackedLink className="button button-secondary nav-button" href="/start">
          Start Your Arc
        </TrackedLink>
      </header>

      <section className="legal-card">
        <span className="section-label">Privacy policy</span>
        <h1>Arc Privacy Policy</h1>
        <p className="legal-updated">Last updated: March 21, 2026</p>

        <h2>1. Information we collect</h2>
        <p>
          Arc may collect your email address, page interaction data, UTM parameters, device and
          browser information, and other analytics events needed to understand how the landing
          funnel performs.
        </p>

        <h2>2. Email collection</h2>
        <p>
          When you submit your email, Arc stores the information you provide so we can manage early
          access, measure demand, and contact you about product availability or related updates.
        </p>

        <h2>3. Analytics and cookies</h2>
        <p>
          Arc may use analytics tools, pixels, cookies, and similar technologies to measure page
          views, CTA clicks, email submits, scroll depth, modal interactions, and campaign
          attribution. These tools help us understand which paid creatives and landing experiences
          are working.
        </p>

        <h2>4. Event tracking and attribution</h2>
        <p>
          Arc may record events such as landing page views, learn-page visits, CTA clicks, email
          submission attempts, email submission success or error states, modal impressions, and
          pre-commit interactions, along with UTM parameters and creative identifiers when present.
        </p>

        <h2>5. Payment link redirection</h2>
        <p>
          If a pre-commit payment link is enabled, clicking that CTA may redirect you to a third
          party payment provider. Arc is not responsible for the privacy practices of those third
          party services, and you should review their policies separately.
        </p>

        <h2>6. Communications</h2>
        <p>
          By submitting your information, you agree that Arc may send early-access updates, launch
          notifications, and related product communications. You may opt out at any time using the
          instructions included in the message.
        </p>

        <h2>7. Your rights</h2>
        <p>
          Depending on your location, you may have rights to request access, correction, deletion,
          or restriction of your personal information. You may also request details about the data
          we maintain about you.
        </p>

        <h2>8. Data retention</h2>
        <p>
          We retain information for as long as reasonably necessary to operate the early-access
          program, evaluate campaign performance, comply with legal obligations, and resolve
          disputes.
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions or requests about privacy can be sent to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
