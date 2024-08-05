import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/ea5787faccaf42bd880be18d14fe981a"
);

const getDetails = async () => {
  const block = await provider.getBlock(); //
  const blockNo = await provider.getBlockNumber();

  const balance = await provider.getBalance(
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
  );

  // converting to ethers formate from big number object
  console.log("Block No: ", blockNo);
  console.log(ethers.version);
  const etherBalance = ethers.formatEther(balance);
  console.log("Account Balance : ", etherBalance);
};

getDetails();
