//Ganache Network HTTP://127.0.0.1:8545
const { ethers } = require("ethers");
const fs = require("fs-extra");
async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  const wallet = new ethers.Wallet(
    "af958f0051d9e28662cb9817fcac61275acdd3e0a9c1ef85bec4921e03e4e1a2",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying...");
  const contract = await contractFactory.deploy();
  console.log("deployed");
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log(contract.deployTransaction);
  console.log("-----");
  console.log({ transactionReceipt });
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
