import type { Config } from "@payload-types";
import { PayloadSDK } from "@payloadcms/sdk";
import { env } from "./env";

export const sdk = new PayloadSDK<Config>({
  baseURL: `${env.VITE_PAYLOAD_URL}/api`,
});
