// FUTURE ROADMAP - not current offerings. Data only: there are no detail pages, fees, durations,
// faculty, admissions or locations for anything in this file.
//
// Every record here is "coming-soon" or "planned" and is never linked. Each carries an `origin`:
//   "source"   = the source (Techno Gurukul Web copy) names the direction. Only the three INDUSTRIES
//                below are source-backed. Their programs and courses are still proposals, because the
//                source gives no program or course structure for them.
//   "proposed" = a strategic proposal that is not in the source.
// Descriptions are deliberately neutral one-line topic descriptions, not marketing claims.
//
// Deliberately NOT added (proposed in the brief but no structure given, and they overlap industries
// below): Digital Product Management, Data Engineering, AI Engineering.
import type { Course, CatalogueStatus, Industry, Program, ProgramIcon, ProgramTone } from "./catalogue";

// ------------------------------------------------------------------ industries
export const FUTURE_INDUSTRIES: Industry[] = [
  // Source-backed future directions
  { slug: "data-science-and-analytics", name: "Data Science & Analytics", description: "A future Techno Gurukul learning domain focused on data analysis, visualization, statistics, data science and applied analytics.", status: "coming-soon", origin: "source", order: 3 },
  { slug: "cybersecurity", name: "Cybersecurity", description: "Explore future programs in security, systems and digital protection.", status: "coming-soon", origin: "source", order: 4 },
  { slug: "blockchain-and-web3", name: "Blockchain & Web3", description: "Explore future programs in blockchain technology and decentralized applications.", status: "coming-soon", origin: "source", order: 5 },
  // Proposed (not in the source)
  { slug: "software-development", name: "Software Development", description: "Explore future programs in building websites, mobile apps and full-stack software.", status: "planned", origin: "proposed", order: 6 },
  { slug: "cloud-and-devops", name: "Cloud & DevOps", description: "Explore future programs in cloud platforms, infrastructure and software delivery.", status: "planned", origin: "proposed", order: 7 },
  { slug: "ui-ux-and-product-design", name: "UI/UX & Product Design", description: "Explore future programs in user experience, interface and product design.", status: "planned", origin: "proposed", order: 8 },
];

// ------------------------------------------------------------------ programs
type P = [slug: string, name: string, industrySlug: string, status: CatalogueStatus, description: string, origin: "source" | "proposed"];
const programRows: P[] = [
  ["data-analytics", "Data Analytics", "data-science-and-analytics", "coming-soon", "Learn to analyse, visualize and report on data.", "proposed"],
  ["data-science", "Data Science", "data-science-and-analytics", "planned", "Learn to prepare data and build models with data science methods.", "proposed"],
  ["ai-and-machine-learning", "AI & Machine Learning", "data-science-and-analytics", "planned", "Learn the foundations and applications of AI and machine learning.", "proposed"],
  ["cybersecurity-fundamentals", "Cybersecurity Fundamentals", "cybersecurity", "coming-soon", "Learn the core concepts and tools of protecting systems and data.", "proposed"],
  ["ethical-hacking-and-penetration-testing", "Ethical Hacking & Penetration Testing", "cybersecurity", "planned", "Learn how systems are tested for weaknesses in a lawful, controlled way.", "proposed"],
  ["cloud-security", "Cloud Security", "cybersecurity", "planned", "Learn how to secure identities, access and workloads in the cloud.", "proposed"],
  ["blockchain-development", "Blockchain Development", "blockchain-and-web3", "planned", "Learn how blockchain systems and smart contracts are built.", "proposed"],
  ["web3-development", "Web3 Development", "blockchain-and-web3", "planned", "Learn how decentralized applications are designed and built.", "proposed"],
  ["web-development", "Web Development", "software-development", "planned", "Learn to build websites and web interfaces.", "proposed"],
  ["mobile-app-development", "Mobile App Development", "software-development", "planned", "Learn to build and ship mobile apps.", "proposed"],
  ["full-stack-development", "Full-Stack Development", "software-development", "planned", "Learn to build the front end, back end and data layer of an application.", "proposed"],
  ["cloud-fundamentals", "Cloud Fundamentals", "cloud-and-devops", "planned", "Learn the basics of Linux, cloud platforms and cloud services.", "proposed"],
  ["devops-engineering", "DevOps Engineering", "cloud-and-devops", "planned", "Learn the tools and practices used to build, test and deliver software.", "proposed"],
  ["cloud-infrastructure", "Cloud Infrastructure", "cloud-and-devops", "planned", "Learn to define and monitor cloud infrastructure.", "proposed"],
  ["ui-ux-design", "UI/UX Design", "ui-ux-and-product-design", "planned", "Learn user research, interface design and prototyping.", "proposed"],
  ["product-design", "Product Design", "ui-ux-and-product-design", "planned", "Learn to design and test products end to end.", "proposed"],
];
export const FUTURE_PROGRAMS: Program[] = programRows.map(([slug, name, industrySlug, status, description, origin], i) => ({
  slug,
  name,
  industrySlug,
  description,
  status,
  origin,
  href: null,
  order: 3 + i,
}));

