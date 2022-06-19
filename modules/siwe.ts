import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';

import { privateBaseAxios } from 'constants/axios';
import { userAtom } from 'atoms'

/* TYPES */
import { GovernatorWindow } from "../types/global";

declare const window: GovernatorWindow;

let domain = '';
let origin = '';
let provider: any;
let signer: any;

if (typeof window !== "undefined" && window.ethereum) {

  domain = window.location.host;
  origin = window.location.origin;
  // provider = new ethers.providers.Web3Provider(window.ethereum);
  // signer = provider.getSigner();

}

class Siwe {

  static createSiweMessage(address: string, statement: string, nonce: string) {
    const siweMessage = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: 1,
      nonce,

    });

    return siweMessage.prepareMessage();
  }

  static async connectWallet(): Promise<{user_id: string}>  {

    if (!provider) {
      alert('No wallet found!')
      return {user_id: ''};
    }

    const wallets = await provider.send('eth_requestAccounts', [])

    const walletAddress = wallets[0];

    /* Check if eth wallet already exists in database */
    const walletRes = await privateBaseAxios.get(`/account/ethereum/get-by-account-id/${walletAddress}`);
    const wallet = walletRes.data;

    /* Return is already exists */
    if (wallet) {
      return wallet;
    }

    /* Create if wallet does not exist in database */
    const data = {
      _id: walletAddress
    };
    const newEthAccount = await privateBaseAxios.post('/account/ethereum/create', data);

    return newEthAccount.data;

  }

  static async signInWithEthereum(discordId: string) {

    console.log({
      signer,
      provider,
    })

    if (!signer) {
      alert('Wallet not connected!')
      return;
    }

    const walletAddress = await signer.getAddress();

    console.log({ walletAddress })

    /* Get nonce from server */
    const nonceRes = await privateBaseAxios.get(`/siwe/nonce/${walletAddress}`)
    const nonce = nonceRes.data

    console.log({ nonce })

    const message = this.createSiweMessage(
      walletAddress,
      `Sign in with Ethereum to the app. - link to discord_id ${discordId}`,
      nonce
    );

    console.log({ message })

    const signature = await signer.signMessage(message);
    const updatedEthAccount = await this.sendForVerification(message, signature, discordId);

    return updatedEthAccount
  }

  static async sendForVerification(message: string, signature: string, discordId: string) {

    const address = await signer.getAddress();
    const data = {
      _id: address,
      verification_message: message,
      signed_message: signature,
      link_account: {
        "provider_id": "discord",
        "_id": discordId
      }
    }

    const updatedEthAccount = await privateBaseAxios.post('/siwe/verify', data)
    return updatedEthAccount.data
  }

  static async removeWallet(walletAddress: string) {
    await privateBaseAxios.delete(`/account/ethereum/delete/${walletAddress}`)
  }


  /**
   * ██╗    ██╗███████╗██████╗ ██████╗ ███╗   ███╗ ██████╗ ██████╗  █████╗ ██╗         ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
   * ██║    ██║██╔════╝██╔══██╗╚════██╗████╗ ████║██╔═══██╗██╔══██╗██╔══██╗██║         ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
   * ██║ █╗ ██║█████╗  ██████╔╝ █████╔╝██╔████╔██║██║   ██║██║  ██║███████║██║         █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
   * ██║███╗██║██╔══╝  ██╔══██╗ ╚═══██╗██║╚██╔╝██║██║   ██║██║  ██║██╔══██║██║         ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
   * ╚███╔███╔╝███████╗██████╔╝██████╔╝██║ ╚═╝ ██║╚██████╔╝██████╔╝██║  ██║███████╗    ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
   *  ╚══╝╚══╝ ╚══════╝╚═════╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
   */
  static async createWalletAccount(walletAddress: string, userId: string) {

    /* Check if eth wallet already exists in database */
    const walletRes = await privateBaseAxios.get(`/account/ethereum/get-by-account-id/${walletAddress}`);
    const wallet = walletRes.data;

    /* Return is already exists */
    if (wallet) {
      return wallet;
    }

    /* Create if wallet does not exist in database */
    const data = {
      _id: walletAddress
    };
    const newEthAccountXhr = await privateBaseAxios.post('/account/ethereum/create', data);
    console.log({ newEthAccountXhr })
    const newEthAccount = newEthAccountXhr.data

    /* Update user_id of newEthAccount */
    const updateData = {
      user_id: userId
    }
    console.log({ updateData })
    const updatedAccountXhr = await privateBaseAxios.patch(`/account/ethereum/update/${newEthAccount._id}`, updateData)
    const updatedAccount = updatedAccountXhr.data

    return updatedAccount;

  }

}

export default Siwe;

