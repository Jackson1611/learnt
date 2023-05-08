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
      user: req.userId,
    });

    await newSkill.save();
    res.json({ success: true, msg: "Skill created", newSkill });
  } catch (err) {}
});

//router PUT app/skills/:id
//desc Update a skill
//access private

router.put("/:id", verifyToken, async (req, res) => {
  const { title, description, url, status } = req.body;

  // Simple validation
  if (!title) {
    return res
      .status(400)
      .json({ success: false, msg: "Please enter a title" });
  }

  try {
    let updatedSkill = {
      title,
      description: description || "",
      url: url || "",
      status: status || "to learn",
    };

    const skillUpdateCondition = { _id: req.params.id, user: req.userId };

    updatedSkill = await Skill.findOneAndUpdate(
      skillUpdateCondition,
      updatedSkill,
      { new: true }
    );

    // User not authorised to update skill
    if (!updatedSkill) {
      return res.status(401).json({
        success: false,
        message: "Skill not found or user not authorised",
      });
    }

    res.json({ success: true, message: "Updated skill", updatedSkill });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@route DELETE api/skills
//@desc Delete a skill
//@access private

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const skillDeleteCondition = { _id: req.params.id, user: req.userId };
    const deletedSkill = await Skill.findOneAndDelete(skillDeleteCondition);

    // User not authorised to update skill
    if (!deletedSkill) {
      return res.status(401).json({
        success: false,
        message: "Skill not found or user not authorised",
      });
    }

    res.json({ success: true, message: "Skill deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
