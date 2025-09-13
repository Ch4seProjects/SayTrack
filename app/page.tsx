import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="h-screen flex flex-col items-center pt-[40%] p-2">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="logo rounded-full w-50 h-50 bg-main mb-4"></div>
        <p className="font-poppins text-3xl">SayTrack</p>
        <p className="font-poppins text-md">Where progress meets expectation</p>
      </div>
      <div className="buttons flex flex-col justify-center items-center gap-2 w-full mt-auto">
        <Link href="/login" className="w-full">
          <Button className="w-full font-poppins text-lg p-7 bg-secondary active:bg-main">
            Login
          </Button>
        </Link>
        <Link href="/signup" className="w-full">
          <Button
            className="w-full font-poppins text-lg p-7 border-2 border-secondary active:bg-main active:text-white"
            variant="outline"
          >
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
}
