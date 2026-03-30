import { SiteFooter } from "@/components/site-footer";
import { SubpageHeader } from "@/components/subpage-header";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Terms",
  description: "Arc early access terms and conditions.",
};

export default function TermsPage() {
  return (
    <main className="page-shell legal-shell legal-doc">
      <SubpageHeader current="terms" />

      <section className="legal-card">
        <span className="section-label">Terms and conditions</span>
        <h1>Arc Terms of Service</h1>
        <p className="legal-updated">Last updated: March 21, 2026</p>

        <h2>1. Early access status</h2>
        <p>
          Arc is currently offered as an early-access product and market validation experience.
          Features, availability, pricing, payment mechanics, and access rules may change without
          notice as the service evolves.
        </p>

        <h2>2. User responsibilities</h2>
        <p>
          You agree to provide accurate information, use Arc only for lawful personal purposes, and
          avoid submitting content that is deceptive, abusive, defamatory, or infringing on the
          rights of others.
        </p>

        <h2>3. Commitment mechanics and pre-commit payments</h2>
        <p>
          Arc is testing accountability and commitment mechanics. Any pre-commit payment option is
          intended as a seriousness signal or reservation mechanism unless otherwise stated at the
          time of payment. Arc does not guarantee that a specific payment flow, refund flow, or
          product feature will remain unchanged.
        </p>

        <h2>4. Privacy mode descriptions</h2>
        <p>
          Arc may offer Private, Friends Only, and Global visibility modes. These descriptions are
          intended to explain product direction and do not create a warranty that the exact behavior
          of a mode will remain identical across releases.
        </p>

        <h2>5. Acceptable use</h2>
        <p>
          You may not use Arc to harass others, impersonate another person, interfere with the
          service, scrape the site, probe security, or attempt to reverse engineer restricted
          functionality.
        </p>

        <h2>6. No medical, therapeutic, or legal advice</h2>
        <p>
          Arc is not medical advice, mental health treatment, addiction treatment, legal advice, or
          emergency support. If you need professional care, crisis support, or substance-use
          treatment, seek a qualified provider.
        </p>

        <h2>7. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Arc and its operators are not liable for any
          indirect, incidental, consequential, special, or punitive damages arising from use of or
          inability to use the service, including reliance on product concepts described during
          early access.
        </p>

        <h2>8. Changes to the service or these terms</h2>
        <p>
          We may update the service and these terms from time to time. Continued use after changes
          become effective constitutes acceptance of the revised terms.
        </p>

        <h2>9. No guarantee of service availability</h2>
        <p>
          We do not guarantee uninterrupted availability, continuous uptime, or permanent access to
          any feature. Early-access users understand that Arc may be modified, suspended, or
          discontinued at any time.
        </p>

        <h2>10. Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
