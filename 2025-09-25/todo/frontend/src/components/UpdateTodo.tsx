import { useState } from "react";
import {
  IconButton, Tooltip, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type Props = {
  id: string;
  initialTitle: string;
  onUpdated: () => Promise<void> | void; 
};

export default function UpdateTodo({ id, initialTitle, onUpdated }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [submitting, setSubmitting] = useState(false);

  const openDialog = () => { setTitle(initialTitle); setOpen(true); };
  const closeDialog = () => setOpen(false);

  const save = async () => {
    if (!title.trim()) return;
    try {
      setSubmitting(true);
      const r = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (r.ok) {
        setOpen(false);
        await onUpdated();
      } else {
        alert("Update failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Tooltip title="Edit">
        <IconButton aria-label="edit" onClick={openDialog}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle>Edit todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} disabled={submitting}>Cancel</Button>
          <Button variant="contained" onClick={save} disabled={submitting || !title.trim()}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}