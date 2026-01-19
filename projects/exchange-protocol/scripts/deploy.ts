import { ethers } from "hardhat";

// WBNB addresses per network
const WBNB_ADDRESSES: Record<string, string> = {
  mainnet: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  testnet: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  hardhat: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const networkName = network.chainId === 56 ? "mainnet" : network.chainId === 97 ? "testnet" : "hardhat";

  console.log("Deploying contracts with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  console.log("Network:", networkName);

  const wbnbAddress = WBNB_ADDRESSES[networkName];
  console.log("Using WBNB at:", wbnbAddress);


  console.log("\n1. Deploying PancakeFactory...");
  const PancakeFactory = await ethers.getContractFactory("PancakeFactory");
  const factory = await PancakeFactory.deploy(deployer.address);
  await factory.deployed();
  console.log("PancakeFactory deployed to:", factory.address);

  const initCodeHash = await factory.INIT_CODE_PAIR_HASH();
  console.log("INIT_CODE_PAIR_HASH:", initCodeHash);

  // 2. Deploy PancakeRouter
  console.log("\n2. Deploying PancakeRouter...");
  const PancakeRouter = await ethers.getContractFactory("PancakeRouter");
  const router = await PancakeRouter.deploy(factory.address, wbnbAddress);
  await router.deployed();
  console.log("PancakeRouter deployed to:", router.address);

  // Summary
  console.log("\n========== Deployment Summary ==========");
  console.log("WBNB:           ", wbnbAddress);
  console.log("PancakeFactory: ", factory.address);
  console.log("PancakeRouter:  ", router.address);
  console.log("INIT_CODE_HASH: ", initCodeHash);
  console.log("=========================================");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
