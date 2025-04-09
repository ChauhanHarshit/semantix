// lib/wagmi.ts
import { createConfig, http } from 'wagmi'
import { mainnet } from 'viem/chains'
import { injected, metaMask } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    metaMask(),
  ],
  transports: {
    [mainnet.id]: http(),
  },
})
