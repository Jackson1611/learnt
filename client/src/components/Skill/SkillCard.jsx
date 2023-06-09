import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSkill from "./EditSkill";

function SkillCard({ skill, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

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
    default:
      cardBackground = "white";
      break;
  }

  return (
    <>
      <Card
        sx={{
          width: 400,
          height: 200,
          margin: 1,
          boxShadow: 5,
          borderRadius: 3,
          ":hover": {
            transform: "scale(1.02)",
            transition: "all 0.3s ease-in-out",
          },
          backgroundColor: cardBackground,
        }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5">{skill.title}</Typography>
            <IconButton onClick={handleOpenMenu} aria-label="settings">
              <SettingsIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>
                <DeleteIcon sx={{ marginRight: 1 }} />
                Delete
              </MenuItem>
            </Menu>
          </div>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {skill.description}
          </Typography>
          <Typography variant="body2">Status: {skill.status}</Typography>
          <Typography variant="body2">
            <a href={skill.url}>{skill.url}</a>
          </Typography>
        </CardContent>
      </Card>
      {editDialogOpen && (
        <EditSkill skill={skill} onClose={handleEditDialogClose} />
      )}
    </>
  );
}

export default SkillCard;
