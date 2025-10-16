"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Button } from "@/app/components/Button";
import { addNotification } from "@/app/services/addNotificationService";
import { notificationSchema, AddNotificationType } from "@/app/utils/schema";
import { useClubs } from "@/app/hooks/useClubs";
import { Select } from "@/app/components/Select";

export default function AddNotificationModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const { data: clubs = [], isLoading: clubsLoading } = useClubs();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddNotificationType>({
    resolver: yupResolver(notificationSchema) as any,
  });

  // 📨 Handle Submit
  const onSubmit = async (data: AddNotificationType) => {
    const loadingToast = toast.loading("Sending notification...");

    try {
      const { success, message } = await addNotification(
        data.title,
        data.message,
        data.club_id
      );

      if (success) {
        toast.success(message, { id: loadingToast });
        reset();
        onClose();
      } else {
        toast.error(message || "Failed to send notification.", {
          id: loadingToast,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again later.", {
        id: loadingToast,
      });
    }
  };

  return (
    <div className="relative py-2 flex flex-col gap-8">
      {/* ❌ Close Button */}
      <X
        className="absolute top-2 right-3 text-tertiary text-lg cursor-pointer hover:opacity-80"
        onClick={onClose}
      />

      {/* 🧾 Header */}
      <div className="title flex flex-col w-[70%]">
        <p className="text-tertiary font-poppins text-2xl font-bold">
          Create Notification
        </p>
        <p className="text-white font-poppins text-xs">
          Send updates or announcements to users and clubs.
        </p>
      </div>

      {/* 🧩 Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* 🏷️ Title */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-tertiary">Title</label>
          <input
            type="text"
            placeholder="Enter title..."
            {...register("title")}
            className="bg-main h-14 rounded-lg px-3 text-white font-poppins text-sm outline-none focus:ring-2 focus:ring-main/50"
          />
          {errors.title && (
            <p className="text-red-400 text-[10px] font-poppins">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* 📝 Message */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-tertiary">Message</label>
          <textarea
            placeholder="Enter message..."
            {...register("message")}
            rows={3}
            className="bg-main rounded-lg px-3 py-2 text-white font-poppins text-sm outline-none focus:ring-2 focus:ring-main/50 resize-none"
          />
          {errors.message && (
            <p className="text-red-400 text-[10px] font-poppins">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* 🏫 Optional Club Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-tertiary">
            Select Club (optional)
          </label>
          <Controller
            name="club_id"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value || ""}
                onChange={field.onChange}
                error={errors?.club_id?.message}
                placeholder="Club"
                className="bg-main border-none px-3 text-sm"
                options={clubs}
                type="club"
              />
            )}
          />
        </div>

        {/* ✅ Submit Button */}
        <div className="mt-6">
          <Button
            type="submit"
            label="Send Notification"
            loading={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
