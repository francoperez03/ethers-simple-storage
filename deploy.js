//Ganache Network HTTP://127.0.0.1:8545
const { providers, ContractFactory, Wallet } = require("ethers");
const fs = require("fs-extra");
async function main() {
  const provider = new providers.JsonRpcProvider("http://127.0.0.1:8545");
  const wallet = new Wallet(
    "473b0ab8f9ac0e007c8b52faf50a697e3d11023b068e92c6c50edc07c8239798",
    provider
  );
  //await sendTransaction({ wallet });
  await deployContract({ wallet });
}

async function deployContract({ wallet }) {
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ContractFactory(abi, binary, wallet);
  console.log("Deploying...");
  const contract = await contractFactory.deploy();
  const transactionReceipt = await contract.deployTransaction.wait(1);
  console.log("Deployed");
  const favoriteNumber = await contract.retrieve();
  console.log({ favoriteNumber: favoriteNumber.toString() });
  const txResponse = await contract.store("123456789");
  const txReceipt = await txResponse.wait(1);
  const favoriteNumberUpdated = await contract.retrieve();
  console.log({ favoriteNumberUpdated: favoriteNumberUpdated.toString() });
}

async function sendTransaction({ wallet }) {
  console.log("Let's deploy with only transaction data");
  const nonce = await wallet.getTransactionCount();
  console.log({ nonce });
  const tx = {
    nonce,
    gasPrice: 20000000000,
    gasLimit: 1000000,
    to: null,
    value: 0,
    data: "0xFF11FF11FF11",
    chainId: 1337,
  };
  const sentTxResponse = await wallet.sendTransaction(tx);
  console.log("-----");

  await sentTxResponse.wait(1);
  console.log(sentTxResponse);
}
main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
