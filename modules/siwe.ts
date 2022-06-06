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
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();

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

    return provider.send('eth_requestAccounts', [])
      .then(async (wallets: string[]) => {

        console.log({wallets})

        const walletAddress = wallets[0];

        /* Check if eth wallet already exists in database */
        const walletRes = await privateBaseAxios.get(`/account/ethereum/get-by-account-id/${walletAddress}`)
        const wallet = walletRes.data


        /* Return is already exists */
        if (wallet) {
          return wallet;
        }

        console.log({walletAddress})

        /* Create if wallet does not exist in database */
        const data = {
          _id: walletAddress
        };
        const newEthAccount = await privateBaseAxios.post('/account/ethereum/create', data);
        console.log({newEthAccount})
        return newEthAccount.data;
      })
      .catch(() => console.log('user rejected request'));
  }

  static async signInWithEthereum(nonce: string) {

    console.log({signer})

    if (!signer) {
      alert('Wallet not connected!')
      return;
    }

    const message = this.createSiweMessage(
      await signer.getAddress(),
      'Sign in with Ethereum to the app. - link to discord_id ${discord_id}',
      nonce
    );
    const signature = await signer.signMessage(message);
    const updatedEthAccount = await this.sendForVerification(message, signature);

    console.log({ updatedEthAccount })
    return updatedEthAccount
  }

  static async sendForVerification(message: string, signature: string) {

    const address = await signer.getAddress();
    const data = {
      _id: address,
      verification_message: message,
      signed_message: signature
    }

    const updatedEthAccount = await privateBaseAxios.post('/web3/verify', data)

    console.log({ updatedEthAccount })

    console.log(await res.text());

    return updatedEthAccount.data
  }

}

export default Siwe;

