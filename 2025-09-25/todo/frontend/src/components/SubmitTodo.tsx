import { Box, Button, Stack, TextField } from "@mui/material"
import { useState } from "react"

type Props = { onCreated: () => Promise<void> | void }

export default function SubmitTodo({ onCreated }: Props) {
  const [title, setTitle] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    try {
      setSubmitting(true)
      const r = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      })
      if (r.ok) {
        setTitle("")
        await onCreated()
      } else {
        alert("Create failed")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{ mt: 2 }}
    >
      <Stack
        direction="row"
        spacing={2}
      >
        <TextField
          label="Todo title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={submitting || !title.trim()}
        >
          Add
        </Button>
      </Stack>
    </Box>
  )
}
