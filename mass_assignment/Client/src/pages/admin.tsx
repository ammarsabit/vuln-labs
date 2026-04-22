import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Shield, Terminal, Flag, Lock, Eye, EyeOff, Copy, Check, Loader2, AlertTriangle } from "lucide-react"
import { useAuth } from "../context/auth-context"
import { getAdminFlag } from "../services/api_client"

export function AdminPage() {
  const { user, isLoading: authLoading, isAuthenticated, isAdmin } = useAuth()
  const navigate = useNavigate()

  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [glitchText, setGlitchText] = useState("")
  const [typedIndex, setTypedIndex] = useState(0)

  const [flag, setFlag] = useState("")
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [isLoadingFlag, setIsLoadingFlag] = useState(false)
  const [flagError, setFlagError] = useState("")

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789"

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !isAdmin)) {
      navigate("/", { replace: true })
    }
  }, [authLoading, isAuthenticated, isAdmin, navigate])

  // Fetch flag on mount
  useEffect(() => {
    const fetchFlag = async () => {
      setIsLoadingFlag(true)
      setFlagError("")
      try {
        const response = await getAdminFlag()
        setFlag(response.flag)
        setWelcomeMessage(response.message)
      } catch (err) {
        if (err instanceof Error) {
          setFlagError(err.message)
        } else {
          setFlagError("Failed to fetch flag")
        }
      } finally {
        setIsLoadingFlag(false)
      }
    }

    if (isAuthenticated && isAdmin) {
      fetchFlag()
    }
  }, [isAuthenticated, isAdmin])

  // Typing animation for the flag reveal
  useEffect(() => {
    if (revealed && typedIndex < flag.length) {
      const timeout = setTimeout(() => {
        setTypedIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [revealed, typedIndex, flag.length])

  // Glitch effect for unrevealed state
  useEffect(() => {
    if (!revealed && flag) {
      const interval = setInterval(() => {
        const newGlitch = Array.from({ length: flag.length }, () =>
          glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join("")
        setGlitchText(newGlitch)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [revealed, flag])

  const handleCopy = () => {
    navigator.clipboard.writeText(flag)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReveal = () => {
    setRevealed(true)
    setTypedIndex(0)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
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

      {/* Admin Content */}
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Admin Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-4 ring-primary/20">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
          <p className="mt-2 text-muted-foreground">
            {welcomeMessage || `Welcome, ${user?.name}. Authorized Personnel Only.`}
          </p>
        </div>

        {/* Error State */}
        {flagError && (
          <div className="mb-8 rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center">
            <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-destructive" />
            <p className="text-destructive font-medium">{flagError}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoadingFlag && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}

        {/* CTF Flag Display */}
        {flag && !isLoadingFlag && (
          <div className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-b from-card to-card/50">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60" />
                <div className="h-3 w-3 rounded-full bg-chart-4/60" />
                <div className="h-3 w-3 rounded-full bg-primary/60" />
              </div>
              <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
                <Terminal className="h-4 w-4" />
                <span className="font-mono">secure_terminal.sh</span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 md:p-8">
              {/* Console Lines */}
              <div className="mb-6 space-y-2 font-mono text-sm">
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> sudo access --level=admin
                </p>
                <p className="text-muted-foreground">
                  <span className="text-chart-2">[OK]</span> Authentication verified
                </p>
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> cat /secret/flag.txt
                </p>
              </div>

              {/* Flag Container */}
              <div className="relative rounded-xl border border-border bg-background/50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground">Captured Flag</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {revealed && (
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3 w-3 text-primary" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy
                          </>
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => (revealed ? setRevealed(false) : handleReveal())}
                      className="flex items-center gap-1 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-all hover:bg-secondary/80"
                    >
                      {revealed ? (
                        <>
                          <EyeOff className="h-3 w-3" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3" />
                          Reveal
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* The Flag */}
                <div className="relative overflow-hidden rounded-lg bg-secondary/30 p-4">
                  {!revealed && (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/80 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Lock className="h-5 w-5" />
                        <span className="text-sm font-medium">Click Reveal to show flag</span>
                      </div>
                    </div>
                  )}
                  <code
                    className={`block break-all font-mono text-lg transition-all duration-300 ${
                      revealed ? "text-primary" : "text-primary/30 blur-sm select-none"
                    }`}
                  >
                    {revealed ? flag.slice(0, typedIndex) : glitchText}
                    {revealed && typedIndex < flag.length && (
                      <span className="animate-pulse text-foreground">|</span>
                    )}
                  </code>
                </div>

                {/* ASCII Art Decoration */}
                {revealed && typedIndex >= flag.length && (
                  <div className="mt-6 text-center font-mono text-xs text-muted-foreground/50">
                    <pre className="inline-block text-left">
{`    _____  _     _  _____  _                 
   |  __ \\(_)   | ||  __ \\(_)                
   | |__) |_  __| || |__) |_ _ __   ___ _ __ 
   |  ___/| |/ _\` ||  ___/| | '_ \\ / _ \\ '__|
   | |    | | (_| || |    | | |_) |  __/ |   
   |_|    |_|\\__,_||_|    |_| .__/ \\___|_|   
                            | |              
                            |_|   FLAG CAPTURED`}
                    </pre>
                  </div>
                )}
              </div>

              {/* Status Line */}
              <div className="mt-6 flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>
                  <span className="text-primary">STATUS:</span>{" "}
                  {revealed ? "FLAG_REVEALED" : "FLAG_HIDDEN"}
                </span>
                <span>
                  <span className="text-primary">COMPRESSION:</span> 5.2x Weissman Score
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8 flex gap-4">
          <Link
            to="/"
            className="flex-1 rounded-xl border border-border bg-card p-4 text-center text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="flex-1 rounded-xl border border-border bg-card p-4 text-center text-sm font-medium text-muted-foreground transition-all hover:border-primary hover:text-primary"
          >
            Profile
          </Link>
        </div>
      </main>
    </div>
  )
}
