import inquirer from 'inquirer';
import readline from 'readline';
import git from 'simple-git/promise'
import config from './config'

export const requestBranch = async () => {
    const branches = await git().branchLocal()
    readline.emitKeypressEvents(process.stdin);

    const issues = branches.all
        .filter(branch => branch.startsWith(config.prefix))

    const ui = new inquirer.ui.BottomBar();
    process.stdin.on('keypress', (ch, key) => {
        if (key && key.name === 'escape') {
            ui.close();
        }
    });

    const answers = await inquirer.prompt([{
            name: 'branch',
            type: 'list',
            message: 'Select an issue (press "esc" to cancel):',
            choices: issues
        }]
    )

    return answers['branch'];
};

export const searchIssueTagBranch = async issueTag => {
    const branches = await git().branchLocal()

    return branches.all.find(branch => branch.startsWith(`${config.prefix}${issueTag}`))
}

export const issueBranchPattern = `(${config.prefix}\\d*)`