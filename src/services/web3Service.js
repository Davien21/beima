import { ethers } from "ethers";
import { BeimaAbi } from "../contracts/abis";
import { BeimaContractAddress, RinkebyUSDTContractAddress } from "../utils";
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
    const network = await getCurrentNetwork();
    if (network && network !== "rinkeby") {
      return toast.error("Please Switch to the Rinkeby Test Network");
    } else {
      toast.success("You successfully switched to the Rinkeby Test Network");
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

export async function getRinkebyUSDTContract(signer) {
  try {
    if (!hasEthereum()) return false;
    const USDTAbi = await fetch(
      "https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=0xE2F373f64f7b60a82a4aC1aF1543f9e9eBa38fE1"
    ).then((r) => r.json());
    return new ethers.Contract(
      RinkebyUSDTContractAddress,
      USDTAbi.result,
      signer
    );
  } catch (err) {
    console.log("failed to load contract", err);
  }
}
