import { Router } from 'express';
import {
    getLikedVideos,
    toggleCommentLike,
    toggleVideoLike,
    toggleTweetLike,
} from "../controller/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.route("/toggleVideoLike/:videoId").post(verifyJWT, toggleVideoLike)
router.route("/toggleCommentLike/:commentId").post(verifyJWT, toggleCommentLike)
router.route("/toggleTweetLike/:tweetId").post(verifyJWT, toggleTweetLike)
router.route("/getLikedVideos").get(verifyJWT,getLikedVideos)

export default router