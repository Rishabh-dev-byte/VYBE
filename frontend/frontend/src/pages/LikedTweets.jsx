import api from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
const LikedTweets = () => {
  const [likedTweet, setLikedTweets] = useState([]);
  const [liked, setLiked] = useState([]);

  const likedTweets = async () => {
    try {
      const response = await api.get("/like/getLikedTweet");
      if (response.data.success) {
        setLikedTweets(response.data.data);
        const likedIds = response.data.data.map((like) => like.tweet._id);
        setLiked(likedIds);
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const tweetLike = async (tweetId) => {
    try {
      const response = await api.post(`/like/toggleTweetLike/${tweetId}`);

      console.log(response.data);

      if (liked.includes(tweetId)) {
        setLiked((prev) => prev.filter((item) => item !== tweetId));
        setLikedTweets((prev) =>
          prev.filter((item) => item.tweet._id !== tweetId),
        );
      } else {
        setLiked((prev) => [...prev, tweetId]);
      }
    } catch (error) {
      console.log("error is", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    likedTweets();
  }, []);
  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white">
      {" "}
      <div className="mx-auto max-w-xl">
        {" "}
        <div className="mb-8">
          {" "}
          <h1 className="text-3xl font-bold"> Liked Tweets </h1>{" "}
          <p className="mt-2 text-sm text-zinc-500">
            {" "}
            Tweets you have liked{" "}
          </p>{" "}
        </div>{" "}
        <div className="space-y-4">
          {" "}
          {likedTweet.map((tweet) => (
            <div
              key={tweet._id}
              className="rounded-2xl border border-white/10 bg-zinc-950 p-5 transition hover:border-white/20"
            >
              {" "}
              <div className="flex items-center gap-3">
                {" "}
                <img
                  className="h-11 w-11 rounded-full object-cover"
                  src={tweet.tweet.owner.avatar}
                  alt={tweet.tweet.owner?.username}
                />{" "}
                <div>
                  {" "}
                  <p className="font-semibold text-white">
                    {" "}
                    {tweet.tweet.owner.fullName}{" "}
                  </p>{" "}
                  <p className="text-sm text-zinc-500">
                    {" "}
                    @{tweet.tweet.owner.username}{" "}
                  </p>{" "}
                </div>{" "}
              </div>{" "}
              <p className="mt-4 text-[15px] leading-6 text-zinc-200">
                {" "}
                {tweet.tweet.content}{" "}
              </p>{" "}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    tweetLike(tweet.tweet._id);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-gray-400 hover:bg-white/10 hover:text-white ${liked.includes(tweet.tweet._id) ? "fill-current text-red-500" : ""}`}
                >
                  <ThumbsUp size={18} />
                </button>
              </div>
            </div>
          ))}{" "}
        </div>{" "}
        {likedTweet.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-zinc-950 p-10 text-center">
            {" "}
            <p className="text-zinc-400">
              {" "}
              You haven't liked any tweets yet.{" "}
            </p>{" "}
          </div>
        )}{" "}
      </div>{" "}
    </div>
  );
};
export default LikedTweets;
