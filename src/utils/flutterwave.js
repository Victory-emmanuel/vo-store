// src/utils/flutterwave.js

import config from "../config";

export const flutterwaveConfig = {
  public_key: config.flutterwave.publicKey,
  tx_ref: Date.now(),
  currency: "NGN",
  payment_options: "card,mobilemoney,ussd",
};
