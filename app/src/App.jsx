import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import { Abi } from "./Components/Abi";
import { contractAddress } from "./Components/contractAddress";

const App = () => {
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
          alert("MetaMask stopped");
        }
      } else {
        console.error("MetaMask is not installed.");
      }
    };
    MetaMaskConnection();
  }, []);

  return (
    <>
      <h1>{getValue}</h1>
    </>
  );
};

export default App;
