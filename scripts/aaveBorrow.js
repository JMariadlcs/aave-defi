/* This Script is used to borrow an asset from Aave
    Deploy: 'yarn hardhat run scripts/aaveBorrow.js'
    As the default network is Hardhat and we set a forking on hardhat.config.js
    when we deploy the scripts it will be done on this forking
 */

// 0. Mainnet 'LendingPool Provider' Smart Contract address: 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
// 1. Rinkeby wETH contract: 0xc778417E063141139Fce010982780140Aa0cD5Ab
// 2. Ethereum mainnet wETH contract: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2

const { ethers, getNamedAccounts } = require("hardhat")
const { getWeth, AMOUNT } = require("../scripts/getWeth")

async function main() {
    // This protocol treats everything as an ERC-20 token. (eg. converts ETH -> wETH).
    await getWeth()
    const { deployer } = await getNamedAccounts()

    // To interact with Aave Protocol -> ABI, contractAddress
    // Mainnet 'LendingPool Provider' Smart Contract address: 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
    // LendingPool: ^
    const lendingPool = await getLendingPool(deployer)
    console.log(`LendingPool address ${lendingPool.address}`)

    // 1. DEPOSIT wETH
    // Approve ERC20Token
    const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
    await approveErc20(wethTokenAddress, lendingPool.address, AMOUNT, deployer)

    // Deposit
    console.log("Depositing...")
    await lendingPool.deposit(wethTokenAddress, AMOUNT, deployer, 0)
    console.log("ERC20 correctly deposit on LendingPool!")

    // 2. BORROW ASSET
    // Get account info 
    console.log("Getting account user data...")
    let { availableBorrowsETH, totalDebtETH } = await getBorrowUserData(lendingPool, deployer)
    console.log("Data gotten!")

    // Get Dai price
    console.log("Getting DAI price...")
    const daiPrice = await getDaiPrice()
    console.log("DAI price gotten!")
    
    // Get DAI amount you can borrow
    const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber())
    const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())
    console.log(`You can borrow ${amountDaiToBorrow.toString()} DAI`)

    // Borrow DAI
    const daiTokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    console.log("Borrowing DAI...")
    await borrowDai(daiTokenAddress, lendingPool, amountDaiToBorrowWei, deployer)
    await getBorrowUserData(lendingPool, deployer)

    // 3. REPAY
    await repay(amountDaiToBorrowWei, daiTokenAddress, lendingPool, deployer)
    await getBorrowUserData(lendingPool, deployer)
}

// 1. DEPOSIT FUNCTIONS

/*
* Function used to get the LendingPool
*/
async function getLendingPool(account) {
    const lendingPoolAddressProvider = await ethers.getContractAt("ILendingPoolAddressesProvider", "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5", account)
    const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt("ILendingPool", lendingPoolAddress, account)
    return lendingPool
}

/*
* Function used to approve token
*/
async function approveErc20(erc20Address, spenderAddress, amountToSpend, account) {
    const erc20Token = await ethers.getContractAt("IERC20", erc20Address, account)
    const tx = await erc20Token.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.log("ERC20 Approved!")
}

// 2. BORROW FUNCTIONS

/*
* Function used to get borrow user data
*/
async function getBorrowUserData(lendingPool, account) {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } = await lendingPool.getUserAccountData(account)
    console.log(`You have ${totalCollateralETH} worth of ETH deposited.`)
    console.log(`You have ${totalDebtETH} worth of ETH borrowed.`)
    console.log(`You can borrow ${availableBorrowsETH} worth of ETH.`)
    return { availableBorrowsETH, totalDebtETH }
}

/*
* Function used to get DAI price using Chainlink
*/
async function getDaiPrice() {
    const daiEthPriceFeed = await ethers.getContractAt("AggregatorV3Interface", "0x773616e4d11a78f511299002da57a0a94577f1f4")
    const price = (await daiEthPriceFeed.latestRoundData())[1]
    console.log(`The DAI/ETH price is ${price.toString()}`)
    return price
}

/*
* Function used to borrow Dai
*/
async function borrowDai(daiAddress, lendingPool, amountDaiToBorrow, account) {
    const borrowTx = await lendingPool.borrow(daiAddress, amountDaiToBorrow, 1, 0, account)
    await borrowTx.wait(1)
    console.log("You've borrowed!")
}

// 3. FUNCTIONS TO REPAY
/*
* Function used to reay DAI back
*/
async function repay(amount, daiAddress, lendingPool, account) {
    await approveErc20(daiAddress, lendingPool.address, amount, account)
    const repayTx = await lendingPool.repay(daiAddress, amount, 1, account)
    await repayTx.wait(1)
    console.log("Repaid!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
