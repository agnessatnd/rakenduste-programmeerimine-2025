import { Link, Outlet } from "react-router"

export default function RootLayout() {
  return (
    <div style={{ padding: 24 }}>
      <nav style={{ marginBottom: 20 }}>
        <Link
          to="/"
          style={{ marginRight: 12 }}
        >
          Home
        </Link>
        <Link
          to="/about"
          style={{ marginRight: 12 }}
        >
          About
        </Link>
        <Link to="/something">Something</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}
