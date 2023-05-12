import { getAllImages, saveImage } from "@/utils/s3Utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  const image = data.get("image");
  const fileName = data.get("fileName");
  const res = await saveImage(image as File, fileName as string);
  return NextResponse.json({
    message: res
      ? "La imagen se guardo correctamente"
      : "Ocurrio un error al guardar la imagen",
  });
}

export async function GET() {
  return NextResponse.json({
    message: "Imagenes",
    data: await getAllImages(),
  });
}
