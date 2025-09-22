import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: "#26B9EB",
    },
    secondary: {
      main: "#82D7F5",
    },
    background: {
      default: "#FAFAFA",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    h4: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 10,
  },
})

export default theme
