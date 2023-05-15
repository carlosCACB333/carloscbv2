import { getSimilarity } from "@/utils/recognitionUtil";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // image from url
  const data = await request.formData();
  const image = data.get("image") as File;
  const res = await getSimilarity(image);

  if (!res) {
    return NextResponse.json({
      message: "Ocurrio un error en la comparacion",
    });
  }

  return NextResponse.json({
    message: "ok",
    data: res,
  });
}
