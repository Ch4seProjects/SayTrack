"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    name: string;
    email: string;
    year: string;
    section: string;
    password: string;
  }>();
  const onSubmit = (data: {
    name: string;
    email: string;
    year: string;
    section: string;
    password: string;
  }) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        placeholder="Full Name"
        type={"text"}
        className="font-poppins text-lg p-7"
        {...register("name")}
      />
      <Input
        placeholder="Email"
        type={"email"}
        className="font-poppins text-lg p-7"
        {...register("email")}
      />
      <div className="flex gap-4">
        <Input
          placeholder="Year Level"
          type={"text"}
          className="font-poppins text-lg p-7"
          {...register("year")}
        />
        <Input
          placeholder="Section"
          type={"text"}
          className="font-poppins text-lg p-7"
          {...register("section")}
        />
      </div>
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
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </form>
  );
}
