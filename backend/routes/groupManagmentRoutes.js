const express = require("express");
const {
  createGroup,
  updateGroup,
  deleteGroup,
  getOneGroup,
  getAllGroups,
  groupBasedCount
} = require("../controllers/group-controller");

const router = express.Router();  

router.post("/group-creation", createGroup);
router.put("/group-update/:id", updateGroup);
router.delete("/group-delete/:id", deleteGroup);
router.get("/group-details/:id", getOneGroup);
router.post("/all-groups", getAllGroups);
router.get("/group-counts", groupBasedCount);




module.exports = router;
