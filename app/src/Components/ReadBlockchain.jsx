import { ethers } from "ethers";
import { Abi } from "./Abi.js";
import { InfuraProvider } from "./InfuraProvider.js";
// step 2
import { contractAddress } from "./contractAddress.js";

const ReadBlockchain = () => {
  // step 3
  const readContract = async () => {
    const contract = new ethers.Contract(contractAddress, Abi, InfuraProvider);
    const getValue = await contract.value();
    console.log("value : ", getValue.toString()); // converting from bigNo to string form
  };

  readContract();
  return <></>;
};
export default ReadBlockchain;
