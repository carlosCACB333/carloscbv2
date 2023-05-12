import { config } from "@/config";
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: config.s3.region,
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  },
});
