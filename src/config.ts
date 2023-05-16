export const config = {
  s3: {
    region: process.env.AWS_REGION!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    bucket: process.env.BUCKET_NAME!,
  },
  mongoUrl: process.env.MONGO_URL!,
};
