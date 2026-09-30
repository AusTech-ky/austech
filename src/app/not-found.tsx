import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";

export default function NotFound() {
  return (
    <section className="pb-32 pt-40">
      <Container className="max-w-2xl text-center">
        <h1 className="text-h1 font-semibold text-ink">
          This page has <span className="accent-serif">moved on.</span>
        </h1>
        <p className="mt-5 text-lead text-muted">The page you&apos;re looking for doesn&apos;t exist, or it&apos;s been moved.</p>
        <div className="mt-9 flex justify-center gap-3">
          <Button href="/" arrow>
            Back home
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
