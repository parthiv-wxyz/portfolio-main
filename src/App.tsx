import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { Helmet } from "react-helmet-async";
import { motion, useScroll, useSpring } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronUp,
  Code2,
  Download,
  ExternalLink,
  GitBranch as Github,
  Camera as Instagram,
  BriefcaseBusiness as Linkedin,
  Mail,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from "lucide-react";
import {
  milestones,
  profile,
  projects,
  skillGroups,
  socials,
} from "./data/portfolio";
import { useTheme } from "./hooks/useTheme";

const Section = lazy(() =>
  import("./components/Section").then((module) => ({
    default: module.Section,
  })),
);

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(12, "Tell me a little more (12 characters minimum)"),
});
type ContactForm = z.infer<typeof schema>;
const Loading = () => (
  <div className="loading" aria-label="Loading">
    <span />
  </div>
);
const nav = ["About", "Skills", "Experience", "Projects", "Contact"];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("All");
  const [sent, setSent] = useState(false);
  const siteUrl = import.meta.env.VITE_SITE_URL || "https://parthiv.qd.je/";
  const contactEmail =
    import.meta.env.VITE_CONTACT_EMAIL || "uysvh56bscf5@mail.dpdns.org";
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const filtered = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );
  const form = useForm<ContactForm>({ resolver: zodResolver(schema) });
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    let id = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(frame);
    };
    id = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);
  async function submit(values: ContactForm) {
    const subject = `Portfolio message from ${values.name}`;
    const body = `Name: ${values.name}\nReply-to: ${values.email}\n\n${values.message}`;
    const payload = new URLSearchParams({
      "form-name": "contact",
      name: values.name,
      email: values.email,
      message: values.message,
    });
    const openMailFallback = () => {
      window.open(
        `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
        "_self",
      );
      toast("Your email app was opened as a fallback.");
    };

    if (import.meta.env.DEV) {
      openMailFallback();
      return;
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload.toString(),
      });
      if (!response.ok) throw new Error("Netlify Forms is unavailable");
      setSent(true);
      form.reset();
      toast.success("Thanks — your message has been received.");
    } catch {
      openMailFallback();
    }
  }
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };
  return (
    <>
      <Helmet>
        <title>
          {profile.name} — {profile.role}
        </title>
        <meta name="description" content={profile.bio} />
        <link rel="canonical" href={siteUrl} />
        <meta property="og:title" content={`${profile.name} — Portfolio`} />
        <meta property="og:description" content={profile.bio} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            email: profile.email,
            sameAs: Object.values(socials),
          })}
        </script>
      </Helmet>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <header className="nav">
        <button
          className="wordmark"
          onClick={() => scrollTo("top")}
          aria-label="Back to top"
        >
          PP<span>.</span>
        </button>
        <nav aria-label="Main navigation">
          {nav.map((item) => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())}>
              {item}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="icon-button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="menu icon-button"
            onClick={() => setMenu(!menu)}
            aria-expanded={menu}
            aria-label="Toggle menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {menu && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map((item) => (
            <button key={item} onClick={() => scrollTo(item.toLowerCase())}>
              {item}
            </button>
          ))}
        </nav>
      )}
      <main id="top">
        <section className="hero">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <motion.p
            className="availability"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <i /> Available for new opportunities
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Hi, I’m <em>{profile.name}.</em>
            <br />I build with intent.
          </motion.h1>
          <motion.p
            className="lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {profile.bio}
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <a className="button primary" href="/resume.pdf" download>
              <Download size={17} /> Download résumé
            </a>
            <button
              className="button secondary"
              onClick={() => scrollTo("projects")}
            >
              View projects <ArrowDown size={17} />
            </button>
          </motion.div>
          <div className="socials">
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a href={`mailto:${contactEmail}`} aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
          <button
            className="scroll-cue"
            onClick={() => scrollTo("about")}
            aria-label="Scroll to About"
          >
            Scroll to explore <ArrowDown size={15} />
          </button>
        </section>
        <Suspense fallback={<Loading />}>
          <Section
            id="about"
            eyebrow="01 / About"
            title="A thoughtful builder, always learning."
          >
            <div className="about-grid">
              <div className="portrait">
                <img
                  src="/pro1.jpeg"
                  alt={`Illustrated portrait of ${profile.name}`}
                  loading="lazy"
                />
              </div>
              <div>
                <p className="body-copy">
                  I’m a developer who enjoys turning complex problems into
                  simple, intuitive experiences. My work is grounded in solid
                  engineering, clear communication, and an eye for the details
                  people actually notice.
                </p>
                <div className="detail-grid">
                  <article>
                    <span>Education</span>
                    <strong>Master’s in Computer Science</strong>
                    <small>Kannur University · 2025–2027</small>
                  </article>
                  <article>
                    <span>Objective</span>
                    <strong>Make meaningful products</strong>
                    <small>{profile.objective}</small>
                  </article>
                </div>
              </div>
            </div>
          </Section>
          <Section
            id="skills"
            eyebrow="02 / Skills"
            title="Tools for moving ideas forward."
          >
            <div className="skills-grid">
              {skillGroups.map((group, i) => {
                const Icon = group.icon;
                return (
                  <motion.article
                    className="skill-card"
                    key={group.name}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Icon size={20} />
                    <h3>{group.name}</h3>
                    <div>
                      {group.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </div>
            <div className="marquee" aria-label="Technologies">
              <div>
                {[
                  "React",
                  "TypeScript",
                  "Python",
                  "Node.js",
                  "PostgreSQL",
                  "PyTorch",
                  "Docker",
                  "Git",
                  "React",
                  "TypeScript",
                  "Python",
                  "Node.js",
                  "PostgreSQL",
                  "PyTorch",
                  "Docker",
                  "Git",
                ].map((name, i) => (
                  <span key={`${name}-${i}`}>✦ {name}</span>
                ))}
              </div>
            </div>
          </Section>
          <Section
            id="experience"
            eyebrow="03 / Experience"
            title="The work behind the work."
          >
            <div className="timeline">
              {milestones.map((item, i) => (
                <motion.article
                  className="timeline-item"
                  key={item.title}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="timeline-dot" />
                  <p>{item.date}</p>
                  <h3>{item.title}</h3>
                  <strong>{item.org}</strong>
                  <span>{item.copy}</span>
                </motion.article>
              ))}
            </div>
          </Section>
          <Section
            id="projects"
            eyebrow="04 / Projects"
            title="Selected things I’ve made."
          >
            <div className="project-toolbar">
              <p>Small teams, real problems, considered solutions.</p>
              <div role="group" aria-label="Filter projects">
                {["All", "Web", "Machine Learning", "AI"].map((name) => (
                  <button
                    className={filter === name ? "selected" : ""}
                    onClick={() => setFilter(name)}
                    key={name}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
            <div className="projects-grid">
              {filtered.map((project) => (
                <motion.article
                  className="project-card"
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className="project-art"
                    style={{ background: project.gradient }}
                  >
                    <Code2 size={34} />
                    <span>{project.category}</span>
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <ul>
                      {project.features.map((feature) => (
                        <li key={feature}>
                          <Check size={14} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="tags">
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    {(project.github || project.demo) && (
                      <div className="project-links">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer">
                            <Github size={16} /> Code
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noreferrer">
                            Live demo <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </Section>
          <Section
            id="contact"
            eyebrow="05 / Contact"
            title="Let’s make something useful."
          >
            <div className="contact-grid">
              <div className="contact-panel">
                <span className="contact-kicker">Best ways to reach me</span>
                <p className="body-copy">
                  Have a role, an idea, or just a good problem to solve? I’d
                  love to hear from you.
                </p>
                <a className="email-link" href={`mailto:${contactEmail}`}>
                  {contactEmail} <ArrowUpRight />
                </a>
                <div className="github-stat">
                  <Github size={22} />
                  <div>
                    <strong>Open to collaboration</strong>
                    <span>Browse code, social profiles, or send a direct note</span>
                  </div>
                </div>
                <div className="contact-socials" aria-label="Social media links">
                  <a href={socials.github} target="_blank" rel="noreferrer">
                    <Github size={18} />
                    GitHub <ArrowUpRight size={14} />
                  </a>
                  <a href={socials.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin size={18} />
                    LinkedIn <ArrowUpRight size={14} />
                  </a>
                  <a href={socials.instagram} target="_blank" rel="noreferrer">
                    <Instagram size={18} />
                    Instagram <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
              <form onSubmit={form.handleSubmit(submit)} noValidate>
                <label>
                  Name
                  <input {...form.register("name")} placeholder="Your name" />
                  {form.formState.errors.name && (
                    <small>{form.formState.errors.name.message}</small>
                  )}
                </label>
                <label>
                  Email
                  <input
                    {...form.register("email")}
                    type="email"
                    placeholder="you@example.com"
                  />
                  {form.formState.errors.email && (
                    <small>{form.formState.errors.email.message}</small>
                  )}
                </label>
                <label>
                  Message
                  <textarea
                    {...form.register("message")}
                    placeholder="A little about your project…"
                    rows={4}
                  />
                  {form.formState.errors.message && (
                    <small>{form.formState.errors.message.message}</small>
                  )}
                </label>
                <button
                  className="button primary"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {sent ? "Message sent" : "Send message"} <Send size={17} />
                </button>
              </form>
            </div>
          </Section>
        </Suspense>
      </main>
      <footer>
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with care.
        </p>
        <div>
          <a href={socials.github} aria-label="GitHub">
            <Github size={18} />
          </a>
          <a href={socials.linkedin} aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
          <a href={socials.instagram} aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <button onClick={() => scrollTo("top")} aria-label="Back to top">
            <ChevronUp size={18} />
          </button>
        </div>
      </footer>
      <Toaster position="bottom-right" />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
