import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, User, Shield, UserPlus } from "lucide-react"
import { useAuth } from "../context/auth-context"
import Logo from "../assets/logo.png"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Technology", href: "#technology" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

  const renderAuthButton = () => {
    if (isLoading) {
      return (
        <div className="h-10 w-24 animate-pulse rounded-lg bg-secondary" />
      )
    }

    if (!isAuthenticated) {
      return (
        <Link
          to="/register"
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110"
        >
          <UserPlus className="h-4 w-4" />
          Register
        </Link>
      )
    }

    if (isAdmin) {
      return (
        <Link
          to="/admin"
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110"
        >
          <Shield className="h-4 w-4" />
          Admin Panel
        </Link>
      )
    }

    return (
      <Link
        to="/profile"
        className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110"
      >
        <User className="h-4 w-4" />
        My Account
      </Link>
    )
  }

  const renderMobileAuthButton = () => {
    if (isLoading) {
      return (
        <li>
          <div className="h-10 w-full animate-pulse rounded-lg bg-secondary" />
        </li>
      )
    }

    if (!isAuthenticated) {
      return (
        <li>
          <Link
            to="/register"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110"
          >
            <UserPlus className="h-4 w-4" />
            Register
          </Link>
        </li>
      )
    }

    if (isAdmin) {
      return (
        <li>
          <Link
            to="/admin"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110"
          >
            <Shield className="h-4 w-4" />
            Admin Panel
          </Link>
        </li>
      )
    }

    return (
      <li>
        <Link
          to="/profile"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:brightness-110"
        >
          <User className="h-4 w-4" />
          My Account
        </Link>
      </li>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
          <img src={Logo} className="inline-flex h-12 w-12 items-center justify-center rounded-lg  font-mono text-sm font-bold" />
          <span>
            Pied<span className="text-primary">Piper</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          {renderAuthButton()}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {renderMobileAuthButton()}
          </ul>
        </div>
      )}
    </nav>
  )
}
