// 1. Rinkeby wETH contract: 0xc778417E063141139Fce010982780140Aa0cD5Ab
// 2. Ethereum mainnet wETH contract: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2

/* This Script is used to swap ETH to wETH
    Deploy: 'yarn hardhat run scripts/getWeth.js --network rinkeby'
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
    