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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddSkill = (props) => {
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

  const addSkill = () => {
    props.saveSkill({ title, description, status, url });
    handleClose();
  };

  return (
    <div>
      <Button
        style={{ marginRight: 15, fontSize: "16px", color: "black" }}
        size="large"
        onClick={handleClickOpen}
      >
        <AddCircleOutlineIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Skill</DialogTitle>
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
          <Button onClick={addSkill}>Add Skill</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddSkill;
