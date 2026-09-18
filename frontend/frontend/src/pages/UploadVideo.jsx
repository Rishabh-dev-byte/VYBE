import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "@base-ui/react/input";
import api from "@/lib/axios";

const UploadVideo = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const upload = async (data) => {
    setError("");

    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);

      if (data.videoFile?.[0]) {
        formData.append("videoFile", data.videoFile[0]);
      }

      if (data.thumbnail?.[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }

      const response = await api.post("/videos/publishAVideo", formData);

      console.log(response.data);

      if (response.data.success) {
        alert("Video uploaded successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log(
        error.response?.data.message || "something went wrong try again",
      );
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-12 text-white">
      <div className="mx-auto w-full max-w-2xl">
        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Upload Video</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Share your video with the VYBE community
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(upload)}
          className="space-y-6 rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
        >
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-zinc-200"
            >
              Title
            </label>

            <Input
              id="title"
              placeholder="Enter the title"
              type="text"
              className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-white outline-none placeholder:text-zinc-500 focus:border-purple-500"
              {...register("title", {
                required: "Title is required",
              })}
            />

            {errors.title && (
              <p className="text-xs text-red-400">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-zinc-200"
            >
              Description
            </label>

            <Input
              id="description"
              placeholder="Enter the description"
              type="text"
              className="h-11 w-full rounded-lg border border-white/10 bg-white/5 px-3 text-white outline-none placeholder:text-zinc-500 focus:border-purple-500"
              {...register("description", {
                required: "Description is required",
              })}
            />

            {errors.description && (
              <p className="text-xs text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Video */}
          <div className="space-y-2">
            <label
              htmlFor="videoFile"
              className="text-sm font-medium text-zinc-200"
            >
              Upload your video
            </label>

            <Input
              id="videoFile"
              type="file"
              accept="video/*"
              className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-zinc-400 file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-zinc-200"
              {...register("videoFile", {
                required: "Please select a video",
              })}
            />

            {errors.videoFile && (
              <p className="text-xs text-red-400">{errors.videoFile.message}</p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="space-y-2">
            <label
              htmlFor="thumbnail"
              className="text-sm font-medium text-zinc-200"
            >
              Upload thumbnail
            </label>

            <Input
              id="thumbnail"
              type="file"
              accept="image/*"
              className="w-full cursor-pointer rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-zinc-400 file:mr-4 file:rounded-md file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black hover:file:bg-zinc-200"
              {...register("thumbnail", {
                required: "Please select a thumbnail",
              })}
            />

            {errors.thumbnail && (
              <p className="text-xs text-red-400">{errors.thumbnail.message}</p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:scale-[1.01] hover:shadow-purple-500/40"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
