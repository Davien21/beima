import { parseEther } from "@ethersproject/units";
import { ethers } from "ethers";
import { formatMoney } from "../utils";
import toast from "../utils/toastConfig";
import Emitter from "./emitter";
import {
  hasEthereum,
  getBeimaContract,
  getCurrentNetwork,
  getRinkebyUSDTContract,
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
    const network = await getCurrentNetwork();
    if (network && !network.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const beimaContract = await getBeimaContract(signer);

    const RinkebyUSDTContract = await getRinkebyUSDTContract(signer);
    await RinkebyUSDTContract.approve(
      beimaContract.address,
      parseEther(totalApprovedAmount).toString()
    );
    await RinkebyUSDTContract.on("Approval", () => {
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
    const network = await getCurrentNetwork();
    if (network && !network.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract.pensionServiceApplicant(address);

    let monthlyDepositInWei = parseEther(
      details.client.amountToSpend.toString()
    ).toString();
    const cAsset = details.client.underlyingAsset;
    const asset = await beimaContract.getAssetAddress(cAsset);
    // console.log(monthlyDepositInWei);
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

export async function supplyAssets(totalUnsuppliedAmount, onSuccess) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract.pensionServiceApplicant(address);

    const cAsset = details.client.underlyingAsset;

    await beimaContract.supply(cAsset);

    await beimaContract.on("Supply", () => {
      toast.success(
        `You have successfully staked ${formatMoney(totalUnsuppliedAmount)}`
      );
      onSuccess();
      Emitter.emit("CLOSE_LOADER");
      onSuccess();
    });
  } catch (err) {
    handleServiceErrors(err);
  }
}

export async function withdrawAssets(deposit, onSuccess) {
  Emitter.emit("OPEN_LOADER");
  try {
    if (!hasEthereum()) return false;
    const network = await getCurrentNetwork();
    if (network && !network.includes("rinkeby")) return false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await getActiveWallet();

    const beimaContract = await getBeimaContract(signer);
    const details = await beimaContract.pensionServiceApplicant(address);

    const cAsset = details.client.underlyingAsset;

    const asset = await beimaContract.getAssetAddress(cAsset);
    const depositInWei = parseEther(deposit.toString()).toString();
    // console.log(depositInWei);
    await beimaContract.redeemCErc20Tokens(depositInWei, cAsset);

    await beimaContract.on("MyLog", async () => {
      toast.success(`Funds successfully redeemed, proceeding to withdraw...`);
      try {
        await beimaContract.withdrawToken(asset, depositInWei);
      } catch (err) {
        handleServiceErrors(err);
      }
    });

    await beimaContract.on("Withdraw", () => {
      toast.success(`You have successfully withdrawn ${formatMoney(deposit)}`);
      Emitter.emit("CLOSE_LOADER");
      onSuccess();
    });
  } catch (err) {
    handleServiceErrors(err);
  }
}
