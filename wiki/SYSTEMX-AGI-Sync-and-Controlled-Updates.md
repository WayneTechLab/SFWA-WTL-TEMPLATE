# AGI Sync and Controlled Updates

The historical `AGI` label can be misunderstood. In the current G1 codebase,
`npm run wtl:agi` runs a governance and synchronization command. It aligns
managed operational metadata such as versions and generated agent adapters. It
is not an autonomous artificial general intelligence, a self-modifying
application, or an unattended production deployment service.

Use its check mode before releases:

```bash
npm run sync:system:check
```

The check detects operational drift. A non-check run may update the files it
manages; review and commit those changes like any other source change. It does
not approve a deployment, create cloud credentials, bypass branch protection, or
decide whether a production change is safe.

Deployment remains a controlled action through the deploy helper and vendor
authentication. It should require an authorized operator or an approved CI
identity, explicit target selection, quality evidence, monitoring, and a
rollback plan. Future automation should preserve these controls rather than
remove them.

If “self-update” is desired, define it as a reviewed update pipeline: fetch a
known source, verify integrity and compatibility, run tests in a non-production
environment, obtain approval, deploy deliberately, and retain rollback. Never
allow an agent or script to silently upgrade production dependencies or security
policies without evidence and accountable approval.