// ------------------------------------------------------------------ courses (all proposals)
const toSlug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const INDUSTRY_OF = new Map(programRows.map((p) => [p[0], p[2]]));
const STATUS_OF = new Map(programRows.map((p) => [p[0], p[3]]));

let order = 100;

type Row = [title: string, description: string, tags: string[], keywords: string[], slug?: string];

function courses(programSlug: string, tone: ProgramTone, icons: ProgramIcon[], rows: Row[]): Course[] {
  return rows.map(([title, description, tags, keywords, slug]) => ({
    slug: slug ?? toSlug(title),
    title,
    industrySlug: INDUSTRY_OF.get(programSlug) as string,
    programSlug,
    description,
    status: STATUS_OF.get(programSlug) as CatalogueStatus,
    origin: "proposed",
    href: null,
    level: null,
    format: null,
    tags,
    keywords,
    image: null,
    visual: { tone, icons },
    featured: false,
    order: ++order,
  }));
}

export const FUTURE_COURSES: Course[] = [
  // ---------------- Data Science & Analytics
  ...courses("data-analytics", "blue", ["bar-chart", "database", "trending-up"], [
    ["Data Analytics Fundamentals", "The core ideas and workflow of analysing data.", ["Data Analytics"], ["analysis", "data", "basics"]],
    ["Excel for Data Analysis", "Using spreadsheets to organise, calculate and summarise data.", ["Data Analytics"], ["excel", "spreadsheets", "pivot tables"]],
    ["SQL Fundamentals", "Querying and combining data stored in relational databases.", ["SQL", "Data Analytics"], ["sql", "queries", "databases", "joins"]],
    ["Data Visualization", "Presenting data clearly with charts and dashboards.", ["Data Analytics"], ["charts", "dashboards", "visualisation"]],
    ["Power BI Fundamentals", "Building reports and dashboards with Power BI.", ["Data Analytics"], ["power bi", "dashboards", "reports"]],
    ["Tableau Fundamentals", "Building visual analyses and dashboards with Tableau.", ["Data Analytics"], ["tableau", "dashboards", "visual analytics"]],
    ["Statistics for Data Analytics", "The statistical ideas used to describe and interpret data.", ["Data Analytics"], ["statistics", "probability", "distributions"]],
    ["Python for Data Analysis", "Using Python to load, clean and analyse data.", ["Python", "Data Analytics"], ["python", "pandas", "numpy"]],
    ["Business Analytics", "Applying data analysis to business questions and decisions.", ["Data Analytics", "Analytics"], ["business", "decisions", "kpis"]],
    ["Marketing Analytics", "Applying data analysis to marketing questions and performance.", ["Data Analytics", "Analytics", "Marketing"], ["marketing data", "campaign analysis", "reporting"]],
  ]),
  ...courses("data-science", "sky", ["brain", "database", "bar-chart"], [
    ["Data Science Fundamentals", "An overview of the data science process and its methods.", ["Data Science"], ["basics", "workflow", "introduction"]],
    ["Python for Data Science", "Using Python for data science work.", ["Python", "Data Science"], ["python", "libraries", "notebooks"]],
    ["Statistics & Probability", "The statistics and probability behind data science.", ["Data Science"], ["statistics", "probability", "inference"]],
    ["Data Cleaning & Preparation", "Preparing raw data so it is ready for analysis and modelling.", ["Data Science"], ["data cleaning", "preprocessing", "missing values"]],
    ["Machine Learning Fundamentals", "An introduction to how machine learning models learn from data.", ["Machine Learning", "Data Science"], ["machine learning", "models", "training"]],
    ["Supervised Learning", "Learning from labelled data to make predictions.", ["Machine Learning", "Data Science"], ["classification", "regression", "labels"]],
    ["Unsupervised Learning", "Finding structure in data without labels.", ["Machine Learning", "Data Science"], ["clustering", "dimensionality reduction"]],
    ["Feature Engineering", "Creating useful inputs for machine learning models.", ["Machine Learning", "Data Science"], ["features", "encoding", "scaling"]],
    ["Model Evaluation", "Measuring and comparing how well models perform.", ["Machine Learning", "Data Science"], ["metrics", "validation", "overfitting"]],
    ["Applied Data Science Projects", "Practical projects that apply data science methods end to end.", ["Data Science"], ["projects", "portfolio", "case studies"]],
  ]),
  ...courses("ai-and-machine-learning", "navy", ["cpu", "brain", "sparkles"], [
    ["AI Fundamentals", "The core ideas and applications of artificial intelligence.", ["AI"], ["artificial intelligence", "basics", "introduction"]],
    ["Machine Learning Fundamentals", "An introduction to machine learning concepts and methods.", ["Machine Learning", "AI"], ["machine learning", "models", "training"], "machine-learning-fundamentals-ai"],
    ["Python for Machine Learning", "Using Python to build machine learning models.", ["Python", "Machine Learning"], ["python", "scikit-learn", "libraries"]],
    ["Deep Learning Fundamentals", "An introduction to neural networks and deep learning.", ["Machine Learning", "AI"], ["deep learning", "neural networks"]],
    ["Natural Language Processing", "Working with human language in text and speech.", ["AI", "Machine Learning"], ["nlp", "text", "language models"]],
    ["Computer Vision", "Teaching computers to interpret images and video.", ["AI", "Machine Learning"], ["images", "vision", "object detection"]],
    ["Generative AI", "How generative models create text, images and other content.", ["AI"], ["generative ai", "llm", "prompting", "image generation"]],
    ["Applied AI Projects", "Practical projects that apply AI methods.", ["AI"], ["projects", "portfolio", "applications"]],
  ]),
  // ---------------- Cybersecurity
  ...courses("cybersecurity-fundamentals", "navy", ["shield", "lock", "network"], [
    ["Cybersecurity Fundamentals", "The core concepts of protecting systems, networks and data.", ["Cybersecurity"], ["security", "basics", "threats"]],
    ["Networking Fundamentals", "How computer networks work, as a base for security.", ["Cybersecurity"], ["networking", "tcp/ip", "protocols"]],
    ["Operating System Security", "Securing and hardening operating systems.", ["Cybersecurity"], ["windows", "linux", "hardening"]],
    ["Security Principles", "The guiding principles used to design secure systems.", ["Cybersecurity"], ["confidentiality", "integrity", "availability"]],
    ["Identity & Access Management", "Managing who can access which systems and data.", ["Cybersecurity"], ["iam", "authentication", "authorization"]],
    ["Endpoint Security", "Protecting laptops, phones and other endpoint devices.", ["Cybersecurity"], ["endpoint", "antivirus", "devices"]],
    ["Security Monitoring", "Watching systems and logs to detect security events.", ["Cybersecurity"], ["monitoring", "logs", "siem"]],
    ["Incident Response", "How organisations prepare for and handle security incidents.", ["Cybersecurity"], ["incidents", "response", "forensics"]],
    ["Cybersecurity Tools", "The common tools used in security work.", ["Cybersecurity"], ["tools", "scanners", "analysis"]],
    ["Security Projects", "Practical projects that apply security skills.", ["Cybersecurity"], ["projects", "labs", "portfolio"]],
  ]),
  ...courses("ethical-hacking-and-penetration-testing", "blue", ["terminal", "shield", "bug"], [
    ["Ethical Hacking Fundamentals", "The core ideas of lawful, authorised security testing.", ["Ethical Hacking", "Cybersecurity"], ["ethical hacking", "basics", "authorised testing"]],
    ["Reconnaissance", "Gathering information about a target system during testing.", ["Ethical Hacking"], ["recon", "osint", "enumeration"]],
    ["Web Application Security", "Finding and understanding weaknesses in web applications.", ["Ethical Hacking", "Cybersecurity"], ["web security", "owasp", "injection", "xss"]],
    ["Network Security Testing", "Testing networks for weaknesses.", ["Ethical Hacking", "Cybersecurity"], ["network", "scanning", "ports"]],
    ["Vulnerability Assessment", "Identifying and prioritising known weaknesses.", ["Ethical Hacking", "Cybersecurity"], ["vulnerabilities", "scanning", "risk"]],
    ["Penetration Testing Methodology", "The structured steps of a penetration test.", ["Ethical Hacking"], ["pentest", "methodology", "phases"]],
    ["Security Testing Labs", "Hands-on lab exercises in security testing.", ["Ethical Hacking"], ["labs", "practice", "ctf"]],
    ["Reporting & Documentation", "Writing clear findings and reports from security tests.", ["Ethical Hacking"], ["reporting", "documentation", "findings"]],
  ]),
  ...courses("cloud-security", "sky", ["cloud", "lock", "shield"], [
    ["Cloud Security Fundamentals", "The core concepts of securing cloud environments.", ["Cloud", "Cybersecurity"], ["cloud security", "shared responsibility"]],
    ["Identity in Cloud Environments", "Managing identities in cloud platforms.", ["Cloud", "Cybersecurity"], ["identity", "sso", "directory"]],
    ["Cloud Access Management", "Controlling access to cloud resources.", ["Cloud", "Cybersecurity"], ["access control", "roles", "permissions"]],
    ["Secure Cloud Architecture", "Designing cloud systems with security in mind.", ["Cloud", "Cybersecurity"], ["architecture", "network security", "design"]],
    ["Cloud Monitoring", "Monitoring cloud environments for security events.", ["Cloud", "Cybersecurity"], ["monitoring", "logging", "alerts"]],
    ["Cloud Security Projects", "Practical projects that apply cloud security skills.", ["Cloud", "Cybersecurity"], ["projects", "labs", "portfolio"]],
  ]),
  // ---------------- Blockchain & Web3
  ...courses("blockchain-development", "sky", ["blocks", "link", "database"], [
    ["Blockchain Fundamentals", "The core ideas behind blockchain technology.", ["Blockchain"], ["blockchain", "basics", "blocks", "consensus"]],
    ["Distributed Ledger Technology", "How distributed ledgers store and agree on data.", ["Blockchain"], ["dlt", "ledger", "distributed systems"]],
    ["Smart Contract Fundamentals", "The basics of self-executing contracts on a blockchain.", ["Blockchain"], ["smart contracts", "basics"]],
    ["Solidity", "Writing smart contracts in the Solidity language.", ["Blockchain", "Web3"], ["solidity", "ethereum", "contracts"]],
    ["Web3 Development", "Building applications that connect to blockchains.", ["Web3", "Blockchain"], ["web3", "dapps", "ethers"], "web3-development-course"],
    ["Blockchain Application Development", "Building applications on top of blockchain platforms.", ["Blockchain"], ["applications", "development"]],
    ["Blockchain Security", "Understanding and reducing risks in blockchain systems.", ["Blockchain", "Cybersecurity"], ["security", "audits", "vulnerabilities"]],
    ["Blockchain Projects", "Practical projects that apply blockchain skills.", ["Blockchain"], ["projects", "portfolio"]],
  ]),
  ...courses("web3-development", "blue", ["globe", "blocks", "code"], [
    ["Web3 Fundamentals", "The core ideas of the decentralized web.", ["Web3"], ["web3", "basics", "decentralization"]],
    ["Decentralized Applications", "How decentralized applications are structured.", ["Web3", "Blockchain"], ["dapps", "decentralized apps"]],
    ["Wallet & Identity Concepts", "How wallets and digital identity work in Web3.", ["Web3"], ["wallets", "identity", "keys"]],
    ["Smart Contracts", "Building smart contracts for Web3 applications.", ["Web3", "Blockchain"], ["smart contracts", "solidity"]],
    ["Web3 Frontend Development", "Building user interfaces that connect to Web3.", ["Web3", "Web Development"], ["frontend", "wallet connect", "react"]],
    ["Web3 Product Development", "Planning and building Web3 products.", ["Web3"], ["product", "tokens", "planning"]],
  ]),
  // ---------------- Software Development (proposed)
  ...courses("web-development", "blue", ["code", "globe", "layout"], [
    ["Web Development Fundamentals", "The basics of how websites are built and delivered.", ["Web Development"], ["web", "basics", "browsers"]],
    ["HTML & CSS", "Structuring and styling web pages.", ["Web Development"], ["html", "css", "layout"]],
    ["JavaScript", "Programming interactive behaviour for the web.", ["Web Development"], ["javascript", "dom", "programming"]],
    ["TypeScript", "Adding types to JavaScript for safer code.", ["Web Development"], ["typescript", "types"]],
    ["React", "Building user interfaces with React.", ["Web Development"], ["react", "components", "frontend"]],
    ["Next.js", "Building web applications with Next.js.", ["Web Development"], ["nextjs", "react", "routing"]],
  ]),
  ...courses("mobile-app-development", "sky", ["smartphone", "code", "layers"], [
    ["Flutter Development", "Building mobile apps with Flutter.", ["Mobile Development"], ["flutter", "dart", "cross-platform"]],
    ["React Native", "Building mobile apps with React Native.", ["Mobile Development"], ["react native", "javascript", "cross-platform"]],
    ["Mobile UI", "Designing and building mobile interfaces.", ["Mobile Development", "UI/UX Design"], ["ui", "mobile design", "layouts"]],
    ["Mobile APIs", "Connecting mobile apps to data and services.", ["Mobile Development"], ["api", "networking", "backend"]],
    ["App Deployment", "Preparing and releasing apps to app stores.", ["Mobile Development"], ["app store", "play store", "release"]],
  ]),
  ...courses("full-stack-development", "navy", ["server", "code", "database"], [
    ["Node.js", "Building server-side applications with Node.js.", ["Web Development"], ["nodejs", "javascript", "backend"]],
    ["REST APIs", "Designing and building APIs that apps can use.", ["Web Development"], ["api", "rest", "backend"]],
    ["Database Fundamentals", "How applications store and retrieve data.", ["SQL", "Web Development"], ["databases", "sql", "storage"]],
    ["Full-Stack Projects", "Practical projects that build complete applications.", ["Web Development"], ["projects", "portfolio", "full stack"]],
  ]),
  // ---------------- Cloud & DevOps (proposed)
  ...courses("cloud-fundamentals", "blue", ["cloud", "terminal", "server"], [
    ["Linux Fundamentals", "Working with Linux and the command line.", ["Cloud", "DevOps"], ["linux", "command line", "shell"]],
    ["Cloud Fundamentals", "The core concepts of cloud computing.", ["Cloud"], ["cloud computing", "basics", "iaas", "saas"], "cloud-computing-fundamentals"],
    ["AWS Fundamentals", "An introduction to Amazon Web Services.", ["Cloud"], ["aws", "amazon web services"]],
    ["Azure Fundamentals", "An introduction to Microsoft Azure.", ["Cloud"], ["azure", "microsoft"]],
  ]),
  ...courses("devops-engineering", "sky", ["workflow", "terminal", "cloud"], [
    ["Git & GitHub", "Version control and collaboration with Git and GitHub.", ["DevOps"], ["git", "github", "version control"]],
    ["CI/CD", "Automating how software is built, tested and released.", ["DevOps"], ["ci/cd", "pipelines", "automation"]],
    ["Docker", "Packaging applications in containers with Docker.", ["DevOps", "Cloud"], ["docker", "containers"]],
    ["Kubernetes", "Running and managing containers with Kubernetes.", ["DevOps", "Cloud"], ["kubernetes", "k8s", "orchestration"]],
  ]),
  ...courses("cloud-infrastructure", "navy", ["server", "cloud", "layers"], [
    ["Infrastructure as Code", "Defining infrastructure with code.", ["DevOps", "Cloud"], ["iac", "terraform", "automation"]],
    ["Monitoring & Observability", "Monitoring systems and understanding their behaviour.", ["DevOps", "Cloud"], ["monitoring", "observability", "logs", "metrics"]],
  ]),
  // ---------------- UI/UX & Product Design (proposed)
  ...courses("ui-ux-design", "sky", ["pen-tool", "layout", "users"], [
    ["Design Fundamentals", "The basic principles of visual and interface design.", ["UI/UX Design"], ["design", "layout", "typography", "colour"]],
    ["UX Research", "Learning about users and their needs.", ["UI/UX Design"], ["user research", "interviews", "surveys"]],
    ["Information Architecture", "Organising content so people can find their way.", ["UI/UX Design"], ["structure", "navigation", "sitemaps"]],
    ["Wireframing", "Sketching the structure of screens and flows.", ["UI/UX Design"], ["wireframes", "layout", "flows"]],
    ["Prototyping", "Building interactive prototypes to test ideas.", ["UI/UX Design"], ["prototype", "interactive", "testing"]],
    ["Figma", "Designing interfaces with Figma.", ["UI/UX Design"], ["figma", "design tool"]],
  ]),
  ...courses("product-design", "navy", ["layers", "lightbulb", "users"], [
    ["Design Systems", "Building consistent, reusable design components.", ["UI/UX Design"], ["components", "tokens", "consistency"]],
    ["Interaction Design", "Designing how people interact with products.", ["UI/UX Design"], ["interaction", "micro-interactions", "behaviour"]],
    ["Usability Testing", "Testing products with real users.", ["UI/UX Design"], ["usability", "user testing", "feedback"]],
    ["Product Design Projects", "Practical projects that design products end to end.", ["UI/UX Design"], ["projects", "portfolio", "case studies"]],
  ]),
];
