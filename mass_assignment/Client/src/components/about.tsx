import { Globe, Lock, Zap } from "lucide-react"

export function About() {
  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 font-mono text-sm font-bold uppercase tracking-wider text-primary">
            About PiedPiper
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            A New Standard in Data Compression
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            PiedPiper is a revolutionary decentralized compression platform that
            eliminates the bottlenecks of traditional data transfer. Built on a
            peer-to-peer mesh architecture, our middle-out compression algorithm
            achieves Weissman scores that the industry once deemed theoretically
            impossible.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Middle-Out Compression",
              description:
                "Our proprietary algorithm compresses from the middle out, achieving lossless compression ratios that outperform every existing solution on the market by an order of magnitude.",
            },
            {
              icon: Globe,
              title: "Fully Decentralized",
              description:
                "No single point of failure. PiedPiper distributes compression workloads across a global network of nodes, ensuring blazing speed and total resilience against outages.",
            },
            {
              icon: Lock,
              title: "Enterprise-Grade Security",
              description:
                "End-to-end encryption is built into the protocol layer. Your data is compressed, encrypted, and transmitted without ever being exposed to third parties.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:bg-secondary"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
