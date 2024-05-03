"use client";

// import { FuelMessage } from "@learnweb3dao/siwfuel";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAccount, useConnect, useNetwork, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Provider, Wallet, BN, Address } from "fuels";

export const SIWFUEL: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [balance, setBalance] = React.useState<number>(0);

  useEffect(() => {
    async () => {
      const provider = await Provider.create(
        "https://beta-5.fuel.network/graphql"
      );
      const myWallet = Wallet.fromAddress(
        "fuel1j0k43mq3g2l6spur9y0tesps6s0sdhnfq8xv2ng5ga9td250u9hqs5a983",
        provider
      );
      myWallet.getBalances().then((data) => {
        setBalance(new BN(data[0].amount).toNumber());
      });
    };
  }, []);

  useEffect(() => {
    // convert fuel address to EVM address
    const bech32 =
      "fuel1d5cfwekq78r0zq73g7eg0747etkaxxltrqx5tncm7lvg89awe3hswhqjhs";
    const addressInstance = Address.fromDynamicInput(bech32);
    const b256 = addressInstance.toB256();
    // EVM ADDRESS = 0x6d309766c0f1c6f103d147b287fabecaedd31beb180d45cf1bf7d88397aecc6f
  }, []);

  console.log(balance);

  return (
    <button
      //   onClick={(e) => {
      //     e.preventDefault();
      //     if (!isConnected) {
      //       connect();
      //       handleLogin();
      //     } else {
      //       handleLogin();
      //     }
      //   }}
      className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded"
    >
      Sign in with Fuel
    </button>
  );
};
