import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Stack,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useEffect, useState } from "react"
import SubmitCat from "./SubmitCat"

type Cat = {
  id: string
  name: string
  createdAt: number
  updatedAt: number | null
  archived: boolean
  archivedAt: number | null
}

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([])

  const fetchCats = async () => {
    const response = await fetch("http://localhost:3000/cats")
    const data = await response.json()
    setCats(data)
  }

  useEffect(() => {
    fetchCats()
  }, [])

  const rename = async (id: string, current: string) => {
    const name = prompt("New name?", current || "")
    if (!name) return
    await fetch(`http://localhost:3000/cats/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
    fetchCats()
  }

  const remove = async (id: string) => {
    await fetch(`http://localhost:3000/cats/${id}`, { method: "DELETE" })
    fetchCats()
  }

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ mb: 2 }}
      >
        Cats
      </Typography>

      <List>
        {cats.map(cat => (
          <ListItem
            key={cat.id}
            secondaryAction={
              <Stack
                direction="row"
                spacing={1}
              >
                <IconButton
                  aria-label="edit"
                  onClick={() => rename(cat.id, cat.name)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => remove(cat.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            }
          >
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>

      <SubmitCat fetchCats={fetchCats} />
    </Box>
  )
}

export default Cats
