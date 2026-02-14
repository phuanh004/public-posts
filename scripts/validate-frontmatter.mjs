import { readFileSync } from "fs";
import { globSync } from "glob";
import matter from "gray-matter";

const REQUIRED_FIELDS = ["title", "slug", "author", "date"];
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const files = globSync("posts/**/*.mdx");

if (files.length === 0) {
  console.log("No MDX files found — skipping frontmatter validation.");
  process.exit(0);
}

let errors = 0;

for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const { data } = matter(raw);

  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || String(data[field]).trim() === "") {
      console.error(`${file}: missing or empty required field "${field}"`);
      errors++;
    }
  }

  if (data.slug && !SLUG_RE.test(data.slug)) {
    console.error(
      `${file}: slug "${data.slug}" is not URL-safe (use lowercase alphanumeric + hyphens)`
    );
    errors++;
  }

  if (data.date) {
    const d = new Date(data.date);
    if (isNaN(d.getTime())) {
      console.error(
        `${file}: date "${data.date}" is not valid ISO 8601`
      );
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\nValidation failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log(`All ${files.length} MDX file(s) passed frontmatter validation.`);
}
