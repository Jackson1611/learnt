import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import SkillCard from "./SkillCard";
import AddSkill from "./AddSkill";
import Navbar from "../Navbar/Navbar";

const LearningSkill = () => {
  const [skills, setSkills] = useState([]);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const getLearningSkills = async () => {
    const response = await fetch("http://localhost:3001/api/skill/learning", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 401 || response.status === 403) {
      navigate("/login");
    } else {
      const data = await response.json();
      setSkills(data.skills);
    }
  };

  const saveSkill = (skill) => {
    fetch("http://localhost:3001/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(skill),
    })
      .then((response) => response.json())
      .then((data) => {
        getLearningSkills();
      });
  };

  const handleDeleteSkill = (skillId) => {
    setSkills(skills.filter((skill) => skill._id !== skillId));
    getLearningSkills();
  };

  const username = localStorage.getItem("username");
  function getFirstLetter(username) {
    if (username) {
      return username.charAt(0).toUpperCase();
    } else {
      return "";
    }
  }
  const firstLetter = getFirstLetter(username);

  useEffect(() => {
    getLearningSkills();
  }, []);

  return (
    <div>
      <Navbar user={firstLetter} />

      <div style={{ marginTop: "2rem" }}>
        <Grid container spacing={2}>
          {skills.map((skill) => (
            <Grid item xs={12} sm={6} md={4} key={skill._id}>
              <SkillCard skill={skill} onDelete={handleDeleteSkill} />
            </Grid>
          ))}
        </Grid>
        <AddSkill saveSkill={saveSkill} />
      </div>
    </div>
  );
};

export default LearningSkill;
