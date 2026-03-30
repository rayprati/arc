"use client";

import { useEffect } from "react";

type PrecommitModalProps = {
  open: boolean;
  paymentLink?: string;
  onClose: () => void;
  onPrecommit: () => void;
  onSkip: () => void;
};

export function PrecommitModal({
  open,
  paymentLink,
  onClose,
  onPrecommit,
  onSkip,
}: PrecommitModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div aria-modal="true" className="modal-backdrop" role="dialog">
      <div className="modal-card">
        <button aria-label="Close modal" className="modal-close" onClick={onClose} type="button">
          ×
        </button>
        <h2>Email received.</h2>
        <p>Show you&apos;re serious. Money returned if not spent.</p>
        <div className="modal-actions">
          <button className="button button-primary" onClick={onPrecommit} type="button">
            Pre-commit $1
          </button>
          <button className="button button-secondary" onClick={onSkip} type="button">
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
