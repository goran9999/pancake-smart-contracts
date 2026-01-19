import {ethers} from "hardhat";


export async function createPair(){
  
    const PancakeFactory=await ethers.getContractAt("PancakeFactory","0x5FbDB2315678afecb367f032d93F642f64180aa3");

   const tx= await PancakeFactory.createPair("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c","0x1d2f0da169ceb9fc7b3144628db156f3f6c60dbe");

   await tx.wait();
   console.log(`Created new pair ${tx.hash}`)

}
createPair()