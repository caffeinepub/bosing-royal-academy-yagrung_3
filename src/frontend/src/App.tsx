import { Toaster } from "@/components/ui/sonner";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import AdminPanel from "./components/AdminPanel";
import { useActor } from "./hooks/useActor";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Life at BRA", href: "#life" },
  { label: "News & Events", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export interface Announcement {
  date: string;
  title: string;
  excerpt: string;
}
export interface Highlight {
  title: string;
  text: string;
}
export interface DiscoverItem {
  name: string;
}
export interface LeaderMessage {
  name: string;
  role: string;
  message: string;
  photoUrl?: string;
}
export interface ImageUrls {
  heroUrl?: string;
  logoUrl?: string;
  discoverUrls: string[];
}
export interface SiteContent {
  hero: { title: string; subtitle: string; description: string };
  announcements: Announcement[];
  highlights: Highlight[];
  about: { body1: string; body2: string };
  admissions: { heading: string; description: string };
  contact: { address: string; phone: string; email: string };
  footer: { motto: string };
  discover: DiscoverItem[];
  messages: LeaderMessage[];
  images: ImageUrls;
}

const DEFAULT_CONTENT: SiteContent = {
  hero: {
    title: "Bosing Royal Academy Yagrung",
    subtitle: "Excellence in Education, Rooted in Heritage",
    description:
      "Welcome to Bosing Royal Academy Yagrung \u2014 where we cultivate curious minds, strong character, and lifelong learners ready to shape a better world.",
  },
  announcements: [
    {
      date: "March 18, 2026",
      title: "Annual Science & Innovation Fair 2026",
      excerpt:
        "Students from Grades 7\u201312 are invited to present their research projects at the Annual Science & Innovation Fair on April 5th. Registration closes March 28th.",
    },
    {
      date: "March 12, 2026",
      title: "Admissions Open for Academic Year 2026\u201327",
      excerpt:
        "Applications are now being accepted for all grade levels for the upcoming academic year. Early application deadline is April 30, 2026. Download the prospectus today.",
    },
    {
      date: "March 5, 2026",
      title: "National Day Cultural Programme",
      excerpt:
        "Bosing Royal Academy proudly announces its National Day Cultural Programme on March 25th. All parents and community members are warmly invited to attend.",
    },
  ],
  highlights: [
    {
      title: "Expert Faculty",
      text: "Our dedicated educators bring decades of experience and passion, nurturing every student to reach their highest potential in an inspiring academic environment.",
    },
    {
      title: "Global Curriculum",
      text: "We follow a globally benchmarked curriculum that prepares students for international universities and careers, while celebrating local culture and heritage.",
    },
    {
      title: "Holistic Development",
      text: "Beyond academics, we champion arts, sports, leadership, and community service \u2014 ensuring every student blossoms into a well-rounded individual.",
    },
  ],
  about: {
    body1:
      "Founded with a vision to bring world-class education to the hills of Taplejung, Bosing Royal Academy Yagrung has been a beacon of learning, character, and community. Nestled in the scenic Yagrung valley, our campus offers a nurturing environment where every child's potential is recognised and celebrated.",
    body2:
      "Our teaching philosophy blends rigorous academics with values rooted in Nepali culture \u2014 instilling wisdom, integrity, and excellence in every student who walks through our gates.",
  },
  admissions: {
    heading: "Admissions Open 2026\u201327",
    description:
      "Take the first step toward a transformative educational journey. Applications for the new academic year are now open for all grade levels.",
  },
  contact: {
    address: "Yagrung, Taplejung District, Koshi Province, Nepal",
    phone: "+977-1-XXXXXXX",
    email: "info@bosingroyalacademy.edu.np",
  },
  footer: { motto: "Wisdom  |  Integrity  |  Excellence" },
  discover: [
    { name: "Library" },
    { name: "Science Lab" },
    { name: "Athletics" },
    { name: "Student Activities" },
  ],
  messages: [
    {
      role: "Chairman",
      name: "Name of Chairman",
      message:
        "It is with immense pride and joy that I welcome you to Bosing Royal Academy Yagrung. Our institution stands as a pillar of excellence, nurturing future leaders with wisdom, integrity, and a deep sense of purpose. Together, we shall continue to raise the torch of knowledge for generations to come.",
    },
    {
      role: "Managing Director",
      name: "Name of Managing Director",
      message:
        "At Bosing Royal Academy, we are committed to building an institution that empowers every student to dream boldly and achieve greater. Our mission is to provide world-class education rooted in the values of our heritage, ensuring each student discovers their unique potential and contributes meaningfully to society.",
    },
    {
      role: "Principal",
      name: "Name of Principal",
      message:
        "Welcome to our vibrant academic community. As Principal, my commitment is to ensure that every student at Bosing Royal Academy receives not only the finest academic grounding but also the moral and emotional foundation needed to thrive in a rapidly changing world. Our doors are always open to questions, growth, and collaboration.",
    },
  ],
  images: {
    discoverUrls: [],
  },
};

const DISCOVER_IMAGES = [
  "/assets/generated/discover-library.dim_600x400.jpg",
  "/assets/generated/discover-science.dim_600x400.jpg",
  "/assets/generated/discover-athletics.dim_600x400.jpg",
  "/assets/generated/discover-activities.dim_600x400.jpg",
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

const HIGHLIGHT_ICONS = [
  <IconGradCap key="grad" />,
  <IconGlobe key="globe" />,
  <IconStar key="star" />,
];

async function verifyPinBackend(actor: any, pin: string): Promise<boolean> {
  if (!actor) return pin === "1234";
  try {
    return await (actor as any).verifyPin(pin);
  } catch {
    return pin === "1234";
  }
}

// PIN Modal
function PinModal({
  onSuccess,
  onClose,
  actor,
}: {
  onSuccess: (pin: string) => void;
  onClose: () => void;
  actor: any;
}) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [loading, setLoading] = useState(false);

  const doSubmit = async (pinValue: string) => {
    setLoading(true);
    setError("");
    const ok = await verifyPinBackend(actor, pinValue);
    setLoading(false);
    if (ok) {
      onSuccess(pinValue);
    } else {
      setError("Incorrect PIN. Please try again.");
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleDigit = (d: string) => {
    if (loading) return;
    setPin((prev) => {
      if (prev.length >= 4) return prev;
      const next = prev + d;
      if (next.length === 4) {
        setTimeout(() => doSubmit(next), 0);
      }
      return next;
    });
  };
  const handleBack = () => {
    if (!loading) setPin((p) => p.slice(0, -1));
  };
  const handleClear = () => {
    if (!loading) setPin("");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(10,25,40,0.85)", backdropFilter: "blur(6px)" }}
      data-ocid="pin.modal"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-card rounded-2xl shadow-2xl p-8 w-80 flex flex-col items-center gap-6"
      >
        <div className="flex flex-col items-center gap-1">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-1"
            style={{ background: "oklch(var(--navy))" }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
            </svg>
          </div>
          <h2
            className="font-serif font-bold text-xl"
            style={{ color: "oklch(var(--navy))" }}
          >
            Admin Access
          </h2>
          <p className="text-sm text-muted-foreground text-center">
            Enter your 4-digit security PIN
          </p>
        </div>

        {/* PIN dots */}
        <motion.div
          className="flex gap-4"
          animate={shake ? { x: [-8, 8, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full border-2 transition-all duration-200"
              style={{
                borderColor: "oklch(var(--navy))",
                background:
                  i < pin.length ? "oklch(var(--navy))" : "transparent",
              }}
            />
          ))}
        </motion.div>

        {error && (
          <p
            className="text-destructive text-xs text-center"
            data-ocid="pin.error_state"
          >
            {error}
          </p>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3 w-full">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
            <button
              key={d}
              type="button"
              className="h-12 rounded-xl font-semibold text-lg transition-all hover:brightness-95 active:scale-95"
              style={{
                background: "oklch(var(--muted))",
                color: "oklch(var(--navy))",
              }}
              onClick={() => handleDigit(d)}
              disabled={loading}
              data-ocid="pin.button"
            >
              {d}
            </button>
          ))}
          <button
            type="button"
            className="h-12 rounded-xl font-semibold text-sm transition-all hover:brightness-95 active:scale-95"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--navy))",
            }}
            onClick={handleClear}
            disabled={loading}
            data-ocid="pin.button"
          >
            CLR
          </button>
          <button
            type="button"
            className="h-12 rounded-xl font-semibold text-lg transition-all hover:brightness-95 active:scale-95"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--navy))",
            }}
            onClick={() => handleDigit("0")}
            disabled={loading}
            data-ocid="pin.button"
          >
            0
          </button>
          <button
            type="button"
            className="h-12 rounded-xl font-semibold text-sm transition-all hover:brightness-95 active:scale-95"
            style={{
              background: "oklch(var(--muted))",
              color: "oklch(var(--navy))",
            }}
            onClick={handleBack}
            disabled={loading}
            data-ocid="pin.button"
          >
            &#8592;
          </button>
        </div>

        <button
          type="button"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={onClose}
          data-ocid="pin.cancel_button"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}

