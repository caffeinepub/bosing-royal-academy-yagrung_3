import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Lock, Plus, Save, Trash2, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type {
  Announcement,
  DiscoverItem,
  Highlight,
  SiteContent,
} from "../App";

interface AdminPanelProps {
  actor: any;
  adminPin: string;
  siteContent: SiteContent;
  onContentUpdate: (content: SiteContent) => void;
  onClose: () => void;
}

export default function AdminPanel({
  actor,
  adminPin,
  siteContent,
  onContentUpdate,
  onClose,
}: AdminPanelProps) {
  const [hero, setHero] = useState({ ...siteContent.hero });
  const [announcements, setAnnouncements] = useState<Announcement[]>(
    siteContent.announcements.map((a) => ({ ...a })),
  );
  const [highlights, setHighlights] = useState<Highlight[]>(
    siteContent.highlights.map((h) => ({ ...h })),
  );
  const [about, setAbout] = useState({ ...siteContent.about });
  const [admissions, setAdmissions] = useState({ ...siteContent.admissions });
  const [contact, setContact] = useState({ ...siteContent.contact });
  const [footer, setFooter] = useState({ ...siteContent.footer });
  const [discover, setDiscover] = useState<DiscoverItem[]>(
    siteContent.discover.map((d) => ({ ...d })),
  );
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [saving, setSaving] = useState<string | null>(null);

  const callBackend = async (method: string, args: any[]) => {
    if (!actor) return false;
    try {
      return await (actor as any)[method](...args);
    } catch {
      return false;
    }
  };

  const saveSection = async (section: string) => {
    setSaving(section);
    try {
      switch (section) {
        case "hero":
          await callBackend("updateHero", [adminPin, hero]);
          onContentUpdate({ ...siteContent, hero });
          break;
        case "announcements":
          await callBackend("updateAnnouncements", [adminPin, announcements]);
          onContentUpdate({ ...siteContent, announcements });
          break;
        case "highlights":
          await callBackend("updateHighlights", [adminPin, highlights]);
          onContentUpdate({ ...siteContent, highlights });
          break;
        case "about":
          await callBackend("updateAbout", [adminPin, about]);
          onContentUpdate({ ...siteContent, about });
          break;
        case "admissions":
          await callBackend("updateAdmissions", [adminPin, admissions]);
          onContentUpdate({ ...siteContent, admissions });
          break;
        case "contact":
          await callBackend("updateContact", [adminPin, contact]);
          onContentUpdate({ ...siteContent, contact });
          break;
        case "footer":
          await callBackend("updateFooter", [adminPin, footer]);
          onContentUpdate({ ...siteContent, footer });
          break;
        case "discover":
          await callBackend("updateDiscover", [adminPin, discover]);
          onContentUpdate({ ...siteContent, discover });
          break;
        default:
          toast.error("Unknown section.");
          return;
      }
      toast.success(
        `${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`,
      );
    } catch {
      toast.error("An error occurred while saving.");
    } finally {
      setSaving(null);
    }
  };

  const savePin = async () => {
    if (!newPin || newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      toast.error("New PIN must be exactly 4 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      toast.error("New PIN and confirmation do not match.");
      return;
    }
    setSaving("settings");
    try {
      let ok = false;
      if (actor) {
        ok = await (actor as any).changePin(currentPin || adminPin, newPin);
      } else {
        ok = currentPin === adminPin || currentPin === "";
      }
      if (ok) {
        toast.success("PIN changed successfully! Please log in again.");
        setCurrentPin("");
        setNewPin("");
        setConfirmPin("");
        setTimeout(() => onClose(), 1500);
      } else {
        toast.error("Current PIN is incorrect.");
      }
    } catch {
      toast.error("Error changing PIN.");
    } finally {
      setSaving(null);
    }
  };

  const isSaving = (s: string) => saving === s;

  function SaveBtn({ section }: { section: string }) {
    return (
      <Button
        onClick={() => saveSection(section)}
        disabled={saving !== null}
        className="mt-4"
        style={{
          background: "oklch(var(--navy))",
          color: "oklch(var(--gold))",
        }}
        data-ocid="admin.save_button"
      >
        {isSaving(section) ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Save className="mr-2 h-4 w-4" />
        )}
        {isSaving(section) ? "Saving..." : "Save Changes"}
      </Button>
    );
  }

  const lbl = "block text-sm font-semibold mb-1" as const;
  const fld = "mb-4" as const;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[90] flex flex-col"
      style={{ background: "rgba(5,15,25,0.97)", backdropFilter: "blur(8px)" }}
      data-ocid="admin.modal"
    >
      <header
        className="shrink-0 flex items-center justify-between px-6 py-4 border-b"
        style={{
          borderColor: "rgba(201,162,74,0.2)",
          background: "oklch(var(--navy))",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: "oklch(var(--gold) / 0.2)" }}
          >
            <Lock className="w-4 h-4" style={{ color: "oklch(var(--gold))" }} />
          </div>
          <div>
            <h1 className="font-serif font-bold text-white text-lg leading-tight">
              Admin Panel
            </h1>
            <p className="text-xs text-white/50">
              Bosing Royal Academy Yagrung
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close admin panel"
          data-ocid="admin.close_button"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="hero" className="h-full flex flex-col">
          <div
            className="shrink-0 border-b overflow-x-auto"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background: "rgba(15,30,50,0.8)",
            }}
          >
            <TabsList className="flex gap-1 px-4 py-2 bg-transparent h-auto rounded-none min-w-max">
              {[
                "hero",
                "announcements",
                "highlights",
                "about",
                "admissions",
                "contact",
                "discover",
                "footer",
                "settings",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="px-4 py-2 text-sm font-medium rounded-md capitalize text-white/60 data-[state=active]:text-white transition-colors"
                  data-ocid="admin.tab"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="max-w-3xl mx-auto px-6 py-8">
              {/* HERO */}
              <TabsContent value="hero" className="mt-0">
                <SectionHeader
                  title="Hero Section"
                  desc="Edit the main banner text."
                />
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Title
                  </p>
                  <Input
                    value={hero.title}
                    onChange={(e) =>
                      setHero({ ...hero, title: e.target.value })
                    }
                    className="admin-input"
                    data-ocid="admin.input"
                  />
                </div>
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Subtitle
                  </p>
                  <Input
                    value={hero.subtitle}
                    onChange={(e) =>
                      setHero({ ...hero, subtitle: e.target.value })
                    }
                    className="admin-input"
                    data-ocid="admin.input"
                  />
                </div>
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Description
                  </p>
                  <Textarea
                    value={hero.description}
                    onChange={(e) =>
                      setHero({ ...hero, description: e.target.value })
                    }
                    rows={3}
                    className="admin-input"
                    data-ocid="admin.textarea"
                  />
                </div>
                <SaveBtn section="hero" />
              </TabsContent>

              {/* ANNOUNCEMENTS */}
              <TabsContent value="announcements" className="mt-0">
                <SectionHeader
                  title="Announcements"
                  desc="Manage news and announcement cards."
                />
                {announcements.map((a, i) => (
                  <div
                    key={`ann-${a.date}-${i}`}
                    className="mb-6 p-5 rounded-xl border"
                    style={{
                      borderColor: "rgba(201,162,74,0.2)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "oklch(var(--gold))" }}
                      >
                        Announcement {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setAnnouncements((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                        className="text-destructive hover:brightness-125 transition-colors"
                        aria-label="Remove announcement"
                        data-ocid="admin.delete_button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={fld}>
                      <p className={lbl} style={{ color: "white" }}>
                        Date
                      </p>
                      <Input
                        value={a.date}
                        onChange={(e) =>
                          setAnnouncements((prev) =>
                            prev.map((x, idx) =>
                              idx === i ? { ...x, date: e.target.value } : x,
                            ),
                          )
                        }
                        className="admin-input"
                        data-ocid="admin.input"
                      />
                    </div>
                    <div className={fld}>
                      <p className={lbl} style={{ color: "white" }}>
                        Title
                      </p>
                      <Input
                        value={a.title}
                        onChange={(e) =>
                          setAnnouncements((prev) =>
                            prev.map((x, idx) =>
                              idx === i ? { ...x, title: e.target.value } : x,
                            ),
                          )
                        }
                        className="admin-input"
                        data-ocid="admin.input"
                      />
                    </div>
                    <div>
                      <p className={lbl} style={{ color: "white" }}>
                        Excerpt
                      </p>
                      <Textarea
                        value={a.excerpt}
                        onChange={(e) =>
                          setAnnouncements((prev) =>
                            prev.map((x, idx) =>
                              idx === i ? { ...x, excerpt: e.target.value } : x,
                            ),
                          )
                        }
                        rows={3}
                        className="admin-input"
                        data-ocid="admin.textarea"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setAnnouncements((prev) => [
                      ...prev,
                      { date: "", title: "", excerpt: "" },
                    ])
                  }
                  className="flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:brightness-125"
                  style={{ color: "oklch(var(--gold))" }}
                  data-ocid="admin.button"
                >
                  <Plus className="w-4 h-4" /> Add Announcement
                </button>
                <SaveBtn section="announcements" />
              </TabsContent>

              {/* HIGHLIGHTS */}
              <TabsContent value="highlights" className="mt-0">
                <SectionHeader
                  title="Academic Highlights"
                  desc="Edit the highlight cards."
                />
                {highlights.map((h, i) => (
                  <div
                    key={`hl-${h.title}-${i}`}
                    className="mb-6 p-5 rounded-xl border"
                    style={{
                      borderColor: "rgba(201,162,74,0.2)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "oklch(var(--gold))" }}
                      >
                        Highlight {i + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setHighlights((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                        className="text-destructive hover:brightness-125 transition-colors"
                        aria-label="Remove highlight"
                        data-ocid="admin.delete_button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={fld}>
                      <p className={lbl} style={{ color: "white" }}>
                        Title
                      </p>
                      <Input
                        value={h.title}
                        onChange={(e) =>
                          setHighlights((prev) =>
                            prev.map((x, idx) =>
                              idx === i ? { ...x, title: e.target.value } : x,
                            ),
                          )
                        }
                        className="admin-input"
                        data-ocid="admin.input"
                      />
                    </div>
                    <div>
                      <p className={lbl} style={{ color: "white" }}>
                        Text
                      </p>
                      <Textarea
                        value={h.text}
                        onChange={(e) =>
                          setHighlights((prev) =>
                            prev.map((x, idx) =>
                              idx === i ? { ...x, text: e.target.value } : x,
                            ),
                          )
                        }
                        rows={3}
                        className="admin-input"
                        data-ocid="admin.textarea"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setHighlights((prev) => [...prev, { title: "", text: "" }])
                  }
                  className="flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:brightness-125"
                  style={{ color: "oklch(var(--gold))" }}
                  data-ocid="admin.button"
                >
                  <Plus className="w-4 h-4" /> Add Highlight
                </button>
                <SaveBtn section="highlights" />
              </TabsContent>

              {/* ABOUT */}
              <TabsContent value="about" className="mt-0">
                <SectionHeader
                  title="About Section"
                  desc="Edit the About Us content."
                />
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Paragraph 1
                  </p>
                  <Textarea
                    value={about.body1}
                    onChange={(e) =>
                      setAbout({ ...about, body1: e.target.value })
                    }
                    rows={5}
                    className="admin-input"
                    data-ocid="admin.textarea"
                  />
                </div>
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Paragraph 2
                  </p>
                  <Textarea
                    value={about.body2}
                    onChange={(e) =>
                      setAbout({ ...about, body2: e.target.value })
                    }
                    rows={5}
                    className="admin-input"
                    data-ocid="admin.textarea"
                  />
                </div>
                <SaveBtn section="about" />
              </TabsContent>

              {/* ADMISSIONS */}
              <TabsContent value="admissions" className="mt-0">
                <SectionHeader
                  title="Admissions Section"
                  desc="Edit the admissions call-to-action."
                />
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Heading
                  </p>
                  <Input
                    value={admissions.heading}
                    onChange={(e) =>
                      setAdmissions({ ...admissions, heading: e.target.value })
                    }
                    className="admin-input"
                    data-ocid="admin.input"
                  />
                </div>
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Description
                  </p>
                  <Textarea
                    value={admissions.description}
                    onChange={(e) =>
                      setAdmissions({
                        ...admissions,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="admin-input"
                    data-ocid="admin.textarea"
                  />
                </div>
                <SaveBtn section="admissions" />
              </TabsContent>

              {/* CONTACT */}
              <TabsContent value="contact" className="mt-0">
                <SectionHeader
                  title="Contact Information"
                  desc="Update school contact details."
                />
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Address
                  </p>
                  <Input
                    value={contact.address}
                    onChange={(e) =>
                      setContact({ ...contact, address: e.target.value })
                    }
                    className="admin-input"
                    data-ocid="admin.input"
                  />
                </div>
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Phone
                  </p>
                  <Input
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                    className="admin-input"
                    data-ocid="admin.input"
                  />
                </div>
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    Email
                  </p>
                  <Input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    className="admin-input"
                    data-ocid="admin.input"
                  />
                </div>
                <SaveBtn section="contact" />
              </TabsContent>

              {/* DISCOVER */}
              <TabsContent value="discover" className="mt-0">
                <SectionHeader
                  title="Discover Yagrung"
                  desc="Edit the campus life tile labels."
                />
                {discover.map((d, i) => (
                  <div
                    key={`disc-${d.name}-${i}`}
                    className="flex items-center gap-3 mb-3"
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <span
                      className="text-sm font-medium w-6 shrink-0"
                      style={{ color: "oklch(var(--gold))" }}
                    >
                      {i + 1}.
                    </span>
                    <Input
                      value={d.name}
                      onChange={(e) =>
                        setDiscover((prev) =>
                          prev.map((x, idx) =>
                            idx === i ? { ...x, name: e.target.value } : x,
                          ),
                        )
                      }
                      className="admin-input flex-1"
                      placeholder="Tile label"
                      data-ocid="admin.input"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setDiscover((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        )
                      }
                      className="text-destructive hover:brightness-125 transition-colors shrink-0"
                      aria-label="Remove tile"
                      data-ocid="admin.delete_button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {discover.length < 4 && (
                  <button
                    type="button"
                    onClick={() =>
                      setDiscover((prev) => [...prev, { name: "" }])
                    }
                    className="flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:brightness-125"
                    style={{ color: "oklch(var(--gold))" }}
                    data-ocid="admin.button"
                  >
                    <Plus className="w-4 h-4" /> Add Tile
                  </button>
                )}
                <SaveBtn section="discover" />
              </TabsContent>

              {/* FOOTER */}
              <TabsContent value="footer" className="mt-0">
                <SectionHeader
                  title="Footer Settings"
                  desc="Edit the school motto shown in the footer."
                />
                <div className={fld}>
                  <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                    School Motto
                  </p>
                  <Input
                    value={footer.motto}
                    onChange={(e) =>
                      setFooter({ ...footer, motto: e.target.value })
                    }
                    className="admin-input"
                    placeholder="e.g. Wisdom | Integrity | Excellence"
                    data-ocid="admin.input"
                  />
                </div>
                <SaveBtn section="footer" />
              </TabsContent>

              {/* SETTINGS */}
              <TabsContent value="settings" className="mt-0">
                <SectionHeader
                  title="Security Settings"
                  desc="Change your admin access PIN."
                />
                <div
                  className="p-6 rounded-xl border"
                  style={{
                    borderColor: "rgba(201,162,74,0.2)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                  data-ocid="admin.panel"
                >
                  <div className={fld}>
                    <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                      Current PIN
                    </p>
                    <Input
                      type="password"
                      value={currentPin}
                      onChange={(e) => setCurrentPin(e.target.value)}
                      maxLength={4}
                      placeholder="Enter current PIN"
                      className="admin-input"
                      data-ocid="admin.input"
                    />
                  </div>
                  <div className={fld}>
                    <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                      New PIN (4 digits)
                    </p>
                    <Input
                      type="password"
                      value={newPin}
                      onChange={(e) =>
                        setNewPin(e.target.value.replace(/\D/g, "").slice(0, 4))
                      }
                      maxLength={4}
                      placeholder="Enter new 4-digit PIN"
                      className="admin-input"
                      data-ocid="admin.input"
                    />
                  </div>
                  <div className={fld}>
                    <p className={lbl} style={{ color: "oklch(var(--gold))" }}>
                      Confirm New PIN
                    </p>
                    <Input
                      type="password"
                      value={confirmPin}
                      onChange={(e) =>
                        setConfirmPin(
                          e.target.value.replace(/\D/g, "").slice(0, 4),
                        )
                      }
                      maxLength={4}
                      placeholder="Confirm new PIN"
                      className="admin-input"
                      data-ocid="admin.input"
                    />
                  </div>
                  <Button
                    onClick={savePin}
                    disabled={saving !== null}
                    style={{
                      background: "oklch(var(--navy))",
                      color: "oklch(var(--gold))",
                    }}
                    data-ocid="admin.save_button"
                  >
                    {isSaving("settings") ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {isSaving("settings") ? "Saving..." : "Change PIN"}
                  </Button>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </div>
    </motion.div>
  );
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-serif font-bold text-2xl text-white mb-1">{title}</h2>
      <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
        {desc}
      </p>
      <div
        className="mt-3 h-px"
        style={{
          background:
            "linear-gradient(90deg, oklch(var(--gold) / 0.4), transparent)",
        }}
      />
    </div>
  );
}
