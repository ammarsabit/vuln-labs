import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail, LogOut, ArrowLeft, Check, Pencil, Loader2 } from "lucide-react"
import { useAuth } from "../context/auth-context"
import { updateEmail } from "../services/api_client"

export function ProfilePage() {
  const { user, isLoading: authLoading, isAuthenticated, logout, refreshUser } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login", { replace: true })
    }
  }, [authLoading, isAuthenticated, navigate])

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email)
    }
  }, [user])

  const handleSave = async () => {
    setError("")
    setIsSaving(true)

    try {
      await updateEmail(email)
      await refreshUser()
      setIsEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Failed to update email")
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/", { replace: true })
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono text-sm font-bold">
              PP
            </span>
            <span>
              Pid<span className="text-primary">Piper</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Profile Content */}
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Profile Settings</h1>

        {/* Profile Card */}
        <div className="rounded-2xl border border-border bg-card p-8">
          {/* Avatar & Name Section */}
          <div className="mb-8 flex items-center gap-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 ring-4 ring-primary/20">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Pencil className="h-4 w-4" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
              <p className="text-muted-foreground">{user.isAdmin ? "Administrator" : "Member"}</p>
              <p className="mt-1 text-sm text-muted-foreground/70">ID: {user.id}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-8 h-px bg-border" />

          {/* Email Update Section */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-foreground">Email Address</label>
            {error && (
              <div className="mb-3 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className="w-full rounded-xl border border-border bg-secondary/50 py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                  placeholder="your@email.com"
                />
              </div>
              {isEditing ? (
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:brightness-110 disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Check className="h-5 w-5" />
                  )}
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3 font-semibold text-secondary-foreground transition-all hover:bg-secondary/80"
                >
                  <Pencil className="h-5 w-5" />
                  Edit
                </button>
              )}
            </div>
            {saved && (
              <p className="mt-2 flex items-center gap-1 text-sm text-primary">
                <Check className="h-4 w-4" />
                Email updated successfully!
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="mb-8 h-px bg-border" />

          {/* Logout Section */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">Account Actions</h3>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-6 py-3 font-semibold text-destructive transition-all hover:bg-destructive/20"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
            <p className="mt-2 text-sm text-muted-foreground">
              You will be redirected to the home page.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex gap-4">
          <Link
            to="/"
            className="flex-1 rounded-xl border border-border bg-card p-4 text-center text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            Home
          </Link>
          {user.isAdmin && (
            <Link
              to="/admin"
              className="flex-1 rounded-xl border border-border bg-card p-4 text-center text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
