const  express = require("express")
const router = express.Router();
const followController = require("../controller/followController")


router.post("/follow",followController.follow)
router.get("/followers",followController.getFollow)

module.exports= router;