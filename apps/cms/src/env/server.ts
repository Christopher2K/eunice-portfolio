import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URI: z.string().url(),
    PAYLOAD_SECRET: z.string().min(1),
    S3_HOST: z.string().url(),
    S3_ACCESS_KEY_ID: z.string().min(1),
    S3_ACCESS_SECRET_KEY: z.string().min(1),
    S3_BUCKET: z.string().min(1),
    S3_REGION: z.string().min(1),
  },
  runtimeEnv: process.env,
});
