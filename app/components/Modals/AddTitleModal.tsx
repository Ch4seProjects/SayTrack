"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Button } from "@/app/components/Button";
import { addTitle } from "@/app/services/addTitle";
import { X } from "lucide-react";
import { titleSchema, AddTitleType } from "@/app/utils/schema";

export default function AddTitleModal({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddTitleType>({
    resolver: yupResolver(titleSchema),
  });

  const onSubmit = async (data: AddTitleType) => {
    const loadingToast = toast.loading("Adding title...");

    try {
      const { success, message } = await addTitle(data.name, data.description);

      if (success) {
        toast.success(message, { id: loadingToast });
        reset();
        onClose();
      } else {
        toast.error(message || "Failed to add title.", { id: loadingToast });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="border--2 border-red-600 relative py-2 flex flex-col gap-8">
      <X
        className="absolute top-2 right-3 text-tertiary text-lg cursor-pointer hover:opacity-80"
        onClick={onClose}
      />

      <div className="title flex flex-col w-[70%]">
        <p className="text-tertiary font-poppins text-2xl font-bold">
          Add Title
        </p>
        <p className="text-white font-poppins text-xs">
          Add available titles for users.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* 🏷️ Title Name */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-tertiary">Title Name</label>
          <input
            type="text"
            placeholder="Enter title name..."
            {...register("name")}
            className="bg-main h-14 rounded-lg px-3 text-white font-poppins text-sm outline-none focus:ring-2 focus:ring-main/50"
          />
          {errors.name && (
            <p className="text-red-400 text-[10px] font-poppins">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* 📝 Description */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-tertiary">Description</label>
          <textarea
            placeholder="Enter description..."
            {...register("description")}
            rows={3}
            className="bg-main rounded-lg px-3 py-2 text-white font-poppins text-sm outline-none focus:ring-2 focus:ring-main/50 resize-none"
          />
          {errors.description && (
            <p className="text-red-400 text-[10px] font-poppins">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mt-6">
          <Button type="submit" label="Add Title" loading={isSubmitting} />
        </div>
      </form>
    </div>
  );
}
