import { parseEther } from "@ethersproject/units";
import { ethers } from "ethers";
import { formatMoney } from "../utils";
import toast from "../utils/toastConfig";
import Emitter from "./emitter";
import {
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
  getBscBUSDContract,
  getActiveWallet,
} from "./web3Service";

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
    if (network && !network.includes("bnbt")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);

    const BscBUSDContract = await getBscBUSDContract(signer);
    await BscBUSDContract.approve(
      beimaContract.address,
      parseEther(totalApprovedAmount).toString()
    );
    await BscBUSDContract.on("Approval", () => {
      toast.success("Approval was successful");
    });

    await beimaContract.setPlan(
      coin,
      planIpfs,
      totalApprovedAmount,
      monthlyDeposit,
      timeDurationOfDeposit,
      lockTime
    );

    await beimaContract.on("Plan", () => {
      onAddPlan();
      toast.success("A new Flexible Pension Plan was setup successfully");
      Emitter.emit("CLOSE_LOADER");
    });
  } catch (err) {
    console.log("Something went wrong", err);
    let msg = "Something went wrong, please try again later.";
    if (err.code === 4001) msg = "This transaction was denied by you";
    Emitter.emit("CLOSE_LOADER");
    toast.error(msg);
    onError();
  }
}

export async function depositAsset(onSuccess) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("bnbt")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract.pensionServiceApplicant(address);

    let monthlyDepositInWei = parseEther(
      details.client.amountToSpend.toString()
    ).toString();
    const asset = details.client.underlyingAsset;
    console.log({ asset });
    console.log(typeof monthlyDepositInWei);
    await beimaContract.depositToken(asset, 1);

    await beimaContract.on("Deposit", () => {
      onSuccess();
      toast.success("Deposit was successful");
      Emitter.emit("CLOSE_LOADER");
    });
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

export async function supplyAssets(totalUnsuppliedAmount, onSuccess) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("bnbt")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract.pensionServiceApplicant(address);

    let monthlyDepositInWei = parseEther(
      details.client.amountToSpend.toString()
    ).toString();

    await beimaContract.depositToXendFinance(monthlyDepositInWei);

    await beimaContract.on("Supply", () => {
      toast.success(
        `You have successfully staked ${formatMoney(totalUnsuppliedAmount)}`
      );
      onSuccess();
      Emitter.emit("CLOSE_LOADER");
      onSuccess();
    });
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

export async function withdrawAssets(deposit, onSuccess) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("bnbt")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract.pensionServiceApplicant(address);
    console.log(details);
    // const asset = details.client.underlyingAsset;
    // const depositInWei = parseEther(deposit.toString()).toString();
    // // console.log(depositInWei);
    // await beimaContract.withdrawFromXendFinance(asset);

    // await beimaContract.on("MyLog", async () => {
    //   toast.success(`Funds successfully redeemed, proceeding to withdraw...`);
    //   try {
    //     await beimaContract.withdrawToken(asset, depositInWei);
    //   } catch (error) {
    //     console.log("Something went wrong", error);
    //   }
    // });

    // await beimaContract.on("Withdraw", () => {
    //   toast.success(`You have successfully withdrawn ${formatMoney(deposit)}`);
    //   Emitter.emit("CLOSE_LOADER");
    //   onSuccess();
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
