import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

const updated = "30 September 2026";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Who we are",
    body: (
      <p>
        {site.legalName} (&ldquo;{site.name}&rdquo;, &ldquo;we&rdquo;) is a software company in {site.location.region},{" "}
        {site.location.country}. We are responsible for the personal information collected through this website. You can
        reach us at <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone.display}.
      </p>
    ),
  },
  {
    title: "What we collect",
    body: (
      <ul>
        <li>
          <strong>Enquiries.</strong> When you use the <Link href="/contact">contact form</Link>: your name, email
          address, company, what you&apos;re looking for, budget, timeline and message.
        </li>
        <li>
          <strong>Emails.</strong> Anything you send us directly by email or phone.
        </li>
        <li>
          <strong>Technical data.</strong> Your IP address and browser details, processed by our hosting and by
          Cloudflare Turnstile to run the site securely and block spam. See our <Link href="/cookies">cookie policy</Link>.
        </li>
      </ul>
    ),
  },
  {
    title: "How we use it, and why",
    body: (
      <ul>
        <li>To reply to your enquiry and talk about your project, because you asked us to (steps before a contract).</li>
        <li>
          To send you a confirmation that we received your enquiry, and to keep a record of our conversations, which is
          in our legitimate interest in running the business.
        </li>
        <li>To keep the site and contact form secure and free of abuse, also a legitimate interest.</li>
      </ul>
    ),
  },
  {
    title: "Who we share it with",
    body: (
      <>
        <p>We don&apos;t sell your information or use it for advertising. We share it only with the services that help us run the site:</p>
        <ul>
          <li>
            <strong>Amazon Web Services</strong> (Amazon SES), which delivers enquiry emails to us and your confirmation
            to you.
          </li>
          <li>
            <strong>Cloudflare</strong> (Turnstile), which checks that contact form submissions come from people, not
            bots.
          </li>
          <li>Our website hosting provider, which serves the site.</li>
        </ul>
        <p>
          These providers may process data outside the Cayman Islands, including in the United States, under their own
          safeguards for international transfers.
        </p>
      </>
    ),
  },
  {
    title: "How long we keep it",
    body: (
      <p>
        We keep enquiries for as long as we need them to respond and, if we work together, for the length of that
        relationship and any record-keeping we are required to do. After that we delete them.
      </p>
    ),
  },
  {
    title: "Your rights",
    body: (
      <p>
        Under the Cayman Islands Data Protection Act and, where it applies to you, the EU and UK GDPR, you can ask us for
        a copy of your information, ask us to correct or delete it, object to how we use it, or ask us to stop. Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> and we&apos;ll respond within a month. You can also complain to
        the Cayman Islands Ombudsman or your local data protection authority.
      </p>
    ),
  },
  {
    title: "Changes",
    body: <p>If we change how we use your information, we&apos;ll update this page and the date below.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Privacy <span className="accent-serif">policy</span>
          </>
        }
        lead="What we collect through this website, why, and the choices you have."
      />
      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="max-w-2xl space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-h3 font-semibold text-ink">{s.title}</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-relaxed text-ink-2 [&_a]:text-navy [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 hover:[&_a]:decoration-navy [&_li]:pl-1 [&_strong]:font-semibold [&_strong]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </div>
            ))}
            <p className="border-t border-line pt-6 text-[0.85rem] text-muted">Last updated {updated}.</p>
          </div>
        </Container>
      </section>
    </>
  );
}
