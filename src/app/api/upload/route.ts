import { config } from "@/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { log } from "console";
import { NextResponse } from "next/server";

const s3 = new S3Client({
  region: config.s3.region,
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  },
});

export async function POST(request: Request) {
  const data = await request.formData();
  const image = data.get("image");
  const fileName = data.get("fileName");
  await saveImage(image as File, fileName as string);
  return NextResponse.json({
    message: "Hello World",
  });
}

const saveImage = async (image: File, fileName: string) => {
  const image_buffer = Buffer.from(await image.arrayBuffer());
  const response = await s3.send(
    new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: fileName,
      Body: image_buffer,
    })
  );
  log(response);
};
