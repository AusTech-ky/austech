import type { Product } from "@/content/types";

/** Where a product links to: its own site when it has one, otherwise its section on /products. */
export function productLink(product: Product) {
  return product.brand
    ? { href: product.brand.href, external: true, label: `Visit ${product.brand.by.toLowerCase()}` }
    : { href: `/products#${product.slug}`, external: false, label: `About ${product.name}` };
}
