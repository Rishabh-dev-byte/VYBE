import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    const {content} = req.body

    if(!content){
        throw new ApiError(400,"context is missing")
    }

    const tweets = await Tweet.create({
        content,
        owner:req.user._id
    })
    
    if(!tweets){
        throw new ApiError(500,"tweet not created")
    }

    return res.status(200).json(new ApiResponse(200,tweets,"tweet created successfully"))
})

const getOwnerTweets = asyncHandler(async (req, res) => {
      

    const userTweets = await Tweet.find({ owner: req.user._id }).sort({ createdAt: -1 })

    if(!userTweets.length){
    throw new ApiError(404, "no tweets found")
}

return res.status(200).json(
    new ApiResponse(200, userTweets, "tweets fetched successfully")
)

})

const getAllTweets = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const aggregate = Tweet.aggregate([
        {
            $match: {
                isVisible: true
            }
        },

        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            username: 1,
                            avatar: 1,
                            _id: 1
                        }
                    }
                ]
            }
        },

        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        }
    ]);

    const tweets = await Tweet.aggregatePaginate(aggregate, {
        page: Number(page),
        limit: Number(limit)
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            tweets,
            "All tweets fetched successfully"
        )
    );
});
const updateTweet = asyncHandler(async (req, res) => {
      const {content} = req.body 
      const { id } = req.params

      if(!content){
        throw new ApiError(404,"content is missing")
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new ApiError(400, "Invalid ID format");
        }
    
    const updatedTweet = await Tweet.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { $set: { content } },
    { new: true }
)

if(!updatedTweet){
    throw new ApiError(403, "Tweet not found or unauthorized")
}
    return res.status(200).json(
    new ApiResponse(200, updatedTweet , "tweet updated successfully")
    )
})

const deleteTweet = asyncHandler(async (req, res) => {
     const {id} = req.params

     if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new ApiError(400, "Invalid ID format");
        }

     const deletedTweet = await Tweet.findOneAndDelete({
    _id: id,
    owner: req.user._id 
})

if(!deletedTweet){
    throw new ApiError(403, "Tweet not found or unauthorized")
}
    
     return res.status(200).json(
    new ApiResponse(200, {} , "tweet deleted successfully")
    )
    
})

export {
    createTweet,
    getOwnerTweets,
    updateTweet,
    deleteTweet,
    getAllTweets
}