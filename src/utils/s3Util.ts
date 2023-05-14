import { ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
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

interface ImageData {
  [key: string]: string[];
}

export const getAllImages = async () => {
  const response = await s3.send(
    new ListObjectsCommand({
      Bucket: config.s3.bucket,
    })
  );
  const data: ImageData = {};

  response.Contents?.map((content) => {
    const key = content.Key!;
    const [name, _] = key.split("/");
    const url = `https://${config.s3.bucket}.s3.amazonaws.com/${key}`;
    if (!data[name]) {
      data[name] = [url];
    } else {
      data[name].push(url);
    }
  });

  return {
    dataJson: data,
    data:
      response.Contents?.map((content) => {
        const [name, _] = content.Key!.split("/");
        return {
          url: `https://${config.s3.bucket}.s3.amazonaws.com/${content.Key!}`,
          name,
        };
      }) || [],
  };
};
