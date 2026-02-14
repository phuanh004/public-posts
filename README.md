# public-posts

Public posts (MDX + images) for [vickysold.com](https://vickysold.com).

This repository manages blog/article content separately from the main site, enabling independent content workflows and CI validation.

## Folder structure

```
posts/          # MDX post files
images/         # Optimized images (.jpg + .webp + .avif)
scripts/        # Validation & utility scripts
.github/        # CI workflows, CODEOWNERS, PR template
```

## How it works

1. Authors add or edit MDX posts in `posts/` and images in `images/`.
2. CI validates frontmatter fields and checks that image variants exist.
3. On merge to `main`, a workflow sends a `repository_dispatch` to `phuanh004/vickysold.com` so the main site can revalidate affected pages.

## Local development

```bash
# Validate frontmatter
npm install gray-matter glob
node scripts/validate-frontmatter.mjs

# Verify image variants
node scripts/verify-images.mjs
```

## Secrets

The following secrets must be configured in **Settings > Secrets and variables > Actions**:

| Secret | Purpose |
|---|---|
| `REPO_DISPATCH_TOKEN` | GitHub PAT with `repo` scope — used to send `repository_dispatch` to the main site |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidance on adding posts and images.
