const express = require("express");
const { login, signup } = require("../controllers/user");
const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.post("/add_to_activity");
router.get("/get_all_activity");

module.exports = router ;