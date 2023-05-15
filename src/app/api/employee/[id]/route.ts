import { EmployeService } from "@/services";
import { deleteImage } from "@/utils/s3Util";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const employe = await EmployeService.delete(params.id);

  if (!employe) {
    return NextResponse.json({
      status: "error",
      message: "Ocurrio un error al eliminar el usuario",
    });
  }

  await deleteImage(employe.photo);

  return NextResponse.json({
    status: "ok",
    message: "Usuario eliminado",
    data: employe,
  });
}
