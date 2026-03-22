"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

export function FaqAccordion({
  items,
  compact = false,
}: {
  items: FaqItem[];
  compact?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={`faq-list ${compact ? "faq-list-compact" : ""}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article className={`faq-item ${isOpen ? "open" : ""}`} key={item.question}>
            <button
              aria-expanded={isOpen}
              className="faq-trigger"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <span className="faq-symbol">{isOpen ? "−" : "+"}</span>
            </button>
            <div className="faq-body" hidden={!isOpen}>
              <p>{item.answer}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
