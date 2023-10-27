const  express = require("express")
const router = express.Router();
const likeController = require("../controller/likeController")


router.post("/like",likeController.like)
router.get("/alllike",likeController.getLike)

module.exports= router;