export const siteConfig = {
  name: "WattsUpTech.in",
  tagline: "Your Vision, Our Code.",
  headline: "Turning Your Ideas Into Digital Reality.",
  subheadline:
    "From modern websites to custom software and project development, WattsUpTech.in helps transform your ideas into practical digital solutions.",
  supportLine: "Websites. Projects. Technology. Built Around Your Needs.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://wattsuptech.in",
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "hello@wattsuptech.in",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  whatsappMessage:
    "Hello WattsUpTech.in! I would like to discuss a project. Please let me know how we can get started.",
  socials: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    x: process.env.NEXT_PUBLIC_X_URL || "",
  },
  // Promo / advertisement bar — edit text here, no code changes needed.
  // Keep claims honest: describe your process and availability only.
  promo: {
    show: true,
    text: "Now accepting new project inquiries — share your idea and get a clear scope, timeline & next steps.",
    cta: "Start a Project",
    href: "/start-project",
  },
};

export const navRoutes = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/technologies", label: "Technologies" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function whatsappLink(service?: string) {
  const msg = service
    ? `${siteConfig.whatsappMessage} (Service: ${service})`
    : siteConfig.whatsappMessage;
  const base = siteConfig.whatsappNumber
    ? `https://wa.me/${siteConfig.whatsappNumber}`
    : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(msg)}`;
}

export const projectTypes = [
  "Website Design",
  "Website Development",
  "College or Personal Project",
  "Web Application",
  "Software Development",
  "Bug Fixing",
  "Other",
];

export const techOptions = [
  "Java",
  "Python",
  "C/C++",
  "JavaScript",
  "React",
  "PHP",
  "MySQL",
  "MongoDB",
  "Other",
];

export const budgetOptions = [
  "Under ₹5,000",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹30,000",
  "₹30,000 – ₹60,000",
  "₹60,000+",
  "To be discussed",
];
