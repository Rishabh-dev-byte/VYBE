import api from "@/lib/axios";
import React, { useEffect, useState } from "react";

const MyTweet = () => {
    const [tweets, setTweets] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const getTweets = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/tweet/getOwnerTweets"
            );

            setTweets(response.data.data);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch owner tweets"
            );
        } finally {
            setLoading(false);
        }
    };

    const updateTweet = async (tweet) => {
        try {
            setError("");

            const response = await api.patch(
                `/tweet/updateTweet/${tweet._id}`,
                {
                    content: tweet.content,
                }
            );

            const updatedTweet = response.data.data;

            setTweets((prev) =>
                prev.map((item) =>
                    item._id === tweet._id
                        ? updatedTweet
                        : item
                )
            );

            setEditingId(null);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update tweet"
            );
        }
    };

    const deleteTweet = async (tweet) => {
        try {
            setError("");

            await api.delete(
                `/tweet/deleteTweet/${tweet._id}`
            );

            setTweets((prev) =>
                prev.filter(
                    (item) => item._id !== tweet._id
                )
            );

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to delete tweet"
            );
        }
    };

    const handleContentChange = (id, value) => {
        setTweets((prev) =>
            prev.map((tweet) =>
                tweet._id === id
                    ? {
                          ...tweet,
                          content: value,
                      }
                    : tweet
            )
        );
    };

    useEffect(() => {
        getTweets();
    }, []);

    return (
        <div className="min-h-screen bg-black px-4 py-10 text-white">
            <div className="mx-auto max-w-2xl">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        My Tweets
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage your tweets
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="py-10 text-center text-zinc-500">
                        Loading your tweets...
                    </div>
                )}

                {/* No Tweets */}
                {!loading && tweets.length === 0 && !error && (
                    <div className="rounded-2xl border border-white/10 bg-zinc-950 p-10 text-center">
                        <p className="text-zinc-400">
                            You haven't posted any tweets yet.
                        </p>
                    </div>
                )}

                {/* Tweets */}
                <div className="space-y-4">
                    {tweets.map((tweet) => (
                        <div
                            key={tweet._id}
                            className="rounded-2xl border border-white/10 bg-zinc-950 p-5 transition hover:border-white/20"
                        >

                            {/* Tweet Content */}
                            <textarea
                                value={tweet.content}
                                disabled={
                                    editingId !== tweet._id
                                }
                                onChange={(e) =>
                                    handleContentChange(
                                        tweet._id,
                                        e.target.value
                                    )
                                }
                                className={`min-h-24 w-full resize-none rounded-xl border p-4 text-sm outline-none transition ${
                                    editingId === tweet._id
                                        ? "border-white/20 bg-zinc-900 text-white"
                                        : "border-transparent bg-transparent text-zinc-300"
                                }`}
                            />

                            {/* Actions */}
                            <div className="mt-4 flex justify-end gap-3">

                                {editingId === tweet._id ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setEditingId(null)
                                            }
                                            className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateTweet(tweet)
                                            }
                                            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
                                        >
                                            Save
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEditingId(tweet._id)
                                        }
                                        className="rounded-full border border-white/10 px-5 py-2 text-sm text-white transition hover:bg-white/10"
                                    >
                                        Edit
                                    </button>
                                )}

                                <button
                                    type="button"
                                    onClick={() =>
                                        deleteTweet(tweet)
                                    }
                                    className="rounded-full bg-red-500/10 px-5 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MyTweet;