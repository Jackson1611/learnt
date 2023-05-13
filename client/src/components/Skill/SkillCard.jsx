import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function SkillCard({ skill, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete ${skill.title}?`)) {
      fetch(`http://localhost:3001/api/skill/${skill._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then(() => {
        onDelete();
      });
    }
  };

  let cardBackground;
  switch (skill.status) {
    case "to learn":
      cardBackground = "lightblue";
      break;
    case "learning":
      cardBackground = "lightyellow";
      break;
    case "learned":
      cardBackground = "lightgreen";
      break;
  }

  return (
    <Card
      sx={{
        width: 400,
        height: 200,
        margin: 1,
        boxShadow: 5,
        ":hover": {
          transform: "scale(1.05)",
          transition: "all 0.3s ease-in-out",
        },
        backgroundColor: cardBackground,
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {skill.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {skill.description}
        </Typography>
        <Typography variant="body2">Status: {skill.status}</Typography>
        <Typography variant="body2">
          <a href={skill.url}>{skill.url}</a>
        </Typography>
        <IconButton onClick={handleDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default SkillCard;
