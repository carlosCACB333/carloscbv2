import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./aws";
import { config } from "@/config";

export const saveImage = async (image: File) => {
  try {
    const image_buffer = Buffer.from(await image.arrayBuffer());
    const photo = image.name;
    await s3.send(
      new PutObjectCommand({
        Bucket: config.s3.bucket,
        Key: photo,
        Body: image_buffer,
      })
    );

    return {
      ok: true,
      photo,
    };
  } catch (error) {
    return {
      ok: false,
      photo: "",
    };
  }
};

export const deleteImage = async (photo: string) => {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: config.s3.bucket,
        Key: photo,
      })
    );
    return true;
  } catch (error) {
    return false;
  }
};
