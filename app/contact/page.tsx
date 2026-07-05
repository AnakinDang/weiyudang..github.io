import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileText,
  FlaskConical,
  LockKeyhole,
  Mail,
  MessageCircle,
  PanelsTopLeft,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { LocalizedText } from "@/components/LocalizedText";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Weiyu Dang about AI systems, research workflows, creative tools, and public-safe collaboration.",
  alternates: {
    canonical: "/contact"
  },
  openGraph: {
    title: "Contact Weiyu Dang",
    description: "Public contact path for AI systems, research workflows, creative tools, and Personal OS collaboration.",
    url: "/contact",
    type: "website"
  }
};

const contactLanes = [
  {
    title: "Agent systems and Doraemon",
    summary: "Discuss Personal OS ideas, MiniDora team design, public command-room interfaces, or agent workflow architecture.",
    href: "/dora",
    label: "Open Doraemon",
    badge: "Public-safe",
    icon: Bot
  },
  {
    title: "Research tools and experiments",
    summary: "Share a research question, interface problem, note, paper, dataset shape, or workflow that deserves a better tool.",
    href: "/lab",
    label: "Read research",
    badge: "Evidence-first",
    icon: FlaskConical
  },
  {
    title: "Projects and product surfaces",
    summary: "Talk about a public project, prototype, dashboard, visual system, or collaboration path with clear boundaries.",
    href: "/projects",
    label: "Browse projects",
    badge: "Public artifacts",
    icon: PanelsTopLeft
  },
  {
    title: "Writing and creative work",
    summary: "Start from a note, photo, field observation, or media workflow that could become a small public artifact.",
    href: "/journal",
    label: "Open journal",
    badge: "Human layer",
    icon: Sparkles
  }
] as const;

const noteChecklist = [
  "What are you trying to understand or build?",
  "Which public project, research note, or workflow does it connect to?",
  "What artifact can you share safely: link, screenshot, sketch, repo, paper, or short context?",
  "What would make the first response useful: critique, collaboration, introduction, or a focused call?"
] as const;

const boundaryRules = [
  "Use public summaries. Do not send private tasks, prompts, owner notes, raw logs, or internal IDs.",
  "Do not include credentials, account details, tokens, broker data, or private operational channels.",
  "Trading-related conversations stay research-only: not an order, recommendation, or execution system."
] as const;

const responseModes = [
  ["Research exchange", "A question, paper, note, or experiment that benefits from careful reasoning."],
  ["Interface collaboration", "A dashboard, workflow, product surface, or agent experience that needs sharper design."],
  ["Long-term Personal OS", "A broader conversation about Doraemon, MiniDoras, and human-bounded automation."]
] as const;

