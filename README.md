# AAVE - DEFI 👻

This is a project for interacting programmatically with [Aave](https://aave.com/) on a Forked Mainnet from Patrick Alpha's Free Code Camp course.

The workshop followed to complete this repo is [this one](https://github.com/PatrickAlphaC/hardhat-defi-fcc).

The repo that we are going to implement is like [this one](https://www.youtube.com/watch?v=gyMwXuJrbJQ&t=15996s).

## PROJECT

Some scripts are created in this project to interact programmatically with [Aave](https://aave.com/) on a Forked Mainnet.

Objetives:

1. Deposit collateral: ETH/WETH ✅.
2. Borrow another asset: DAI ✅.
3. Repay the borrowed DAI back ✅.
4. Fork Mainnet to test the scripts ✅.

## CREATE SIMILAR PROJECT FROM SCRATCH

-   Install yarn and start hardhat project:

```bash
yarn
yarn add --dev hardhat
yarn hardhat
```

-   Install other hardhat dependencies:

```bash
yarn add --dev @nomiclabs/hardhat-waffle@^2.0.0 ethereum-waffle@^3.0.0 chai@^4.2.0 @nomiclabs/hardhat-ethers@^2.0.0 ethers@^5.0.0 @nomiclabs/hardhat-etherscan@^3.0.0 dotenv@^16.0.0 eslint@^7.29.0 eslint-config-prettier@^8.3.0 eslint-config-standard@^16.0.3 eslint-plugin-import@^2.23.4 eslint-plugin-node@^11.1.0 eslint-plugin-prettier@^3.4.0 eslint-plugin-promise@^5.1.0 hardhat-gas-reporter@^1.0.4 prettier@^2.3.2 prettier-plugin-solidity@^1.0.0-beta.13 solhint@^3.3.6 solidity-coverage@^0.7.16
```

-   Install ethers dependencies:

```bash
yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers
```

-   Include the following like inside [hardhat.config.js](https://github.com/JMariadlcs/aave-defi/blob/main/hardhat.config.js):

```bash
require("hardhat-deploy");
```

## HOW TO FORK MAINNET

-   Inside [hardhat.config.js](https://github.com/JMariadlcs/aave-defi/blob/main/hardhat.config.js):

```bash
hardhat: {
          chainId: 31337,
          forking: {
              url: MAINNET_RPC_URL,
          },
      },
```

-   Execute scripts on forked chain:

```bash
yarn hardhat run scripts/aaveBorrow.js
```

## REMINDERS

-   If you want to execute solhint to search for potential Solidity errors
    Execute:

```bash
yarn solhint contracts/*.sol
```

-   If you want to use a text formarter:
    Check [.prettierrc](https://github.com/JMariadlcs/aave-defi/blob/main/.prettierrc) and [.prettierignore](https://github.com/JMariadlcs/aave-defi/blob/main/.prettierignore).

-   To automatically verify our contract on etherscan:

```bash
yarn add --dev @nomiclabs/hardhat-etherscan
```

Then, include inside [hardhat.config.js](https://github.com/JMariadlcs/aave-defi/blob/main/hardhat.config.js):

```bash
require("@nomiclabs/hardhat-etherscan");
```

Add `ETHERSCAN_API_KEY` inside `.env` file.

-   Use Hardhat Gas Reporter:

```bash
yarn add --dev hardhat-gas-reporter
```

Then, include inside [hardhat.config.js](https://github.com/JMariadlcs/aave-defi/blob/main/hardhat.config.js):

```bash
require("hardhat-gas-reporter");
```

-   Use Solidity Coverage:

```bash
yarn add --dev solidity-coverage
```

Then, include inside [hardhat.config.js](https://github.com/JMariadlcs/aave-defi/blob/main/hardhat.config.js):

```bash
require("solidity-coverage");
```

In order to execute it:

```bash
yarn hardhat coverage
```

-   Use Hardhat Waffle:

```bash
yarn add @nomiclabs/hardhat-waffle
```

Then, include inside [hardhat.config.js](https://github.com/JMariadlcs/aave-defi/blob/main/hardhat.config.jss):

```bash
require("@nomiclabs/hardhat-waffle");
```

## Resources

-   [wETH Rinkeby](https://rinkeby.etherscan.io/token/0xc778417e063141139fce010982780140aa0cd5ab): Rinkeby wETH Smart Contract.
-   [wETH Mainnet](https://rinkeby.etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2): Mainnet wETH Smart Contract.
-   [Aave](https://aave.com/)
-   [Aave docs](https://docs.aave.com/hub/)
-   [Aave developers docs v2](https://docs.aave.com/developers/v/2.0/)
-   [Aave Lending Pool](https://docs.aave.com/developers/v/2.0/the-core-protocol/lendingpool): protocol that we are going to interact with.
-   [Aave protocols contract addresses](https://docs.aave.com/developers/v/2.0/deployed-contracts/deployed-contracts)
