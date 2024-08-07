import { ethers } from "ethers";
import { Abi } from "./Abi.js";
import { InfuraProvider } from "./InfuraProvider.js";
import { contractAddress } from "./contractAddress.js";
import { useState, useEffect } from "react";

const ReadBlockchain = ({ address, txStatus }) => {
  const [prevAmount, setPrevAmount] = useState("0");
  const [currentAmount, setCurrentAmount] = useState("0");

  useEffect(() => {
    const readContract = async () => {
      const balance = await InfuraProvider.getBalance(address);
      const ethBalance = ethers.formatEther(balance);
      console.log("Previous Amount in Ethers:", ethBalance);
      setPrevAmount(ethBalance);
    };

    if (address) {
      readContract();
    }
  }, [address]);

  // Updating the new Ether Amount on UI is pending
  useEffect(() => {
    let intervalId;

    const updateAmount = async () => {
      const balance = await InfuraProvider.getBalance(address);
      const ethBalance = ethers.formatEther(balance);
      setCurrentAmount(ethBalance);
    };

    return () => clearInterval(intervalId);
  }, [txStatus, address]);

  return (
    <>
      <div className="read-box">
        <div className="read-sub-box">
          <label>Beneficiary Account:</label>
          <div className="feeds" id="show-address">
            <p>{address}</p>
          </div>
        </div>

        <div className="read-sub-box">
          <label>Previous Amount:</label>
          <div className="feeds" id="prev-amount">
            <p>{prevAmount} ethers</p>
          </div>
        </div>

        <div className="read-sub-box">
          <label>Current Amount:</label>
          <div className="feeds" id="curr-amount">
            <p>{currentAmount} ethers</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadBlockchain;
