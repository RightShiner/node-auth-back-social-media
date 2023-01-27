const router = require("express").Router();
//const SocketLobby = require("../socket/socket");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + ".png");
  },
});
const upload = multer({ storage: storage });

const { asyncHandler } = require("../middlewares/asyncHandler");
const checkEmail = require("../middlewares/checkEmail");
const {
  signup: signupValidator,
  signin: signinValidator,
  login: loginValidator,
} = require("../validators/auth");
const authController = require("../controllers/auth.controller");

// router.route("/signup").post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));
router.post(
  "/register",
  upload.single("profile_image"),
  asyncHandler(checkEmail),
  asyncHandler(authController.signup)
);

router
  .route("/signin")
  .post(signinValidator, asyncHandler(authController.signin));

//router.route("/login").post(loginValidator, asyncHandler(authController.login));
// router.route("/login").post();
router.post("/login", upload.none(), asyncHandler(authController.login));
router.post("/logout", upload.none(), asyncHandler(authController.logout));

module.exports = router;
