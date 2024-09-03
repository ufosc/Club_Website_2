---
slug: "/cen3031-open-source-projects"
date: "2024-09-02"
title: "How to Contribute to Open Source as a CEN3031 Student"
author: ["Michail Zeipekki", "Daniel Wildsmith"]
featuredImage: ../images/blog/2024-09-01-projects-for-cen3031.png
subtitle: Contribution guide and a list of open issues for CEN3031 University of Florida students
---

CEN3031 is the "Introduction to Software Engineering" class at the University of Florida. Some professors require students to contribute to open source projects as part of their coursework, (oftentimes) including projects maintained by the UF Open Source Club (OSC). This guide is a high-level overview of the open source contribution workflow, including how to contribute to OSC as a CEN3031 student. Please note, expectations may vary across semesters, so please consult your course material to determine whether contributions to the club are allowed.

If you're interested in software development or open-source work, consider joining the Open Source Club. Collaborating on projects can enhance your portfolio and improve your chances when applying for internships. Leadership roles, such as tech lead or executive board member, are also available for those wishing to strengthen their resume. Effectively, the club serves as a "third-place" for fostering a tight-knit community centered around technology. Members are invited to hang out, find friend groups with similar interests, and work on open-source projects together. We host weekly "casual coding" sessions for collaboration, along with workshops and hackathons featuring industry professionals and former interns. For updates on meetings and coding sessions, please join our [Discord](https://discord.gg/Gsxej6u) channel.

If you have any questions or need additional assistance, don't hesitate to reach out via [Discord](https://discord.gg/Gsxej6u) or our [contact form](http://localhost:8000/#get-in-touch).