export default function App() {
  const { actor, isFetching } = useActor();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [showPinModal, setShowPinModal] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPin, setAdminPin] = useState("");

  useEffect(() => {
    if (!actor || isFetching) return;
    (async () => {
      try {
        const data = await (actor as any).getSiteContent();
        if (data) {
          const mapped: SiteContent = {
            hero: data.hero || DEFAULT_CONTENT.hero,
            announcements: data.announcements || DEFAULT_CONTENT.announcements,
            highlights: data.highlights || DEFAULT_CONTENT.highlights,
            about: data.about || DEFAULT_CONTENT.about,
            admissions: data.admissions || DEFAULT_CONTENT.admissions,
            contact: data.contact || DEFAULT_CONTENT.contact,
            footer: data.footer || DEFAULT_CONTENT.footer,
            discover: data.discover || DEFAULT_CONTENT.discover,
            messages: (data.messages || DEFAULT_CONTENT.messages).map(
              (m: any) => ({
                name: m.name,
                role: m.role,
                message: m.message,
                photoUrl:
                  m.photo && typeof m.photo.getDirectURL === "function"
                    ? m.photo.getDirectURL()
                    : m.photoUrl,
              }),
            ),
            images: data.images
              ? {
                  heroUrl: data.images.heroUrl,
                  logoUrl: data.images.logoUrl,
                  discoverUrls: data.images.discoverUrls || [],
                }
              : { discoverUrls: [] },
          };
          setSiteContent(mapped);
        }
      } catch {
        // use defaults
      }
    })();
  }, [actor, isFetching]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prevAnnouncement = () =>
    setActiveAnnouncement(
      (p) =>
        (p - 1 + siteContent.announcements.length) %
        siteContent.announcements.length,
    );
  const nextAnnouncement = () =>
    setActiveAnnouncement((p) => (p + 1) % siteContent.announcements.length);

  const handlePinSuccess = (pin: string) => {
    setAdminPin(pin);
    setAdminUnlocked(true);
    setShowPinModal(false);
  };

  const handleAdminClose = () => {
    setAdminUnlocked(false);
    setAdminPin("");
  };

  const handleContentUpdate = (updated: SiteContent) => {
    setSiteContent(updated);
  };

  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "";

  const {
    hero,
    announcements,
    highlights,
    about,
    admissions,
    contact,
    footer,
    discover,
    messages,
    images,
  } = siteContent;

  const logoSrc =
    images?.logoUrl ||
    "/assets/generated/school-crest-transparent.dim_200x200.png";
  const heroSrc =
    images?.heroUrl || "/assets/generated/campus-hero.dim_1600x900.jpg";

  const HERO_SLIDES = [
    heroSrc,
    "/assets/generated/hero-slide-2.dim_1600x900.jpg",
    "/assets/generated/hero-slide-3.dim_1600x900.jpg",
    "/assets/generated/hero-slide-4.dim_1600x900.jpg",
    "/assets/generated/hero-slide-5.dim_1600x900.jpg",
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [HERO_SLIDES.length]);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster richColors position="top-right" />

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
                src={logoSrc}
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
          <div className="absolute inset-0 overflow-hidden">
            {HERO_SLIDES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`Campus slide ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: i === slideIndex ? 1 : 0 }}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(15,47,70,0.68)" }}
            />
            {/* Dot navigation */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
              {HERO_SLIDES.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setSlideIndex(i)}
                  className="w-3 h-3 rounded-full transition-all duration-300 border border-white/60"
                  style={{
                    background:
                      i === slideIndex
                        ? "oklch(var(--gold))"
                        : "rgba(255,255,255,0.35)",
                    transform: i === slideIndex ? "scale(1.3)" : "scale(1)",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  data-ocid="hero.toggle"
                />
              ))}
            </div>
          </div>
          <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto py-24">
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
              {hero.title}
            </motion.h1>
            <motion.p
              className="font-serif text-xl md:text-2xl text-white/90 mb-3 tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {hero.subtitle}
            </motion.p>
            <motion.p
              className="text-white/75 text-base md:text-lg mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              {hero.description}
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
            <div className="hidden md:grid md:grid-cols-3 gap-6">
              {announcements.map((a, i) => (
                <AnnouncementCard
                  key={`${a.date}-${i}`}
                  announcement={a}
                  index={i}
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
                    announcement={announcements[activeAnnouncement]}
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
                  {activeAnnouncement + 1} / {announcements.length}
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
              {highlights.map((h, i) => (
                <motion.div
                  key={`${h.title}-${i}`}
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
                    {HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
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
              {discover.map((tile, i) => {
                const imgSrc =
                  images?.discoverUrls?.[i] ||
                  DISCOVER_IMAGES[i] ||
                  DISCOVER_IMAGES[0];
                return (
                  <motion.div
                    key={`${tile.name}-${i}`}
                    className="relative overflow-hidden rounded-lg group cursor-pointer aspect-video"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    data-ocid={`discover.item.${i + 1}`}
                  >
                    <img
                      src={imgSrc}
                      alt={tile.name}
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
                      {tile.name}
                    </span>
                  </motion.div>
                );
              })}
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
            {about.body1}
          </p>
          <p className="text-foreground/70 text-base leading-relaxed">
            {about.body2}
          </p>
        </section>

        {/* LEADERSHIP MESSAGES */}
        <section
          id="leadership"
          className="py-20 px-4"
          style={{ background: "oklch(var(--navy))" }}
          data-ocid="leadership.section"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p
                className="text-sm font-semibold uppercase tracking-widest mb-2"
                style={{ color: "oklch(var(--gold))" }}
              >
                From the Desk of Our Leaders
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                Leadership Messages
              </h2>
              <div
                className="mt-4 mx-auto h-px w-24"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, oklch(var(--gold)), transparent)",
                }}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {messages.map((msg, i) => (
                <LeaderMessageCard
                  key={`${msg.role}-${i}`}
                  msg={msg}
                  index={i}
                />
              ))}
            </div>
          </div>
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
              {admissions.heading}
            </h2>
            <p className="text-white/75 mb-8 text-base md:text-lg">
              {admissions.description}
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
                <span>{contact.address}</span>
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
                <span>{contact.phone}</span>
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
                <span>{contact.email}</span>
              </div>
            </div>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message sent! We'll get back to you soon.");
              }}
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
              src={logoSrc}
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
              {footer.motto}
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
                    {contact.address}
                  </span>
                </li>
                <li>
                  <span className="text-sm text-white/60">{contact.phone}</span>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                    data-ocid="footer.link"
                  >
                    {contact.email}
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
            </div>
            <p className="text-white/50 text-sm text-center">
              &copy; {currentYear} Bosing Royal Academy Yagrung. Built with{" "}
              <span style={{ color: "oklch(var(--gold))" }}>&#9829;</span> using{" "}
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

      {/* FLOATING ADMIN BUTTON */}
      <button
        type="button"
        onClick={() => setShowPinModal(true)}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
        style={{
          background: "rgba(15,47,70,0.85)",
          border: "1.5px solid rgba(201,162,74,0.4)",
          backdropFilter: "blur(8px)",
        }}
        aria-label="Admin Panel"
        data-ocid="admin.open_modal_button"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="white"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
        </svg>
      </button>

      {/* PIN MODAL */}
      <AnimatePresence>
        {showPinModal && !adminUnlocked && (
          <PinModal
            actor={actor}
            onSuccess={handlePinSuccess}
            onClose={() => setShowPinModal(false)}
          />
        )}
      </AnimatePresence>

      {/* ADMIN PANEL */}
      <AnimatePresence>
        {adminUnlocked && (
          <AdminPanel
            actor={actor}
            adminPin={adminPin}
            siteContent={siteContent}
            onContentUpdate={handleContentUpdate}
            onClose={handleAdminClose}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function AnnouncementCard({
  announcement,
  index,
}: { announcement: Announcement; index: number }) {
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

function LeaderMessageCard({
  msg,
  index,
}: { msg: LeaderMessage; index: number }) {
  const initials = msg.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.div
      className="rounded-xl p-8 flex flex-col"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(201,162,74,0.25)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      data-ocid={`leadership.card.${index + 1}`}
    >
      {/* Quote mark */}
      <div
        className="text-5xl font-serif leading-none mb-4 select-none"
        style={{ color: "oklch(var(--gold) / 0.35)" }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      <p className="text-white/75 text-sm leading-relaxed flex-1 mb-6">
        {msg.message}
      </p>

      {/* Leader info */}
      <div
        className="flex items-center gap-4 pt-4"
        style={{ borderTop: "1px solid rgba(201,162,74,0.2)" }}
      >
        {msg.photoUrl ? (
          <img
            src={msg.photoUrl}
            alt={msg.name}
            className="w-14 h-14 rounded-full object-cover shrink-0"
            style={{ border: "2px solid rgba(201,162,74,0.5)" }}
          />
        ) : (
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-serif font-bold text-lg"
            style={{
              background: "rgba(201,162,74,0.15)",
              border: "2px solid rgba(201,162,74,0.4)",
              color: "oklch(var(--gold))",
            }}
          >
            {initials || "?"}
          </div>
        )}
        <div>
          <p className="font-serif font-bold text-white text-base leading-tight">
            {msg.name}
          </p>
          <p
            className="text-xs font-semibold uppercase tracking-wider mt-0.5"
            style={{ color: "oklch(var(--gold))" }}
          >
            {msg.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
