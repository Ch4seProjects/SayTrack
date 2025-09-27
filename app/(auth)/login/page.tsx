"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginType } from "@/app/utils/schema";
import { getSupabaseClient } from "@/app/utils/client";

export default function Login() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginType>({ resolver: yupResolver(loginSchema) });

  const onSubmit = async (data: LoginType) => {
    setLoading(true);

    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Login Successful");
    router.push("/home");
  };

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
      <Button type="submit" loading={loading} label="Login" />
      <p className="text-xs text-white font-poppins text-center">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-main ">
          Signup
        </Link>
      </p>
    </form>
  );
}
