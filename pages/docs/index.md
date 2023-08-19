# Getting Started

1. Install the [signet-cli](https://github.com/signet-framework/signet-cli) (see below)
2. Self host the Signet [broker](https://github.com/signet-framework/signet-broker) in one of the following ways:
   - Deploy the Signet broker to AWS with the `signet deploy` [CLI command](https://signet-framework.dev/docs/commands#signet-deploy).
   - Download Signet's [docker-compose.yml](https://github.com/signet-framework/signet-broker/blob/main/docker-compose.yml) and run `docker-compose up`.

&nbsp;

## Installation

- requires Node and npm — the `proxy` and `test` commands depend on external tools with a Node.js runtime.

Install:
```bash
npm install -g signet-cli
```

Uninstall:
```bash
uninstall-signet-cli
```
Removes the signet-cli golang binary along with the supporting npm package.