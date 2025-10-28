import { Button } from "@/app/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function PendingPage() {
  return (
    <div className="px-6 py-12 flex flex-col justify-around items-center gap-8 h-full w-full ">
      <p className="text-white font-poppins text-2xl font-bold text-center">
        Your Account Is Under <span className="text-tertiary">Review</span>!
      </p>
      <Image
        src="/pending.svg"
        alt="Account pending illustration"
        height={300}
        width={300}
        className="object-contain"
        priority
      />
      <p className="text-white font-poppins text-sm text-center">
        Thanks for signing up! Our team is verifying your student information to
        keep the community secure.
      </p>
      <Link href="/">
        <Button>Got It — I’ll Check Back Later</Button>
      </Link>
    </div>
  );
}
