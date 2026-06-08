import { Router } from 'express';

import {
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getUserPlaylists,
    removeVideoFromPlaylist,
    updatePlaylist,
} from "../controller/playlist.controller.js"


const router = Router();
import {verifyJWT} from "../middlewares/auth.middleware.js"

router.route("/createPlaylist").post(verifyJWT,createPlaylist)
router.route("/getUserPlaylists/:userId").get(verifyJWT,getUserPlaylists)
router.route("/getPlaylistById/:playlistId").get(verifyJWT,getPlaylistById)
router.route("/addVideoToPlaylist").post(verifyJWT,addVideoToPlaylist)
router.route("/removeVideoFromPlaylist").delete(verifyJWT,removeVideoFromPlaylist)
router.route("/deletePlaylist/:playlistId").delete(verifyJWT,deletePlaylist)
router.route("/updatePlaylist/:playlistId").patch(verifyJWT,updatePlaylist)


export default router