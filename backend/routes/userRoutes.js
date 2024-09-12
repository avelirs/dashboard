const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login); // Make sure this line is present
router.get("/me", auth, userController.getMe);

module.exports = router;
