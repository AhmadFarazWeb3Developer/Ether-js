
# My Ether.js Learning Guide (Version 6)

Note: There are many tutorials on YouTube that follow older versions of Ether.js. If you are following an older version, it’s best to stick with those tutorials. This guide follows the latest standards.

`Four key elements required while connecting to blockchain`

**1. RPC (Remote Procedure Call) Node Provider:**  
For read operations, a Node Provider that can communicate with the blockchain and read data from it is necessary. Running a full node on your PC can be challenging due to space consumption, slowness, and complex configuration. Instead, use the Node Provider RPC Provider API to connect to the blockchain. Popular Node providers include Alchemy, Infura, Quicknode, etc., depending on the features they offer.

**2. Signer:**  
For write operations, a Signer is required to obtain permission from the user to initiate a transaction. This is essential because write operations incur gas fees, which involve ethers.

**3. Contract ABI:**  
The Contract ABI (Application Binary Interface) consists of all the functions of the smart contract deployed on the network.

**4. Contract Address:**  
A Contract Address is a unique identifier for the deployed contract on the blockchain.

## Steps for Read Operation

**1. Set Up RPC Node Provider:**  
```javascript
// For example, I have used Infura with Sepolia test net
const infuraProvider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/ea5787faccaf42bd880be18d14fe981a"
);
```

**2. Get Contract ABI and Save it in a Variable:**  
```javascript
const Abi = [
  {
    // ABI code here
  }
];
```

**3. Get Contract Address and Store it in a Variable:**  
```javascript
const contractAddress = `0x23ASFSDF21213123...`;
```

**4. Create Contract Instance:**  
```javascript
const contract = new ethers.Contract(contractAddress, Abi, infuraProvider);
```

**5. Read Blockchain Data:**  
Use this contract instance to read blockchain data. For detailed examples, refer to the code in `app/src/readBlockchain.jsx`.

## Steps for Write Operation

**1. Get the Wallet Provider from the Wallet Extension in the Browser:**  
```javascript
const walletProvider = new ethers.BrowserProvider(window.ethereum);
```

**2. Get the Signer from the Wallet Provider to Sign the Transaction:**  
```javascript
const signer = await walletProvider.getSigner();
```

**3. Create Contract Instance for Write Operations:**  
```javascript
const contract = new ethers.Contract(contractAddress, Abi, signer);
```

**4. Estimate Gas Price and Limit:**  
```javascript
// Get the current gas price
const gasPrice = await walletProvider.send("eth_gasPrice", []);

// Call the transferEther function on the contract for gas estimation, which takes the address and ethers as arguments.
// This function gives the estimate of the gas limit required for the transaction
const gasLimit = await contract.transferEther.estimateGas(address, {
  value: amountInWei,
});
```

For more detailed code and understanding, refer to the code in the current repo.

## Conclusion

By following these steps, you can efficiently connect to the blockchain and perform read and write operations using Ether.js. Make sure to use the latest version and refer to the repository for comprehensive understanding.

