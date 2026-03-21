import Text "mo:core/Text";

import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";


actor {
  include MixinStorage();

  // ── Types ──────────────────────────────────────────────────────────────────

  type SiteContent = {
    name : Text;
    hero : HeroContent;
    about : AboutContent;
    admissions : AdmissionsContent;
    contact : ContactContent;
    footer : FooterContent;
    announcements : [Announcement];
    highlights : [Highlight];
    discover : [DiscoverTile];
    messages : [LeaderMessage];
    images : ImageUrls;
  };

  type AboutContent = {
    body1 : Text;
    body2 : Text;
  };

  type AdmissionsContent = {
    heading : Text;
    description : Text;
  };

  type Announcement = {
    date : Text;
    title : Text;
    excerpt : Text;
  };

  type ContactContent = {
    address : Text;
    phone : Text;
    email : Text;
  };

  type DiscoverTile = {
    name : Text;
  };

  type HeroContent = {
    title : Text;
    subtitle : Text;
    description : Text;
  };

  type Highlight = {
    title : Text;
    text : Text;
  };

  type FooterContent = {
    motto : Text;
  };

  type ImageUrls = {
    heroUrl : ?Text;
    logoUrl : ?Text;
    discoverUrls : [Text];
  };

  public type LeaderMessage = {
    role : Text;
    name : Text;
    message : Text;
    photo : ?Storage.ExternalBlob;
  };

  // ── Persistent data ────────────────────────────────────────────────────────

  var adminPin : Text = "1234";
  var siteName : Text = "Bosing Royal Academy Yagrung";

  var heroContent : HeroContent = {
    title = "Bosing Royal Academy Yagrung";
    subtitle = "Excellence in Education, Rooted in Heritage";
    description = "Welcome to Bosing Royal Academy Yagrung \u{2014} where we cultivate curious minds, strong character, and lifelong learners ready to shape a better world.";
  };

  var aboutContent : AboutContent = {
    body1 = "Founded with a vision to bring world-class education to the hills of Taplejung, Bosing Royal Academy Yagrung has been a beacon of learning, character, and community. Nestled in the scenic Yagrung valley, our campus offers a nurturing environment where every child's potential is recognised and celebrated.";
    body2 = "Our teaching philosophy blends rigorous academics with values rooted in Nepali culture \u{2014} instilling wisdom, integrity, and excellence in every student who walks through our gates.";
  };

  var admissionsContent : AdmissionsContent = {
    heading = "Admissions Open 2026-27";
    description = "Take the first step toward a transformative educational journey. Applications for the new academic year are now open for all grade levels.";
  };

  var contactContent : ContactContent = {
    address = "Yagrung, Taplejung District, Koshi Province, Nepal";
    phone = "+977-1-XXXXXXX";
    email = "info@bosingroyalacademy.edu.np";
  };

  var footerContent : FooterContent = {
    motto = "Wisdom  |  Integrity  |  Excellence";
  };

  var imageUrls : ImageUrls = {
    heroUrl = null;
    logoUrl = null;
    discoverUrls = [];
  };

  var messages : [LeaderMessage] = [
    {
      role = "Chairman";
      name = "Arjun Limbu";
      message = "A message from the Chairman)";
      photo = null;
    },
    {
      role = "Managing Director";
      name = "Thangka Dhoj Limbu";
      message = "A message from the Managing Director";
      photo = null;
    },
    {
      role = "Principal";
      name = "Rasam Limbu";
      message = "A message from the Principal";
      photo = null;
    },
  ];

  var highlights : [Highlight] = [
    { title = "Expert Faculty"; text = "Our dedicated educators bring decades of experience and passion, nurturing every student to reach their highest potential in an inspiring academic environment." },
    { title = "Global Curriculum"; text = "We follow a globally benchmarked curriculum that prepares students for international universities and careers, while celebrating local culture and heritage." },
    { title = "Holistic Development"; text = "Beyond academics, we champion arts, sports, leadership, and community service \u{2014} ensuring every student blossoms into a well-rounded individual." },
  ];

  var announcements : [Announcement] = [
    {
      date = "March 18, 2026";
      title = "Annual Science & Innovation Fair 2026";
      excerpt = "Students from Grades 7-12 are invited to present their research projects at the Annual Science & Innovation Fair on April 5th. Registration closes March 28th.";
    },
    {
      date = "March 12, 2026";
      title = "Admissions Open for Academic Year 2026-27";
      excerpt = "Applications are now being accepted for all grade levels for the upcoming academic year. Early application deadline is April 30, 2026. Download the prospectus today.";
    },
    {
      date = "March 5, 2026";
      title = "National Day Cultural Programme";
      excerpt = "Bosing Royal Academy proudly announces its National Day Cultural Programme on March 25th. All parents and community members are warmly invited to attend.";
    },
  ];

  var discover : [DiscoverTile] = [
    { name = "Library" },
    { name = "Science Lab" },
    { name = "Athletics" },
    { name = "Student Activities" },
  ];

  // ── Authenticate helpers ───────────────────────────────────────────────────

  func authenticate(pin : Text, action : () -> ()) : Bool {
    if (pin != adminPin) { return false };
    action();
    true;
  };

  // ── Read all content ───────────────────────────────────────────────────────

  public query func getSiteContent() : async SiteContent {
    {
      name = siteName;
      hero = heroContent;
      about = aboutContent;
      admissions = admissionsContent;
      contact = contactContent;
      footer = footerContent;
      announcements;
      highlights;
      discover;
      messages;
      images = imageUrls;
    };
  };

  // ── Update calls (PIN-gated) ───────────────────────────────────────────────

  public func updateHero(pin : Text, content : HeroContent) : async Bool {
    authenticate(pin, func() { heroContent := content });
  };

  public func updateAbout(pin : Text, content : AboutContent) : async Bool {
    authenticate(pin, func() { aboutContent := content });
  };

  public func updateAdmissions(pin : Text, content : AdmissionsContent) : async Bool {
    authenticate(pin, func() { admissionsContent := content });
  };

  public func updateContact(pin : Text, content : ContactContent) : async Bool {
    authenticate(pin, func() { contactContent := content });
  };

  public func updateFooter(pin : Text, content : FooterContent) : async Bool {
    authenticate(pin, func() { footerContent := content });
  };

  public func updateAnnouncements(pin : Text, items : [Announcement]) : async Bool {
    authenticate(pin, func() { announcements := items });
  };

  public func updateHighlights(pin : Text, items : [Highlight]) : async Bool {
    authenticate(pin, func() { highlights := items });
  };

  public func updateDiscover(pin : Text, items : [DiscoverTile]) : async Bool {
    authenticate(pin, func() { discover := items });
  };

  public func updateMessages(pin : Text, leaderMessages : [LeaderMessage]) : async Bool {
    if (pin != adminPin) { return false };
    messages := leaderMessages;
    true;
  };

  public func updateImages(pin : Text, images : ImageUrls) : async Bool {
    authenticate(pin, func() { imageUrls := images });
  };

  public query func verifyPin(pin : Text) : async Bool {
    pin == adminPin
  };

  public func changePin(currentPin : Text, newPin : Text) : async Bool {
    if (currentPin != adminPin) { return false };
    adminPin := newPin;
    true;
  };
};
