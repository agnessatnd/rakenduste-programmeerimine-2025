import { useState } from "react"
import { IconButton, Tooltip } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

type Props = {
  id: string
  onDeleted: () => Promise<void> | void
  confirm?: boolean
}

export default function DeleteTodo({ id, onDeleted, confirm = true }: Props) {
  const [submitting, setSubmitting] = useState(false)

  const handleDelete = async () => {
    if (confirm && !window.confirm("Archive this todo?")) return
    try {
      setSubmitting(true)
      const r = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      })
      if (r.ok) {
        await onDeleted()
      } else {
        alert("Delete failed")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Tooltip title="Delete">
      <IconButton
        aria-label="delete"
        color="error"
        onClick={handleDelete}
        disabled={submitting}
      >
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
}
