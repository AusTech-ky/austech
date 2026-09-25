import { Container } from "@/components/ui/layout";

const d = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-x-clip pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[560px] w-[1200px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(47_85_212/0.06),transparent)]"
      />
      <Container>
        <p className="enter eyebrow" style={d(0)}>
          {eyebrow}
        </p>
        <h1 className="enter mt-5 max-w-[52rem] text-h1 font-semibold text-ink" style={d(70)}>
          {title}
        </h1>
        {lead && (
          <p className="enter mt-6 max-w-[40rem] text-lead text-muted" style={d(140)}>
            {lead}
          </p>
        )}
        {children && (
          <div className="enter mt-9" style={d(210)}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
