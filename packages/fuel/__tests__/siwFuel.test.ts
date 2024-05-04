import { SiwxErrorTypes } from "@learnweb3dao/siwx-common";
import { FuelMessage } from "../src";
import { Wallet } from "fuels";

const parsePositiveObjects = require("./fixtures/parse_positive.json");
const parseNegativeObjects = require("./fixtures/parse_negative.json");
const verificationPositiveObjects = require("./fixtures/verification_positive.json");
const verificationNegativeObjects = require("./fixtures/verification_negative.json");

describe("Sign in with Fuel", () => {
  test.concurrent.each(Object.entries(parsePositiveObjects))(
    "Generates message successfully: %s",
    (_, test: any) => {
      const msg = new FuelMessage(test.fields);
      expect(msg.toMessage()).toBe(test.message);
    }
  );

  test.concurrent.each(Object.entries(parseNegativeObjects))(
    "Throws error when generating message: %s",
    (_, test: any) => {
      try {
        new FuelMessage(test);
      } catch (e) {
        expect(Object.values(SiwxErrorTypes).includes(e));
      }
    }
  );

  test.concurrent.each(Object.entries(verificationPositiveObjects))(
    "Verifies message successfully: %s",
    async (_, test: any) => {
      const msg = new FuelMessage(test);

      const result = await msg.verify({
        signature: test.signature,
        time: test.time || test.issuedAt,
      });

      expect(result.error).toBe(undefined);
      expect(result.success).toBe(true);
    }
  );

  test.concurrent.each(Object.entries(parsePositiveObjects))(
    "Verifies message successfully with random wallet: %s",
    async (_, test: any) => {
      const msg = new FuelMessage(test.fields);

      const randomWallet = Wallet.generate();
      msg.address = randomWallet.address.toString();

      const signature = await randomWallet.signMessage(msg.toMessage());
      const result = await msg.verify({
        signature,
        time: test.time || test.issuedAt,
      });

      expect(result.error).toBe(undefined);
      expect(result.success).toBe(true);
    }
  );

  test.concurrent.each(Object.entries(verificationNegativeObjects))(
    "Throws error when verifying message: %s",
    async (_, test: any) => {
      try {
        const msg = new FuelMessage(test);
        const result = await msg.verify({
          signature: test.signature,
          time: test.time || test.issuedAt,
          domain: test.domainBinding,
          nonce: test.matchNonce,
        });

        expect(result.success).toBe(false);
      } catch (e) {
        expect(Object.values(SiwxErrorTypes).includes(e));
      }
    }
  );
});
