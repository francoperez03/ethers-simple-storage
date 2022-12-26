const { Wallet } = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();
async function main() {
  const wallet = new Wallet(process.env.PRIVATE_KEY!);
  const encryptedJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY,
    process.env.PRIVATE_KEY_PASSWORD
  );
  fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
