import inquirer from 'inquirer'
import readline from 'readline'
import git from 'simple-git/promise'
import config from './config'

export const requestBranch = async () => {
  const branches = await git().branchLocal()
  readline.emitKeypressEvents(process.stdin)

  const issues = branches.all.filter(branch => branch.startsWith(config.prefix))

  const ui = new inquirer.ui.BottomBar()
  process.stdin.on('keypress', (ch, key) => {
    if (key && key.name === 'escape') {
      ui.close()
    }
  })

  const answers = await inquirer.prompt([
    {
      name: 'branch',
      type: 'list',
      message: 'Select an issue (press "esc" to cancel):',
      choices: issues
    }
  ])

  return answers['branch']
}

export const searchIssueTagBranch = async issueTag => {
  const branches = await git().branchLocal()

  return branches.all.find(branch => branch.startsWith(`${config.prefix}${issueTag}`))
}

export const issueBranchPattern = `(${config.prefix}\\d*)`

export const githubLink = async branch => {
  const remoteUrl = (await git().getRemotes(true)).find(remote => remote.name === config.remote).refs.fetch
  const nameRegexp = /.*:(.*\/.*).git/

  if (remoteUrl.match(nameRegexp)) {
    const name = remoteUrl.match(nameRegexp)[1].trim()

    return `https://github.com/${name}/compare/${config.mainBranch}...${branch}?expand=1`
  }
}
