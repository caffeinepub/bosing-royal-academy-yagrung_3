import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface AboutContent {
    body1: string;
    body2: string;
}
export interface Highlight {
    title: string;
    text: string;
}
export interface AdmissionsContent {
    description: string;
    heading: string;
}
export interface HeroContent {
    title: string;
    description: string;
    subtitle: string;
}
export interface LeaderMessage {
    name: string;
    role: string;
    message: string;
    photo?: ExternalBlob;
}
export interface ContactContent {
    email: string;
    address: string;
    phone: string;
}
export interface DiscoverTile {
    name: string;
}
export interface FooterContent {
    motto: string;
}
export interface Announcement {
    title: string;
    date: string;
    excerpt: string;
}
export interface SiteContent {
    contact: ContactContent;
    about: AboutContent;
    admissions: AdmissionsContent;
    messages: Array<LeaderMessage>;
    hero: HeroContent;
    name: string;
    highlights: Array<Highlight>;
    discover: Array<DiscoverTile>;
    announcements: Array<Announcement>;
    footer: FooterContent;
    images: ImageUrls;
}
export interface ImageUrls {
    heroUrl?: string;
    logoUrl?: string;
    discoverUrls: Array<string>;
}
export interface backendInterface {
    changePin(currentPin: string, newPin: string): Promise<boolean>;
    getSiteContent(): Promise<SiteContent>;
    updateAbout(pin: string, content: AboutContent): Promise<boolean>;
    updateAdmissions(pin: string, content: AdmissionsContent): Promise<boolean>;
    updateAnnouncements(pin: string, items: Array<Announcement>): Promise<boolean>;
    updateContact(pin: string, content: ContactContent): Promise<boolean>;
    updateDiscover(pin: string, items: Array<DiscoverTile>): Promise<boolean>;
    updateFooter(pin: string, content: FooterContent): Promise<boolean>;
    updateHero(pin: string, content: HeroContent): Promise<boolean>;
    updateHighlights(pin: string, items: Array<Highlight>): Promise<boolean>;
    updateImages(pin: string, images: ImageUrls): Promise<boolean>;
    updateMessages(pin: string, leaderMessages: Array<LeaderMessage>): Promise<boolean>;
    verifyPin(pin: string): Promise<boolean>;
}
