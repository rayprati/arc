import { legalNav, siteConfig } from "@/lib/site";
import { TrackedLink } from "@/components/tracked-link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">{siteConfig.name}</p>
        <p className="footer-copy">
          Premium accountability for people who are done pretending.
        </p>
      </div>
      <nav aria-label="Footer navigation" className="footer-nav">
        {legalNav.map((item) => (
          <TrackedLink className="footer-link" href={item.href} key={item.href}>
            {item.label}
          </TrackedLink>
        ))}
      </nav>
    </footer>
  );
}
