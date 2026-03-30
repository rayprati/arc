"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type PrecommitModalProps = {
  open: boolean;
  paymentLink?: string;
  onClose: () => void;
  onPrecommit: () => void;
  onSkip: () => void;
};

export function PrecommitModal({ open, paymentLink, onPrecommit, onSkip }: PrecommitModalProps) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setDone(false);
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, done]);

  if (!open) return null;

  if (done) {
    return createPortal(
      <div aria-modal="true" className="modal-backdrop modal-backdrop-done" role="dialog">
        <div className="modal-card modal-card-done">
          <h2>Good work.</h2>
          <h2>We&apos;ll speak soon.</h2>
          <p className="modal-done-sub">You may now close this window.</p>
        </div>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div aria-modal="true" className="modal-backdrop" role="dialog">
      <div className="modal-card modal-card-offer">
        <h2>Email received.</h2>
        <p>Show you&apos;re serious.<br />Money returned if not spent.</p>
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
    </div>,
    document.body,
  );
}
