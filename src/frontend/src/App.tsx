import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Life at BRA", href: "#life" },
  { label: "News & Events", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const ANNOUNCEMENTS = [
  {
    date: "March 18, 2026",
    title: "Annual Science & Innovation Fair 2026",
    excerpt:
      "Students from Grades 7–12 are invited to present their research projects at the Annual Science & Innovation Fair on April 5th. Registration closes March 28th.",
  },
  {
    date: "March 12, 2026",
    title: "Admissions Open for Academic Year 2026–27",
    excerpt:
      "Applications are now being accepted for all grade levels for the upcoming academic year. Early application deadline is April 30, 2026. Download the prospectus today.",
  },
  {
    date: "March 5, 2026",
    title: "National Day Cultural Programme",
    excerpt:
      "Bosing Royal Academy proudly announces its National Day Cultural Programme on March 25th. All parents and community members are warmly invited to attend.",
  },
];

function IconGradCap() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-10 h-10"
      aria-hidden="true"
    >
      <path
        d="M22 10v6M2 10l10-5 10 5-10 5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 12v5c3.333 1.667 8.667 1.667 12 0v-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-10 h-10"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path
        d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconStar() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="w-10 h-10"
      aria-hidden="true"
    >
      <polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const HIGHLIGHTS = [
  {
    icon: <IconGradCap />,
    title: "Expert Faculty",
    text: "Our dedicated educators bring decades of experience and passion, nurturing every student to reach their highest potential in an inspiring academic environment.",
  },
  {
    icon: <IconGlobe />,
    title: "Global Curriculum",
    text: "We follow a globally benchmarked curriculum that prepares students for international universities and careers, while celebrating local culture and heritage.",
  },
  {
    icon: <IconStar />,
    title: "Holistic Development",
    text: "Beyond academics, we champion arts, sports, leadership, and community service — ensuring every student blossoms into a well-rounded individual.",
  },
];

const DISCOVER = [
  {
    label: "Library",
    img: "/assets/generated/discover-library.dim_600x400.jpg",
  },
  {
    label: "Science Lab",
    img: "/assets/generated/discover-science.dim_600x400.jpg",
  },
  {
    label: "Athletics",
    img: "/assets/generated/discover-athletics.dim_600x400.jpg",
  },
  {
    label: "Student Activities",
    img: "/assets/generated/discover-activities.dim_600x400.jpg",
  },
];

const FOOTER_QUICK = [
  "Home",
  "About Us",
  "News & Events",
  "Gallery",
  "Contact",
];
const FOOTER_QUICK_HREFS = ["#home", "#about", "#news", "#life", "#contact"];
const FOOTER_ADMISSIONS = [
  "How to Apply",
  "Prospectus",
  "Fee Structure",
  "Scholarships",
  "FAQs",
];
const FOOTER_ACADEMICS = [
  "Primary School",
  "Middle School",
  "Senior School",
  "Co-curriculars",
  "Academic Calendar",
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prevAnnouncement = () =>
    setActiveAnnouncement(
      (p) => (p - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length,
    );
  const nextAnnouncement = () =>
    setActiveAnnouncement((p) => (p + 1) % ANNOUNCEMENTS.length);

  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
        style={{ background: "oklch(var(--navy))" }}
        data-ocid="header.section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#home"
              className="flex items-center gap-3 shrink-0"
              data-ocid="header.link"
            >
              <img
                src="/assets/generated/school-crest-transparent.dim_200x200.png"
                alt="Bosing Royal Academy Crest"
                className="w-10 h-10 md:w-12 md:h-12 object-contain rounded-full"
              />
              <span
                className="font-serif font-bold text-sm md:text-base lg:text-lg leading-tight"
                style={{ color: "oklch(var(--gold))", maxWidth: "200px" }}
              >
                Bosing Royal Academy Yagrung
              </span>
            </a>

            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded"
                  data-ocid="header.link"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#admissions"
                className="ml-4 px-5 py-2 rounded font-semibold text-sm transition-all duration-200 hover:brightness-110"
                style={{
                  background: "oklch(var(--gold))",
                  color: "oklch(var(--navy))",
                }}
                data-ocid="header.primary_button"
              >
                Apply Now
              </a>
            </nav>

            <button
              type="button"
              className="lg:hidden text-white p-2"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((v) => !v)}
              data-ocid="header.toggle"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden"
              style={{ background: "oklch(var(--navy))" }}
            >
              <nav className="px-4 pb-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="py-2 px-3 text-white/80 hover:text-white transition-colors"
                    onClick={() => setMenuOpen(false)}
                    data-ocid="header.link"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  className="mt-2 px-5 py-2 rounded font-semibold text-sm text-center"
                  style={{
                    background: "oklch(var(--gold))",
                    color: "oklch(var(--navy))",
                  }}
                  onClick={() => {
                    setMenuOpen(false);
                    window.location.href = "#admissions";
                  }}
                  data-ocid="header.primary_button"
                >
                  Apply Now
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative flex items-center justify-center min-h-screen pt-16"
          data-ocid="hero.section"
        >
          <div className="absolute inset-0">
            <img
              src="/assets/generated/campus-hero.dim_1600x900.jpg"
              alt="Bosing Royal Academy Campus"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(15,47,70,0.68)" }}
            />
          </div>
          <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto py-24">
            <motion.img
              src="/assets/generated/school-crest-transparent.dim_200x200.png"
              alt="School Crest"
              className="w-20 h-20 md:w-28 md:h-28 mx-auto mb-6 object-contain"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <motion.h1
              className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 leading-tight"
              style={{
                color: "oklch(var(--gold))",
                textShadow: "0 2px 16px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Bosing Royal Academy Yagrung
            </motion.h1>
            <motion.p
              className="font-serif text-xl md:text-2xl text-white/90 mb-3 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Excellence in Education, Rooted in Heritage
            </motion.p>
            <motion.p
              className="text-white/75 text-base md:text-lg mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Welcome to Bosing Royal Academy Yagrung — where we cultivate
              curious minds, strong character, and lifelong learners ready to
              shape a better world.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a
                href="#admissions"
                className="px-8 py-3 rounded font-semibold text-base transition-all hover:brightness-110"
                style={{
                  background: "oklch(var(--gold))",
                  color: "oklch(var(--navy))",
                }}
                data-ocid="hero.primary_button"
              >
                Apply for Admission
              </a>
              <a
                href="#about"
                className="px-8 py-3 rounded font-semibold text-base border-2 text-white transition-all hover:bg-white/10"
                style={{ borderColor: "oklch(var(--gold))" }}
                data-ocid="hero.secondary_button"
              >
                Discover Our School
              </a>
            </motion.div>
          </div>
        </section>

        {/* ANNOUNCEMENTS */}
        <section
          id="news"
          className="py-20 px-4"
          data-ocid="announcements.section"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: "oklch(var(--gold))" }}
              >
                Stay Informed
              </p>
              <h2
                className="font-serif text-3xl md:text-4xl font-bold"
                style={{ color: "oklch(var(--navy))" }}
              >
                Latest Announcements
              </h2>
            </div>

            <div className="relative">
              <div className="hidden md:grid md:grid-cols-3 gap-6">
                {ANNOUNCEMENTS.map((a) => (
                  <AnnouncementCard
                    key={a.title}
                    announcement={a}
                    index={ANNOUNCEMENTS.indexOf(a)}
                  />
                ))}
              </div>

              <div className="md:hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAnnouncement}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnnouncementCard
                      announcement={ANNOUNCEMENTS[activeAnnouncement]}
                      index={activeAnnouncement}
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={prevAnnouncement}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-primary/10"
                    style={{
                      borderColor: "oklch(var(--navy))",
                      color: "oklch(var(--navy))",
                    }}
                    aria-label="Previous announcement"
                    data-ocid="announcements.pagination_prev"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <span className="text-sm text-muted-foreground">
                    {activeAnnouncement + 1} / {ANNOUNCEMENTS.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextAnnouncement}
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors hover:bg-primary/10"
                    style={{
                      borderColor: "oklch(var(--navy))",
                      color: "oklch(var(--navy))",
                    }}
                    aria-label="Next announcement"
                    data-ocid="announcements.pagination_next"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMIC HIGHLIGHTS */}
        <section
          id="academics"
          className="py-20 px-4"
          style={{ background: "oklch(var(--navy))" }}
          data-ocid="academics.section"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: "oklch(var(--gold))" }}
              >
                Why Choose Us
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                Academic Highlights
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={h.title}
                  className="rounded-lg p-8 text-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(201,162,74,0.3)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  data-ocid={`academics.card.${i + 1}`}
                >
                  <div
                    className="flex justify-center mb-5"
                    style={{ color: "oklch(var(--gold))" }}
                  >
                    {h.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">
                    {h.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {h.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCOVER YAGRUNG */}
        <section id="life" className="py-20 px-4" data-ocid="discover.section">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: "oklch(var(--gold))" }}
              >
                Campus Life
              </p>
              <h2
                className="font-serif text-3xl md:text-4xl font-bold"
                style={{ color: "oklch(var(--navy))" }}
              >
                Discover Yagrung
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DISCOVER.map((tile, i) => (
                <motion.div
                  key={tile.label}
                  className="relative overflow-hidden rounded-lg group cursor-pointer aspect-video"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  data-ocid={`discover.item.${i + 1}`}
                >
                  <img
                    src={tile.img}
                    alt={tile.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15,47,70,0.85) 0%, rgba(15,47,70,0.2) 60%, transparent 100%)",
                    }}
                  />
                  <span className="absolute bottom-5 left-5 text-white font-serif font-bold text-xl md:text-2xl tracking-wide">
                    {tile.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section
          id="about"
          className="py-20 px-4 max-w-4xl mx-auto text-center"
          data-ocid="about.section"
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-2"
            style={{ color: "oklch(var(--gold))" }}
          >
            Our Story
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold mb-6"
            style={{ color: "oklch(var(--navy))" }}
          >
            About Bosing Royal Academy Yagrung
          </h2>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed mb-4">
            Founded with a vision to bring world-class education to the hills of
            Taplejung, Bosing Royal Academy Yagrung has been a beacon of
            learning, character, and community. Nestled in the scenic Yagrung
            valley, our campus offers a nurturing environment where every
            child’s potential is recognised and celebrated.
          </p>
          <p className="text-foreground/70 text-base leading-relaxed">
            Our teaching philosophy blends rigorous academics with values rooted
            in Nepali culture — instilling wisdom, integrity, and excellence in
            every student who walks through our gates.
          </p>
        </section>

        {/* ADMISSIONS CTA */}
        <section
          id="admissions"
          className="py-20 px-4"
          style={{
            background:
              "linear-gradient(135deg, oklch(var(--navy)) 0%, oklch(0.32 0.07 240) 100%)",
          }}
          data-ocid="admissions.section"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "oklch(var(--gold))" }}
            >
              Join Our Family
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Admissions Open 2026–27
            </h2>
            <p className="text-white/75 mb-8 text-base md:text-lg">
              Take the first step toward a transformative educational journey.
              Applications for the new academic year are now open for all grade
              levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-3 rounded font-semibold text-base transition-all hover:brightness-110"
                style={{
                  background: "oklch(var(--gold))",
                  color: "oklch(var(--navy))",
                }}
                data-ocid="admissions.primary_button"
              >
                Apply Now
              </a>
              <a
                href="#about"
                className="px-8 py-3 rounded font-semibold text-base border-2 text-white transition-all hover:bg-white/10"
                style={{ borderColor: "oklch(var(--gold))" }}
                data-ocid="admissions.secondary_button"
              >
                Download Prospectus
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="py-16 px-4 max-w-4xl mx-auto"
          data-ocid="contact.section"
        >
          <div className="text-center mb-10">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ color: "oklch(var(--gold))" }}
            >
              Get In Touch
            </p>
            <h2
              className="font-serif text-3xl font-bold"
              style={{ color: "oklch(var(--navy))" }}
            >
              Contact Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-foreground/80">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-1 shrink-0"
                  style={{ color: "oklch(var(--gold))" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Yagrung, Taplejung District, Koshi Province, Nepal</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-1 shrink-0"
                  style={{ color: "oklch(var(--gold))" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+977-1-XXXXXXX</span>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-1 shrink-0"
                  style={{ color: "oklch(var(--gold))" }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@bosingroyalacademy.edu.np</span>
              </div>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
              data-ocid="contact.panel"
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: "oklch(var(--border))" }}
                data-ocid="contact.input"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2.5 rounded border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: "oklch(var(--border))" }}
                data-ocid="contact.input"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2.5 rounded border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 resize-none"
                style={{ borderColor: "oklch(var(--border))" }}
                data-ocid="contact.textarea"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded font-semibold text-sm transition-all hover:brightness-110"
                style={{
                  background: "oklch(var(--navy))",
                  color: "oklch(var(--gold))",
                }}
                data-ocid="contact.submit_button"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{ background: "oklch(var(--navy))" }}
        className="text-white"
        data-ocid="footer.section"
      >
        <div className="border-b border-white/10 py-10 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <img
              src="/assets/generated/school-crest-transparent.dim_200x200.png"
              alt="Bosing Royal Academy Crest"
              className="w-16 h-16 mx-auto mb-3 object-contain"
            />
            <h3 className="font-serif font-bold text-xl mb-1">
              Bosing Royal Academy Yagrung
            </h3>
            <p
              className="text-sm tracking-[0.25em] uppercase"
              style={{ color: "oklch(var(--gold))" }}
            >
              Wisdom&nbsp;&nbsp;|&nbsp;&nbsp;Integrity&nbsp;&nbsp;|&nbsp;&nbsp;Excellence
            </p>
          </div>
        </div>

        <div className="py-12 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color: "oklch(var(--gold))" }}
              >
                Quick Links
              </h4>
              <ul className="space-y-2">
                {FOOTER_QUICK.map((label, i) => (
                  <li key={label}>
                    <a
                      href={FOOTER_QUICK_HREFS[i]}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color: "oklch(var(--gold))" }}
              >
                Admissions
              </h4>
              <ul className="space-y-2">
                {FOOTER_ADMISSIONS.map((label) => (
                  <li key={label}>
                    <a
                      href="#admissions"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color: "oklch(var(--gold))" }}
              >
                Academics
              </h4>
              <ul className="space-y-2">
                {FOOTER_ACADEMICS.map((label) => (
                  <li key={label}>
                    <a
                      href="#academics"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                      data-ocid="footer.link"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color: "oklch(var(--gold))" }}
              >
                Contact Us
              </h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-sm text-white/60">
                    Yagrung, Taplejung
                  </span>
                </li>
                <li>
                  <span className="text-sm text-white/60">Nepal</span>
                </li>
                <li>
                  <span className="text-sm text-white/60">+977-1-XXXXXXX</span>
                </li>
                <li>
                  <a
                    href="mailto:info@bosingroyalacademy.edu.np"
                    className="text-sm text-white/60 hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    info@bosingroyalacademy.edu.np
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/50 hover:text-white transition-colors"
                data-ocid="footer.link"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/50 hover:text-white transition-colors"
                data-ocid="footer.link"
              >
                <span className="sr-only">YouTube</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/50 hover:text-white transition-colors"
                data-ocid="footer.link"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
            <p className="text-white/50 text-sm text-center">
              &copy; {currentYear} Bosing Royal Academy Yagrung. Built with{" "}
              <span style={{ color: "oklch(var(--gold))" }}>♥</span> using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AnnouncementCard({
  announcement,
  index,
}: {
  announcement: (typeof ANNOUNCEMENTS)[0];
  index: number;
}) {
  return (
    <motion.article
      className="bg-card rounded-lg shadow-card overflow-hidden flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`announcements.item.${index + 1}`}
    >
      <div className="p-6 flex flex-col flex-1">
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 self-start"
          style={{
            background: "oklch(var(--gold) / 0.15)",
            color: "oklch(0.50 0.09 75)",
          }}
        >
          {announcement.date}
        </span>
        <h3
          className="font-serif font-bold text-lg mb-2 leading-snug"
          style={{ color: "oklch(var(--navy))" }}
        >
          {announcement.title}
        </h3>
        <p className="text-foreground/70 text-sm leading-relaxed flex-1">
          {announcement.excerpt}
        </p>
        <a
          href="#news"
          className="mt-4 text-sm font-semibold inline-flex items-center gap-1 transition-colors"
          style={{ color: "oklch(var(--gold))" }}
          data-ocid={`announcements.link.${index + 1}`}
        >
          Read More
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}
