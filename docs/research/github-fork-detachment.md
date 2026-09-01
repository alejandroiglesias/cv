# Detaching `alejandroiglesias/cv` from its GitHub fork network

Research date: 2026-09-01

## Conclusion

Yes. GitHub now provides a self-service **Leave fork network** action that turns an eligible fork into a standalone repository. `alejandroiglesias/cv` appears eligible, so this is the preferred path. It keeps the repository name and Git commit metadata but deliberately discards GitHub-side metadata. The operation is permanent.

No Git remotes or GitHub settings were changed during this research.

## Current repository state

Read-only checks against the [GitHub repository API](https://api.github.com/repos/alejandroiglesias/cv) and the local checkout found:

- Repository: [`alejandroiglesias/cv`](https://github.com/alejandroiglesias/cv), currently a fork of [`acdcorp/test-frontend`](https://github.com/acdcorp/test-frontend).
- Public repository, 6,443 KiB (about 6.3 MiB), with 0 child forks. This satisfies GitHub's three self-service conditions: public, under 1 GB, and no child forks.
- 0 issues, 0 pull requests, 0 stars, and 1 watcher.
- GitHub Pages is live at [`alejandroiglesias.github.io/cv/`](https://alejandroiglesias.github.io/cv/) and publishes through a custom GitHub Actions workflow.
- 39 Actions runs currently exist. Repository configuration also has one `github-pages` environment, and no repository-level Actions secrets, Actions variables, webhooks, deploy keys, or rulesets.
- Remote Git refs currently include `main`, `legacy`, and `gh-pages`; no tags or Git LFS-tracked files were found.

The counts above are a point-in-time inventory, not preservation guarantees.

## Supported option 1: leave the fork network in Settings

GitHub's documented path is:

1. Open the repository on GitHub.
2. Go to **Settings → General → Danger Zone**.
3. Select **Leave fork network**.
4. Accept the warnings, type the repository name, and confirm.

This is available only when the fork is public, smaller than 1 GB, and has no child forks. GitHub says that some operations are briefly unavailable while the conversion runs. See [Detaching a fork](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/detaching-a-fork).

### What GitHub explicitly preserves

- All Git commit metadata. The commit history is therefore preservable without squashing or starting a new history.
- The repository becomes standalone and no longer automatically syncs with the original repository.

This removes GitHub's fork-network relationship and the repository-page fork label; it does not rewrite shared ancestry. Historical commits, authorship, and any early commits inherited from the original repository remain in the Git history. A separate history rewrite would be a different, much more invasive operation and is not required merely to detach the fork.

### What GitHub explicitly does not preserve

- Issues
- Pull requests
- Wikis
- Stars
- Watchers
- Comments
- Child forks
- Other repository metadata

GitHub also states that leaving the network is permanent: the standalone repository cannot later be reconnected to the fork network. These guarantees and warnings are all in [Detaching a fork](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/detaching-a-fork).

For this repository, the explicitly enumerated loss is currently small: there are no issues, pull requests, stars, or child forks, and only one watcher.

## Supported option 2: manually delete, recreate, and mirror-push

GitHub documents a fallback that:

1. Creates a bare clone of the fork.
2. Deletes the fork on GitHub.
3. Creates a new repository with the same name in the same account.
4. Mirror-pushes the bare clone to the same remote URL.

The exact command sequence is maintained in [Detaching a fork](https://docs.github.com/en/pull-requests/how-tos/work-with-forks/detaching-a-fork). GitHub's [Duplicating a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository) documentation explains the bare-clone and mirror-push mechanism. A mirror carries the Git refs and revision history, so the remote branches and commit history can be preserved.

This path is riskier. GitHub warns that deleting the fork permanently deletes associated pull requests and configurations and cannot be undone. Deleting a repository also permanently deletes team permissions; see [Deleting a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository). Some repositories can be restored within 90 days, but restoration has fork-network constraints, so restoration should not be treated as a rollback plan; see [Restoring a deleted repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/restoring-a-deleted-repository).

Reusing the same owner and repository name lets the recreated repository use the same Git remote URL. GitHub does not promise uninterrupted availability or preservation of GitHub-side metadata.

## Pages, Actions, and settings risk

GitHub explicitly promises preservation of Git commit metadata, while explicitly excluding the named metadata categories and "other metadata." It does **not** enumerate every Pages, Actions, and repository setting in the detachment article. The safe interpretation is therefore:

- The tracked workflow file, `.github/workflows/deploy.yml`, is Git content and should remain with the Git history. GitHub defines workflows as YAML files stored in `.github/workflows`; see [Workflow syntax for GitHub Actions](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax).
- Do not assume that Actions run history, logs, artifacts, caches, deployments, the `github-pages` environment, Actions permissions, or other repository-side settings will survive. Back up anything important and verify/reconfigure after detachment.
- Repository and environment secrets/variables are settings, not Git-tracked workflow content. This repository currently has no repository-level Actions secrets or variables, which reduces the risk. See [Secrets](https://docs.github.com/en/actions/concepts/security/secrets) and [Variables](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-variables).
- Pages publishing source is configured in repository Settings. The workflow file should survive, but Pages source, deployment state, environment protection, HTTPS/custom-domain settings, and continuity are not explicitly guaranteed. Plan to select **GitHub Actions** again if necessary and manually rerun the deployment workflow. See [Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
- In the manual delete/recreate path, deleting the repository deletes its Pages site, so temporary downtime is expected until the recreated repository is configured and deployed. See [Deleting a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/deleting-a-github-pages-site).

The distinction matters: workflow **code** is preserved as Git content; GitHub-hosted run/deployment history and configuration are not covered by GitHub's preservation guarantee.

## GitHub Support

The official detachment guide links to GitHub's [fork support request](https://support.github.com/request/fork). This is a reasonable escalation route if the self-service button is unavailable or the repository fails an eligibility check. GitHub's public documentation does not promise that Support can bypass the eligibility rules or preserve metadata, so neither should be assumed.

## Recommended execution checklist

1. Prefer **Settings → General → Danger Zone → Leave fork network**; the repository currently meets the documented requirements.
2. Before confirming, capture screenshots or an inventory of Pages, Actions, environments, branch settings, collaborators, webhooks, deploy keys, rulesets, secrets/variable names, releases, and any metadata worth retaining.
3. Ensure `main`, `legacy`, and `gh-pages` are present in a fresh bare/mirror backup. Keep the backup until verification is complete.
4. Schedule a short maintenance window because GitHub warns that some operations are briefly unavailable and does not promise Pages continuity.
5. After detachment, verify:
   - GitHub no longer labels the repository as a fork.
   - `main`, `legacy`, and `gh-pages` exist and representative old and new commit SHAs resolve.
   - The default branch and repository visibility are correct.
   - Pages source is **GitHub Actions** and [`alejandroiglesias.github.io/cv/`](https://alejandroiglesias.github.io/cv/) loads.
   - The deployment workflow is enabled; manually run it and confirm a successful Pages deployment.
   - Required repository settings, environment protections, permissions, and integrations are restored.

## Recommendation

Use the self-service **Leave fork network** action, not the delete/recreate fallback. It is the shortest official path, the repository meets its eligibility conditions, Git commit metadata is explicitly preserved, and the repository currently has very little social/issue metadata to lose. Still treat the live Pages deployment and its GitHub-side Actions/settings history as at risk and verify them immediately afterward.
