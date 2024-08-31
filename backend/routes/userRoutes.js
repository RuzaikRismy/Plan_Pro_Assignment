const express = require("express");
const {
    saveUser,
    registerUser,
    getAllusers
} = require("../controllers/user-controller");

const router = express.Router();

router.post("/save-user", registerUser); 
router.get("/all-users", getAllusers);

module.exports = router;
