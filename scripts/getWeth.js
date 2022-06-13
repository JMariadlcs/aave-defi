// 1. Rinkeby wETH contract: 0xc778417E063141139Fce010982780140Aa0cD5Ab
// 2. Ethereum mainnet wETH contract: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2

/* This Script is used to swap ETH to wETH
    Deploy: 'yarn hardhat run scripts/getWeth.js'
    As the default network is Hardhat and we set a forking on hardhat.config.js
    when we deploy the scripts it will be done on this forking
 */

const { ethers, getNamedAccounts } = require("hardhat")

const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    console.log("e")
    const { deployer } = await getNamedAccounts()
    console.log("eeee")
    // 1. Call "deposit" function on the weth contract
    //      We need: ABI ✅, Contract address ✅.
    const iWeth = await ethers.getContractAt("IWeth", "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", deployer)
    const tx = await iWeth.deposit({value: AMOUNT,  gasLimit: 9999999})
    await tx.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth }