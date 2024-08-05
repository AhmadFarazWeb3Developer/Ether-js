import { ethers } from "ethers";

// setp 1
const provider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/ea5787faccaf42bd880be18d14fe981a"
);

// step 2
const contractAddress = "0x71B3201e28f4Ce8b9aee5138c13D1F1634D09De9";

// step 3
const ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    name: "setValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "value",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contractInteraction = async () => {
  const contract = new ethers.Contract(contractAddress, ABI, provider);

  const getValue = await contract.value();
  console.log("value : ", getValue.toString()); // converting from bigNo to string form
};

const readBlockchain = () => {
  contractInteraction();
};

export default readBlockchain;

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
