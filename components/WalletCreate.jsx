import { Keypair } from '@solana/web3.js';
import { mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import React, { useState } from 'react';
import nacl from 'tweetnacl';
import { deriveEthereumWallet } from '../utils/validation';

const WalletCreate = () => {
    const [mnemonic, setMnemonic] = useState('');
    const [walletName, setWalletName] = useState('');
    const [coinType, setCoinType] = useState('solana');
    const [wallets, setWallets] = useState < [] > ([]);
    const [index, setIndex] = useState(0);
    const [status, setStatus] = useState < string | null > (null);

    const deriveWallet = ({
        mnemonic,
        coinType,
        walletName,
    }) => {
        const seed = mnemonicToSeedSync(mnemonic);

        let tempIndex = index;
        const paths = {
            solana: `m/44'/501'/${tempIndex}'/0'`,
            ethereum: `m/44'/60'/0'/0/${tempIndex}`,
        };

        let publicKey = '';
        let privateKey = '';
        let newWallet;
        let existingWallets = JSON.parse(localStorage.getItem('wallets') || '[]');
        let isDuplicate = true;

        while (isDuplicate) {
            if (coinType === 'solana') {
                const path = paths[coinType];
                const derivedSeed = derivePath(path, seed.toString('hex')).key;
                const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);
                privateKey = Buffer.from(keypair.secretKey).toString('hex');
                publicKey = Keypair.fromSecretKey(keypair.secretKey).publicKey.toBase58();
            } else if (coinType === 'ethereum') {
                const ethereumWallet = deriveEthereumWallet(seed, paths.ethereum);
                privateKey = ethereumWallet.privateKey;
                publicKey = ethereumWallet.address;
            }

            newWallet = {
                publicKey,
                privateKey,
                coinType,
                name: walletName,
            };

            isDuplicate = existingWallets.some(
                (wallet) => wallet.publicKey === publicKey
            );

            if (isDuplicate) {
                tempIndex++;
                paths.solana = `m/44'/501'/${tempIndex}'/0'`;
                paths.ethereum = `m/44'/60'/0'/0/${tempIndex}`;
            }
        }

        const updatedWallets = [...existingWallets, newWallet];
        localStorage.setItem('wallets', JSON.stringify(updatedWallets));

        setWallets(updatedWallets);
        setIndex(tempIndex + 1);
        setStatus('Wallet Created');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        deriveWallet({ mnemonic, coinType, walletName });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <button className='btn' type='button'><CgShoppingCart size={26} /> Create a Wallet</button>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="walletName" className="block text-gray-700">Wallet Name</label>
                        <input
                            type="text"
                            id="walletName"
                            value={walletName}
                            onChange={(e) => setWalletName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mnemonic" className="block text-gray-700">Secret Phrase</label>
                        <input
                            type="text"
                            id="mnemonic"
                            value={mnemonic}
                            onChange={(e) => setMnemonic(e.target.value)}
                            placeholder="Enter your 12-word mnemonic"
                            className="w-full p-2 border border-gray-300 rounded mt-2"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Coin Type</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="coinType"
                                    value="solana"
                                    checked={coinType === 'solana'}
                                    onChange={(e) => setCoinType(e.target.value)}
                                    className="mr-2"
                                />
                                Solana
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="coinType"
                                    value="ethereum"
                                    checked={coinType === 'ethereum'}
                                    onChange={(e) => setCoinType(e.target.value)}
                                    className="mr-2"
                                />
                                Ethereum
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg"
                    >
                        Create Wallet
                    </button>
                </form>
                {status && <p className="mt-4 text-green-500">{status}</p>}
            </div>
        </div>
    );
};

export default WalletCreate;