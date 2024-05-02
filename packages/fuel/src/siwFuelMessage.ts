import {
  SiwxError,
  SiwxErrorTypes,
  SiwxMessage,
  VerificationResponse,
  VerifyParams,
} from "@learnweb3dao/siwx-common";
import { Wallet } from "fuels";

export class FuelMessage extends SiwxMessage<string> {
  toMessage(): string {
    return this._toMessage("Fuel");
  }

  async verify(params: VerifyParams): Promise<VerificationResponse<string>> {
    try {
      const { signature } = params;

      this._verify(params);

      const message = this.toMessage();
      // const recoveredAddress = Wallet.recover(message, signature);

      // if (recoveredAddress !== this.address) {
      //   throw new SiwxError(
      //     SiwxErrorTypes.INVALID_SIGNATURE,
      //     `Signature does not match address ${this.address}`
      //   );
      // }

      return {
        success: true,
        data: this,
      };
    } catch (error) {
      return {
        success: false,
        error,
        data: this,
      };
    }
  }
}
