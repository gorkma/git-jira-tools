# git-jira-tools
A serie of tools to speedup day to day work with jira based projects

[![CircleCI](https://circleci.com/gh/gorkma/git-jira-tools.svg?style=svg)](https://circleci.com/gh/gorkma/git-jira-tools)
[![npm version](https://badge.fury.io/js/git-jira-tools.svg)](https://badge.fury.io/js/git-jira-tools)


## Description :
This command line utility helps you to be more productive speeding up common tasks done on projects working with jira tags and git which follow the branch style `PRE-123-branch-description` and the commit pattern `PRE-123 commit description` which stands for the pattern:

* Branch name:

 `{jira_project_prefix=PRE-}+{issue_number=123}+{lowercase description with separators=-}`

* Commit:

 `{jira_project_prefix=PRE-{+issue_number=123}+{lowercase description}`

It gives you commands for:

* starting a new branch with a tag and description
* committing on a branch following the pattern
* moving between branches
* closing a branch (remote and local)
* listing open branches
* publishing and openning pr for a branch (currently github only)
* updating already published branch
* updating branch from master

## Installation

```bash
$ npm i -g git-jira-tools
```

## Configuration

You must provide a `.env` file in the project you are working on with some options:

* `JG_TOOLS_PREFIX` required. Jira project tag For example *PRE-*
* `JG_TOOLS_MAIN_BRANCH` main branch to take as reference for updating, new branch creation or PR opening. By default *master*
* `JG_TOOLS_BRANCH_SEPARATOR` will be used on branch names as separator. By default *-*
* `JG_TOOLS_REMOTE` remote repository. By default *origin*

*Example:* 

```bash
JG_TOOLS_PREFIX='PRE-'
JG_TOOLS_REMOTE='upstream'
```

## Usage

### gjt-issues

Lists available issue branches. Branches beginin with the prefix `PRE-id-`

```bash
$ gjt-issues
```

### gjt-start

Starts working in a new issue. Will create a new branch from master. The description will be branch name preceded by the tag.

```bash
$ gjt-start tag description [--from-current | --fc]
```

*Example:* 

```bash
$ gjt-start 123 issue name

Creates branch PRE-123-issue-name
```

*Options:*

* `--from-current`, `--fc`: Will create branch from current one instead from master.

### gjt-close

Ends working in the issue. Will remove remote and local branch. If no branch is specified it will request to select one of the available issue branches.

```bash
$ gjt-close [tag]
```

*Example:* 

```bash
$ gjt-close 123

Deletes branch PRE-123-description localy and remotely
```

### gjt-move

Moves to selected issue branch. If no branch is specified it will request to select one of the available issue branches.

```bash
$ gjt-move [tag]
```

*Example:* 

```bash
$ gjt-move 123

Moves to branch PRE-123-description
```

### gjt-update

Updates current branch rebasing master branch. Before rebasing master it will pull master changes from remote. If there is work in progress it will stash changes and reaply them after updating. If there are conflicts on rebasing, stashed changes will be available but won't be applied you will have to resovle conflicts and continue rebasing manually.

```bash
$ gjt-update
```

*Example:* 

```bash
$ gjt-update
```

### gjt-save

Commits currently staged changes. You must be in a issue branch to be able to save work in progress.

```bash
$ gjt-save commit_messsage
```

*Example:* 

```bash
$ gjt-save adding new files to current issue branch

Commits staged WIP into the issue branch with the message "PRE-issue_tag Adding new files to current issue branch"
```

### gjt-publish

Pushes changes of the selected issue branch to remote. If no branch is specified it will publish current branch. By default it opens create pull request screen (only github).

```bash
$ gjt-publish [tag]
```

*Example:* 

```bash
$ gjt-publish 123

Pushes branch PRE-123-description to remote
```

*Options:*

* `--no-pr`: Won't open create pull request screen.

### gjt-republish

Pushes updates of the selected issue branch to remote. If no branch is specified it will publish current branch. Will force changes replacing remote branch if available.

```bash
$ gjt-republish [tag]
```

*Example:* 

```bash
$ gjt-republish 123

Force pushes branch PRE-123-description to remote
```
