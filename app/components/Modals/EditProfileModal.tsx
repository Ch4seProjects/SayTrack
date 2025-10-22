"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Button } from "@/app/components/Button";
import { Select } from "@/app/components/Select";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { updateProfile } from "@/app/services/updateProfile";
import { editProfileSchema } from "@/app/utils/schema";
import { X } from "lucide-react";
import { SECTIONS_OBJECT } from "@/app/lib/constants";
import { uploadAvatar } from "@/app/utils/uploadAvatar";

type EditProfileForm = {
  name: string;
  year?: string;
  section?: string;
  avatar_url?: string | File | null;
};

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
  const { user, refreshUser } = useSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<EditProfileForm>({
    resolver: yupResolver(editProfileSchema) as any,
    defaultValues: {
      name: user?.name || "",
      year: user?.year ? String(user.year) : "",
      section: user?.section || "",
      avatar_url: user?.avatar_url || "",
    },
  });

  const onSubmit = async (data: EditProfileForm) => {
    if (!user?.id) {
      toast.error("Invalid user session.");
      return;
    }

    const userId = user?.id;
    const loadingToast = toast.loading("Updating profile...");
    setIsSubmitting(true);

    try {
      if (data.avatar_url instanceof File) {
        const publicUrl = await uploadAvatar(userId, data.avatar_url);
        data.avatar_url = publicUrl;
      }

      const updates = {
        name: data.name,
        year: data.year,
        section: data.section,
        avatar_url:
          typeof data.avatar_url === "string" ? data.avatar_url : undefined,
      };

      const { success, message } = await updateProfile(userId, updates);

      if (success) {
        toast.success(message, {
          id: loadingToast,
          duration: 4000,
        });

        await refreshUser();
        onClose?.();
      } else {
        toast.error(message || "Unable to update profile.", {
          id: loadingToast,
          duration: 4000,
        });
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Something went wrong. Please try again later.", {
        id: loadingToast,
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-2 w-full"
    >
      {/* Header */}
      <div className="flex flex-col w-full gap-1">
        <p className="text-tertiary font-poppins text-2xl font-bold">
          Edit Profile
        </p>
        <p className="text-white font-poppins text-xs">
          Update your profile information below.
        </p>
        <X
          className="absolute top-2 right-3 text-tertiary text-lg cursor-pointer hover:opacity-80"
          onClick={onClose}
        />
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col items-center gap-2">
          <label className="text-tertiary text-sm font-poppins">
            Profile Picture
          </label>

          {(() => {
            const avatarValue = watch("avatar_url");
            const previewUrl =
              avatarValue instanceof File
                ? URL.createObjectURL(avatarValue)
                : typeof avatarValue === "string" &&
                  avatarValue.startsWith("http")
                ? avatarValue
                : "/default-avatar.png";

            return (
              <div className="relative w-24 h-24">
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-main"
                />
                <input
                  id="avatar_url"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      console.log("Selected avatar file:", file);
                      setValue("avatar_url", file, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            );
          })()}

          {errors.avatar_url && (
            <p className="text-red-400 text-xs font-poppins">
              {errors.avatar_url.message as string}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-tertiary text-sm font-poppins">
            Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register("name")}
            className={`bg-main h-14 rounded-lg px-3 text-white font-poppins text-sm outline-none transition-all 
      focus:ring-2 focus:ring-main/50 ${
        errors.name ? "ring-2 ring-red-400" : ""
      }`}
          />

          {errors.name && (
            <p className="text-red-400 text-xs font-poppins">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="year" className="text-tertiary text-sm font-poppins">
            Year
          </label>
          <input
            placeholder="Year"
            type="text"
            {...register("year")}
            className="bg-main h-14 rounded-lg px-3 text-white font-poppins text-sm outline-none focus:ring-2 focus:ring-main/50"
          />
          {errors.year && (
            <p className="text-red-400 text-[10px] font-poppins">
              {errors.year.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="section"
            className="text-tertiary text-sm font-poppins"
          >
            Section
          </label>
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                placeholder="Section"
                error={errors.section?.message}
                className="bg-main border-none px-3 text-sm"
                options={SECTIONS_OBJECT}
              />
            )}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-4 w-full">
        <Button
          type="submit"
          label={
            isSubmitting
              ? "Saving..."
              : !isDirty
              ? "No changes"
              : "Save Changes"
          }
          disabled={isSubmitting || !isDirty}
        />
        <Button label="Cancel" variant="outline" onClick={onClose} />
      </div>
    </form>
  );
}
