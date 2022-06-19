import { SiweMessage } from 'siwe';

import { privateBaseAxios } from 'constants/axios';

class Web3 {

  static async signInWithEthereum(provider: any, discordId: string) {

    console.log({ provider })

    const signer = provider.getSigner();

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
    const updatedEthAccount = await this.sendForVerification(signer, message, signature, discordId);

    return updatedEthAccount
  }

  static createSiweMessage(address: string, statement: string, nonce: string) {

    const domain = window.location.host;
    const origin = window.location.origin;

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

  static async sendForVerification(signer: any, message: string, signature: string, discordId: string) {

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

}

export default Web3;