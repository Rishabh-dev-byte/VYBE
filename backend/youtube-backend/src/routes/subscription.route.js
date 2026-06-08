import {Router} from "express"
import { toggleSubscription,getUserChannelSubscribers,getSubscribedChannels } from "../controller/subscription.controller.js"

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.route("/toggleSubscription/:channelId").post(verifyJWT,toggleSubscription)
router.route("/getUserChannelSubscribers/:channelId").get(verifyJWT,getUserChannelSubscribers)
router.route("/getSubscribedChannels").get(verifyJWT,getSubscribedChannels)

export default router