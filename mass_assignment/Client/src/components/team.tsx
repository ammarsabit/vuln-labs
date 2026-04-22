import { Github, Linkedin, Twitter } from "lucide-react"
import Richard from "../assets/Richard.png"
import Gilfoyle from "../assets/Gilfoyle.png"
import Jared from "../assets/Jared.png"
import Dinesh from "../assets/Dinesh.png"


const teamMembers = [
  {
    name: "Richard Hendricks",
    role: "CEO & Founder",
    bio: "Visionary engineer who discovered the middle-out algorithm. Former Hooli employee turned compression revolutionary.",
    photo: Richard,
  },
  {
    name: "Bertram Gilfoyle",
    role: "VP of Architecture",
    bio: "Systems architect and security expert. Designed PiedPiper's decentralized infrastructure from scratch. Prefers servers over people.",
    photo: Gilfoyle,
  },
  {
    name: "Dinesh Chugtai",
    role: "Lead Engineer",
    bio: "Full-stack developer responsible for PiedPiper's core API layer and real-time streaming pipeline. Competitive by nature.",
    photo: Dinesh,
  },
  {
    name: "Jared Dunn",
    role: "COO",
    bio: "Operational mastermind who keeps PiedPiper running. Former Hooli Head of Business Development. Believes in the mission.",
    photo: Jared,
  },
]

export function Team() {
  return (
    <section id="team" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wider text-primary">
            Our Team
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            The Minds Behind PiedPiper
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            A small team of brilliant engineers and operators building the future of data
            compression from a house in Palo Alto.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/50"
            >
              <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-full bg-primary/10 ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-primary">
                {member.role}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              <div className="mt-4 flex items-center justify-center gap-3">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <button
                    key={i}
                    className="text-muted-foreground transition-colors duration-200 hover:text-primary"
                    aria-label={`Social link ${i + 1}`}
                  >
                    <Icon className="h-4 w-4" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
