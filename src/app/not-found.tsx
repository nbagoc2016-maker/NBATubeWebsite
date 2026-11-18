import { ButtonLink, Container, Eyebrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-white to-paper py-28 lg:py-40">
      <Container className="text-center">
        <Eyebrow className="justify-center">Error 404</Eyebrow>
        <h1 className="mt-5 text-5xl font-extrabold sm:text-6xl">This page isn&apos;t on our line.</h1>
        <p className="mx-auto mt-5 max-w-lg text-lg text-navy/65">
          The page you are looking for may have moved. Explore our tube packaging products or get in touch.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/products" size="lg" variant="outline">
            View Products
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
