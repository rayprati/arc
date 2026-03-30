"use client";

import { FormEvent, useMemo, useState } from "react";

import { identifyLead, trackEvent } from "@/lib/analytics";
import {
  buildHrefWithCampaignParams,
  cleanCampaignParams,
  getStoredCampaignParams,
  mergeCampaignParams,
} from "@/lib/utm";
import { PrecommitModal } from "@/components/precommit-modal";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = "idle" | "loading" | "success" | "error";

export function EmailCaptureForm({ paymentLink }: { paymentLink?: string }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const resolvedPaymentLink = useMemo(
    () => buildHrefWithCampaignParams(paymentLink || "", getStoredCampaignParams()),
    [paymentLink],
  );

  const closeModal = () => {
    trackEvent("precommit_close");
    setModalOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailPattern.test(email)) {
      setSubmitState("error");
      setErrorMessage("Enter a valid email address.");
      trackEvent("email_submit_error", { reason: "invalid_email" });
      return;
    }

    setSubmitState("loading");
    setErrorMessage("");
    trackEvent("email_submit_started");

    const campaignParams = mergeCampaignParams(
      getStoredCampaignParams(),
      cleanCampaignParams(new URLSearchParams(window.location.search)),
    );

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          pagePath: window.location.pathname,
          ...campaignParams,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Submission failed.");
      }

      identifyLead(email);
      trackEvent("email_submit_success");
      setSubmitState("success");
      setModalOpen(true);
      trackEvent("precommit_modal_shown");
    } catch (error) {
      setSubmitState("error");
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit right now.");
      trackEvent("email_submit_error", {
        reason: error instanceof Error ? error.message : "unknown_error",
      });
    }
  };

  const handlePrecommit = () => {
    trackEvent("precommit_click", {
      destination: resolvedPaymentLink ? "payment_link" : "interest_only",
    });

    if (resolvedPaymentLink) {
      window.open(resolvedPaymentLink, "_blank", "noopener,noreferrer");
    }
  };

  const handleSkip = () => {
    trackEvent("precommit_skip");
  };

  return (
    <>
      <form className="email-form" onSubmit={handleSubmit}>
        <input
          aria-label="Email address"
          autoComplete="email"
          className="email-input"
          id="email"
          inputMode="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
        <div aria-hidden="true" className="honeypot-field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            onChange={(event) => setCompany(event.target.value)}
            tabIndex={-1}
            type="text"
            value={company}
          />
        </div>
        <button className="button button-primary button-full" disabled={submitState === "loading"} type="submit">
          {submitState === "loading" ? "Submitting..." : "Start Your Arc"}
        </button>
        <p className={`form-status ${submitState === "error" ? "error" : ""}`}>
          {submitState === "error"
            ? errorMessage
            : submitState === "success"
              ? "Check the modal to continue your Arc."
              : ""}
        </p>
      </form>

      <PrecommitModal
        onClose={closeModal}
        onPrecommit={handlePrecommit}
        onSkip={handleSkip}
        open={modalOpen}
        paymentLink={resolvedPaymentLink}
      />
    </>
  );
}
