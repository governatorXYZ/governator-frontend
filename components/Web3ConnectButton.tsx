import { ethers } from "ethers";
import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider";

import { useAtom } from 'jotai';
import { userAtom, providerAtom } from 'atoms';

/* Modules */
import Siwe from '../modules/siwe';

/* UI Components */

/* Types */

const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
}


const Web3ConnectButton: React.FC = (props) => {

  const [web3Modal, setWeb3Modal] = useState(null as unknown as Web3Modal);
  const [user, setUser] = useAtom(userAtom);
  const [provider, setProvider] = useAtom(providerAtom);

  useEffect(() => {
    const newWeb3Modal = new Web3Modal({
      cacheProvider: false, // very important
      network: "mainnet",
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal)
  }, [])


  async function connectWallet() {

    /* Clears provider and displays modal */
    await web3Modal.clearCachedProvider()
    const instance = await web3Modal.connect(); 

    /* Once provider is chosen */
    const provider = new ethers.providers.Web3Provider(instance);
    setProvider(provider);
    const signer = provider.getSigner();

    /* Get signer wallet address */
    const walletAddress = await signer.getAddress();
    console.log({ walletAddress });

    console.log({ 
      provider,
      signer
    })

    await Siwe.createWalletAccount(walletAddress, user.userId);

  }

  return <button onClick={connectWallet}>Connect</button>
}

export default Web3ConnectButton