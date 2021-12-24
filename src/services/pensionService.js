import { formatEther, parseEther } from "@ethersproject/units";
import { ethers } from "ethers";
import { allowedNetwork, formatMoney } from "../utils";
import toast from "../utils/toastConfig";
import Emitter from "./emitter";
import {
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
  getmBUSDContract,
  getActiveWallet,
} from "./web3Service";

const handleServiceErrors = (err, onError) => {
  console.log("Something went wrong", err);
  let msg = "Something went wrong, please try again later.";
  if (err.code === 4001) msg = "This transaction was denied by you";
  if (err.code === -32016)
    msg = "You don't have enough funds to complete this transaction";
  Emitter.emit("CLOSE_LOADER");
  toast.error(msg);
  if (onError) onError();
};

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
    const currentNetwork = await getCurrentNetwork();
    if (currentNetwork && currentNetwork !== allowedNetwork) return false;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);

    const mBUSDContract = await getmBUSDContract(signer);
    await mBUSDContract.approve(
      beimaContract.address,
      parseEther(totalApprovedAmount).toString()
    );
    await mBUSDContract.on("Approval", () => {
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
    handleServiceErrors(err, onError);
  }
}

export async function depositAsset(onSuccess) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const currentNetwork = await getCurrentNetwork();
    if (currentNetwork && currentNetwork !== allowedNetwork) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    console.log(beimaContract);
    const details = await beimaContract.pensionServiceApplicant(address);

    let monthlyDepositInWei = parseEther(
      details.client.amountToSpend.toString()
    ).toString();

    const asset = details.client.underlyingAsset;
    // console.log({ asset });
    await beimaContract.depositToken(asset, monthlyDepositInWei);

    await beimaContract.on("Deposit", () => {
      onSuccess();
      toast.success("Deposit was successful");
      Emitter.emit("CLOSE_LOADER");
    });
  } catch (err) {
    handleServiceErrors(err);
  }
}

export async function supplyAssets(unsuppliedAmount, onSuccess) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const currentNetwork = await getCurrentNetwork();
    if (currentNetwork && currentNetwork !== allowedNetwork) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);

    const unsuppliedAmountInWei = parseEther(
      unsuppliedAmount.toString()
    ).toString();

    // console.log({unsuppliedAmount})
    await beimaContract.depositToXendFinance(unsuppliedAmountInWei);

    setTimeout(() => {
      toast.success(
        `You have successfully staked ${formatMoney(unsuppliedAmount)}`
      );
      onSuccess();
      Emitter.emit("CLOSE_LOADER");
      onSuccess();
    }, 15000);

    // await beimaContract.on("Deposit", () => {});
  } catch (err) {
    handleServiceErrors(err);
  }
}

export async function withdrawAssets(deposit, onSuccess) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const currentNetwork = await getCurrentNetwork();
    if (currentNetwork && currentNetwork !== allowedNetwork) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();
    const beimaContract = await getBeimaContract(signer);

    let totalDeposit = parseEther(deposit.toString()).toString();

    const details = await beimaContract.pensionServiceApplicant(address);
    // console.log({ totalDeposit });

    const asset = details.client.underlyingAsset;

    const totalUnsuppliedAmount = (
      await beimaContract?.amountSupplied(address)
    ).toString();

    console.log({ totalUnsuppliedAmount, totalDeposit });



    if (parseInt(totalUnsuppliedAmount) > 0 && parseInt(totalDeposit)) {
      await beimaContract.withdrawFromXendFinance(asset);
      await beimaContract.on("Withdraw", async () => {
        toast.success(
          `You have redeemed your funds. Proceeding to withdraw...`
        );
        try {
          await beimaContract.withdrawToken(asset, totalDeposit);
          await beimaContract.on("Withdraw", () => {
            toast.success(
              `You have successfully withdrawn ${formatMoney(deposit)}`
            );
            Emitter.emit("CLOSE_LOADER");
            onSuccess();
          });
        } catch (err) {
          handleServiceErrors(err);
        }
      });
    }

    if (totalUnsuppliedAmount === totalDeposit) {
      await beimaContract.withdrawToken(asset, totalDeposit);
      await beimaContract.on("Withdraw", async () => {
        toast.success(
          `You have successfully withdrawn ${formatMoney(deposit)}`
        );
        Emitter.emit("CLOSE_LOADER");
        onSuccess();
      });
    }
  } catch (err) {
    handleServiceErrors(err);
  }
}
