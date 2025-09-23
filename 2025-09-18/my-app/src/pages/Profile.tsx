//import { useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Stack,
} from "@mui/material"

export default function Profile() {
  const [email, setEmail] = useLocalStorage("email", "")
  const [text, setText] = useLocalStorage("message", "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Submitted!\nEmail: ${email}\nMessage: ${text}`)
  }

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
      >
        Profile
      </Typography>

      <br />
      <Box
        display="flex"
        justifyContent="center"
      >
        <Card sx={{ maxWidth: 560, width: "100%" }}>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
            >
              Agnessa Tund
            </Typography>

            <Typography
              variant="h6"
              sx={{ mt: 2 }}
            >
              Hobbies
            </Typography>
            <List
              dense
              sx={{ width: "100%", maxWidth: 360 }}
            >
              <ListItem>
                <ListItemText primary="Reading" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Solving crosswords" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sport" />
              </ListItem>
            </List>

            <Typography
              variant="h6"
              sx={{ mt: 2 }}
            >
              Contact me
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Stack spacing={2}>
                <TextField
                  type="email"
                  label="Email"
                  placeholder="your email..."
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Message"
                  placeholder="your message..."
                  multiline
                  rows={4}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                >
                  Send Message
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
