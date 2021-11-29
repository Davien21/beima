/** @format */

import { ethers } from 'ethers';
import { BeimaAbi } from '../contracts/abis';
import {
	BeimaContractAddress,
} from '../utils';

export const connectToMetaMask = async (setError) => {
	try {
		if (!hasEthereum()) return false;

		await window.ethereum.request({ method: 'eth_requestAccounts' });

		return true;
	} catch (error) {
		console.log(error);
		if (setError) setError(error.message ?? error.toString());
		return { error };
	}
};

export function getActiveWallet() {
	if (!hasEthereum()) return false;
	const ethTarget = { ...window.ethereum };
	if (!ethTarget.selectedAddress) return null;
	const address = ethTarget.selectedAddress;
	return address;
}

export function hasEthereum() {
	return window.ethereum ? true : false;
}

export function listenToAccountChanges(handler) {
	if (!hasEthereum()) return false;

	window.ethereum.on('accountsChanged', async (accounts) => {
		handler(accounts[0]);
	});
}

export async function unmountEthListeners() {
	window.ethereum.removeListener('accountsChanged', () => {});
	window.ethereum.removeListener('message', () => {});
}


// Load Contract
export async function getBeimaContract(signer) {
  try {
    if (!hasEthereum()) return false;

		return new ethers.Contract(BeimaContractAddress, BeimaAbi.abi, signer);
    
  } catch (err) {
    console.log("failed to load contract", err)
    
  }

}





