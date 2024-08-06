export const Abi = [
  {
    inputs: [
      {
        internalType: "address payable",
        name: "_toAddress",
        type: "address",
      },
    ],
    name: "transferEther",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getEthers",
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
