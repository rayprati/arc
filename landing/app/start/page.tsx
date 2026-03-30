import { EmailCaptureForm } from "@/components/email-capture-form";
import { PageEvent } from "@/components/page-event";
import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "Start Your Arc",
  description: "Enter your email to get early access to Arc.",
};

export default function StartPage() {
  return (
    <main className="simple-page-shell">
      <PageEvent eventName="page_view_start" />

      <TrackedLink className="wordmark centered-wordmark" href="/">
        {siteConfig.name}
      </TrackedLink>

      <section className="capture-card">
        <span className="section-label">Founding Member #401</span>
        <h1>Enter your email</h1>
        <EmailCaptureForm paymentLink={process.env.PAYMENT_LINK} />
      </section>

      <p className="micro-links">
        No Spam. Prefer more detail first?{" "}
        <TrackedLink href="/learn">Learn more</TrackedLink>
      </p>
    </main>
  );
}
