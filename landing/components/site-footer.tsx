import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">{siteConfig.name}</p>
        <p className="footer-copy">Premium accountability.</p>
      </div>
    </footer>
  );
}
