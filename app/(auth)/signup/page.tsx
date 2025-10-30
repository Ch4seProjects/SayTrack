"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import toast from "react-hot-toast";
import { Input } from "@/app/components/Input";
import { Select } from "@/app/components/Select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/app/components/Button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema, SignUpType } from "@/app/utils/schema";
import { ACCOUNT_TYPES } from "@/lib/constants";
import { getSupabaseClient } from "@/app/utils/client";
import { SECTIONS_OBJECT } from "@/lib/constants";
import UploadInput from "@/app/components/UploadInput";

export default function Signup() {
  const supabase = getSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SignUpType>({
    defaultValues: {
      type: "student",
    },
    resolver: yupResolver(signUpSchema) as any, //:)
  });

  const accountType = watch("type");

  const onSubmit = async (data: SignUpType) => {
    setLoading(true);

    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            type: data.type,
            year: data.year,
            section: data.section,
            status: "pending",
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.upload_url instanceof File) {
        const formData = new FormData();
        formData.append("file", data.upload_url);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("type", data.type);
        formData.append("year", data.year ?? "");
        formData.append("section", data.section ?? "");

        const res = await fetch("/api/sendUploadEmail", {
          method: "POST",
          body: formData,
        });

        const result = await res.json();
        console.log("Email API result:", result);
      }

      toast.success("Signup successful!");
      router.push("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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
      <Controller
        name="upload_url"
        control={control}
        render={({ field }) => (
          <UploadInput field={field} error={errors.upload_url?.message} />
        )}
      />
      <Input
        placeholder="Name"
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
      {accountType === "student" && (
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
                options={SECTIONS_OBJECT}
              />
            )}
          />
        </div>
      )}

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
