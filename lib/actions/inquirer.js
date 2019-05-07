const inquirer = require('inquirer');

const db = require('../db');

module.exports = {
  create: async () => {
    const questions = [
      {
        name: 'name',
        type: 'input',
        message: 'Enter the new deployment name:',
        validate: async (name) => {
          const existing = await existingDeployments();

          if (existing.includes(name)) {
            console.log(`\n${name} deployment already exists, please pick another name`);
            return false;
          } else if (!name) {
            return false;
          } else {
            return true;
          }
        }
      },
      {
        name: 'type',
        type: 'list',
        message: 'Deployment type:',
        choices: ['Local', 'Remote']
      },
      {
        name: 'remote_provider',
        type: 'list',
        message: 'Remote provider:',
        when: (answers) => answers.type === 'Remote',
        choices: ['Digital Ocean', 'Azure', 'AWS']
      },
      {
        name: 'nodes',
        type: 'number',
        message: 'Number of Polkadot nodes:',
        validate: (number) => number > 0,
      }
    ];
    return inquirer.prompt(questions);
  },
  destroy: async () => {
    const existing = await existingDeployments();
    const questions = [
      {
        name: 'name',
        type: 'list',
        message: 'Deployment to destroy:',
        choices: existing
      }
    ];
    return inquirer.prompt(questions);
  }
};

async function existingDeployments() {
  const deployments = await db.list();

  let output = [];
  deployments.forEach((deployment) => {
    output.push(deployment.name);
  })
  return output;
}