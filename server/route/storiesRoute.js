const  express = require("express")
const router = express.Router();
const storiesController = require("../controller/storiesController")


const multer = require("multer")

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

router.post("/stories",upload.single('image'),storiesController.stories)
router.get("/allstories",storiesController.getstories)
router.delete("/delete/:id",storiesController.deleteStories)


module.exports= router;