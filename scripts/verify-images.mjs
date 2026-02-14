import { existsSync } from "fs";
import { globSync } from "glob";
import { basename, dirname, extname, join } from "path";

const SOURCE_EXTS = [".jpg", ".jpeg", ".png"];
const REQUIRED_VARIANTS = [".webp", ".avif"];

const images = globSync("images/**/*.{jpg,jpeg,png}");

if (images.length === 0) {
  console.log("No source images found — skipping variant verification.");
  process.exit(0);
}

let errors = 0;

for (const img of images) {
  const dir = dirname(img);
  const name = basename(img, extname(img));

  for (const ext of REQUIRED_VARIANTS) {
    const variant = join(dir, `${name}${ext}`);
    if (!existsSync(variant)) {
      console.error(`Missing variant: ${variant} (source: ${img})`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(
    `\nImage verification failed: ${errors} missing variant(s).`
  );
  console.error(
    "Run the image optimization script to generate .webp and .avif variants."
  );
  process.exit(1);
} else {
  console.log(
    `All ${images.length} source image(s) have required .webp and .avif variants.`
  );
}
