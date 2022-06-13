/* This Script is used to borrow an asset from Aave
    Deploy: 'yarn hardhat run scripts/aaveBorrow.js'
    As the default network is Hardhat and we set a forking on hardhat.config.js
    when we deploy the scripts it will be done on this forking
 */

// Mainnet 'LendingPool Provider' Smart Contract address: 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5

const { ethers, getNamedAccounts } = require("hardhat")
const { getWeth } = require("../scripts/getWeth")

async function main() {
    // This protocol treats everything as an ERC-20 token. (eg. converts ETH -> wETH).
    await getWeth()
    const { deployer } = await getNamedAccounts()

    // To interact with Aave Protocol -> ABI, contractAddress
    // Mainnet 'LendingPool Provider' Smart Contract address: 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
    // LendingPool: ^

}

async function getLendingPool(account) {
    const lendingPoolAddressProvider = await ethers.getContractAt("ILendingPoolAddressesProvider", "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5", account)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
