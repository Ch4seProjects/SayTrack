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

type EditProfileForm = {
  name: string;
  year?: string;
  section?: string;
};

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
  const { user, refreshUser } = useSupabase();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<EditProfileForm>({
    resolver: yupResolver(editProfileSchema) as any,
    defaultValues: {
      name: user?.name || "",
      year: user?.year ? String(user.year) : "",
      section: user?.section || "",
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
      const { success, message } = await updateProfile(userId, data);

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
