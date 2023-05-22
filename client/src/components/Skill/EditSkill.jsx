import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function EditSkill({ skill, onClose }) {
  const [title, setTitle] = useState(skill.title);
  const [description, setDescription] = useState(skill.description);
  const [status, setStatus] = useState(skill.status);
  const [url, setUrl] = useState(skill.url);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleUpdate = () => {
    const updatedSkill = {
      title: title,
      description: description,
      status: status,
      url: url,
    };

    fetch(`http://localhost:3001/api/skill/${skill._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedSkill),
    })
      .then((response) => response.json())
      .then(() => {
        onClose();
      });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleCancel}>
      <DialogTitle>Edit Skill</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={handleTitleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          label="Status"
          value={status}
          onChange={handleStatusChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="URL"
          value={url}
          onChange={handleUrlChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditSkill;
