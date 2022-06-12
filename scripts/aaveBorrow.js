/* This Script is used to borrow an asset from Aave
    Deploy: 'yarn hardhat run scripts/aaveBorrow.js --network rinkeby'
 */

const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
    // This protocol treats everything as an ERC-20 token. (eg. converts ETH -> wETH).


}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
