import { useState } from "react"
import {
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

type Props = {
  id: string
  currentName: string
  fetchCats: () => void
}

export default function UpdateCat({ id, currentName, fetchCats }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(currentName)
  const [submitting, setSubmitting] = useState(false)
  const [snack, setSnack] = useState<{
    open: boolean
    msg: string
    severity: "success" | "error"
  }>({
    open: false,
    msg: "",
    severity: "success",
  })

  const openDialog = () => {
    setName(currentName)
    setOpen(true)
  }
  const closeDialog = () => setOpen(false)

  const save = async () => {
    if (!name.trim()) {
      setSnack({ open: true, msg: "Name is required", severity: "error" })
      return
    }
    try {
      setSubmitting(true)
      const r = await fetch(`http://localhost:3000/cats/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      })
      if (r.ok) {
        setOpen(false)
        fetchCats()
        setSnack({ open: true, msg: "Cat updated!", severity: "success" })
      } else {
        const data = await r.json().catch(() => null)
        const msg = data?.errors?.[0]?.msg || "Update failed"
        setSnack({ open: true, msg, severity: "error" })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Tooltip title="Edit">
        <IconButton
          aria-label="edit"
          onClick={openDialog}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={closeDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Edit cat</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDialog}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={save}
            disabled={submitting || !name.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          variant="filled"
          onClose={() => setSnack(s => ({ ...s, open: false }))}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </>
  )
}