## Table of Contents
1. [Open Source Projects on GitHub](#open-source-projects-github)
2. [GitHub Issues: Opportunities for Contribution](#open-issues)
3. [Beginners Guide to Git & GitHub](#beginners-guide)

<h2 id="open-source-projects-github"> Open Source Projects on GitHub </h2>

Contributions to the open source club are organized through [GitHub](https://github.com/ufosc). GitHub is a platform for version control and collaborative software development that uses Git to track changes in code, allowing multiple developers to work on the same project simultaneously. To use GitHub, you'll need to familiarize yourself with [Git](https://git-scm.com/) - please refer to the final section of this article for a brief introduction.

Every semester, Open Source club members propose and vote on new projects. The most voted-for ideas are taken up by tech-leads, which set up a GitHub repository, organize members, and delegate tasks. Contributing to open source projects is a great way to improve your CV as a University of Florida student. Currently, the following OSC open source projects are open to contributions:

 1. [Echo Chat App](https://github.com/ufosc/OSC-Proximity-Chat-App): a peer-to-peer (P2P) mobile app for talking to students within a radius around you. Built with NodeJS (TypeScript) and React Native.
 2. [Jukebox](https://github.com/ufosc/Jukebox-Server): A NodeJS (TypeScript) full-stack that integrates with the Spotify API, allowing users to add and play songs through a collaborative queue.
 3. [Bytes of Love](https://github.com/ufosc/VisualNovel): A visual novel video game in RenPy Python. Players learn about different programming languages through an interactive dating simulator.
 4. [Bytes of Love website](https://github.com/ufosc/BytesOfLoveWebsite): website for the Bytes of Love game.
 5. [Alarm Clock](https://github.com/ufosc/Alarm-Clock): Alarm clock with configurable punishments for not waking up. Built with NodeJS (TypeScript) and Expo Go.

<h2 id="open-issues"> GitHub Issues: Opportunities for Contribution </h2>

At the open source club, we publish tasks to be completed as GitHub issues. GitHub Issues are a feature that helps track tasks, bugs, feature requests, and discussions within a project. They allow developers to organize and prioritize work, facilitate communication, and plan project milestones effectively.

**This page will be actively updated to reflect new issues.** To contribute, please post a reply asking to be assigned to the issue. **If an issue is insufficiently explained or you need help, PLEASE ASK!!!** Issues are assigned on a first-come-first-serve basis:

 1. Echo Chat App:
    * [Implement OAuth for Google Sign in with Firebase (frontend)](https://github.com/ufosc/OSC-Proximity-Chat-App/issues/234)
    * [Create Email Verification page (frontend)](https://github.com/ufosc/OSC-Proximity-Chat-App/issues/233)
    * [Migrate message data structure to hashmap (frontend)](https://github.com/ufosc/OSC-Proximity-Chat-App/issues/232)
    * [Rework contexts for clarity](https://github.com/ufosc/OSC-Proximity-Chat-App/issues/235)
    * [Create a Theme Folder](https://github.com/ufosc/OSC-Proximity-Chat-App/issues/236)
    * [Create basic splash screen](https://github.com/ufosc/OSC-Proximity-Chat-App/issues/237)
    * [Move sign-out button to settings screen](https://github.com/ufosc/OSC-Proximity-Chat-App/issues/238)

 2. Jukebox:
    * [Create CRUD endpoints for club model (backend)](https://github.com/ufosc/Jukebox-Server/issues/14)
    * [Create authentication REST API (backend)](https://github.com/ufosc/Jukebox-Server/issues/13)
    * [Create "CLUB" model (backend)](https://github.com/ufosc/Jukebox-Server/issues/12)
    * [Create user authentication logic (backend)](https://github.com/ufosc/Jukebox-Server/issues/11)
    - [Build Board 2 page (frontend)](https://github.com/ufosc/Jukebox-Frontend/issues/57)
    - [Make song card component (frontend)](https://github.com/ufosc/Jukebox-Frontend/issues/56)
    - [Build landing page (frontend)](https://github.com/ufosc/Jukebox-Frontend/issues/52)

 3. Bytes of Love:
    * [Add black border to text in UI](https://github.com/ufosc/VisualNovel/issues/93)
    * [Develop starting screen GUI](https://github.com/ufosc/VisualNovel/issues/92)
    * [Set up gitignore](https://github.com/ufosc/VisualNovel/issues/42)
    * [Create story flow chart for characters](https://github.com/ufosc/VisualNovel/issues/22)
    * [Remove Anton's name from the README file](https://github.com/ufosc/VisualNovel/issues/17)

 4. Bytes of Love Website:
    * [Create Custom Themed Right-Side Scrollbar](https://github.com/ufosc/BytesOfLoveWebsite/issues/38)
    * [Fix unnecessary horizontal scrollbar](https://github.com/ufosc/BytesOfLoveWebsite/issues/37)
    * [Fix typos on home page](https://github.com/ufosc/BytesOfLoveWebsite/issues/36)
    * [Fix download links](https://github.com/ufosc/BytesOfLoveWebsite/issues/15)
    * [Redesign home page carousel](https://github.com/ufosc/BytesOfLoveWebsite/issues/35)

 5. Alarm Clock:
    * [Update README](https://github.com/ufosc/Alarm-Clock/issues/60)
    * [Add Unit Tests](https://github.com/ufosc/Alarm-Clock/issues/61)
    * [Add delete confirmation modal](https://github.com/ufosc/Alarm-Clock/issues/62)
    * [World Clock UI Update](https://github.com/ufosc/Alarm-Clock/issues/63)
    * [Alarms UI Update](https://github.com/ufosc/Alarm-Clock/issues/64)

If none of these issues interest you, we recommend joining our [Discord](https://discord.gg/Gsxej6u) and getting in touch with the tech leads within the project channels. They may be looking for help with tasks that have not yet been posted as issues.

<h1 id="beginners-guide"> Beginners Guide to Git & GitHub </h1>

> This guide is an adaptation of a previous blog post. To read the original, click [here](https://docs.ufosc.org/docs/club/resources/git).
> We also have detailed beginner's guides for [Python](https://docs.ufosc.org/docs/club/resources/python), [Rust](https://docs.ufosc.org/docs/club/resources/rust), [JavaScript](https://docs.ufosc.org/docs/club/resources/javascript), and [HTML/CSS](https://docs.ufosc.org/docs/club/resources/html).

## Installing Git
Git can be installed via its installer [here](https://git-scm.com/downloads). Alternatively, Mac0S and Linux users can install git via [Homebrew](https://brew.sh) or via their respective linux package manager (see [instructions](https://git-scm.com/download/linux)).

## Contributing to a project

### Recommended Workflow
1. (Optional) Fork a repository
2. Clone repository
3. Navigate to repository files via your command line.
4. Create a branch.
5. Navigate to branch.
6. Make & commit changes
7. Push changes
8. Repeat steps 6-7 as many times as necessary
9. Open a github pull request

### Navigating Github (steps 1-3)

**Forking a repository:**

If you're working on your own repository or have explicit permission to modify the source repository, then you can skip this step. Otherwise, forking will allow you to create branches and push changes to a personal copy before you can open a pull request (you most likely wont be able to do directly on the original repo without special permissions).

<img title="forking" alt="Screenshot of forking a repo" src="https://docs.ufosc.org/img/club/git-guide/forking.png" />

**Cloning a repository:**

If you've just forked a repo, make sure you are cloning your fork and not the original. Github should redirect you automatically; if it doesn't,  you can navigate to your `Profile>Repositories` and select the fork from there.

To clone, click on the Code button and copy the HTTPS source:

<img title="copying source" alt="Screenshot of copying git source" src="https://docs.ufosc.org/img/club/git-guide/copying-src.jpg" />

Then, open up your terminal and type:

```bash
cd [desktop/downloads, wherever you want to copy to]
git clone [source you've just copied]
cd [Name of your project]
```

`git clone` will copy the project onto your desired directory, whilst `cd` will allow you to navigate between directories. At this point, you should be in your project's main folder. To show a list of all available files, you can run:

```bash
ls
```

### Contributing via VSCode (steps 4-8)
<iframe width="500" height="300" src="https://www.youtube.com/embed/TUYt4oXLxQs" title="Source Control Tip 4: Source Control View in VS Code" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

For more detailed instructions, see [here](https://docs.ufosc.org/docs/club/resources/git#contributing-with-vscode-steps-4-8).

### Contributing with the command line (steps 4-8)
The following steps walk you through the contribution workflow via the command line (terminal).

**Fetching & pulling**

If you've just cloned a repository then there's (probably) no need to do this. However, you'll want to run these commands before you start working on new contributions to make sure your main branch is up-to-date with your source - you don't want to start making changes to an old version of the codebase.

First of all, make sure you're on the main branch:
```bash
git checkout main
```

Then, fetch:
```bash
git fetch
```
Fetching will ping the github server and download new changes. However, Git doesn't automatically apply these changes (in case you're still working on something).

If you've made any uncommitted changes, you should save them before pulling. Pulling might also give you an error if you have uncommited changes - even if you dont want to keep them. You can resolve these errors (and save your uncommited work) by running:

```bash
git stash
```

Then, load the new changes with pull:
```bash
git pull
```

If at this point you want to discard your old uncommited changes, then skip the following step. Otherwise, you can restore your changes with:
```bash
git stash pop
```

If you ever want to see an organized list of all your changes and staged work, you can run:
```bash
git status
```
This will also show you the uncommitted work you may (or may not) want to save before pulling.

**Creating a branch**

Branching allows you to maintain an isolated copy of the codebase for you to implement new features in. Once you've made sure you're on main (`git checkout main`), you can create a new branch with:

```bash
git branch [your_branch_name]
```

At this point, you're still on main, so you want to navigate to your new branch with:
```bash
git checkout [your_branch_name]
```

**Making and committing changes**

Commits are the changes that you're "committed" to, meaning you are certain about wanting to keep and push them to the original source of your project. Once you are done working on your code, you can view all your changes with:

```bash
git status
```
This will show you a list of staged, uncommited and untracked files. New files are always untracked because git has never heard of them before - you'll want to treat these the same as uncommitted changes. Uncommited changes are changes made to files that git knows about, but haven't yet been committed. Finally, staged changes are the changes that will be saved to a commit once you commit your work.

Your goal is to move all the changes you are happy with to the 'staged' portion in `git status`. Before doing this, make sure to review all your uncommited and untracked changes and decide which of those you want to keep or discard.

Then, begin staging your desired changes with:
```bash
git add [file_name]
```

You can add multiple files at once with:
```bash
git add [file_name] [file_name2] [file_name3] ...
```

Once youre ready, you can commit (i.e. "finalize/save") these changes using:
```bash
git commit -m "enter a message describing your changes"
```

You dont have to add all your changes into a single commit - and its probably best if you dont. You can repeat these steps as many times as you want: making changes, staging, and committing as many times as necessary. Its always a good idea to separate your work into multiple commits, just make sure to use descriptive and detailed messages.

Once you've made your changes, you can sync with github using:
```bash
git push origin [name of your current branch]
```
If you open up your fork page on github, you'll probably see a message alerting you of these new changes. These are not final yet, you'll need to merge your fork before they'll appear on the main branch (more on that later).

Though you can technically push as often and as many times as you want, it's probably a good idea to wait until you're all done with your work. In the event that you want to remove or backtrack one of your commits, it'll be easier to do so when they haven't yet been synced with github.

## Keeping your fork up to date
You'll want to stay up to date with new changes so that you're always starting your work on the latest version of the codebase. To do this, you'll need to regularly sync your fork. An option should appear on your fork's page to sync with original repo. You'll need to sync it regularly and then update the copy on your laptop with:

(make sure you're on main):
```bash
git checkout main
```

Download changes:
```bash
git fetch
```

Load changes:
```bash
git pull
```
