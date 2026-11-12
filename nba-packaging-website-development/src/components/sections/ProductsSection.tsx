import { Container, SectionHeading } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";

export function ProductsSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        {showHeading ? (
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Our Products"
              title="Packaging Solutions Designed Around Your Product."
              description="Three tube materials, one focus: beautifully printed empty tubes that make your brand stand out."
            />
          </Reveal>
        ) : null}
        <div className={showHeading ? "mt-14 grid gap-6 lg:grid-cols-3 lg:gap-8" : "grid gap-6 lg:grid-cols-3 lg:gap-8"}>
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
