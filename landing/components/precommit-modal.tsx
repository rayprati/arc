"use client";

import { useEffect, useState } from "react";

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
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setDone(false);
      return;
    }

    document.body.style.overflow = "hidden";

    if (done) {
      return () => {
        document.body.style.overflow = "";
      };
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, open, done]);

  if (!open) return null;

  if (done) {
    return (
      <div aria-modal="true" className="modal-backdrop modal-backdrop-done" role="dialog">
        <div className="modal-card modal-card-done">
          <h2>Good work.</h2>
          <h2>We&apos;ll speak soon.</h2>
          <p className="modal-done-sub">You may now close this window.</p>
        </div>
      </div>
    );
  }

  return (
    <div aria-modal="true" className="modal-backdrop" role="dialog">
      <div className="modal-card">
        <button aria-label="Close modal" className="modal-close" onClick={onClose} type="button">
          ×
        </button>
        <h2>Email received.</h2>
        <p>Show you&apos;re serious. Money returned if not spent.</p>
        <div className="modal-actions">
          <button
            className="button button-primary"
            onClick={() => {
              onPrecommit();
              setDone(true);
            }}
            type="button"
          >
            Pre-commit $1
          </button>
          <button
            className="button button-secondary"
            onClick={() => {
              onSkip();
              setDone(true);
            }}
            type="button"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
