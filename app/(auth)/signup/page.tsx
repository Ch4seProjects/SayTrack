"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { Input } from "@/app/components/Input";
import { Select } from "@/app/components/Select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/app/components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema, SignUpType } from "@/app/utils/schema";
import { ACCOUNT_TYPES } from "@/app/lib/constants";
import { createBrowserSupabase } from "@/app/utils/client";

export default function Signup() {
  const supabase = createBrowserSupabase();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

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

  const onSubmit = async (data: SignUpType) => {
    setLoading(true);
    setServerError(null);

    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          type: data.type,
          year: data.year,
          section: data.section,
        },
      },
    });

    setLoading(false);
    console.log("signUpData", signUpData);

    if (error) {
      setServerError(error.message);
      return;
    }

    router.push("/login");
  };
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
                    className="font-poppins text-md p-3 uppercase 
                   data-[state=active]:bg-main data-[state=active]:text-white"
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
      <Button type="submit" loading={loading} label="Submit" />
      <p className="text-xs text-white font-poppins text-center">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-main">
          Login
        </Link>
      </p>
    </form>
  );
}
