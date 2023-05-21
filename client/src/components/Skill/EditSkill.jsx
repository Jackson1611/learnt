import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditSkill = ({ onSave }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("to learn");
  const [url, setUrl] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setStatus("to learn");
    setUrl("");
  };

  const handleSave = () => {
    const newSkill = {
      title: title,
      description: description,
      status: status,
      url: url,
    };
    onSave(newSkill);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Edit">
        <Button onClick={handleClickOpen}>
          <EditIcon />
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Skill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="to learn">To Learn</MenuItem>
              <MenuItem value="learning">Learning</MenuItem>
              <MenuItem value="learned">Learned</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="URL"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditSkill;
