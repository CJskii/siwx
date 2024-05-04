import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { wagmiClient } from "@/config/config";
import { WagmiConfig } from "wagmi";
import { SessionProvider } from "next-auth/react";
import { FuelProvider } from "@fuels/react";
import { defaultConnectors } from "@fuels/connectors";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <FuelProvider
          fuelConfig={{ connectors: defaultConnectors({ devMode: true }) }}
        >
          <WagmiConfig client={wagmiClient}>
            <Component {...pageProps} />
          </WagmiConfig>
        </FuelProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
