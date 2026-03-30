import { TrackedLink } from "@/components/tracked-link";
import { siteConfig } from "@/lib/site";

type SubpageId = "learn" | "terms" | "privacy";

type SubpageHeaderProps = {
  current: SubpageId;
};

const docLinks: { href: string; id: SubpageId; label: string; eventName?: string }[] = [
  { href: "/learn", id: "learn", label: "Learn", eventName: "learn_more_click" },
  { href: "/terms", id: "terms", label: "Terms" },
  { href: "/privacy", id: "privacy", label: "Privacy" },
];

export function SubpageHeader({ current }: SubpageHeaderProps) {
  return (
    <header className="subpage-header subpage-header-rich">
      <div className="subpage-header-brand">
        <TrackedLink className="wordmark" href="/">
          {siteConfig.name}
        </TrackedLink>
      </div>

      <nav className="subpage-doc-nav" aria-label="Learn, terms, and privacy">
        {docLinks.map((link, i) => (
          <span className="subpage-doc-nav-item" key={link.href}>
            {i > 0 ? (
              <span className="subpage-doc-sep" aria-hidden>
                ·
              </span>
            ) : null}
            <TrackedLink
              className={current === link.id ? "is-current" : undefined}
              eventName={link.eventName}
              href={link.href}
            >
              {link.label}
            </TrackedLink>
          </span>
        ))}
      </nav>
    </header>
  );
}
