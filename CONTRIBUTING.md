# Contributing

Thank you for contributing content to vickysold.com!

## Adding a new post

1. Create a new `.mdx` file in `posts/` (e.g., `posts/my-new-article.mdx`).
2. Add the required frontmatter at the top of the file:

```mdx
---
title: "Your Article Title"
slug: "your-article-slug"
author: "Author Name"
date: "2026-01-15"
---

Your content here...
```

### Required frontmatter fields

| Field | Type | Rules |
|---|---|---|
| `title` | string | Non-empty |
| `slug` | string | URL-safe: lowercase alphanumeric and hyphens only (e.g., `my-great-post`) |
| `author` | string | Non-empty |
| `date` | string | ISO 8601 date format (e.g., `2026-01-15`) |

## Adding images

1. Place the original `.jpg` (or `.png`) in `images/`.
2. Generate optimized variants: each source image must have matching `.webp` and `.avif` files with the same base name.

Example:
```
images/my-photo.jpg
images/my-photo.webp
images/my-photo.avif
```

CI will fail if any source image is missing its `.webp` or `.avif` variant.

## Pull request process

1. Fork this repo and create a feature branch.
2. Add your post and/or images.
3. Verify locally:
   ```bash
   npm install gray-matter glob
   node scripts/validate-frontmatter.mjs
   node scripts/verify-images.mjs
   ```
4. Open a PR against `main`. CI will run automatically.
5. A code owner will review your PR before merge.
