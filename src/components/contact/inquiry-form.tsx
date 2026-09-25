"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { inquiryOptions } from "@/content/inquiry";
import { submitInquiry, type InquiryField, type InquiryState } from "@/app/contact/actions";
import { cn } from "@/lib/cn";

const initial: InquiryState = { status: "idle" };

const inputClass =
  "block w-full rounded-xl bg-white px-4 text-[0.95rem] text-ink placeholder:text-faint ring-1 ring-line-strong transition-shadow duration-200 hover:ring-ink/25 focus:outline-none focus:ring-2 focus:ring-accent aria-[invalid=true]:ring-negative/60";

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
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-[0.85rem] font-medium text-ink">
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

function ChoiceGroup({
  name,
  legend,
  options,
  defaultValue,
  error,
  optional,
}: {
  name: InquiryField;
  legend: string;
  options: readonly { value: string; label: string }[];
  defaultValue?: string;
  error?: string;
  optional?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-2.5 flex w-full items-baseline justify-between text-[0.85rem] font-medium text-ink">
        {legend}
        {optional && <span className="text-[0.75rem] font-normal text-faint">Optional</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label
            key={o.value}
            className={cn(
              "cursor-pointer select-none rounded-full bg-white px-3.5 py-2 text-[0.85rem] text-ink-2 ring-1 ring-line-strong transition-all duration-200",
              "hover:ring-ink/30 has-[:checked]:bg-ink has-[:checked]:text-white has-[:checked]:ring-ink",
              "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
            )}
          >
            <input type="radio" name={name} value={o.value} defaultChecked={defaultValue === o.value} className="sr-only" />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-[0.8rem] text-negative">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function InquiryForm({ defaults }: { defaults?: Partial<Record<InquiryField, string>> }) {
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
      className="space-y-7 rounded-[1.5rem] bg-canvas p-6 ring-1 ring-line sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={e.name}>
          <input id="name" name="name" autoComplete="name" defaultValue={v.name} className={cn(inputClass, "h-12")} {...invalid("name")} />
        </Field>
        <Field id="company" label="Company" optional>
          <input id="company" name="company" autoComplete="organization" defaultValue={v.company} className={cn(inputClass, "h-12")} />
        </Field>
      </div>
      <Field id="email" label="Email" error={e.email}>
        <input id="email" name="email" type="email" autoComplete="email" defaultValue={v.email} className={cn(inputClass, "h-12")} {...invalid("email")} />
      </Field>

      <ChoiceGroup name="projectType" legend="What are you looking for?" options={inquiryOptions.projectTypes} defaultValue={v.projectType} error={e.projectType} />
      <ChoiceGroup
        name="budget"
        legend="Budget range"
        optional
        options={inquiryOptions.budgets.map((b) => ({ value: b, label: b }))}
        defaultValue={v.budget}
      />
      <ChoiceGroup
        name="timeline"
        legend="Timeline"
        optional
        options={inquiryOptions.timelines.map((t) => ({ value: t, label: t }))}
        defaultValue={v.timeline}
      />

      <Field id="message" label="Tell us about the project" error={e.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={v.message}
          placeholder="What's the problem you'd like to solve? Who will use it? Anything already in place?"
          className={cn(inputClass, "resize-y py-3 leading-relaxed")}
          {...invalid("message")}
        />
      </Field>

      {/* Honeypot */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.8rem] text-muted" aria-live="polite">
          {state.status === "error" ? (
            <span className="text-negative">{state.message}</span>
          ) : (
            "We reply within one business day."
          )}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[0.95rem] font-medium text-white transition-all duration-300 hover:bg-[#23272f] active:scale-[0.98] disabled:opacity-60"
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
