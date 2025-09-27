import { Box, Button, Stack, TextField, Snackbar, Alert } from "@mui/material"
import { useState } from "react"

type SubmitCatProps = {
  fetchCats: () => void
}

const SubmitCat = ({ fetchCats }: SubmitCatProps) => {
  const [name, setName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [snack, setSnack] = useState<{
    open: boolean
    msg: string
    severity: "success" | "error"
  }>({ open: false, msg: "", severity: "success" })

  const submitCat = async () => {
    try {
      setSubmitting(true)
      const response = await fetch("http://localhost:3000/cats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      })

      if (response.ok) {
        setName("")
        fetchCats()
        setSnack({ open: true, msg: "Cat added!", severity: "success" })
      } else {
        const data = await response.json().catch(() => null)
        const msg = data?.errors?.[0]?.msg || "Create failed"
        setSnack({ open: true, msg, severity: "error" })
      }
    } catch {
      setSnack({ open: true, msg: "Network error", severity: "error" })
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setSnack({ open: true, msg: "Name is required", severity: "error" })
      return
    }
    submitCat()
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack
          direction="row"
          spacing={2}
        >
          <TextField
            label="Cat name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Button
            variant="contained"
            color="success"
            type="submit"
            disabled={submitting || !name.trim()}
          >
            Add
          </Button>
        </Stack>
      </form>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack(s => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack(s => ({ ...s, open: false }))}
          variant="filled"
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default SubmitCat
