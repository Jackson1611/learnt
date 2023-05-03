import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import SkillCard from "./SkillCard";
import { Alert } from "@mui/material";
import AddSkill from "./AddSkill";
import Navbar from "../Navbar/Navbar";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [showAlert, setShowAlert] = useState(true);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const getSkills = async () => {
    const response = await fetch("http://localhost:3001/api/skill", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status == 401 || response.status == 403) {
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
  const firstLetter = username.charAt(0).toUpperCase();

  useEffect(() => {
    getSkills();
  }, []);

  return (
    <div>
      <Navbar user={firstLetter} />
      {showAlert && (
        <Alert
          onClose={() => {
            setShowAlert(false);
          }}
          severity="success"
        >
          Welcome back {username}!
        </Alert>
      )}

      <Grid container spacing={2}>
        {skills.map((skill) => (
          <Grid item xs={12} sm={6} md={4} key={skill._id}>
            <SkillCard skill={skill} onDelete={handleDeleteSkill} />
          </Grid>
        ))}
      </Grid>
      <AddSkill saveSkill={saveSkill} />
    </div>
  );
};

export default Skills;
