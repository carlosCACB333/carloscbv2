import { ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3";
import { config } from "@/config";
import { log } from "console";

export const saveImage = async (
  image: File,
  fileName: string
): Promise<boolean> => {
  const image_buffer = Buffer.from(await image.arrayBuffer());
  const response = await s3.send(
    new PutObjectCommand({
      Bucket: config.s3.bucket,
      Key: fileName,
      Body: image_buffer,
    })
  );
  return response.$metadata.httpStatusCode === 200;
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
