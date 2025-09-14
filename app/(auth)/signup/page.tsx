"use client";

import { Input } from "@/app/components/Input";
import { Select } from "@/app/components/Select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema, SignUpType } from "@/app/utils/schema";
import Link from "next/link";
import { ACCOUNT_TYPES } from "@/app/lib/constants";

export default function Signup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpType>({
    defaultValues: {
      type: "student",
    },
    resolver: yupResolver(signUpSchema),
  });
  const onSubmit = (data: SignUpType) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <Controller
        name="type"
        control={control}
        render={({ field }) => (
          <div className="w-full">
            <Tabs
              value={field.value}
              onValueChange={field.onChange}
              className="w-full"
            >
              <TabsList className="border-2 w-full h-fit gap-6">
                {ACCOUNT_TYPES.map((type) => (
                  <TabsTrigger
                    key={type}
                    value={type}
                    className="font-poppins text-lg p-3"
                  >
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}
      />
      <Input
        placeholder="Full Name"
        type={"text"}
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        placeholder="Email"
        type={"email"}
        {...register("email")}
        error={errors.email?.message}
      />
      <div className="flex gap-4">
        <Input
          placeholder="Year Level"
          type={"text"}
          {...register("year")}
          error={errors.year?.message}
        />
        <Controller
          name="section"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              error={errors.section?.message}
              placeholder="Section"
            />
          )}
        />
      </div>
      <Input
        placeholder="Password"
        type={"password"}
        {...register("password")}
        error={errors.password?.message}
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
