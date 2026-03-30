import { siteConfig } from "@/lib/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <p className="footer-brand">{siteConfig.name}</p>
        <p className="footer-copy">Premium accountability.</p>
      </div>
      <p className="footer-copy footer-copyright">© {year} ARC. All rights reserved.</p>
    </footer>
  );
}
