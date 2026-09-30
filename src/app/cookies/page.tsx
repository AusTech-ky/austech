import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { PageHeader } from "@/components/sections/page-header";
import { Container } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Cookies & privacy",
  description: `How ${site.name} handles cookies and the information you send through this website.`,
  alternates: { canonical: "/cookies" },
};

const updated = "30 September 2026";

const sections: { title: string; body: React.ReactNode }[] = [
  {
    title: "Cookies",
    body: (
      <>
        <p>
          This website doesn&apos;t use advertising, tracking or analytics cookies, and it doesn&apos;t set any cookies of
          its own. The only thing it stores in your browser is your cookie choice, so we don&apos;t ask again.
        </p>
        <p>
          The only third-party service that runs on the site is Cloudflare Turnstile, on the contact form (see below).
          Anything it uses is strictly necessary to keep the form free of spam and bots, so it runs whichever option you
          choose.
        </p>
        <p>
          If we ever add optional cookies, such as analytics, they will only run if you choose &ldquo;Accept all&rdquo;. You
          can change your choice at any time with &ldquo;Cookie settings&rdquo; at the bottom of every page.
        </p>
      </>
    ),
  },
  {
    title: "Cloudflare Turnstile",
    body: (
      <>
        <p>
          Our contact form is protected by Cloudflare Turnstile, which tells real people apart from automated bots. It
          usually works invisibly; occasionally it may ask you to tick a box.
        </p>
        <p>
          To do this, Cloudflare processes technical signals from your browser, such as your IP address, browser
          (user agent) and connection details. Cloudflare uses these only to detect and block bots and to improve that
          detection, not to identify, profile or advertise to you. For the part that protects our form, Cloudflare acts
          on our behalf.
        </p>
        <p>
          Read more in Cloudflare&apos;s{" "}
          <a href="https://www.cloudflare.com/turnstile-privacy-policy/" target="_blank" rel="noopener noreferrer">
            Turnstile privacy addendum
          </a>{" "}
          and{" "}
          <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "Your information",
    body: (
      <>
        <p>
          When you use the <Link href="/contact">contact form</Link>, we receive the details you enter: your name,
          email address, company, what you&apos;re looking for, budget, timeline and message.
        </p>
        <p>
          We use them only to reply to you and discuss your project. They are delivered to us by email through Amazon
          Web Services (Amazon SES), and we send you a confirmation to the address you gave. We don&apos;t sell your
          details, add you to a mailing list or share them with anyone else.
        </p>
      </>
    ),
  },
  {
    title: "Server logs",
    body: (
      <p>
        Like almost every website, our hosting keeps short-lived technical logs (such as IP addresses and pages
        requested) to run the site securely and fix problems.
      </p>
    ),
  },
  {
    title: "Your choices",
    body: (
      <p>
        You can ask us what information we hold about you, or ask us to correct or delete it, by emailing{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Cookies &amp; <span className="accent-serif">privacy</span>
          </>
        }
        lead="Short version: no tracking cookies, no ads, and your enquiry is only used to reply to you."
      />
      <section className="pb-24 sm:pb-32">
        <Container>
          <div className="max-w-2xl space-y-12">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-h3 font-semibold text-ink">{s.title}</h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-relaxed text-ink-2 [&_a]:text-navy [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 hover:[&_a]:decoration-navy">
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
