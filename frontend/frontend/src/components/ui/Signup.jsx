import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import { Input } from "./input";
import { Button } from "./button";
import api from "@/lib/axios";

const Signup = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState("");

    const signup = async (data) => {
        setError("");

        try {
            const formData = new FormData();

            // Text fields
            formData.append("fullName", data.fullName);
            formData.append("username", data.username);
            formData.append("email", data.email);
            formData.append("password", data.password);

            // Required avatar
            formData.append("avatar", data.avatar[0]);

            // Optional cover image
            if (data.coverImage?.[0]) {
                formData.append(
                    "coverImage",
                    data.coverImage[0]
                );
            }

            const response = await api.post(
                "/users/register",
                formData
            );

            console.log(response.data);

            if (response.data.success) {
                navigate("/login");
            }

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black px-4 py-10">
            
            <div className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black sm:p-8">

                {/* Logo */}
                <Link
                    to="/"
                    className="mb-8 flex justify-center"
                >
                    <img
                        src={logo}
                        alt="VYBE"
                        className="h-auto w-28"
                    />
                </Link>

                {/* Heading */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Join VYBE and start sharing your content
                    </p>

                    <p className="mt-3 text-sm text-zinc-400">
                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-medium text-white underline underline-offset-4 transition hover:text-zinc-300"
                        >
                            Login
                        </Link>
                    </p>
                </div>

                {/* Server Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit(signup)}
                    className="space-y-5"
                >
                    {/* Full Name */}
                    <div className="space-y-2">
                        <label
                            htmlFor="fullName"
                            className="text-sm font-medium text-zinc-200"
                        >
                            Full Name
                        </label>

                        <Input
                            id="fullName"
                            placeholder="Enter your full name"
                            type="text"
                            className="h-11 bg-white/5 text-white placeholder:text-zinc-500"
                            {...register("fullName", {
                                required: "Full name is required",
                            })}
                        />

                        {errors.fullName && (
                            <p className="text-xs text-red-400">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* Username */}
                    <div className="space-y-2">
                        <label
                            htmlFor="username"
                            className="text-sm font-medium text-zinc-200"
                        >
                            Username
                        </label>

                        <Input
                            id="username"
                            placeholder="Choose a username"
                            type="text"
                            className="h-11 bg-white/5 text-white placeholder:text-zinc-500"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Username must be at least 3 characters",
                                },
                            })}
                        />

                        {errors.username && (
                            <p className="text-xs text-red-400">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-zinc-200"
                        >
                            Email
                        </label>

                        <Input
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            className="h-11 bg-white/5 text-white placeholder:text-zinc-500"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message:
                                        "Enter a valid email address",
                                },
                            })}
                        />

                        {errors.email && (
                            <p className="text-xs text-red-400">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-zinc-200"
                        >
                            Password
                        </label>

                        <Input
                            id="password"
                            placeholder="Create a password"
                            type="password"
                            className="h-11 bg-white/5 text-white placeholder:text-zinc-500"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password must be at least 6 characters",
                                },
                            })}
                        />

                        {errors.password && (
                            <p className="text-xs text-red-400">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Avatar */}
                    <div className="space-y-2">
                        <label
                            htmlFor="avatar"
                            className="text-sm font-medium text-zinc-200"
                        >
                            Avatar
                        </label>

                        <Input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="h-11 bg-white/5 text-white file:mr-4 file:border-0 file:bg-transparent file:text-sm file:font-medium"
                            {...register("avatar", {
                                required: "Avatar is required",
                            })}
                        />

                        {errors.avatar && (
                            <p className="text-xs text-red-400">
                                {errors.avatar.message}
                            </p>
                        )}
                    </div>

                    {/* Cover Image */}
                    <div className="space-y-2">
                        <label
                            htmlFor="coverImage"
                            className="text-sm font-medium text-zinc-200"
                        >
                            Cover Image
                            <span className="ml-1 text-xs text-zinc-500">
                                (Optional)
                            </span>
                        </label>

                        <Input
                            id="coverImage"
                            type="file"
                            accept="image/*"
                            className="h-11 bg-white/5 text-white"
                            {...register("coverImage")}
                        />
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="mt-2 h-11 w-full rounded-lg bg-white font-semibold text-black transition hover:bg-zinc-200"
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Signup;