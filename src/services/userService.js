/** @format */
import { ethers } from 'ethers';
import { getActiveWallet, hasEthereum, getBeimaContract } from './web3Service';



// load user
export async function getUserDetails() {
	try {
		if (!hasEthereum()) return false;

		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();

		const beimaContract = await getBeimaContract(signer);
		const address = getActiveWallet();

		const userRegisterd = await beimaContract.isRegisterd(address);
		if (!userRegisterd) return null;

		let user = await beimaContract.pensionServiceApplicant(address);

		return user;
	} catch (err) {
		console.log('User is Not registered', err);
	}
}



// Register user
export async function registerUser(
	asset,
	userIpfsDetails,
	amountToSpend,
	timeDurationOfDepositInDays,
) {
	try {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		const signer = provider.getSigner();

		const beimaContract = await getBeimaContract(signer);
		// const address = getActiveWallet();

		let result = await beimaContract.register(
			asset,
			userIpfsDetails,
			amountToSpend,
			timeDurationOfDepositInDays,
		);

		console.log(result);

		await beimaContract.on('Register', () => {
			// do something
			console.log('do something');
		});
	} catch (err) {
		console.log('user registration failed', err);
	}
}
