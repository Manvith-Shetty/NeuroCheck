import { solana, solanaDevnet, solanaTestnet } from '@web3modal/solana/chains'
import { createWeb3Modal, defaultSolanaConfig } from '@web3modal/solana/react'

const chains = [solana, solanaTestnet, solanaDevnet]
const projectId = 'b362c8f59be260a22a9ecd304d11a640'

const metadata = {
    name: 'test',
    description: 'AppKit Example',
    url: 'https://web3modal.com', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const solanaConfig = defaultSolanaConfig({
    metadata,
    chains,
    projectId
})

createWeb3Modal({
    solanaConfig,
    chains,
    projectId,
    wallets: []
})
