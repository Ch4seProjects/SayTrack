import { Button } from "@/app/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function RejectedPage() {
  return (
    <div className="px-6 py-12 flex flex-col justify-around items-center gap-8 h-full w-full ">
      <p className="text-white font-poppins text-2xl font-bold text-center">
        Your Signup Was <br />
        <span className="text-red-600">Rejected</span>
      </p>
      <Image
        src="/reject.svg"
        alt="Account pending illustration"
        height={300}
        width={300}
        className="object-contain"
        priority
      />
      <p className="text-white font-poppins text-sm text-center">
        Unfortunately, your account did not meet our verification requirements.
        If you believe this was a mistake, please contact our support team for
        assistance.
      </p>
      <Link href="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
}
