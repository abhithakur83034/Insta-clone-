const  express = require("express")
const router = express.Router();
const commentController = require("../controller/commentController")


router.post("/comment",commentController.comment)


module.exports= router;