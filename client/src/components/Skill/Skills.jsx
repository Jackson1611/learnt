import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SkillCard from "./SkillCard";
import AddSkill from "./AddSkill";
import Navbar from "../Navbar/Navbar";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [screenType, setScreenType] = useState("all");

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const getSkills = async () => {
    const response = await fetch("http://localhost:3001/api/skill", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 401 || response.status === 403) {
      navigate("/login");
    } else {
      const data = await response.json();
      console.log(data);
      setSkills(data.skills);
    }
  };

  const saveSkill = (skill) => {
    fetch("http://localhost:3001/api/skill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(skill),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getSkills();
      });
  };

  const handleDeleteSkill = (skillId) => {
    setSkills(skills.filter((skill) => skill._id !== skillId));
    getSkills();
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
    getSkills();
  }, []);

  const handleScreenTypeChange = (event, newScreenType) => {
    event.preventDefault();
    setScreenType(newScreenType);
  };

  const filteredSkills = skills.filter((skill) => {
    if (screenType === "all") {
      return true;
    } else if (screenType === "to learn") {
      return skill.status === "to learn";
    } else if (screenType === "learning") {
      return skill.status === "learning";
    } else if (screenType === "learned") {
      return skill.status === "learned";
    }
    return true;
  });

  return (
    <div>
      <Navbar user={firstLetter} />

      <div style={{ marginTop: "2rem" }}>
        <ToggleButtonGroup
          value={screenType}
          exclusive
          onChange={handleScreenTypeChange}
          aria-label="screen-type"
          style={{ marginBottom: "2rem" }}
        >
          <ToggleButton value="all" aria-label="all">
            All Skills
          </ToggleButton>
          <ToggleButton value="to learn" aria-label="to learn">
            To Learn
          </ToggleButton>
          <ToggleButton value="learning" aria-label="learning">
            Learning
          </ToggleButton>
          <ToggleButton value="learned" aria-label="learned">
            Learnt
          </ToggleButton>
        </ToggleButtonGroup>
        <Grid container spacing={2}>
          {filteredSkills.map((skill) => (
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

export default Skills;
