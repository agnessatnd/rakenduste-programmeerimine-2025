import { Link as RouterLink, Outlet } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  CssBaseline,
  Container,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"

export default function RootLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Something", to: "/something" },
    { label: "Profile", to: "/profile" },
  ]

  const handleDrawerToggle = () => setDrawerOpen(p => !p)

  return (
    <>
      <CssBaseline />

      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">My App</Typography>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                >
                  <List>
                    {navItems.map(item => (
                      <ListItem
                        key={item.to}
                        disablePadding
                      >
                        <ListItemButton
                          component={RouterLink}
                          to={item.to}
                          onClick={handleDrawerToggle}
                        >
                          <ListItemText primary={item.label} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {navItems.map(item => (
                <Button
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  color="inherit"
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Container sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  )
}
