import { Navbar } from "../components/navbar"
import { Hero } from "../components/hero"
import { About } from "../components/about"
import { Features } from "../components/features"
import { Tech } from "../components/tech"
import { Team } from "../components/team"
import { Contact } from "../components/contact"
import { Footer } from "../components/footer"
import { Chatbot } from "../components/chatbot"

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Tech />
        <Team />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
