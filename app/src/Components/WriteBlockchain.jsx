import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractAddress } from "./contractAddress";
import { Abi } from "./Abi";
import ReadBlockchain from "./ReadBlockchain";

const WriteBlockchain = () => {
  const [amount, setAmount] = useState("0");
  const [address, setAddress] = useState("0");
  const [connectedWallet, setConnectedWallet] = useState("Connect Wallet");
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletProvider, setWalletProvider] = useState(null);
  const [txStatus, setTxStatus] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [{ eth_accounts: {} }],
        });

        const walletAddresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (walletAddresses.length > 0) {
          const walletAddress = walletAddresses[0];
          setConnectedWallet(walletAddress);

          const provider = new ethers.BrowserProvider(window.ethereum);
          setWalletProvider(provider);

          const balance = await provider.getBalance(walletAddress);
          setWalletBalance(ethers.formatEther(balance));
          console.log("Wallet connected:", provider);
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      alert("MetaMask is not installed.");
    }
  };

  const sendAmount = async () => {
    if (!walletProvider || !address || !amount) {
      alert("Please connect your wallet and enter a valid address and amount.");
      return;
    }

    try {
      const signer = await walletProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, Abi, signer);
      const amountInWei = ethers.parseEther(amount);

      //gasPrice is the current gas base fee of the network
      const gasPrice = await walletProvider.send("eth_gasPrice", []);
      // The gas estimation for the transaction which is the incentive for the miner
      const gasLimit = await contract.transferEther.estimateGas(address, {
        value: amountInWei,
      });

      // Now transfering the Ethers
      const tx = await contract.transferEther(address, {
        value: amountInWei,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
      });
      // Geeting Transaction Hash for verification
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      // Wating for the transaction status
      console.log(receipt);
      setTxStatus(receipt.status === 1 ? "Success" : "Failed");
    } catch (error) {
      console.error("Error sending transaction:", error);
      if (error.code === "CALL_EXCEPTION") {
        console.error("Transaction reverted. Reason:", error.reason);
      }
    }
  };

  return (
    <div>
      <button className="wallet-btn" onClick={connectWallet}>
        {connectedWallet === "Connect Wallet"
          ? connectedWallet
          : `Connected: ${connectedWallet}`}
      </button>

      <div className="hero-section">
        {connectedWallet !== "Connect Wallet" && (
          <div className="balance-box">
            <h6>Account Balance: {walletBalance} ETH</h6>
          </div>
        )}

        <div className="box">
          <h6>Enter beneficiary Requirments</h6>
          <div className="sub-box">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="sub-box">
            <label htmlFor="amount">Ethers: </label>
            <input
              type="text"
              id="amount"
              placeholder="Ethers"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button className="transfer-btn" onClick={sendAmount}>
            Transfer
          </button>
        </div>
        <ReadBlockchain address={address} txStatus={txStatus} />
      </div>
    </div>
  );
};

export default WriteBlockchain;
