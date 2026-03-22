import { TrackedLink } from "@/components/tracked-link";

export default function NotFound() {
  return (
    <main className="simple-page-shell">
      <section className="capture-card">
        <span className="section-label">Not found</span>
        <h1>This page drifted off course.</h1>
        <p>The landing funnel is still live. Head back to the start and continue.</p>
        <TrackedLink className="button button-primary button-full" href="/">
          Return home
        </TrackedLink>
      </section>
    </main>
  );
}
