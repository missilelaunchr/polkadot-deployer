const process = require('process');

const { Kubectl } = require('../clients/kubectl');


module.exports = {
  create: async (deployment, namespace='default') => {
    const kubectl = new Kubectl(deployment);
    await kubectl.waitNodesReady(namespace);
    const result = await kubectl.portForward('polkadot-node-0-0', 9944, namespace);

    const wsEndpoint = `ws://127.0.0.1:${result.port}`

    return { pid: result.pid, wsEndpoint };
  },
  delete: (pid) => {
    try {
      process.kill(-pid);
    } catch(_) {
      // FIXME: we are getting `unhandled-promise-rejection-rejection-id-1-error-kill-esrch`
      // here, but the detached process is removed
    }
  }
}
