"use client";

import { FuelMessage } from "@learnweb3dao/siwfuel";
import { getCsrfToken, signIn } from "next-auth/react";
import React from "react";
import { useConnectUI } from "@fuels/react";
import { useIsConnected } from "@fuels/react";
import { Fuel } from "fuels";
import { defaultConnectors } from "@fuels/connectors";
import { useChain, useAccount } from "@fuels/react";

export const SIWFUEL: React.FC = () => {
  const { connect } = useConnectUI();
  const { isConnected } = useIsConnected();
  const { chain } = useChain();
  const { account } = useAccount();

  const handleLogin = async () => {
    try {
      const fuel = new Fuel({
        connectors: defaultConnectors({ devMode: true }),
      });

      const currentAccount = await fuel.currentAccount();

      if (!currentAccount) {
        connect();
        return;
      }

      const message = new FuelMessage({
        domain: window.location.host,
        address: currentAccount,
        statement: "Sign in with Ethereum to this application.",
        uri: window.location.origin,
        version: "1",
        chainId: chain?.consensusParameters.chainId.toString(),
        nonce: await getCsrfToken(),
        issuedAt: new Date().toISOString(),
      });

      if (!account) {
        return;
      }

      const wallet = await fuel.getWallet(account);
      const signedMessage = await wallet.signMessage(message.toMessage());

      await signIn("fuel", {
        message: JSON.stringify(message),
        signature: signedMessage,
        redirect: false,
      });
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (!isConnected) {
          connect();
          handleLogin();
        } else {
          handleLogin();
        }
      }}
      className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded"
    >
      Sign in with Fuel
    </button>
  );
};
