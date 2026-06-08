import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getOwnerTweets,
    updateTweet,
    getAllTweets
} from "../controller/tweet.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.route("/createTweet").post(verifyJWT,createTweet)
router.route("/getOwnerTweets").get(verifyJWT,getOwnerTweets)
router.route("/getAllTweets").get(verifyJWT,getAllTweets)
router.route("/updateTweet/:id").patch(verifyJWT, updateTweet)
router.route("/deleteTweet/:id").delete(verifyJWT,deleteTweet)


export default router