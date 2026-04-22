import { useEffect, useRef, useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"

function getBotResponse(input: string): string {
  const msg = input.toLowerCase().trim()

  if (msg.includes("what is PiedPiper") || msg.includes("what's PiedPiper") || msg.includes("tell me about PiedPiper")) {
    return "PiedPiper is a revolutionary decentralized compression platform. Our proprietary middle-out algorithm achieves a Weissman score of 5.2 \u2014 the highest ever recorded. We're building the compression layer for the next generation of the internet."
  }

  if (msg.includes("compression") || msg.includes("how does it work") || msg.includes("algorithm") || msg.includes("middle-out") || msg.includes("weissman")) {
    return "Our middle-out compression algorithm works by identifying the statistical midpoint of any data stream and compressing bidirectionally. This allows us to capture entropy patterns that traditional linear methods miss. The result? A verified Weissman score of 5.2 with zero data loss."
  }

  if (msg.includes("founder") || msg.includes("founded") || msg.includes("who created") || msg.includes("richard") || msg.includes("ceo")) {
    return "PiedPiper was founded by Richard Hendricks, a visionary software engineer who discovered the middle-out algorithm while working on a music app. He leads the company alongside Bertram Gilfoyle (VP Architecture), Dinesh Chugtai (Lead Engineer), and Jared Dunn (COO)."
  }

  if (msg.includes("decentralized") || msg.includes("distributed") || msg.includes("peer") || msg.includes("node")) {
    return "Yes, PiedPiper is fully decentralized. Our compression workloads are distributed across a global peer-to-peer mesh network. There is no single point of failure \u2014 if nodes go down, the network self-heals and reroutes. This makes PiedPiper both faster and more resilient than any centralized solution."
  }

  if (msg.includes("price") || msg.includes("pricing") || msg.includes("cost") || msg.includes("beta") || msg.includes("access") || msg.includes("sign up") || msg.includes("try")) {
    return "PiedPiper is currently in private beta. We're selectively onboarding enterprise partners and early adopters. You can request access through the Contact section on our website, and our team will get back to you within 24 hours."
  }

  if (msg.includes("security") || msg.includes("encryption") || msg.includes("safe") || msg.includes("secure")) {
    return "Security is built into PiedPiper at the protocol level. All data is encrypted end-to-end during compression and transmission. Your data is never exposed to third parties \u2014 not even to us. We use AES-256 encryption with perfect forward secrecy."
  }

  if (msg.includes("hooli") || msg.includes("competitor") || msg.includes("competition") || msg.includes("nucleus")) {
    return "We prefer to let our Weissman scores speak for themselves. While other platforms \u2014 including Hooli's Nucleus \u2014 focus on incremental improvements, PiedPiper represents a fundamental paradigm shift in how data compression works. There's really no comparison."
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg === "yo" || msg.includes("sup")) {
    return "Hey there! Welcome to PiedPiper. I'm the PiedPiper AI assistant. I can tell you about our compression technology, our team, pricing, or anything else. What would you like to know?"
  }

  if (msg.includes("thank") || msg.includes("thanks")) {
    return "You're welcome! If you have any other questions about PiedPiper, feel free to ask. We're always happy to talk compression."
  }

  return "Great question! I'm best at answering questions about PiedPiper's compression technology, our team, decentralized architecture, and beta access. Try asking something like \"What is PiedPiper?\" or \"How does the compression work?\""
}

interface ChatMessage {
  id: number
  sender: "user" | "bot"
  text: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      sender: "bot",
      text: "Hi! I'm the PiedPiper AI assistant. Ask me anything about our compression platform, our team, or how to get started.",
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotResponse(trimmed),
      }
      setMessages((prev) => [...prev, botMsg])
    }, 500)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <div
        className={`fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        style={{ height: "480px" }}
        role="dialog"
        aria-label="PiedPiper AI Chat"
      >
        <div className="flex items-center justify-between border-b border-border bg-secondary px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono text-xs font-bold">
              PP
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">PiedPiper AI</p>
              <p className="text-xs text-muted-foreground">Always online</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-secondary text-secondary-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="border-t border-border bg-secondary px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about PiedPiper..."
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all duration-200 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110 ${
          isOpen ? "rotate-0 scale-90" : "rotate-0 scale-100"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  )
}
