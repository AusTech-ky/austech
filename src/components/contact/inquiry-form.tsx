"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { inquiryOptions } from "@/content/inquiry";
import { submitInquiry, type InquiryField, type InquiryState, type InquiryValues } from "@/app/contact/actions";
import { cn } from "@/lib/cn";
import { Turnstile } from "./turnstile";

const initial: InquiryState = { status: "idle" };

const inputClass =
  "block w-full rounded-xl bg-white px-3.5 text-[0.9rem] text-ink placeholder:text-faint ring-1 ring-line-strong transition-shadow duration-200 hover:ring-ink/25 focus:outline-none focus:ring-2 focus:ring-accent aria-[invalid=true]:ring-negative/60";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-[0.8rem] font-medium text-ink">
        {label}
        {optional && <span className="text-[0.75rem] font-normal text-faint">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8rem] text-negative">
          {error}
        </p>
      )}
    </div>
  );
}

export type ProductChoice = { slug: string; name: string; soon: boolean };

const pillClass = cn(
  "cursor-pointer select-none rounded-full bg-white px-3 py-1.5 text-[0.8rem] text-ink-2 ring-1 ring-line-strong transition-all duration-200",
  "hover:ring-ink/30 has-[:checked]:bg-navy has-[:checked]:text-white has-[:checked]:ring-navy",
  "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
);

/**
 * Multi-select pills. "One of your products" reveals which product,
 * and "Other" reveals a short text field.
 */
