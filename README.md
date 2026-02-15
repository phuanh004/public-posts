# public-posts

Public posts (MDX + images) for [vickysold.com](https://vickysold.com).

This repository manages blog/article content separately from the main site, enabling independent content workflows and CI validation.

## Folder structure

```
posts/          # MDX post files (filename = slug)
images/         # Optimized images (.jpg + .webp + .avif)
scripts/        # Validation & utility scripts
.github/        # CI workflows, CODEOWNERS, PR template
```

## How it works

1. Authors add or edit MDX posts in `posts/` and images in `images/`.
2. CI validates frontmatter fields and checks that image variants exist.
3. On merge to `main`, the notify workflow:
   - Sends a `repository_dispatch` to `phuanh004/vickysold.com` for page revalidation
   - Calls the `/api/sync-posts` webhook to sync post metadata to Firestore

The main site reads metadata from Firestore and fetches raw MDX content from this repo's GitHub raw URLs at render time.

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
| `SITE_URL` | Production URL of the main site (e.g., `https://vickysold.com`) |
| `POSTS_SYNC_SECRET` | Shared secret for the sync-posts webhook — must match `POSTS_SYNC_SECRET` in the main site's `.env.local` |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidance on adding posts and images.
