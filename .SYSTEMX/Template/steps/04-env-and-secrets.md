# Step 04 — Environment and Secrets

## Goal

Configure local and deployed environments without placing credentials in source
control, setup packets, agent prompts, screenshots, or operational logs.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Add only Firebase web client values prefixed with `VITE_`. These identifiers
   are not server credentials, but they still belong to the intended project.
3. Keep service-account JSON, private keys, Stripe secret keys, and refresh
   tokens outside the repository and outside `.SYSTEMX`.
4. Run `npm run ci:security` before committing.

On macOS, protect server-side local secret files with owner-only permissions.
On Windows, use NTFS ACLs and grant access only to the current user; SYSTEMX
applies this policy to its non-secret local state automatically.

## CI and deployment

Use short-lived OIDC or Application Default Credentials with least-privilege IAM
for CI. Do not use legacy Firebase CI tokens. Configure production secrets in
the provider's secret manager and expose them only to the workload that needs
them.

## Gate

- `git status` contains no `.env.local`, service-account file, or private key.
- `npm run ci:security` passes.
- Local and CI identities target a staging project before production.
