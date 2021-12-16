import { ethers } from "ethers";
import { BeimaAbi } from "../contracts/abis";
import {
  allowedNetwork,
  BeimaContractAddress,
  mBUSDContractAddress,
  networkNames,
} from "../utils";
import toast from "../utils/toastConfig";

export const connectToMetaMask = async (setError) => {
  try {
    if (!hasEthereum()) return false;

    await window.ethereum.request({ method: "eth_requestAccounts" });

    return true;
  } catch (error) {
    console.log(error);
    if (setError) setError(error.message ?? error.toString());
    return { error };
  }
};

export function getActiveWallet() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = signer.provider.provider.selectedAddress;
  return address;
}

export function hasEthereum() {
  return window.ethereum ? true : false;
}

export async function getCurrentNetwork() {
  if (!hasEthereum()) return false;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const network = (await signer.provider._networkPromise).name;
  return network;
}

export function listenToAccountChanges(handler) {
  if (!hasEthereum()) return false;

  window.ethereum.on("accountsChanged", async (accounts) => {
    handler(accounts[0]);
  });
}

export function listenToNetworkChanges(handler) {
  if (!hasEthereum()) return false;

  window.ethereum.on("chainChanged", async () => {
    const currentNetwork = await getCurrentNetwork();
    if (currentNetwork && currentNetwork !== allowedNetwork) {
      return toast.error(
        `Please Switch to the ${networkNames[allowedNetwork]}`
      );
    } else {
      toast.success(
        `You successfully switched to the ${networkNames[allowedNetwork]}`
      );
      // handler(network);
    }
  });
}

export async function unmountEthListeners() {
  window.ethereum.removeListener("chainChanged", () => {});
  window.ethereum.removeListener("accountsChanged", () => {});
  window.ethereum.removeListener("message", () => {});
}

export async function getBeimaContract(signer) {
  try {
    if (!hasEthereum()) return false;

    return new ethers.Contract(BeimaContractAddress, BeimaAbi.abi, signer);
  } catch (err) {
    console.log("failed to load contract", err);
  }
}

export async function getmBUSDContract(signer) {
  try {
    if (!hasEthereum()) return false;
    const USDTAbi = await fetch(
      "https://api.bscscan.com/api?module=contract&action=getabi&address=0xe9e7cea3dedca5984780bafc599bd69add087d56"
    ).then((r) => r.json());
    return new ethers.Contract(mBUSDContractAddress, USDTAbi.result, signer);
  } catch (err) {
    console.log("failed to load contract", err);
  }
}
