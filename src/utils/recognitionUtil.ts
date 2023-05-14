import { EmployeService } from "@/services";
import { recog } from "./aws";
import { CompareFacesCommand } from "@aws-sdk/client-rekognition";
import { config } from "@/config";
import { log } from "console";

export const getSimilarity = async (image: File) => {
  try {
    const image_buffer = Buffer.from(await image.arrayBuffer());
    const employes = (await EmployeService.getAll()) || [];
    const fechArray = employes.map((employe) => {
      return recog.send(
        new CompareFacesCommand({
          SourceImage: {
            S3Object: {
              Bucket: config.s3.bucket,
              Name: employe.photo,
            },
          },
          TargetImage: {
            Bytes: image_buffer,
          },
          SimilarityThreshold: 80,
        })
      );
    });

    const res = await Promise.all(fechArray);
    log(res);
    const result = res
      .map((r, idx) => {
        if (r.FaceMatches?.length) {
          return {
            ...r.FaceMatches[0],
            employe: employes[idx],
          };
        }
        return null;
      })
      .filter((r) => r !== null);

    return result.shift();
  } catch (error) {
    log(error);
    return null;
  }
};
