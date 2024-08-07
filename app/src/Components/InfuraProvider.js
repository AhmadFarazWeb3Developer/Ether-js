import { ethers } from "ethers";
// setp 1

export const infuraProvider = new ethers.JsonRpcProvider(
  "https://sepolia.infura.io/v3/ea5787faccaf42bd880be18d14fe981a"
);

export const alchemyProvider = new ethers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/9S5jVdym4VQ0RzqNX9sS5mlVbcp3U-CV"
);
