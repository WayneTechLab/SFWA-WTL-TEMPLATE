# Deployment

Firebase CLI `15.24.0` is pinned in the project. SYSTEMX constructs process
argument arrays and uses the same command on macOS and Windows.

```console
npm run deploy -- --target hosting --preflight
npm run deploy -- --target hosting --dry-run --project your-staging-project
npm run deploy -- --target rules --project your-staging-project
npm run deploy -- --target app --bump patch --project your-production-project
```

Targets are `all`, `app`, `hosting`, `rules`, and `functions`. The preflight
runs typecheck, lint, tests, security checks, and a production build.

Use interactive `firebase login` locally. CI must use OIDC or Application
Default Credentials with least privilege; legacy Firebase CI tokens are not a
supported authentication method.

Firebase dry-run validation does not release changes, but it can still enable
required APIs on the selected project. Use staging unless that effect is
explicitly approved.

Run `npm run deploy -- --rollback-info` to display release-inspection guidance.
Always verify project ID, rules, indexes, billing, and IAM before deployment.
