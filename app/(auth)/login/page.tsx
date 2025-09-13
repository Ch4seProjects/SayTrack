"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ email: string; password: string }>();
  const onSubmit = (data: { email: string; password: string }) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        type={"email"}
        className="font-poppins text-lg p-7"
        {...register("email")}
      />
      <Input
        placeholder="Password"
        type={"password"}
        className="font-poppins text-lg p-7"
        {...register("password")}
      />
      <Button
        type="submit"
        className="w-full font-poppins text-lg p-7 bg-secondary active:bg-main"
      >
        Submit
      </Button>

      <p className="text-xs font-poppins text-center">
        Don't have an account? <Link href="/signup">Signup</Link>
      </p>
    </form>
  );
}
