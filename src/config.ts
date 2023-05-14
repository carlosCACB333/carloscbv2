export const config = {
  s3: {
    region: "us-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    bucket: "recog-data-ia",
  },
  mongoUrl: process.env.MONGO_URL!,
};
