import { useEffect, useState } from "react"
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material"

type Todo = {
  id: string
  title: string
  createdAt: number
  updatedAt: number | null
  archived: boolean
  archivedAt: number | null
}

export default function AdminTodos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [snack, setSnack] = useState<{
    open: boolean
    msg: string
    severity: "success" | "error"
  }>({ open: false, msg: "", severity: "success" })

  const load = async () => {
    try {
      const r = await fetch("http://localhost:3000/admin/todos")
      const data = await r.json()
      setTodos(data)
    } catch {
      setSnack({ open: true, msg: "Load failed", severity: "error" })
    }
  }

  useEffect(() => {
    load()
  }, [])

  const toggle = async (id: string) => {
    try {
      const r = await fetch(`http://localhost:3000/admin/todos/${id}/toggle`, {
        method: "PATCH",
      })
      if (r.ok) {
        setTodos(prev =>
          prev.map(t => (t.id === id ? { ...t, archived: !t.archived } : t)),
        )
        setSnack({
          open: true,
          msg: "Todo status updated",
          severity: "success",
        })
      } else {
        setSnack({ open: true, msg: "Toggle failed", severity: "error" })
      }
    } catch {
      setSnack({ open: true, msg: "Network error", severity: "error" })
    }
  }

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ mb: 2 }}
      >
        Admin Todos
      </Typography>

      <List>
        {todos.map(t => (
          <ListItem
            key={t.id}
            secondaryAction={
              <Stack
                direction="row"
                spacing={1}
              >
                <Button
                  variant="outlined"
                  color={t.archived ? "success" : "warning"}
                  onClick={() => toggle(t.id)}
                >
                  {t.archived ? "Restore" : "Archive"}
                </Button>
              </Stack>
            }
          >
            <ListItemText
              primary={t.title}
              secondary={t.archived ? "Status: Archived" : "Status: Active"}
            />
          </ListItem>
        ))}
      </List>

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
    </Box>
  )
}
