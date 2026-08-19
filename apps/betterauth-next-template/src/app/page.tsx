import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-neutral-900 text-teal-500">
      <div className=" flex flex-col gap-2">
        <Link
          href={"/signin"}
          className="p-2 bg-neutral-500 rounded-sm text-white hover:text-blue-500"
        >
          Signin
        </Link>
        <Link
          href={"/signup"}
          className="p-2 bg-neutral-500 rounded-sm text-white hover:text-blue-500"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
