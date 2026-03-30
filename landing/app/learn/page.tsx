import { FaqAccordion } from "@/components/faq-accordion";
import { PageEvent } from "@/components/page-event";
import { SiteFooter } from "@/components/site-footer";
import { SubpageHeader } from "@/components/subpage-header";
import { TrackedSection } from "@/components/tracked-section";
import { learnFaqs } from "@/lib/site";

export const metadata = {
  title: "Learn More",
  description:
    "Quit with a price on the line: name your habit, pick a length, add stakes, and choose visibility.",
};

export default function LearnPage() {
  return (
    <main className="page-shell learn-shell">
      <PageEvent eventName="learn_page_view" />

      <SubpageHeader current="learn" />

      <TrackedSection className="page-lead" sectionId="learn-intro">
        <span className="section-label">How Arc works</span>
        <h1>Break your bad habit.</h1>
        <p>
          Name what you&apos;re quitting, how long you mean it, and how visible you want it.
        </p>
      </TrackedSection>

      <TrackedSection className="content-card learn-flow" sectionId="learn-guide">
        <span className="section-label">Three steps</span>
        <ol className="learn-steps">
          <li>
            <h2 className="learn-step-title">Name one habit</h2>
            <p>
              Specific beats vague: vaping, drinking, doomscrolling, skipping the gym. Not &quot;be
              healthier.&quot;
            </p>
          </li>
          <li>
            <h2 className="learn-step-title">Pick a length</h2>
            <p>
              <strong>30 days</strong> for a sharp reset. <strong>1 year</strong> when you need
              the commitment to feel heavy.
            </p>
          </li>
          <li>
            <h2 className="learn-step-title">Break your habit</h2>
            <p>You invest in your outcome.</p>
          </li>
        </ol>
      </TrackedSection>

      <TrackedSection className="content-card learn-faq-block" sectionId="learn-faq">
        <span className="section-label">FAQ</span>
        <h2 className="learn-faq-heading">Common questions</h2>
        <FaqAccordion items={learnFaqs} />
      </TrackedSection>

      <SiteFooter />
    </main>
  );
}
