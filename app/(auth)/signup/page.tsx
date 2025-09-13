"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema, SignUpType } from "@/app/utils/schema";
import Link from "next/link";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpType>({ resolver: yupResolver(signUpSchema) });
  const onSubmit = (data: SignUpType) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <Input
          placeholder="Full Name"
          type={"text"}
          className="font-poppins text-lg p-7"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
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
      <div className="flex gap-4">
        <div>
          <Input
            placeholder="Year Level"
            type={"text"}
            className="font-poppins text-lg p-7"
            {...register("year")}
          />
          {errors.year && (
            <p className="text-red-500 text-sm">{errors.year.message}</p>
          )}
        </div>
        <div>
          <Input
            placeholder="Section"
            type={"text"}
            className="font-poppins text-lg p-7"
            {...register("section")}
          />
          {errors.section && (
            <p className="text-red-500 text-sm">{errors.section.message}</p>
          )}
        </div>
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
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </form>
  );
}
