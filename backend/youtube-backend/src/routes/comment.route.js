import { Router } from 'express';
import {
    addComment,
    deleteComment,
    getVideoComments,
    updateComment,
} from "../controller/comment.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/getVideoComments/:videoId").get(verifyJWT,getVideoComments)
router.route("/addComment/:videoId").post(verifyJWT,addComment)
router.route("/updateComment/:commentId").post(verifyJWT,updateComment)
router.route("/deleteComment/:commentId").get(verifyJWT,deleteComment)




export default router