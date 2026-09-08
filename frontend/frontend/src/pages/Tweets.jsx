import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import api from "@/lib/axios";
import { Link } from "react-router-dom";


const Tweets = () => {
    const [tweets, setTweets] = useState([]);
    const [tweetContent, setTweetContent] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { authUser } = useAuthContext();

    // Get all tweets
    const getAllTweets = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/tweet/getAllTweets", {
                params: {
                    page: 1,
                    limit: 10,
                },
            });

            console.log(response.data);

            setTweets(response.data.data.docs);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to fetch tweets"
            );
        } finally {
            setLoading(false);
        }
    };

    // Create tweet
    const submitTweet = async (e) => {
        e.preventDefault();

        if (!tweetContent.trim()) {
            return;
        }

        try {
            setError("");

            const response = await api.post(
                "/tweet/createTweet",
                {
                    content: tweetContent,
                }
            );

            console.log(response.data);

            // Add newly created tweet to the top
            setTweets((prev) => [
                response.data.data,
                ...prev,
            ]);

            // Clear input
            setTweetContent("");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create tweet"
            );
        }
    };

    useEffect(() => {
        getAllTweets();
    }, []);

    return (
        <div className="min-h-screen bg-black px-4 py-8 text-white">
            <div className="mx-auto max-w-2xl">

                {/* Header */}
                <h1 className="mb-6 text-3xl font-bold gap-10">
                    Tweets
                   
                </h1>
                
                <Link
                  to="/Mytweets"
                  className="text-sm text-zinc-300 transition hover:text-white"
                >
                  My Tweets
                 </Link>

                {/* Create Tweet */}
                <form
                    onSubmit={submitTweet}
                    className="mb-8 flex gap-3"
                >
                    <Input
                        type="text"
                        value={tweetContent}
                        onChange={(e) =>
                            setTweetContent(e.target.value)
                        }
                        placeholder="Tweet Here..."
                        className="h-11 bg-zinc-900 text-white"
                    />

                    <Button
                        type="submit"
                        className="h-11 shrink-0 bg-white text-black hover:bg-zinc-200"
                    >
                        <Send className="h-4 w-4" />
                        Tweet
                    </Button>
                </form>

                {/* Error */}
                {error && (
                    <p className="mb-4 text-sm text-red-400">
                        {error}
                    </p>
                )}

                {/* Loading */}
                {loading && (
                    <p className="text-zinc-500">
                        Loading...
                    </p>
                )}

                {/* Tweets */}
                <div className="space-y-4">
                    {tweets.map((tweet) => (
                        <div
                            key={tweet._id}
                            className="rounded-xl border border-white/10 bg-zinc-950 p-4"
                        >
                            <div className="flex gap-3">

                                {/* Avatar */}
                                <img
                                    src={tweet.owner?.avatar}
                                    alt={tweet.owner?.username}
                                    className="h-10 w-10 rounded-full object-cover"
                                />

                                <div>
                                    <p className="font-semibold">
                                        {tweet.owner?.fullName}
                                    </p>

                                    <p className="text-sm text-zinc-500">
                                        @{tweet.owner?.username}
                                    </p>

                                    <p className="mt-2 text-zinc-200">
                                        {tweet.content}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Tweets;