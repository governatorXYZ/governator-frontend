import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';
import { privateBaseAxios } from 'constants/axios';
import keccak from 'keccak';

/* TYPES */
import { GovernatorWindow } from "../types/global";
import { EIP1193Provider, WalletState } from '@web3-onboard/core';

declare const window: GovernatorWindow;

let domain = '';
let origin = '';
let provider: any;
let signer: any;

if (typeof window !== "undefined" && window.ethereum) {

  domain = window.location.host;
  origin = window.location.origin;
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();

}

class Siwe {

  static async connectWallet(): Promise<string | null>  {
    if (!provider) {
      alert('No wallet found!')
      return null;
    }
    const wallets = await provider.send('eth_requestAccounts', [])
    return wallets[0]; // Wallet address
  }

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
    const newEthAccount = newEthAccountXhr.data

    /* Update user_id of newEthAccount */
    const updateData = {
      user_id: userId
    }
    const updatedAccountXhr = await privateBaseAxios.patch(`/account/ethereum/update/${newEthAccount._id}`, updateData)
    return updatedAccountXhr.data
  }

  static encodeAddress (address: string): string {
    const addr = address.toLowerCase().replace('0x', '');
    const hash = keccak('keccak256').update(addr).digest('hex');
    let ret = '0x';

    for (let i = 0; i < addr.length; i++) {
      if (parseInt(hash[i], 16) >= 8) {
        ret += addr[i].toUpperCase();
      } else {
        ret += addr[i];
      }
    }
    return ret;
  }

  static async signInWithEthereum(
    discordId: string,
    provider?: EIP1193Provider,
    address?: string
  ) {
    try {
      if (!signer) { alert('Wallet not connected!'); return }
      let walletAddress = '';
      if (address) {
        walletAddress = this.encodeAddress(address);
        // walletAddress = address;
      } else {
        walletAddress = await signer.getAddress();
      }
  
      /* Get nonce from server */
      const { data: nonce } = await privateBaseAxios.get(`/siwe/nonce/${walletAddress}`)
  
      const message = this.createSiweMessage(
        walletAddress,
        `Sign in with Ethereum to the app. - link to discord_id ${discordId}`,
        nonce
      );

      // generate signature. If address is provided, use provider, otherwise use signer
      const signature = await this.generateSignature(message, provider, address);
  
      // const result = this.verifySiweMessage(message, signature);
      return await this.sendForVerification(message, signature, discordId, walletAddress);
    } catch (e) {
      console.error('signInWithEthereum: ', e);
      return;
    }
  }

  static async generateSignature (message: string, provider?: EIP1193Provider, address?: string) {
    return (provider && address) ? await provider.request({ method: 'personal_sign', params: [message, address] }) : await signer.signMessage(message);
  }

  static async verifySiweMessage(
    verification_message: string,
    signed_message: string,
  ) {
    try {
      const siweMessage = new SiweMessage(verification_message);
      const result = await siweMessage.verify({
        signature: signed_message,
      });
      return siweMessage.prepareMessage();
    } catch (e) {
      console.error('verifySiweMessage: ', e);
    }
  }

  static createSiweMessage(
    address: string,
    statement: string,
    nonce: string
  ) {
    const message = {
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: 1,
      nonce,
    }
    const siweMessage = new SiweMessage(message);

    return siweMessage.prepareMessage();
  }

  static async sendForVerification(
    message: string,
    signature: string,
    discordId: string,
    address?: string
  ) {
    let walletAddress;
    if (address) {
      walletAddress = address;
    } else {
      walletAddress = await signer.getAddress();
    }

    const data = {
      _id: walletAddress,
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
  
}

export default Siwe;