function ProjectTypes({
  products,
  defaultValue,
  productValue,
  otherValue,
  error,
  productError,
  otherError,
}: {
  products: ProductChoice[];
  defaultValue?: string[];
  productValue?: string;
  otherValue?: string;
  error?: string;
  productError?: string;
  otherError?: string;
}) {
  const [chosen, setChosen] = useState<string[]>(defaultValue ?? []);
  const toggle = (v: string) => setChosen((c) => (c.includes(v) ? c.filter((x) => x !== v) : [...c, v]));
  return (
    <fieldset aria-describedby={error ? "projectType-error" : undefined}>
      <legend className="mb-2 flex w-full items-baseline justify-between text-[0.8rem] font-medium text-ink">
        What are you looking for?
        <span className="text-[0.75rem] font-normal text-faint">Choose any</span>
      </legend>
      <div className="flex flex-wrap gap-1.5">
        {inquiryOptions.projectTypes.map((o) => (
          <label key={o.value} className={pillClass}>
            <input
              type="checkbox"
              name="projectType"
              value={o.value}
              checked={chosen.includes(o.value)}
              onChange={() => toggle(o.value)}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p id="projectType-error" className="mt-1.5 text-[0.8rem] text-negative">
          {error}
        </p>
      )}
      {chosen.includes("product") && (
        <div className="mt-3 rounded-xl bg-white/70 p-3 ring-1 ring-line">
          <p className="mb-2 text-[0.75rem] font-medium text-muted">Which product?</p>
          <div className="flex flex-wrap gap-1.5">
            {products.map((p) => (
              <label key={p.slug} className={pillClass}>
                <input type="radio" name="product" value={p.slug} defaultChecked={productValue === p.slug} className="sr-only" />
                {p.name}
                {p.soon && <span className="ml-1.5 opacity-60">· soon</span>}
              </label>
            ))}
          </div>
          {productError && <p className="mt-1.5 text-[0.8rem] text-negative">{productError}</p>}
        </div>
      )}
      {chosen.includes("other") && (
        <div className="mt-3">
          <label htmlFor="projectOther" className="sr-only">
            What else are you looking for?
          </label>
          <input
            id="projectOther"
            name="projectOther"
            defaultValue={otherValue}
            placeholder="What else are you looking for?"
            autoFocus
            className={cn(inputClass, "h-10")}
            {...(otherError ? { "aria-invalid": true, "aria-describedby": "projectOther-error" } : {})}
          />
          {otherError && (
            <p id="projectOther-error" className="mt-1.5 text-[0.8rem] text-negative">
              {otherError}
            </p>
          )}
        </div>
      )}
    </fieldset>
  );
}

/**
 * Optional dropdown styled like the rest of the site (a native <select> opens
 * the operating system's own menu). The value is posted via a hidden input.
 */
function Select({ id, label, options, defaultValue }: { id: string; label: string; options: readonly string[]; defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const choose = (v: string) => {
    setValue(v);
    setOpen(false);
  };

  return (
    <Field id={id} label={label} optional>
      <div ref={ref} className="relative" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
        <input type="hidden" name={id} value={value} />
        <button
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={cn(inputClass, "flex h-10 items-center justify-between text-left", !value && "text-faint")}
        >
          <span className="truncate">{value || "Select…"}</span>
          <ChevronDown className={cn("size-4 shrink-0 text-muted transition-transform duration-200", open && "rotate-180")} />
        </button>
        {open && (
          <ul
            role="listbox"
            aria-labelledby={id}
            className="absolute inset-x-0 top-full z-20 mt-1.5 max-h-64 overflow-auto rounded-xl bg-white p-1 shadow-lift ring-1 ring-line"
          >
            {options.map((o) => (
              <li key={o} role="option" aria-selected={value === o}>
                <button
                  type="button"
                  onClick={() => choose(o)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[0.85rem] text-ink-2 transition-colors hover:bg-canvas hover:text-ink",
                    value === o && "bg-accent-soft font-medium text-navy hover:bg-accent-soft",
                  )}
                >
                  {o}
                  {value === o && <Check className="size-3.5" strokeWidth={2.5} />}
                </button>
              </li>
            ))}
            {value && (
              <li role="option" aria-selected={false}>
                <button
                  type="button"
                  onClick={() => choose("")}
                  className="w-full rounded-lg px-3 py-2 text-left text-[0.8rem] text-faint transition-colors hover:bg-canvas hover:text-muted"
                >
                  Clear
                </button>
              </li>
            )}
          </ul>
        )}
      </div>
    </Field>
  );
}

export function InquiryForm({
  defaults,
  products,
  turnstileSiteKey,
}: {
  defaults?: InquiryValues;
  products: ProductChoice[];
  turnstileSiteKey?: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  // The success result the visitor dismissed with "Send another inquiry".
  const [dismissed, setDismissed] = useState<InquiryState | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const succeeded = state.status === "success" && state !== dismissed;

  useEffect(() => {
    if (!succeeded) return;
    successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    successRef.current?.focus({ preventScroll: true });
  }, [succeeded]);

  if (succeeded) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start rounded-[1.5rem] bg-white p-8 outline-none ring-1 ring-line sm:p-10"
      >
        <span className="grid size-12 place-items-center rounded-full bg-[#e7f5ee]">
          <Check className="size-5 text-positive" strokeWidth={2.5} />
        </span>
        <h2 className="mt-6 text-h3 font-semibold text-ink">Thanks, we&apos;ve got it.</h2>
        <p className="mt-3 max-w-md text-[0.97rem] leading-relaxed text-muted">
          We read every inquiry personally and will reply within one business day, usually with a few questions
          and a time to talk.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(state)}
          className="mt-8 text-[0.9rem] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const v = { ...defaults, ...state.values };
  const e = state.errors ?? {};
  const invalid = (k: InquiryField) => (e[k] ? { "aria-invalid": true, "aria-describedby": `${k}-error` } : {});

  return (
    <form
      key={dismissed === state ? "fresh" : JSON.stringify(state.values ?? {})}
      action={action}
      noValidate
      className="space-y-5 rounded-[1.5rem] bg-canvas p-5 ring-1 ring-line sm:p-7"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name" error={e.name}>
          <input id="name" name="name" autoComplete="name" defaultValue={v.name} className={cn(inputClass, "h-10")} {...invalid("name")} />
        </Field>
        <Field id="company" label="Company" optional>
          <input id="company" name="company" autoComplete="organization" defaultValue={v.company} className={cn(inputClass, "h-10")} />
        </Field>
      </div>
      <Field id="email" label="Email" error={e.email}>
        <input id="email" name="email" type="email" autoComplete="email" defaultValue={v.email} className={cn(inputClass, "h-10")} {...invalid("email")} />
      </Field>

      <ProjectTypes
        products={products}
        defaultValue={v.projectType}
        productValue={v.product}
        otherValue={v.projectOther}
        error={e.projectType}
        productError={e.product}
        otherError={e.projectOther}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Select id="budget" label="Budget" options={inquiryOptions.budgets} defaultValue={v.budget} />
        <Select id="timeline" label="Timeline" options={inquiryOptions.timelines} defaultValue={v.timeline} />
      </div>

      <Field id="message" label="Tell us about the project" error={e.message}>
        <textarea
          id="message"
          name="message"
          rows={4}
          defaultValue={v.message}
          placeholder="What's the problem you'd like to solve? Who will use it? Anything already in place?"
          className={cn(inputClass, "resize-y py-2.5 leading-relaxed")}
          {...invalid("message")}
        />
      </Field>

      <Turnstile siteKey={turnstileSiteKey} />

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] text-muted" aria-live="polite">
          {state.status === "error" && <span className="text-negative">{state.message}</span>}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-11 items-center justify-center gap-2 rounded-full bg-navy px-5 text-[0.9rem] font-medium text-white transition-all duration-300 hover:bg-navy-deep active:scale-[0.98] disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send inquiry
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
