import { useState } from "react"
import { IconButton, Tooltip, Snackbar, Alert } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

type Props = {
  id: string
  fetchCats: () => void
  confirm?: boolean
}

export default function DeleteCat({ id, fetchCats, confirm = true }: Props) {
  const [busy, setBusy] = useState(false)
  const [snack, setSnack] = useState<{
    open: boolean
    msg: string
    severity: "success" | "error"
  }>({
    open: false,
    msg: "",
    severity: "success",
  })

  const handle = async () => {
    if (confirm && !window.confirm("Delete this cat?")) return
    try {
      setBusy(true)
      const r = await fetch(`http://localhost:3000/cats/${id}`, {
        method: "DELETE",
      })
      if (r.ok) {
        setSnack({ open: true, msg: "Cat deleted", severity: "success" })
        setTimeout(() => {
          fetchCats()
        }, 1000)
      } else {
        const data = await r.json().catch(() => null)
        const msg = data?.errors?.[0]?.msg || "Delete failed"
        setSnack({ open: true, msg, severity: "error" })
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Tooltip title="Delete">
        <IconButton
          aria-label="delete"
          color="error"
          onClick={handle}
          disabled={busy}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>

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
