/** @format */
import { ethers } from "ethers";
import Web3 from "web3";
import toast from "../utils/toastConfig";
import Emitter from "./emitter";
import {
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
  getRinkebyUSDTContract,
  getActiveWallet,
  getWeb3BeimaContract,
  getWeb3RinkebyUSDTContract,
} from "./web3Service";

// In Node.js use: const Web3 = require('web3');

export async function createFlexiblePlan(
  coin,
  planIpfs,
  totalApprovedAmount,
  monthlyDeposit,
  lockTime,
  onAddPlan,
  onError
) {
  Emitter.emit("OPEN_LOADER");
  const timeDurationOfDeposit = lockTime;
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();


    const beimaContract = await getWeb3BeimaContract();
    console.log(beimaContract.address)
    const RinkebyUSDTContract = await getWeb3RinkebyUSDTContract();
    Emitter.emit('OPEN_LOADER');
		const approve = await RinkebyUSDTContract.methods
			// approving rinkeby usdt address
			.approve('0xe06740C98F7C6d205eB85bA9586a04989806D335', 10000)
			.send({ from: address })
			.on('Approval', async () => {
				toast.success('Approval was successful');
				
			});
      Emitter.emit('CLOSE_LOADER');
    // console.log(monthlyDeposit, typeof monthlyDeposit);
    // monthlyDeposit = ethers.utils.parseEther(monthlyDeposit);
    // Emitter.emit("CLOSE_LOADER");
    console.log(beimaContract)
    await beimaContract.methods.setPlan(
      coin,
      planIpfs,
      totalApprovedAmount,
      monthlyDeposit,
      timeDurationOfDeposit,
      lockTime
    ).send({from: address}).on("Plan", () => {
      onAddPlan();
      toast.success("A new Flexible Pension Plan was setup successfully");
      // Emitter.emit("CLOSE_LOADER");
    });
    Emitter.emit('CLOSE_LOADER');
      
				// console.log(asset);
			console.log(RinkebyUSDTContract);


    // await beimaContract.on("Plan", () => {
    //   onAddPlan();
    //   toast.success("A new Flexible Pension Plan was setup successfully");
    //   Emitter.emit("CLOSE_LOADER");
    // });
  } catch (err) {
    console.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later.";
    if (err.code === 4001) msg = "This transaction was denied by you";
    Emitter.emit("CLOSE_LOADER");
    toast.error(msg);
    onError();
  }
}

export async function depositAsset(coinAddress, amount) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("rinkeby")) return false;
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    const address = await getActiveWallet();
    console.log(address, typeof address)

    // const RinkebyUSDTContract = await getRinkebyUSDTContract(signer);
    ;

    const beimaContract = await getWeb3BeimaContract();
    console.log(beimaContract);
    const beimaContractAddress = beimaContract._address;
    const asset = '0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02';

    
    const deposit = await beimaContract.methods
			.depositToken(asset, 10)
			.send({ from: address })
			.on('Deposit', () => {
				toast.success('Deposit was successful');
				Emitter.emit('CLOSE_LOADER');
			});

    // console.log({ approve });
    // let options = {
    //   filter: {
    //     value: [],
    //   },
    //   fromBlock: 0,
    // };
    // let b = RinkebyUSDTContract.events
    //   .Approval(options)
    //   .on("data", async (event) => {
    //     console.log({ event });
    //     b.unsubscribe();
    //   });
    // setTimeout(async() => {
    //   let bye = await beimaContract.methods
    //     .deposit(asset, 1)
    //     .send({from: address});
    //   console.log({ bye });
    //   beimaContract.events.Deposit(options).on("data", (event) => {
    //     console.log(event);
    //     bye.unsubscribe();
    //   });
    // }, 15000);

    // await RinkebyUSDTContract.on("Approval", async (owner, spender, value) => {
    //   console.log({ owner, spender, value });
    //   toast.success("Approved!");
    // });

    // await beimaContract.on("Deposit", () => {
    //   toast.success("Deposit was successful");
    //   Emitter.emit("CLOSE_LOADER");
    // });
  } catch (err) {
    console.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later.";
    if (err.code === 4001) msg = "This transaction was denied by you";
    if (err.code === -32016)
      msg = "You don't have enough funds to complete this transaction";
    Emitter.emit("CLOSE_LOADER");
    toast.error(msg);
  }
}

export async function genAddresses() {
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    console.log(window.BinanceChain);
    // if (network && !network.includes("Rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const wallet = ethers.Wallet.createRandom();
    console.log("address:", wallet.address);
    console.log("mnemonic:", wallet.mnemonic.phrase);
    console.log("privateKey:", wallet.privateKey);
  } catch (err) {
    console.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later.";
    if (err.code === 4001) msg = "This transaction was denied by you";
    toast.error(msg);
  }
}
