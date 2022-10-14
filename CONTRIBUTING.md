# Contributing
The OSC website is free and open source software, all contributions are welcome and appreciated so long as they comply with AGPL-3.0-or-later licensing. To expedite the submission and review process, we urge all contributors to familiarize themselves with the following contribution guidelines.
## Table of contents
1. [Contribution Workflow](#contribution-workflow)
2. [Commit Messages](#commit-messages)
    - [Writing Messages](#writing-messages)
    - [Message Prefixes](#message-prefixes)
3. [Pull Requests](#pull-requests)
4. [Opening Issues](#opening-issues)
    - [Feature Proposals](#feature-proposals)
    - [Bugs & Errors](#bugs-and-errors)
    - [Typos](#typos)
    - [Fixing Issues & Implementing Proposals](#fixing-issues-and-implementing-proposals)
5. [Standard README](#standard-readme)
6. [Standard JS](#standard-js)
7. [Labels](#labels)
8. [Maintainers](#maintainers)

## Contribution workflow
Always discuss big changes by speaking with your group, by contacting a maintainer or by opening a discussion issue (see [opening issues](#opening-issues)).

Suggested workflow:
1. (Optional) fork the project repository.
2. Checkout a new branch from `main`.
   - ALWAYS branch from the latest version of `main`.
   - Each PR/feature goes on its own branch (again, branched from `main`). This ensures that new features are not dependent on uncommitted code.
3. Commit changes
   - Refer to [Commit Messages](#commit-messages) for writing commit messages.
   - Each commit should be small and specific, don't try to push large/generic commits like "updated app" or "updated to requested changes".
   - Each commit should describe a change to the codebase. You can nest multiple files under a commit, as long as the message applies to both.
   - Small, specific commits allow maintainers to easily revert/modify changes, keep track of versions and detect problems.
   - Messed up your commit history? Its ok, maintainers are the ones ultimately responsible for maintaining messages.
4. Write unit tests (if needed).
5. Once you're finished making changes...
   - Open a terminal and run `npm run test` to test your code.
   - If tests fail, it's your responsibility to fix breaking changes.
   - Lint your code with `npm run fix`. This will (try to) automatically fix your code syntax for you.
   - Run `npm run lint` to check for any remaining syntax issues. Please fix these.
6. Push to origin with `git push origin [your branch name]` on your terminal.
7. Create a pull request.
   - If you've made changes to a fork, make sure you're opening a pull request to the original remote repository.
   - Always open PR's on the `main` branch unless otherwise instructed. Convoluted merge histories create dependency hell and are hard to review.
   - Add a descriptive title and describe your changes.
   - Refer to [Pull Requests](#pull-requests)
8. Wait for your code to be reviewed and repeat steps 3-6 for any requested changes.
## Commit Messages
Commits and commit messages should be written for each (loosely) independent change made. It goes without saying that messages should be as specific as possible - if a change can't be described in a single sentence then it probably has to be broken down into multiple commits.

Messed up your commit history? That's ok, maintainers are the ones ultimately responsible for maintaining commit messages.

### Writing messages
That said, avoid commiting large changes all at once: messages like `updated app` or `fixed problem` should be broken down into their specific constituents. For example:
1. `fixed problem` should ideally be broken up into multiple commits like `fix: added missing form validation` or `fix: typo`.
2. `updated app`: What exactly did you update and how did you do it? Break up each change into a commit like `feat: added form element for xyz`, or `feat: added password field`.

### Message prefixes
We recommend adding the following prefixes to your commit messages. These aren't necessary, but they keep the commit history clean-looking:
- `feat: ...`: For new features.
- `docs: ...`: For adding or changing documentation
- `ci: ...`: For modifying CI, jobs or workflows
- `fix: ...`: For when you've fixed something.
- `lint: ...`: For when you've fixed/changed code syntax.
- `refactor: ...`: For when you've rewritten or reorganized something. Use this if you've moved files or created folders. This is different from `lint` because it doesn't necessarily describe syntactical changes, it describes organizational changes.
- Does your specific change not apply to any of these? Use your own best judgement.
## Pull Requests
1. Always discuss big changes with by speaking to your group, by contacting a maintainer or by opening a discussion issue (see [opening issues](#opening-issues)). This increases the likelihood that they'll be accepted.
2. Always open pull requests on the `main` branch.
3. Each branch and pull request should only feature 1 significant change. We might like one feature but not like the other - if they're on separate PRs we can approve/reject them easily, otherwise you'll have to do a lot of refactoring.
4. Add an appropriate title. Like commit messages, your PR titles should be intuitive to understand and should give a good overview of what you've accomplished.
5. Add a description. Explain what you've done and why you've done it - it might be useful to include code blocks and explain your reasoning.
## Opening issues
### Feature proposals
1. Add an appropriate title.
2. Explain your proposed feature and why it might be useful.
3. (Optional) Suggest an approach/method for it to be done.
4. (Optional) Request to be assigned if you want to implement the proposal yourself.
5. (Optional) Add the github `proposal` issue label.
### Bugs and errors
1. Add an appropriate title.
2. Explain the bug/error you've encountered.
3. Add a list of steps to reproduce the problem.
4. (Optional) Add a screenshot.
5. (Optional) Add the github `bug` or `error` label.
### Typos
Dont open issues for typos, just fix them and create a PR.
### Fixing issues and implementing proposals
Please ask (by replying to the conversation) before trying to fix an issue or implement a feature proposal. Don't waste your time: the issue might be outdated, someone else might already be assigned or we might be waiting for more information.
## Standard README
This repository adheres to the README standard style described [here](https://github.com/RichardLitt/standard-readme). Please adhere to the standard when making or requesting changes.

Maintainers are responsible for enforcement.
## Standard JS
This repository adheres to Javascript Standard syntax described [here](https://standardjs.com/). Contributors can run `npm run lint` to list syntax issues that need to be fixed for adherence, or `npm run fix` to (try to) automatically fix some of them.

Maintainers are responsible for enforcement.
## Labels
Refer to this guideline on what labels to use and look for when deciding on what to contribute to.
- `bug/error`: Something isn't working properly.
- `difficulty`: How hard the issue is to resolve (easy, medium, hard).
- `discussion`: Should be discussed before moving forward.
- `documentation`: Related to the documentation.
- `duplicate`: It already exists.
- `good first issue`: Friendly for beginners to work on.
- `help wanted`: Someone is needed to work on it.
- `priority`: How important it needs to be worked on (low, medium, high).
- `proposal`: Brings up a new idea.
- `question`: Requesting more information.
- `wontfix`: Won't be worked on anymore.

## Maintainers
1. Review all PRs before merging.
2. When upgarding the release version:
   - Create a `BUMP X.X.X` commit message (where `X.X.X` is the version). If anyone ever wants to revert to a particular version, they can just modify the git history head to point to this commit.
   - The `package.json` contains a version tag, make sure it gets updated.
   - Create a github release.
3. Enforce Standard README style.
4. Enforce unit testing: ask contributors to write unit tests and fix failing PRs.
5. Enforce Javascript Standard style: ask contributors to `npm run lint` and `npm run fix`.
6. Enforce commit history: rebase commit messages if required.
7. Discuss big changes with the group.
8. Ask another maintainer to peer-review your code.
