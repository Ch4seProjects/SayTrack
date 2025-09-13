"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginType } from "@/app/utils/schema";
import Link from "next/link";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginType>({ resolver: yupResolver(loginSchema) });
  const onSubmit = (data: LoginType) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Input
          placeholder="Email"
          type={"email"}
          className="font-poppins text-lg p-7"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <Input
          placeholder="Password"
          type={"password"}
          className="font-poppins text-lg p-7"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
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
