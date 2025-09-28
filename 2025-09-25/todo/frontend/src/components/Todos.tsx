import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material"
import { useEffect, useState } from "react"
import SubmitTodo from "./SubmitTodo"
import UpdateTodo from "./UpdateTodo"
import DeleteTodo from "./DeleteTodo"

type Todo = {
  id: string
  title: string
  createdAt: number
  updatedAt: number | null
  archived: boolean
  archivedAt: number | null
}

export default function Todos() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [snack, setSnack] = useState<{
    open: boolean
    msg: string
    severity: "success" | "error"
  }>({ open: false, msg: "", severity: "success" })

  const load = async () => {
    try {
      const r = await fetch("http://localhost:3000/todos")
      const data = await r.json()
      setTodos(data)
    } catch {
      setSnack({ open: true, msg: "Load failed", severity: "error" })
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ mb: 2 }}
      >
        Todos
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
                <UpdateTodo
                  id={t.id}
                  initialTitle={t.title}
                  onUpdated={async () => {
                    await load()
                    setSnack({
                      open: true,
                      msg: "Todo updated",
                      severity: "success",
                    })
                  }}
                />
                <DeleteTodo
                  id={t.id}
                  onDeleted={async () => {
                    await load()
                    setSnack({
                      open: true,
                      msg: "Todo archived",
                      severity: "success",
                    })
                  }}
                />
              </Stack>
            }
          >
            <ListItemText
              primary={t.title}
              secondary={`Created: ${new Date(t.createdAt).toLocaleString(
                "et-EE",
              )}`}
            />
          </ListItem>
        ))}
      </List>

      <SubmitTodo
        onCreated={async () => {
          await load()
          setSnack({ open: true, msg: "Todo created", severity: "success" })
        }}
      />

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
