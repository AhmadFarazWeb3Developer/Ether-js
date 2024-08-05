import { ethers } from "ethers";
import { Abi } from "./Abi.js";
// setp 1
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/ea5787faccaf42bd880be18d14fe981a"
);

// step 2
import { contractAddress } from "./contractAddress.js";

// step 3

const readContract = async () => {
  const contract = new ethers.Contract(contractAddress, Abi, provider);
  const getValue = await contract.value();
  console.log("value : ", getValue.toString()); // converting from bigNo to string form
};

readContract();

export { contractAddress };
/*
const getDetails = async () => {
  const block = await provider.getBlock(); //
  const blockNo = await provider.getBlockNumber();

  const balance = await provider.getBalance(walletAddress);

  // converting to ethers formate from big number object
  console.log("Block No: ", blockNo);
  console.log(ethers.version);
  const etherBalance = ethers.formatEther(balance);
  console.log("Account Balance : ", etherBalance);
};

getDetails();
*/
