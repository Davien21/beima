/** @format */
import { formatEther } from "@ethersproject/units";
import { ethers } from "ethers";
import { allowedNetwork, mBUSDContractAddress } from "../utils";
import toast from "../utils/toastConfig";
import Emitter from "./emitter";
import {
  getActiveWallet,
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
} from "./web3Service";

export async function userIsRegistered() {
  try {
    if (!hasEthereum()) return false;
    const currentNetwork = await getCurrentNetwork();
    if (currentNetwork && currentNetwork !== allowedNetwork) return false;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);
    const address = getActiveWallet();

    return await beimaContract.isRegistered(address);
  } catch (err) {
    console.log("Something went wrong", err);
  }
}

export async function registerUser(userIpfs, onRegister) {
  try {
    Emitter.emit("OPEN_LOADER");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);
    await beimaContract.register(userIpfs);

    await beimaContract.on("Register", () => {
      onRegister();
      Emitter.emit("CLOSE_LOADER");
      toast.success("Registration was successful");
    });
  } catch (err) {
    let msg = "Something went wrong, please try again later.";
    console.log(msg, err);
    if (err.code === 4001) msg = "This transaction was denied by you";
    Emitter.emit("CLOSE_LOADER");
    toast.error(msg);
  }
}

export async function getUserDetails() {
  try {
    if (!hasEthereum()) return false;
    const isRegistered = await userIsRegistered();

    if (!isRegistered) return { user: null, pension: null };
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);
    const address = getActiveWallet();

    const details = await beimaContract.pensionServiceApplicant(address);
    const monthlyDeposit = parseInt(details.client.amountToSpend.toString());
    const totalUnsuppliedAmount = parseInt(
      formatEther((await beimaContract.amountSupplied(address)).toString())
    );
    const totalDeposit = parseInt(
      formatEther(
        (await beimaContract.assets(mBUSDContractAddress, address)).toString()
      )
    );

    const hasPlan = details.client.hasPlan;
    const user = await fetch(
      `https://ipfs.io/ipfs/${details.userDetails}`
    ).then((r) => r.json());

    if (!hasPlan) return { user, pension: null };

    const pensionInfo = await fetch(
      `https://ipfs.io/ipfs/${details.client.ipfsHashOfUserPensionDetails}`
    ).then((r) => r.json());

    const pension = {
      ...pensionInfo,
      monthlyDeposit,
      totalDeposit,
      totalUnsuppliedAmount,
    };

    // console.log({ user, pension });

    return { user, pension };
  } catch (err) {
    console.log("Something went wrong: ", err);
  }
}
