import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/logo.svg";
import { Input } from "./input";
import { Button } from "./button";
import api from "@/lib/axios";

const Login = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");

        try {
            const response = await api.post(
                "/users/login",
                data
            );

            console.log(response.data);

            if (response.data.success) {
                navigate("/");
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
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-zinc-400">
                        Login to your VYBE account
                    </p>

                    <p className="mt-3 text-sm text-zinc-400">
                        Don't have an account?{" "}

                        <Link
                            to="/signup"
                            className="font-medium text-white underline underline-offset-4 transition hover:text-zinc-300"
                        >
                            Sign Up
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
                    onSubmit={handleSubmit(login)}
                    className="space-y-5"
                >

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
                            placeholder="Enter your username"
                            type="text"
                            className="h-11 bg-white/5 text-white placeholder:text-zinc-500"
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />

                        {errors.username && (
                            <p className="text-xs text-red-400">
                                {errors.username.message}
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
                            placeholder="Enter your password"
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

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="mt-2 h-11 w-full rounded-lg bg-white font-semibold text-black transition hover:bg-zinc-200"
                    >
                        Sign In
                    </Button>

                </form>
            </div>
        </div>
    );
};

export default Login;