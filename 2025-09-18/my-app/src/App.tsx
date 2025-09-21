import { useState } from "react"
import "./App.css"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import SendIcon from "@mui/icons-material/Send"
import Stack from "@mui/material/Stack"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div>
      <Stack
        direction="row"
        spacing={2}
      >
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </Stack>
    </>
  )
}

export default App
