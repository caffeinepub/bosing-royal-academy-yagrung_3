import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { HttpAgent } from "@icp-sdk/core/agent";
import {
  ImageIcon,
  Loader2,
  Lock,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type {
  Announcement,
  DiscoverItem,
  Highlight,
  ImageUrls,
  LeaderMessage,
  SiteContent,
} from "../App";
import { ExternalBlob } from "../backend";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";

interface AdminPanelProps {
  actor: any;
  adminPin: string;
  siteContent: SiteContent;
  onContentUpdate: (content: SiteContent) => void;
  onClose: () => void;
}

async function uploadImageFile(file: File): Promise<string> {
  const config = await loadConfig();
  const agent = new HttpAgent({ host: config.backend_host });
  const storageClient = new StorageClient(
    config.bucket_name,
    config.storage_gateway_url,
    config.backend_canister_id,
    config.project_id,
    agent,
  );
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { hash } = await storageClient.putFile(bytes);
  return storageClient.getDirectURL(hash);
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
  const [messages, setMessages] = useState<LeaderMessage[]>(
    (siteContent.messages || []).map((m) => ({ ...m })),
  );
  const [images, setImages] = useState<ImageUrls>(
    siteContent.images
      ? {
          heroUrl: siteContent.images.heroUrl,
          logoUrl: siteContent.images.logoUrl,
          discoverUrls: [...(siteContent.images.discoverUrls || [])],
        }
      : { discoverUrls: [] },
  );
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [saving, setSaving] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const callBackend = async (method: string, args: any[]) => {
    if (!actor) return false;
    try {
      return await (actor as any)[method](...args);
    } catch {
      return false;
    }
  };

  const handleImageUpload = async (
    file: File,
    key: string,
    onUrl: (url: string) => void,
  ) => {
    setUploading(key);
    try {
      const url = await uploadImageFile(file);
      onUrl(url);
      toast.success("Image uploaded successfully!");
    } catch {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(null);
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
        case "messages": {
          const backendMessages = messages.map((m) => ({
            name: m.name,
            role: m.role,
            message: m.message,
            photo: m.photoUrl ? ExternalBlob.fromURL(m.photoUrl) : undefined,
          }));
          await callBackend("updateMessages", [adminPin, backendMessages]);
          onContentUpdate({ ...siteContent, messages });
          break;
        }
        case "images": {
          const imagePayload: ImageUrls = {
            heroUrl: images.heroUrl,
            logoUrl: images.logoUrl,
            discoverUrls: images.discoverUrls,
          };
          await callBackend("updateImages", [adminPin, imagePayload]);
          onContentUpdate({ ...siteContent, images });
          break;
        }
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
  const isUploading = (s: string) => uploading === s;

  function SaveBtn({ section }: { section: string }) {
    return (
      <Button
        onClick={() => saveSection(section)}
        disabled={saving !== null || uploading !== null}
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

  function UploadBtn({
    uploadKey,
    onFile,
    label = "Upload Image",
  }: {
    uploadKey: string;
    onFile: (file: File) => void;
    label?: string;
  }) {
    const ref = useRef<HTMLInputElement>(null);
    return (
      <>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
            e.target.value = "";
          }}
          data-ocid="admin.upload_button"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => ref.current?.click()}
          disabled={uploading !== null || saving !== null}
          className="gap-2 text-xs"
          style={{
            borderColor: "rgba(217,119,6,0.4)",
            color: "oklch(var(--gold))",
            background: "transparent",
          }}
        >
          {isUploading(uploadKey) ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Upload className="h-3 w-3" />
          )}
          {isUploading(uploadKey) ? "Uploading..." : label}
        </Button>
      </>
    );
  }

  function ImagePreview({ url, label }: { url?: string; label: string }) {
    if (!url) return null;
    return (
      <div className="mt-2 flex items-center gap-3">
        <img
          src={url}
          alt={label}
          className="w-20 h-14 object-cover rounded border"
          style={{ borderColor: "rgba(217,119,6,0.3)" }}
        />
        <span className="text-xs text-white/40 truncate max-w-[180px]">
          {url}
        </span>
      </div>
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
      style={{ background: "rgba(10,20,60,0.97)", backdropFilter: "blur(8px)" }}
      data-ocid="admin.modal"
    >
      <header
        className="shrink-0 flex items-center justify-between px-6 py-4 border-b"
        style={{
          borderColor: "rgba(217,119,6,0.2)",
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
              background: "rgba(20,38,100,0.8)",
            }}
          >
            <TabsList className="flex gap-1 px-4 py-2 bg-transparent h-auto rounded-none min-w-max">
              {[
                "hero",
                "messages",
                "images",
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

              {/* MESSAGES */}
              <TabsContent value="messages" className="mt-0">
                <SectionHeader
                  title="Leadership Messages"
                  desc="Edit messages from the Chairman, Managing Director, and Principal."
                />
                {messages.map((msg, i) => (
                  <div
                    key={`msg-${msg.role}-${i}`}
                    className="mb-6 p-5 rounded-xl border"
                    style={{
                      borderColor: "rgba(217,119,6,0.2)",
                      background: "rgba(255,255,255,0.03)",
                    }}
                    data-ocid={`admin.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "oklch(var(--gold))" }}
                      >
                        {msg.role || `Leader ${i + 1}`}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setMessages((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                        className="text-destructive hover:brightness-125 transition-colors"
                        aria-label="Remove message"
                        data-ocid="admin.delete_button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className={fld}>
                      <p className={lbl} style={{ color: "white" }}>
                        Role / Title
                      </p>
                      <Input
                        value={msg.role}
                        onChange={(e) =>
                          setMessages((prev) =>
                            prev.map((x, idx) =>
                              idx === i ? { ...x, role: e.target.value } : x,
                            ),
                          )
                        }
                        placeholder="e.g. Chairman"
                        className="admin-input"
                        data-ocid="admin.input"
                      />
                    </div>
                    <div className={fld}>
                      <p className={lbl} style={{ color: "white" }}>
                        Full Name
                      </p>
                      <Input
                        value={msg.name}
                        onChange={(e) =>
                          setMessages((prev) =>
                            prev.map((x, idx) =>
                              idx === i ? { ...x, name: e.target.value } : x,
                            ),
                          )
                        }
                        placeholder="e.g. Dr. Ram Prasad Sharma"
                        className="admin-input"
                        data-ocid="admin.input"
                      />
                    </div>
                    <div className={fld}>
                      <p className={lbl} style={{ color: "white" }}>
                        Message
                      </p>
                      <Textarea
                        value={msg.message}
                        onChange={(e) =>
                          setMessages((prev) =>
                            prev.map((x, idx) =>
                              idx === i ? { ...x, message: e.target.value } : x,
                            ),
                          )
                        }
                        rows={4}
                        className="admin-input"
                        data-ocid="admin.textarea"
                      />
                    </div>
                    <div>
                      <p className={lbl} style={{ color: "white" }}>
                        Photo (optional)
                      </p>
                      <UploadBtn
                        uploadKey={`msg-photo-${i}`}
                        label="Upload Photo"
                        onFile={(file) =>
                          handleImageUpload(file, `msg-photo-${i}`, (url) =>
                            setMessages((prev) =>
                              prev.map((x, idx) =>
                                idx === i ? { ...x, photoUrl: url } : x,
                              ),
                            ),
                          )
                        }
                      />
                      {msg.photoUrl && (
                        <div className="mt-2 flex items-center gap-3">
                          <img
                            src={msg.photoUrl}
                            alt={msg.name}
                            className="w-14 h-14 rounded-full object-cover"
                            style={{
                              border: "2px solid rgba(217,119,6,0.4)",
                            }}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setMessages((prev) =>
                                prev.map((x, idx) =>
                                  idx === i ? { ...x, photoUrl: undefined } : x,
                                ),
                              )
                            }
                            className="text-xs text-destructive hover:brightness-125"
                          >
                            Remove photo
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setMessages((prev) => [
                      ...prev,
                      { role: "", name: "", message: "" },
                    ])
                  }
                  className="flex items-center gap-2 text-sm font-medium mb-4 transition-colors hover:brightness-125"
                  style={{ color: "oklch(var(--gold))" }}
                  data-ocid="admin.button"
                >
                  <Plus className="w-4 h-4" /> Add Leader
                </button>
                <SaveBtn section="messages" />
              </TabsContent>

              {/* IMAGES */}
              <TabsContent value="images" className="mt-0">
                <SectionHeader
                  title="Site Images"
                  desc="Upload or replace the hero background, school logo, and discover section photos."
                />

                {/* Hero Background */}
                <div
                  className="mb-6 p-5 rounded-xl border"
                  style={{
                    borderColor: "rgba(217,119,6,0.2)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <p
                    className="text-sm font-semibold mb-3"
                    style={{ color: "oklch(var(--gold))" }}
                  >
                    Hero Background Photo
                  </p>
                  <UploadBtn
                    uploadKey="hero-bg"
                    label="Upload Background"
                    onFile={(file) =>
                      handleImageUpload(file, "hero-bg", (url) =>
                        setImages((prev) => ({ ...prev, heroUrl: url })),
                      )
                    }
                  />
                  <ImagePreview url={images.heroUrl} label="Hero background" />
                  {images.heroUrl && (
                    <button
                      type="button"
                      onClick={() =>
                        setImages((prev) => ({ ...prev, heroUrl: undefined }))
                      }
                      className="mt-2 text-xs text-destructive hover:brightness-125 block"
                    >
                      Remove & use default
                    </button>
                  )}
                </div>

                {/* School Logo */}
                <div
                  className="mb-6 p-5 rounded-xl border"
                  style={{
                    borderColor: "rgba(217,119,6,0.2)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <p
                    className="text-sm font-semibold mb-3"
                    style={{ color: "oklch(var(--gold))" }}
                  >
                    School Logo
                  </p>
                  <UploadBtn
                    uploadKey="logo"
                    label="Upload Logo"
                    onFile={(file) =>
                      handleImageUpload(file, "logo", (url) =>
                        setImages((prev) => ({ ...prev, logoUrl: url })),
                      )
                    }
                  />
                  {images.logoUrl && (
                    <div className="mt-2 flex items-center gap-3">
                      <img
                        src={images.logoUrl}
                        alt="Logo"
                        className="w-16 h-16 rounded-full object-contain"
                        style={{
                          border: "2px solid rgba(217,119,6,0.4)",
                          background: "rgba(255,255,255,0.05)",
                        }}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setImages((prev) => ({ ...prev, logoUrl: undefined }))
                        }
                        className="text-xs text-destructive hover:brightness-125"
                      >
                        Remove & use default
                      </button>
                    </div>
                  )}
                </div>

                {/* Discover Photos */}
                <div
                  className="mb-6 p-5 rounded-xl border"
                  style={{
                    borderColor: "rgba(217,119,6,0.2)",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  <p
                    className="text-sm font-semibold mb-4"
                    style={{ color: "oklch(var(--gold))" }}
                  >
                    Discover Section Photos
                  </p>
                  <div className="space-y-5">
                    {[0, 1, 2, 3].map((idx) => (
                      <div key={`disc-img-${idx}`}>
                        <p
                          className="text-xs font-medium mb-2"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          Discover Photo {idx + 1}{" "}
                          <span style={{ color: "oklch(var(--gold) / 0.6)" }}>
                            (
                            {siteContent.discover[idx]?.name ||
                              `Tile ${idx + 1}`}
                            )
                          </span>
                        </p>
                        <UploadBtn
                          uploadKey={`disc-img-${idx}`}
                          label="Upload Photo"
                          onFile={(file) =>
                            handleImageUpload(
                              file,
                              `disc-img-${idx}`,
                              (url) => {
                                setImages((prev) => {
                                  const next = [...(prev.discoverUrls || [])];
                                  next[idx] = url;
                                  return { ...prev, discoverUrls: next };
                                });
                              },
                            )
                          }
                        />
                        {images.discoverUrls?.[idx] && (
                          <div className="mt-2 flex items-center gap-3">
                            <img
                              src={images.discoverUrls[idx]}
                              alt={`Discover ${idx + 1}`}
                              className="w-24 h-14 object-cover rounded"
                              style={{
                                border: "1px solid rgba(217,119,6,0.3)",
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImages((prev) => {
                                  const next = [...(prev.discoverUrls || [])];
                                  next[idx] = "";
                                  return { ...prev, discoverUrls: next };
                                });
                              }}
                              className="text-xs text-destructive hover:brightness-125"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <SaveBtn section="images" />
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
                      borderColor: "rgba(217,119,6,0.2)",
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
                      borderColor: "rgba(217,119,6,0.2)",
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
                    borderColor: "rgba(217,119,6,0.2)",
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
