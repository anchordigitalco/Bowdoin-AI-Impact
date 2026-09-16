import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/lib/sanity/client";

const builder = createImageUrlBuilder(client);

/** Sanity's image URL builder, pre-bound to this project's client. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
