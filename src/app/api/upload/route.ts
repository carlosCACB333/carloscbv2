import { EmployeService } from "@/services";
import { getAllImages, saveImage } from "@/utils/s3Util";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.formData();
  const image = data.get("image");
  const firstName = data.get("firstName")?.toString() || "";
  const lastName = data.get("lastName")?.toString() || "";
  const type = data.get("Type")?.toString() || "";

  const { photo, ok } = await saveImage(image as File);

  if (!ok) {
    return NextResponse.json({
      message: "Ocurrio un error al guardar la imagen",
    });
  }
  const dataE = {
    firstName: firstName,
    lastName,
    type,
    photo,
  };
  const employe = await EmployeService.save(dataE);
  if (!employe) {
    return NextResponse.json({
      message: "Ocurrio un error al guardar el usuario",
    });
  }

  return NextResponse.json({
    message: "Usuario guardado",
    data: employe,
  });
}

export async function GET() {
  return NextResponse.json({
    message: "Imagenes",
    data: await getAllImages(),
  });
}
