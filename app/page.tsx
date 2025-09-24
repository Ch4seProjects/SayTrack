import Link from "next/link";
import { Button } from "./components/Button";

export default function Landing() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 gap-2 bg-linear-to-t from-secondary to-main relative px-6 py-8">
        <div className="logo rounded-full w-50 h-50 bg-white absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[70%]" />
        <div className="flex flex-col self-end">
          <p className="font-poppins text-lg text-white">Welcome to</p>
          <p className="font-poppins text-6xl font-bold text-white">SayTrack</p>
        </div>
      </div>
      <div className="buttons flex flex-col justify-center items-center gap-2 w-full mt-auto px-6 py-8 bg-white">
        <p className="text-center font-poppins text-sm mb-8">
          SayTrack is a student-centered platform designed to turn learning into
          an engaging journey. Track your progress, celebrate achievements, and
          climb leaderboards while staying focused and motivated.
        </p>
        <Link href="/login" className="w-full">
          <Button label="Login" />
        </Link>
        <Link href="/signup" className="w-full">
          <Button label="Signup" variant="outline" />
        </Link>
      </div>
    </div>
  );
}
