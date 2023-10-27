const  express = require("express")
const router = express.Router();
const multer = require("multer")
const userController = require("../controller/userController")

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

router.post("/usrregister",upload.single("image"),userController.userRegister)
router.post("/userlogin",userController.userLogin)
router.get("/registereduser",userController.Registereduser)
router.put("/updateprofile/:id",upload.single('image'),userController.updateProfile)


module.exports = router;