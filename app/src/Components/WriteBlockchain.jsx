import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "./contractAddress";
import { Abi } from "./Abi";
// for write operation signer is required

const WriteBlockchain = () => {
  const [getValue, setValue] = useState("0");

  useEffect(() => {
    const MetaMaskConnection = async () => {
      if (!window.ethereum) {
        try {
          const walletProvider = new ethers.BrowserProvider(window.ethereum);
          await walletProvider.send("eth_requestAccounts", []);
          const signer = await walletProvider.getSigner();
          const contract = new ethers.Contract(contractAddress, Abi, signer);

          // Set value
          const tx = await contract.setValue(12);
          await tx.wait(); // Wait for transaction to be mined

          // Get updated value
          const newValue = await contract.value();
          setValue(newValue.toString());
        } catch (error) {
          alert(error);
        }
      } else {
        alert("MetaMask is not installed.");
      }
    };
    MetaMaskConnection();
  }, []);

  return (
    <div>
      <h1>{getValue}</h1>
    </div>
  );
};

export default WriteBlockchain;
