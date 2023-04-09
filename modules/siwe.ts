import { ethers } from 'ethers';
import { SiweMessage } from 'siwe';
import { privateBaseAxios } from 'constants/axios';

/* TYPES */
import { GovernatorWindow } from "../types/global";
import { EIP1193Provider } from '@web3-onboard/core';
import type { SiweVerifyDto } from 'governator-sdk';
import { AxiosResponse } from 'axios';

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

  /**
   * Connects wallet and returns wallet address
   * @todo - after adding onboard, do we still need this?
   * @returns {Promise<string | null>} - returns wallet address or null
   */
  static async connectWallet(): Promise<string | null>  {
    try {
      if (!provider) { alert('No wallet found!'); return null }
      const wallets = await provider.send('eth_requestAccounts', [])
      return wallets[0]; // Wallet address
    } catch (e) {
      console.error('connectWallet: ', e);
      return null;
    }
  }

  /**
   * Checks to see if a wallet exists. Creates wallet if one does not exist.
   * @param walletAddress 
   * @param user_id 
   * @returns 
   */
  static async createWalletAccount(
    walletAddress: string,
    user_id: string
  ) {
    /* Check if eth wallet already exists in database */
    const { data: wallet } = await privateBaseAxios.get(`/account/ethereum/get-by-account-id/${walletAddress}`);

    /* Return is already exists */
    if (wallet) return wallet;
  
    /* Create if wallet does not exist in database */
    const { data: newEthAccount } = await privateBaseAxios.post('/account/ethereum/create', { _id: walletAddress });

    /* Update user_id of newEthAccount */
    const { data: updatedAccount } = await privateBaseAxios.patch(
      `/account/ethereum/update/${newEthAccount._id}`,
      { user_id }
    )
    return updatedAccount
  }

  /**
   * creates a message and signature and sends for verification.
   * @param {string} discordId - the discord id
   * @param {EIP1193Provider} provider optional provider, if not provided, will use provider from window.ethereum
   * @param {string} address - optional address, if not provided, will use signer
   * @todo - add error handling and type
   * @returns {Promise<any>}
   */
  static signInWithEthereum(
    discordId: string,
    provider?: EIP1193Provider,
    address?: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!signer) reject("Wallet not connected")

        const walletAddress = address ? ethers.utils.getAddress(address) : await signer.getAddress();
    
        /* Get nonce from server */
        const { data: nonce } = await privateBaseAxios.get(`/siwe/nonce/${walletAddress}`)
    
        /* Create message */
        const message = this.createSiweMessage(
          walletAddress,
          `Sign in with Ethereum to the app. - link to discord_id ${discordId}`,
          nonce
        );

        // generate signature. If address is provided, use provider, otherwise use signer
        const signature = await this.generateSignature(message, provider, address);
    
        resolve(await this.sendForVerification(message, signature, discordId, walletAddress));
      } catch (e) {
        reject(e);
      }
    });
  }

  static async generateSignature (message: string, provider?: EIP1193Provider, address?: string) {
    return (provider && address) ? await provider.request({ method: 'personal_sign', params: [message, address] }) : await signer.signMessage(message);
  }

  /**
   * verifies a given message against a signature.
   * @param {string} verification_message - the verification message.
   * @param {string} signature - the signed message.
   * @todo - Don't need to verify on frontend. Remove this.
   * @todo - if kept address error handling
   * @returns 
   */
  static async verifySiweMessage(verification_message: string, signature: string): Promise<string | undefined> {
    try {
      const siweMessage = new SiweMessage(verification_message);
      await siweMessage.verify({ signature });
      return siweMessage.prepareMessage();
    } catch (e) {
      console.error('verifySiweMessage: ', e);
    }
  }

  /**
   * Creates a siwe message, and returns the prepared message.
   * @param {string} address - the address to sign
   * @param {string} statement - the statement to sign
   * @param {string} nonce - nonce from server
   * @param {string} version - defaults to '1', can be overidden
   * @returns {string} the prepared message
   */
  static createSiweMessage(
    address: string,
    statement: string,
    nonce: string,
    version = '1',
    chainId = 1
  ): string {
    const message = {
      domain,
      address,
      statement,
      uri: origin,
      version,
      chainId,
      nonce,
    }
    
    return new SiweMessage(message).prepareMessage();
  }

  /**
   * 
   * @param {string} message - the verification message
   * @param {string} signature - the signed message
   * @param {string} discordId - the discord id
   * @param {string} address  - optional address, if not provided, will use signer
   * @returns 
   */
  static async sendForVerification(
    message: string,
    signature: string,
    discordId: string,
    address?: string
  ) {
    if (!signer) { alert('Wallet not connected!'); return }
    const walletAddress = (address) ?? (await signer.getAddress());
      
    const data: SiweVerifyDto = {
      _id: walletAddress,
      verification_message: message,
      signed_message: signature,
      link_account: {
        "provider_id": "discord",
        "_id": discordId
      }
    }

    const updatedEthAccount: AxiosResponse<SiweVerifyDto> = await privateBaseAxios.post<SiweVerifyDto>('/siwe/verify', data)
    return updatedEthAccount.data
  }

  static async removeWallet(walletAddress: string) {
    await privateBaseAxios.delete(`/account/ethereum/delete/${walletAddress}`)
  }
  
}

export default Siwe;

