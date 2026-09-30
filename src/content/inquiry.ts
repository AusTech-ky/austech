/** Options for the project inquiry form. Edit freely. */
export const inquiryOptions = {
  projectTypes: [
    { value: "business-app", label: "Business application" },
    { value: "bespoke", label: "Bespoke software" },
    { value: "website", label: "Website" },
    { value: "automation", label: "Automation or integration" },
    { value: "product", label: "One of your products" },
    { value: "other", label: "Other" },
  ],
  // Ranges are for scoping conversations only; they are not prices.
  budgets: [
    "Under US$10k",
    "US$10k – 25k",
    "US$25k – 50k",
    "US$50k – 100k",
    "US$100k+",
    "Not sure yet",
  ],
  timelines: ["As soon as possible", "Within 1–3 months", "In 3–6 months", "Just exploring"],
} as const;
