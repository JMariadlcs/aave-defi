require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")
require("dotenv").config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL

module.exports = {
  solidity: {
      compilers: [{ version: "0.8.7" }, { version: "0.6.6" }, { version: "0.4.19" }, { version: "0.6.12"}],
  },
  defaultNetwork: "hardhat",
  networks: {
      rinkeby: {
          url: RINKEBY_RPC_URL,
          accounts: [PRIVATE_KEY],
          chainId: 4,
          blockConfirmations: 6,
      },
      hardhat: {
        chainId: 31337,
        forking: {
            url: MAINNET_RPC_URL,
        },
      },
  },
  gasReporter: {
      enabled: true,
      outputFile: "gas-report.txt",
      noColors: true,
      currency: "USD",
      coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
      apiKey: ETHERSCAN_API_KEY,
  },
  namedAccounts: {
      deployer: {
          default: 0,
      },
      user: {
          default: 1,
      },
  },
}
