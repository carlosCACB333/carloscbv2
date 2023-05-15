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
      message: "Ocurrio un error al eliminar el usuario",
    });
  }

  await deleteImage(employe.photo);

  return NextResponse.json({
    message: "Usuario eliminado",
    data: employe,
  });
}
