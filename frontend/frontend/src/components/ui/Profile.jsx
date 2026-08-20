import { useAuthContext } from "@/context/AuthContext";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "./input";
import { Button } from "./button";

const Profile = () => {
    const { authUser } = useAuthContext();

    const [error, setError] = useState("");

    // Details form
    const detailsForm = useForm({
        defaultValues: {
            fullName: "",
            email: "",
        },
    });

    // Avatar form
    const avatarForm = useForm();

    // Cover image form
    const coverForm = useForm();

    // Set existing user details
    useEffect(() => {
        if (authUser) {
            detailsForm.reset({
                fullName: authUser.fullName || "",
                email: authUser.email || "",
            });
        }
    }, [authUser, detailsForm]);

    // Update details
    const updateDetails = async (data) => {
        setError("");

        try {
            const response = await api.patch(
                "/users/update-account",
                data
            );

            console.log(response.data);

            if (response.data.success) {
                alert("Details updated successfully");
            }
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update details"
            );
        }
    };

    // Update avatar
    const updateAvatar = async (data) => {
        setError("");

        try {
            const formData = new FormData();

            formData.append(
                "avatar",
                data.avatar[0]
            );

            const response = await api.patch(
                "/users/avatar",
                formData
            );

            console.log(response.data);

            if (response.data.success) {
                alert("Avatar updated successfully");

                avatarForm.reset();
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update avatar"
            );
        }
    };

    // Update cover image
    const updateCoverImg = async (data) => {
        setError("");

        try {
            const formData = new FormData();

            formData.append(
                "coverImage",
                data.coverImage[0]
            );

            const response = await api.patch(
                "/users/cover-image",
                formData
            );

            console.log(response.data);

            if (response.data.success) {
                alert("Cover image updated successfully");

                coverForm.reset();
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update cover image"
            );
        }
    };

    return (
        <div className="min-h-screen bg-black px-4 py-10 text-white">
            <div className="mx-auto w-full max-w-4xl">

                {/* Page Heading */}
                <div className="mb-10">
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        Edit Profile
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Manage your account information and profile images.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                <div className="space-y-6">

                    {/* Account Details */}
                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">
                                Account Details
                            </h2>

                            <p className="mt-1 text-sm text-zinc-400">
                                Update your personal information.
                            </p>
                        </div>

                        <form
                            onSubmit={detailsForm.handleSubmit(updateDetails)}
                            className="space-y-5"
                        >
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-200">
                                    Full Name
                                </label>

                                <Input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="h-11 bg-white/5 text-white placeholder:text-zinc-500"
                                    {...detailsForm.register("fullName", {
                                        required: "Full name is required",
                                    })}
                                />

                                {detailsForm.formState.errors.fullName && (
                                    <p className="text-sm text-red-400">
                                        {
                                            detailsForm.formState.errors
                                                .fullName.message
                                        }
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-200">
                                    Email
                                </label>

                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="h-11 bg-white/5 text-white placeholder:text-zinc-500"
                                    {...detailsForm.register("email", {
                                        required: "Email is required",
                                    })}
                                />

                                {detailsForm.formState.errors.email && (
                                    <p className="text-sm text-red-400">
                                        {
                                            detailsForm.formState.errors.email
                                                .message
                                        }
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="h-10 bg-white px-6 font-semibold text-black hover:bg-zinc-200"
                            >
                                Update Details
                            </Button>
                        </form>
                    </div>

                    {/* Avatar */}
                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">
                                Profile Picture
                            </h2>

                            <p className="mt-1 text-sm text-zinc-400">
                                Update your profile avatar.
                            </p>
                        </div>

                        <form
                            onSubmit={avatarForm.handleSubmit(updateAvatar)}
                            className="flex flex-col gap-6 sm:flex-row sm:items-center"
                        >
                            {/* Current Avatar */}
                            <div className="flex-shrink-0">
                                {authUser?.avatar ? (
                                    <img
                                        src={authUser.avatar}
                                        alt="Avatar"
                                        className="h-24 w-24 rounded-full border-2 border-white/10 object-cover"
                                    />
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800 text-2xl font-bold">
                                        {authUser?.fullName?.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 space-y-4">

                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="bg-white/5 text-white"
                                    {...avatarForm.register("avatar", {
                                        required:
                                            "Please select an image",
                                    })}
                                />

                                {avatarForm.formState.errors.avatar && (
                                    <p className="text-sm text-red-400">
                                        {
                                            avatarForm.formState.errors.avatar
                                                .message
                                        }
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    className="bg-white font-semibold text-black hover:bg-zinc-200"
                                >
                                    Update Avatar
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Cover Image */}
                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-6">

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold">
                                Cover Image
                            </h2>

                            <p className="mt-1 text-sm text-zinc-400">
                                Update your channel cover image.
                            </p>
                        </div>

                        <form
                            onSubmit={coverForm.handleSubmit(updateCoverImg)}
                            className="space-y-5"
                        >
                            {/* Current Cover Image */}
                            {authUser?.coverImage ? (
                                <img
                                    src={authUser.coverImage}
                                    alt="Cover"
                                    className="h-48 w-full rounded-xl border border-white/10 object-cover"
                                />
                            ) : (
                                <div className="flex h-48 w-full items-center justify-center rounded-xl border border-dashed border-white/10 bg-zinc-900 text-sm text-zinc-500">
                                    No cover image
                                </div>
                            )}

                            <div className="space-y-3">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="bg-white/5 text-white"
                                    {...coverForm.register("coverImage", {
                                        required:
                                            "Please select a cover image",
                                    })}
                                />

                                {coverForm.formState.errors.coverImage && (
                                    <p className="text-sm text-red-400">
                                        {
                                            coverForm.formState.errors
                                                .coverImage.message
                                        }
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    className="bg-white font-semibold text-black hover:bg-zinc-200"
                                >
                                    Update Cover Image
                                </Button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;