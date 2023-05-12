import { getAllImages } from "@/utils/s3Utils";
import Image from "next/image";

export default async function Home() {
  const { data } = await getAllImages();

  return (
    <main className="flex min-h-screen  items-center justify-between p-24 flex-wrap">
      {data.map((image) => (
        <Image
          key={image.url}
          className=""
          src={image.url}
          alt="Next.js Logo"
          width={300}
          height={300}
        />
      ))}
    </main>
  );
}