export default function ContactPage() {
  return (
    <SiteChrome>
      <section className="contact-hero">
        <div className="container contact-hero-grid">
          <div className="contact-hero-copy">
            <LocalizedText as="p" className="contact-kicker" value="Public collaboration entry" />
            <LocalizedText as="h1" value="Start with a focused note." />
            <LocalizedText
              as="p"
              value="Contact is the public front door for research questions, AI systems, creative workflows, and Personal OS collaboration. Share the context that is safe to make public; keep private operations out of the inbox."
            />
            <div className="contact-hero-actions">
              <a href="mailto:hello@weiyudang.com" className="link-focus contact-primary-action">
                <Mail size={17} aria-hidden />
                hello@weiyudang.com
                <ArrowRight size={16} aria-hidden />
              </a>
              <Link href="/dora" className="link-focus contact-secondary-action">
                <MessageCircle size={17} aria-hidden />
                <LocalizedText value="Meet Doraemon first" />
                <ArrowRight size={16} aria-hidden />
              </Link>
            </div>
            <div className="contact-status-row" aria-label="Contact safety boundary">
              <span>
                <ShieldCheck size={15} aria-hidden />
                <LocalizedText value="Public-safe first" />
              </span>
              <span>
                <LockKeyhole size={15} aria-hidden />
                <LocalizedText value="No owner operations" />
              </span>
              <span>
                <FileText size={15} aria-hidden />
                <LocalizedText value="Specific context helps" />
              </span>
            </div>
          </div>

          <aside className="contact-visual" aria-label="Contact context">
            <div className="contact-image-frame">
              <Image
                src="/visuals/weiyu-bright-studio.png"
                alt="A bright research desk with notebooks, system sketches, AI workflow diagrams, and research dashboards."
                width={1680}
                height={945}
                priority
                sizes="(min-width: 1080px) 42vw, 100vw"
                className="contact-image"
              />
              <div className="contact-image-card">
                <LocalizedText value="Contact route" />
                <LocalizedText as="strong" value="Public note first. Private systems stay private." />
                <LocalizedText as="small" value="Good context beats a long pitch." />
              </div>
            </div>
            <div className="contact-mini-map" aria-label="Contact route choices">
              <LocalizedText value="Research" />
              <LocalizedText value="Doraemon" />
              <LocalizedText value="Projects" />
            </div>
          </aside>
        </div>
      </section>

      <section className="contact-section contact-lanes-section">
        <div className="container">
          <div className="contact-section-head">
            <LocalizedText as="p" className="contact-kicker" value="Good reasons to reach out" />
            <LocalizedText as="h2" value="Pick the surface that best matches the conversation." />
          </div>
          <div className="contact-lane-grid">
            {contactLanes.map((lane) => {
              const Icon = lane.icon;
              return (
                <article key={lane.title} className="contact-lane-card">
                  <div className="contact-lane-topline">
                    <Icon size={22} aria-hidden />
                    <LocalizedText value={lane.badge} />
                  </div>
                  <LocalizedText as="h3" value={lane.title} />
                  <LocalizedText as="p" value={lane.summary} />
                  <Link href={lane.href} className="link-focus contact-lane-link">
                    <LocalizedText value={lane.label} />
                    <ArrowRight size={15} aria-hidden />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="contact-section contact-note-section">
        <div className="container contact-note-grid">
          <div className="contact-note-copy">
            <LocalizedText as="p" className="contact-kicker" value="A useful first message" />
            <LocalizedText as="h2" value="Give the work a shape before asking for time." />
            <LocalizedText
              as="p"
              value="The fastest way to start is a short note that makes the question, artifact, and desired next step clear. It does not need to be polished. It does need to be safe to read in a public-contact context."
            />
            <a href="mailto:hello@weiyudang.com" className="link-focus contact-outline-action">
              <LocalizedText value="Write the note" />
              <ArrowRight size={16} aria-hidden />
            </a>
          </div>
          <div className="contact-checklist-panel">
            {noteChecklist.map((item, index) => (
              <div key={item} className="contact-checklist-item">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <CheckCircle2 size={18} aria-hidden />
                <LocalizedText as="p" value={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section contact-boundary-section">
        <div className="container contact-boundary-grid">
          <div>
            <LocalizedText as="p" className="contact-kicker" value="Boundary" />
            <LocalizedText as="h2" value="Public contact is not a command channel." />
            <LocalizedText
              as="p"
              value="Doraemon Office and the owner cockpit have clear roles. Contact is for starting a conversation, not for sending instructions into the private operating layer."
            />
          </div>
          <div className="contact-boundary-panel">
            {boundaryRules.map((rule) => (
              <div key={rule} className="contact-boundary-rule">
                <ShieldCheck size={18} aria-hidden />
                <LocalizedText value={rule} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section contact-response-section">
        <div className="container contact-response-frame">
          <div>
            <LocalizedText as="p" className="contact-kicker" value="What usually works" />
            <LocalizedText as="h2" value="Small, specific, public-safe starts compound best." />
          </div>
          <div className="contact-response-grid">
            {responseModes.map(([title, summary]) => (
              <div key={title} className="contact-response-card">
                <LocalizedText as="strong" value={title} />
                <LocalizedText value={summary} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
