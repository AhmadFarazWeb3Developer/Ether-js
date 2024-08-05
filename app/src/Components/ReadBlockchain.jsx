import { ethers } from "ethers";
import { Abi } from "./Abi.js";
// step 2
import { contractAddress } from "./contractAddress.js";

const ReadBlockchain = () => {
  // setp 1
  const provider = new ethers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/ea5787faccaf42bd880be18d14fe981a"
  );

  // step 3
  const readContract = async () => {
    const contract = new ethers.Contract(contractAddress, Abi, provider);
    const getValue = await contract.value();
    console.log("value : ", getValue.toString()); // converting from bigNo to string form
  };

  readContract();

  return <></>;
};
export default ReadBlockchain;
