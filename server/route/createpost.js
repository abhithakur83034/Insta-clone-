const  express = require("express")
const router = express.Router();
const multer = require("multer")
const createpostController = require("../controller/createPostController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  
  const fileFilter = function (req, file, cb) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" 
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10, 
    },
    fileFilter: fileFilter,
  });

router.post("/createpost",upload.single("image"),createpostController.createpost)
router.get("/getpost",createpostController.getpost)



module.exports = router;