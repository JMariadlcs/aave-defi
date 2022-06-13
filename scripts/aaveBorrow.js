/* This Script is used to borrow an asset from Aave
    Deploy: 'yarn hardhat run scripts/aaveBorrow.js'
    As the default network is Hardhat and we set a forking on hardhat.config.js
    when we deploy the scripts it will be done on this forking
 */

const { ethers, getNamedAccounts } = require("hardhat")
const { getWeth } = require("../scripts/getWeth")

async function main() {
    // This protocol treats everything as an ERC-20 token. (eg. converts ETH -> wETH).
    await getWeth()

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
