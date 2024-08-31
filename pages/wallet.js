
"use client";
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { useState } from "react";
import { CgShoppingCart } from "react-icons/cg";
import nacl from "tweetnacl";

export default function Wallet() {
  const [mnemonic, setMnemonic] = useState('');

  function createMnemonic() {
    const newMnemonic = generateMnemonic();
    setMnemonic(newMnemonic);
    console.log('Generated Mnemonic:', newMnemonic);
  }

  return (
    <div>
                              <button onClick={createMnemonic} className='btn' type='button'><CgShoppingCart size={26} /> Create Wallet</button>

      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
    </div>
  );
}

function SolanaWallet({ mnemonic }) {
  console.log("Mnemonic passed:", mnemonic);

  const [currentIndex, setCurrentIndex] = useState(0);
const [publicKeys, setPublicKeys] = useState([]);

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    console.log("Seed:", seed.toString('hex'));

    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString('hex')).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setCurrentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
    console.log("Public Key:", keypair.publicKey.toBase58());
    console.log("Secret Key:", Buffer.from(keypair.secretKey).toString('hex'));

        localStorage.setItem('userprofile', keypair.publicKey.toBase58());

  };

  return (
   <div className="p-6 bg-gray-900 text-white mx-40 my-10">
      {mnemonic ? (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Your Secret Phrase</h3>
          <div className="grid grid-cols-3 gap-2">
            {mnemonic.split(' ').map((word, index) => (
              <div key={index} className="bg-gray-800 p-2 rounded text-center">
                {index + 1}. {word}
              </div>
            ))}
          </div>
          <p className="text-red-500 text-sm mt-4">
            Important: Copy and store your mnemonic securely. This is the only
            way to recover your wallets. If lost, your funds cannot be retrieved. Do
            not share it with anyone.
          </p>
        </div>
      ) : (
        <p>No mnemonic available</p>
      )}

      <button onClick={addWallet}>Add Wallet</button>
      {publicKeys.map((p, index) => (
        <div key={index}>{p}</div>
      ))}
    </div>
  );
}
