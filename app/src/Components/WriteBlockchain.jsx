import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "./contractAddress"; // Make sure you are using the correct path
import { Abi } from "./Abi"; // Make sure you are using the correct path

const WriteBlockchain = () => {
  // --------This first two useStates are for ether and Address from User to sender
  const [amount, setAmount] = useState("0");
  const [address, setAddress] = useState("0");
  const [connectedWallet, setConnectedWallet] = useState("Connect Wallet");
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletProvider, setWalletProvider] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request permission to connect the wallet
        await window.ethereum.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
        // Request Wallet Address
        const walletAddresses = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (walletAddresses.length > 0) {
          const walletAddress = walletAddresses[0];
          setConnectedWallet(walletAddress);
          // This is the wallet provider which will allow access to funcds of the wallet

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

  //

  const sendAmount = async () => {
    if (!walletProvider || !address || !amount) {
      alert("Please connect your wallet and enter a valid address and amount.");
      return;
    }

    try {
      const signer = await walletProvider.getSigner();
      const contract = new ethers.Contract(contractAddress, Abi, signer);
      const amountInWei = ethers.parseEther(amount);

      // Get the current gas price
      const gasPrice = await walletProvider.send("eth_gasPrice", []);
      console.log("Gas Price : ", gasPrice);

      // Call the transferEther function on the contract for gas estimation
      const gasLimit = await contract.transferEther.estimateGas(address, {
        value: amountInWei,
      });

      console.log("Gas Limit : ", gasLimit);
      // Send the transaction

      const tx = await contract.transferEther(address, {
        value: amountInWei,
        gasLimit: gasLimit,
        gasPrice: gasPrice,
      });

      console.log("Transaction sent:", tx.hash);
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
      {connectedWallet !== "Connect Wallet" && (
        <div className="balance-box">
          <h6>Account Balance: {walletBalance} ETH</h6>
        </div>
      )}
      <div className="box">
        <div className="sub-box">
          <label htmlFor="addresss">Enter Address</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="sub-box">
          <label htmlFor="amount">Enter Ethers</label>
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
    </div>
  );
};

export default WriteBlockchain;
