#!/usr/bin/env node

import git from 'simple-git/promise'
import ora from 'ora'
import { requestBranch, searchIssueTagBranch } from './utils';

const run = async (issueTag) => {
    const spinner = ora()

    const branch = !issueTag
        ? await requestBranch()
        : await searchIssueTagBranch(issueTag)

    if (!branch) {
        return spinner.fail('Branch not found');
    }

    await git().checkout(branch)
    spinner.succeed('Moved to branch')
};

run(process.argv[2]).catch(e => console.error(e));