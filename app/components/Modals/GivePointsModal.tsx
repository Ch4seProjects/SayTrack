"use client";

import { useState, useMemo } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { debounce } from "lodash";
import { useForm, Controller } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { yupResolver } from "@hookform/resolvers/yup";
import { BeatLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useSearchProfiles } from "@/app/hooks/useSearchProfiles";
import { givePointsSchema, GivePointsType } from "@/app/utils/schema";
import { Button } from "@/app/components/Button";
import { useSupabase } from "@/app/context/SupabaseProvider";
import { givePoints } from "@/app/services/givePointsService";

export default function GivePointsModal({ onClose }: { onClose: () => void }) {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { user } = useSupabase();

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setQuery(value), 400),
    []
  );

  const { data: results = [], isLoading } = useSearchProfiles(query);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<GivePointsType>({
    defaultValues: {
      type: "participation",
    },
    resolver: yupResolver(givePointsSchema),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetQuery(value);
    setShowResults(true);
  };

  const handleSelectStudent = (user: { id: string; name: string }) => {
    setValue("student", user);
    setInputValue(user.name);
    setShowResults(false);
  };

  const onSubmit = async (data: GivePointsType) => {
    if (!user) {
      toast.error("You must be logged in as an admin to perform this action.");
      return;
    }

    const loadingToast = toast.loading("Processing your request...");

    try {
      const { success, message } = await givePoints(data, user.id);

      if (success) {
        toast.success(
          `${data.points} point${data.points > 1 ? "s" : ""} awarded to ${
            data.student.name
          }.`,
          {
            id: loadingToast,
            duration: 4000,
          }
        );
        onClose();
      } else {
        toast.error(
          `Unable to complete the request. ${message || "Please try again."}`,
          {
            id: loadingToast,
            duration: 4000,
          }
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong while giving points. Please try again later.",
        { id: loadingToast, duration: 4000 }
      );
    }
  };

  return (
    <div className="relative py-2 flex flex-col gap-8">
      <X
        className="absolute top-2 right-3 text-tertiary text-lg cursor-pointer hover:opacity-80"
        onClick={onClose}
      />

      <div className="title flex flex-col w-[70%]">
        <p className="text-tertiary font-poppins text-2xl font-bold">
          Give Points
        </p>
        <p className="text-white font-poppins text-xs">
          Assign points to students based on their performance.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {/* 🏷️ Type Selector (as Tabs) */}
        <div className="flex flex-col gap-2">
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
                  <TabsList className="border-2 w-full h-fit gap-6 bg-main border-none">
                    <TabsTrigger
                      value="participation"
                      className="text-white font-poppins text-sm md:text-md p-3 rounded-md uppercase data-[state=active]:bg-secondary data-[state=active]:text-white"
                    >
                      Participation
                    </TabsTrigger>
                    <TabsTrigger
                      value="character"
                      className="text-white font-poppins text-sm md:text-md p-3 rounded-md uppercase data-[state=active]:bg-secondary data-[state=active]:text-white"
                    >
                      Character
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            )}
          />

          {errors.type && (
            <p className="text-red-400 text-[10px] font-poppins">
              {errors.type.message}
            </p>
          )}
        </div>

        {/* 🔍 Student Search */}
        <div className="flex flex-col gap-2 relative">
          <label className="text-xs text-tertiary">Enter Student</label>

          <div className="bg-main h-14 rounded-lg flex items-center gap-2 p-4">
            <SearchIcon className="text-white" size={18} />
            <input
              type="text"
              placeholder="Search student..."
              value={inputValue}
              onChange={handleChange}
              onFocus={() => setShowResults(true)}
              className="text-sm text-white font-poppins bg-transparent outline-none focus:ring-0 w-full placeholder:text-gray-400"
            />
          </div>
          {errors.student && (
            <p className="text-red-400 text-[10px] font-poppins">
              {errors.student.message as string}
            </p>
          )}

          {showResults && (
            <div className="absolute top-[105%] left-0 right-0 bg-main rounded-sm shadow-lg max-h-40 overflow-y-auto z-10">
              {isLoading && (
                <div className="flex justify-center p-2">
                  <BeatLoader color="#fff" size={6} />
                </div>
              )}

              {!isLoading && results.length === 0 && query.trim() !== "" && (
                <p className="text-gray-400 font-poppins p-2 text-xs">
                  No users found
                </p>
              )}

              {!isLoading &&
                results.map((user) => (
                  <div
                    key={user.id}
                    className="flex gap-2 items-center p-2 hover:bg-gray-800 rounded-md transition cursor-pointer"
                    onClick={() => handleSelectStudent(user)}
                  >
                    <div className="h-6 w-6 bg-white rounded-full" />
                    <div className="flex flex-col">
                      <p className="text-white font-poppins font-medium text-xs">
                        {user.name}
                      </p>
                      <p className="text-white font-poppins text-[8px]">{`${user.section} ${user.year}`}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* 🔢 Points Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-tertiary">Enter points</label>

          <input
            type="number"
            placeholder="Points"
            {...register("points")}
            className="bg-main h-14 rounded-lg px-3 text-white font-poppins text-sm outline-none focus:ring-2 focus:ring-main/50"
          />
          {errors.points && (
            <p className="text-red-400 text-[10px] font-poppins">
              {errors.points.message}
            </p>
          )}
        </div>

        {/* 🔢 Reason Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-tertiary">Enter reason</label>

          <input
            type="text"
            placeholder="Reason"
            {...register("reason")}
            className="bg-main h-14 rounded-lg px-3 text-white font-poppins text-sm outline-none focus:ring-2 focus:ring-main/50"
          />
          {errors.reason && (
            <p className="text-red-400 text-[10px] font-poppins">
              {errors.reason.message}
            </p>
          )}
        </div>

        <div className="mt-8">
          <Button type="submit" label="Submit" loading={isSubmitting} />
        </div>
      </form>
    </div>
  );
}
