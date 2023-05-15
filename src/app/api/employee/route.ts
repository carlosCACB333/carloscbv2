import { EmployeService } from "@/services";
import { saveImage } from "@/utils/s3Util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const image = data.get("image");
  const firstName = data.get("firstName")?.toString() || "";
  const lastName = data.get("lastName")?.toString() || "";
  const type = data.get("type")?.toString() || "";

  const { photo, ok } = await saveImage(image as File);

  if (!ok) {
    return NextResponse.json({
      status: "error",
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
      status: "error",
      message: "Ocurrio un error al guardar el usuario",
    });
  }

  return NextResponse.json({
    status: "ok",
    message: "Usuario guardado",
    data: employe,
  });
}

export async function GET() {
  const employees = await EmployeService.getAll();

  if (!employees) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrio un error al obtener los usuarios",
    });
  }

  return NextResponse.json({
    status: "ok",
    message: "Usuarios obtenidos",
    data: employees,
  });
}
