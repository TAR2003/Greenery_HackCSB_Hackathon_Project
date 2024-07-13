import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div>Home will start from here </div>
      <Link href={"/globalwarming"}>Click to go global warming</Link>
    </main>
  );
}
