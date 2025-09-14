"use client";

// import { Input } from "@/components/ui/input";
import { Input } from "@/app/components/Input";
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Input
        placeholder="Email"
        type={"email"}
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        placeholder="Password"
        type={"password"}
        {...register("password")}
        error={errors.password?.message}
      />
      <Button
        type="submit"
        className="w-full font-poppins text-lg p-7 bg-main text-white"
      >
        Submit
      </Button>

      <p className="text-xs text-white font-poppins text-center">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-main ">
          Signup
        </Link>
      </p>
    </form>
  );
}
