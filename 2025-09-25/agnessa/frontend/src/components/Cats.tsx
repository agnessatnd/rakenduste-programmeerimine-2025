import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material"
import { useEffect, useState } from "react"
import SubmitCat from "./SubmitCat"
import UpdateCat from "./UpdateCat"
import DeleteCat from "./DeleteCat"

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
                <UpdateCat
                  id={cat.id}
                  currentName={cat.name}
                  fetchCats={fetchCats}
                />
                <DeleteCat
                  id={cat.id}
                  fetchCats={fetchCats}
                />
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
