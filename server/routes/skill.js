const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Skill = require("../models/Skill");

//@route GET api/skills
//@desc Create a skill
//@access private
router.get("/", verifyToken, async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.userId }).populate("user", [
      "username",
    ]);
    res.json({ success: true, skills });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
//@route POST api/skills
//@desc Create a skill
//@access private

router.post("/", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ success: false, msg: "Please enter a title" });
  }

  try {
    const newSkill = new Skill({
      title,
      description,
      url,
      status: status || "to learn",
      user: "64464dbb48503c0983720851",
    });

    await newSkill.save();
    res.json({ success: true, msg: "Skill created", newSkill });
  } catch (err) {}
});

module.exports = router;