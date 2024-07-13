import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-red-700">
      <div>Home will start from here </div>
      <Link href={"/globalwarming"}>Click to go global warming</Link>
      <br></br>
      <Link href={"/login"}>Go to Login</Link>
    </main>
  );
}
