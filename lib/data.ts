export type PortfolioCategory = "Websites" | "Web Applications" | "Programming Projects";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategory;
  tech: string[];
  demoNote: string;
  gradient: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "business-site-demo",
    title: "Modern Business Website (Demo)",
    description:
      "Demonstration business site layout — responsive hero, services, contact flow. Clearly labeled demo, easy to replace with real client work.",
    category: "Websites",
    tech: ["React", "Tailwind CSS", "Next.js"],
    demoNote: "Demo concept — not a client delivery",
    gradient: "from-[#168BFF] to-[#7C3AED]",
  },
  {
    id: "portfolio-site-demo",
    title: "Portfolio Website (Demo)",
    description:
      "Clean personal portfolio template with project grid, about and contact sections. Use as a starting point for real portfolios.",
    category: "Websites",
    tech: ["HTML", "CSS", "JavaScript"],
    demoNote: "Demo concept",
    gradient: "from-[#00D4FF] to-[#168BFF]",
  },
  {
    id: "task-app-demo",
    title: "Task Manager Web App (Demo)",
    description:
      "Demo CRUD web app with auth-ready structure, API routes and MongoDB schema. Shows full-stack capability pattern.",
    category: "Web Applications",
    tech: ["React", "Node.js", "MongoDB"],
    demoNote: "Demo concept",
    gradient: "from-[#7C3AED] to-[#00D4FF]",
  },
  {
    id: "ecommerce-demo",
    title: "Mini E-commerce UI (Demo)",
    description:
      "Product listing, cart state and checkout form UI. Backend integration point ready for real store requirements.",
    category: "Web Applications",
    tech: ["Next.js", "MySQL", "Tailwind CSS"],
    demoNote: "Demo concept",
    gradient: "from-[#168BFF] to-[#00D4FF]",
  },
  {
    id: "student-mgmt-java",
    title: "Student Management System (Demo)",
    description:
      "Java + MySQL console/GUI pattern for academic projects — records, search, reports. Ideal template for college submissions.",
    category: "Programming Projects",
    tech: ["Java", "MySQL"],
    demoNote: "Demo academic pattern",
    gradient: "from-[#f59e0b] to-[#ef4444]",
  },
  {
    id: "python-data-demo",
    title: "Python Data Helper (Demo)",
    description:
      "Python scripting demo — file handling, data cleanup and basic automation example for student projects.",
    category: "Programming Projects",
    tech: ["Python", "MySQL"],
    demoNote: "Demo academic pattern",
    gradient: "from-[#22c55e] to-[#168BFF]",
  },
];

export const services = [
  {
    id: "project-dev",
    title: "Project Development",
    desc: "Academic, personal and programming projects built with clean code and documentation.",
    points: ["Academic & personal projects", "Application development", "Implementation assistance"],
  },
  {
    id: "web-design",
    title: "Website Design & Development",
    desc: "Modern, responsive, user-friendly websites for brands and businesses.",
    points: ["Business & portfolio sites", "Landing pages", "E-commerce & web apps"],
  },
  {
    id: "programming",
    title: "Programming Solutions",
    desc: "Logic building and implementations across core languages.",
    points: ["Java, Python, C/C++", "JavaScript, PHP", "Debugging & concepts"],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    desc: "Pixel-clean responsive interfaces with modern tooling.",
    points: ["HTML, CSS, JavaScript", "React + Tailwind CSS", "Responsive UI"],
  },
  {
    id: "backend",
    title: "Backend & Database",
    desc: "APIs, auth and database design that scales with your idea.",
    points: ["API integration", "Auth flows", "MySQL & MongoDB"],
  },
  {
    id: "custom",
    title: "Custom Digital Solutions",
    desc: "Improvements, bug fixes and consultation for existing products.",
    points: ["Bug fixing", "Feature development", "Technical consultation"],
  },
];

export const faqs = [
  {
    q: "What services does WattsUpTech.in provide?",
    a: "We build business and portfolio websites, landing pages, e-commerce sites, responsive web apps, college/personal programming projects (Java, Python, C/C++, JS, PHP), frontend (React, Tailwind), backend & databases (Node.js, MySQL, MongoDB), plus bug fixing and technical consultation.",
  },
  {
    q: "Can I request a custom website?",
    a: "Yes. Use the Project Builder or Contact form to share your goals, pages, references and timeline. We clarify scope, then design and build around your requirements.",
  },
  {
    q: "Can I discuss my own project idea?",
    a: "Absolutely. Share your idea in Step 3 of the Project Builder — title, description, features and any reference link. We respond with next steps and questions.",
  },
  {
    q: "How is project pricing determined?",
    a: "Pricing depends on scope, features, technology, timeline and urgency. Select a budget range in the builder (configurable options) or choose 'To be discussed' and we will align on a defined scope before work starts.",
  },
  {
    q: "How long does development take?",
    a: "Small sites and guided projects can take days; larger web apps take weeks depending on features and feedback speed. Share your deadline in the builder and we will confirm a realistic plan during requirement discussion.",
  },
  {
    q: "What information should I provide before starting?",
    a: "Project type, preferred technology (if any), description, must-have features, reference sites, budget range and deadline, plus your name, email and preferred contact method.",
  },
  {
    q: "Do you offer post-delivery support?",
    a: "Yes — we include agreed post-delivery support for fixes within the defined scope, plus optional improvements as separate follow-ups.",
  },
  {
    q: "How can I contact the team?",
    a: "Use the contact form, the Project Builder, the AI chatbot, or the floating WhatsApp button with a prefilled message. Email is configurable via NEXT_PUBLIC_BUSINESS_EMAIL.",
  },
];
