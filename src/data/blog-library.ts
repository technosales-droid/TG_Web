// Library articles that sit below the hero carousel. Paragraphs may use **bold** for emphasis.
// Dates are seed dates (older than the hero set, so the carousel keeps showing the original ten).
// `heroImage: null` renders a category-toned placeholder cover; drop a real photo path in when
// one is available; nothing else needs to change.
import type { BlogInput, BlogSection } from "./blogs";

const AUTHOR = "Techno Gurukul Editorial Team";
const body = (...paragraphs: string[]): BlogSection[] => [{ paragraphs }];

// Fuller bodies for two articles that already exist in the hero set.
export const BODY_OVERRIDES: Record<string, BlogSection[]> = {
  "unity-vs-unreal-engine": body(
    "Choosing a game engine can feel like choosing a career path, especially for a beginner.",
    "Unity has historically been popular for indie development, mobile games, 2D projects and smaller teams. Its ecosystem also makes it approachable for developers who want to learn programming alongside game development.",
    "Unreal Engine is known for its powerful rendering capabilities and is widely associated with high-end 3D experiences. Its visual scripting system can also allow beginners to experiment with game logic before becoming comfortable with extensive programming.",
    "But the most important question isn't which engine is \"better.\"",
    "The better question is: **What are you trying to build?**",
    "A student interested in mobile or 2D development may approach the tools differently from someone interested in realistic 3D environments.",
    "The underlying principles of game development remain transferable: game mechanics, level design, player experience, programming, testing and iteration.",
    "The engine is the tool. The ability to design and build experiences is the skill."
  ),
  "what-does-a-game-designer-do": body(
    "A game designer asks questions such as:",
    "What should the player do? Why should they continue? How difficult should the next level be? What happens when they fail? How should the game reward progress?",
    "These questions are at the heart of game design.",
    "Designers work with programmers, artists and other team members to turn these ideas into playable systems.",
    "A designer may create mechanics, level structures, progression systems, quests, challenges and rules. They may then test those systems and change them based on how players respond.",
    "Good game design requires both creativity and analysis. A mechanic that looks exciting on paper might be frustrating when played. A level that seems simple might actually be confusing.",
    "This is why prototyping and playtesting are central to the discipline.",
    "Game design is ultimately the process of deliberately shaping **how a player experiences a game**."
  ),
};

export const LIBRARY_POSTS: BlogInput[] = [
  {
    slug: "how-a-game-actually-gets-made",
    title: "How a Game Actually Gets Made: From First Idea to Playable Experience",
    excerpt:
      "A game may begin with nothing more than an idea, but turning that idea into something people can actually play requires design, programming, art, testing and countless iterations.",
    category: "Game Development",
    publishedAt: "2026-07-14",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Game development is often imagined as a programmer sitting behind a computer and writing code. In reality, creating a game is a multidisciplinary process where different skills come together.",
      "The process usually begins with a concept. Developers define what the game is, who it is for and what makes it interesting. This is followed by game design, where mechanics, rules, levels, characters and progression are planned.",
      "Once the core idea is clear, developers create a prototype. A prototype doesn't need polished graphics. Its purpose is to answer one important question: **Is the game actually fun to play?**",
      "Programming then turns the design into an interactive experience. Artists and designers work on environments, characters, interfaces and animations while sound designers create the audio experience.",
      "Testing happens throughout development. Developers constantly identify bugs, confusing mechanics and frustrating experiences and then make changes.",
      "The final game is therefore not the result of one person's work. It is the result of a continuous cycle of **design → build → test → improve**.",
      "For students interested in game development, understanding this pipeline is often more important than immediately learning every tool."
    ),
  },
  {
    slug: "how-digital-marketing-helps-indian-businesses-find-customers",
    title: "How Digital Marketing Is Changing the Way Indian Businesses Find Customers",
    excerpt:
      "From local businesses to growing startups, digital channels have changed how Indian businesses attract, communicate with and retain customers.",
    category: "Digital Marketing",
    publishedAt: "2026-07-07",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "A business no longer needs to depend entirely on a physical location or traditional advertising to reach customers.",
      "A customer might discover a business through Google, see its Instagram content, watch a short video, visit its website and eventually contact the company through WhatsApp. These interactions can happen across several platforms before a purchase is made.",
      "This has made digital marketing much more than posting on social media.",
      "Modern marketers need to understand search, content, social media, websites, paid advertising, analytics and customer behaviour.",
      "For Indian businesses, local discovery is particularly important. A restaurant, coaching institute, retailer or service provider needs to be discoverable when potential customers are actively looking for something.",
      "The challenge is no longer simply getting attention. It is creating a consistent digital experience from the first interaction to the final conversion.",
      "That is why digital marketing has increasingly become a combination of **creative communication, technology and data**."
    ),
  },
  {
    slug: "what-to-learn-before-a-technology-career",
    title: "What Should You Actually Learn Before Starting a Career in Technology?",
    excerpt:
      "Technology careers are changing quickly. Instead of trying to learn everything, students should focus on building strong fundamentals and practical problem-solving ability.",
    category: "Careers",
    publishedAt: "2026-06-30",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "One of the biggest problems students face when entering technology is the sheer number of things they could learn.",
      "Programming languages, AI, cloud computing, design, cybersecurity, marketing, game development and dozens of other fields compete for attention.",
      "The solution isn't necessarily learning more. It is learning with direction.",
      "A strong technology learner should develop three foundations: understanding, practice and problem solving.",
      "Understanding means knowing why something works rather than simply memorising steps. Practice means actually building projects. Problem solving means being able to apply knowledge when the problem doesn't look exactly like something from a tutorial.",
      "Students should also create a portfolio of work. A completed website, game, marketing campaign or application demonstrates practical ability far better than a list of topics watched on YouTube.",
      "Technology education works best when learning moves from **concept → practice → project → feedback → improvement**."
    ),
  },
  {
    slug: "seo-is-more-than-keywords",
    title: "SEO Is More Than Keywords: Understanding How Search Visibility Works",
    excerpt:
      "Successful SEO isn't about filling pages with keywords. It is about helping search engines understand useful content and helping users find the information they need.",
    category: "Digital Marketing",
    publishedAt: "2026-06-23",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "SEO is often reduced to one idea: keywords.",
      "Keywords matter, but they are only one part of search visibility.",
      "A useful website needs clear information architecture, technically accessible pages, relevant content, descriptive metadata and a good user experience.",
      "The content itself also needs to answer genuine questions.",
      "For example, a student searching for \"game development course\" may have very different needs from someone searching for \"how to make a game in Unity.\"",
      "Understanding search intent helps marketers create content that matches what people are actually trying to accomplish.",
      "Technical factors also matter. Search engines need to be able to crawl and understand a website, while users need pages that load properly and work across devices.",
      "Good SEO therefore combines **content, technical implementation, information architecture and user intent**."
    ),
  },
  {
    slug: "projects-matter-more-than-tutorials",
    title: "Why Projects Matter More Than Tutorials When Learning Technology",
    excerpt:
      "Tutorials can teach concepts, but projects force learners to make decisions, solve problems and work without step-by-step instructions.",
    category: "Education",
    publishedAt: "2026-06-16",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Watching a tutorial can create a powerful illusion: everything looks easy because someone else is making all the decisions.",
      "Projects remove that safety net.",
      "When building something independently, students have to decide how a feature should work, what tools to use and how to fix problems when something breaks.",
      "That difficulty is exactly what makes projects valuable.",
      "A beginner building a simple website might encounter responsive-layout problems, broken navigation, image optimisation issues and unexpected browser behaviour.",
      "Those problems become learning opportunities.",
      "The goal shouldn't be to build the biggest possible project. A small finished project is often more useful than a huge unfinished one.",
      "Build something. Break it. Fix it. Improve it. Document it.",
      "That process develops the practical confidence needed for technology careers."
    ),
  },
  {
    slug: "from-likes-to-leads-marketing-metrics",
    title: "From Likes to Leads: Understanding What Marketing Metrics Really Mean",
    excerpt:
      "A campaign can receive thousands of impressions without generating meaningful business results. Understanding the difference between attention and outcomes is essential.",
    category: "Digital Marketing",
    publishedAt: "2026-06-09",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Not every marketing metric represents the same thing.",
      "Impressions tell you how often content was displayed. Reach tells you how many people were exposed to it. Engagement measures interactions.",
      "But none of these automatically means that someone became a customer.",
      "A marketer therefore needs to understand the entire journey.",
      "A person might first see a video, later visit a website, return through a search engine and eventually submit a form.",
      "Different channels can influence different stages.",
      "This is why marketers should connect campaign metrics to actual business objectives.",
      "For an ecommerce company, that might mean purchases. For an education institute, it could mean qualified enquiries or applications.",
      "The goal isn't to eliminate awareness metrics.",
      "It is to understand **which metrics matter at which stage of the customer journey**."
    ),
  },
  {
    slug: "build-a-technology-portfolio-that-gets-noticed",
    title: "How to Build a Technology Portfolio That Actually Gets Noticed",
    excerpt:
      "A portfolio should demonstrate how you think, build and solve problems, not simply display a collection of screenshots.",
    category: "Careers",
    publishedAt: "2026-06-02",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "A strong student portfolio should answer three questions:",
      "**What did you build? Why did you build it? What did you learn?**",
      "A simple project with a clear explanation can be more compelling than ten unfinished projects.",
      "For example, instead of simply showing a website, explain the problem it solves, the technology used, the design decisions and the challenges encountered during development.",
      "For game developers, a portfolio might include playable prototypes, level designs, mechanics demonstrations or development breakdowns.",
      "For digital marketers, it could include campaign concepts, content strategies, analytics interpretation or sample marketing plans.",
      "The portfolio becomes much stronger when it shows the process behind the final result."
    ),
  },
  {
    slug: "the-psychology-behind-a-good-game-loop",
    title: "The Psychology Behind a Good Game Loop",
    excerpt: "A compelling game loop gives players a reason to act, a meaningful response and a reason to try again.",
    category: "Game Design",
    publishedAt: "2026-05-26",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Many successful games are built around a simple repeated structure.",
      "The player performs an action, receives feedback, gains some form of reward or consequence, and then makes another decision.",
      "This is commonly described as the game loop.",
      "Consider a simple example: **Explore → Encounter → Act → Reward → Upgrade → Explore again.**",
      "The loop creates rhythm.",
      "If the actions become repetitive without meaningful variation, players can lose interest. If the system is too complicated, players may become confused.",
      "Game designers therefore spend considerable time balancing challenge, reward and progression.",
      "Small details can make a major difference: sound feedback, visual effects, progression systems and increasingly complex challenges can all strengthen the loop.",
      "Understanding game loops helps aspiring designers move beyond simply thinking about \"features\" and start thinking about **player behaviour**."
    ),
  },
  {
    slug: "content-marketing-more-content-is-not-always-better",
    title: "Content Marketing: Why Creating More Content Isn't Always Better",
    excerpt:
      "Publishing constantly doesn't guarantee results. Strong content strategies begin with audience needs, business objectives and distribution.",
    category: "Digital Marketing",
    publishedAt: "2026-05-19",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "The internet contains an enormous amount of content.",
      "Publishing another generic article doesn't automatically make a brand more visible.",
      "Effective content begins with a question: **What useful information can this brand provide to its audience?**",
      "A technology institute might create guides for students. A financial company might explain complicated financial concepts. A retailer might help customers make better purchasing decisions.",
      "The content becomes valuable because it solves a problem.",
      "Distribution also matters. A useful article can be repurposed into a video, social post, email or downloadable resource.",
      "The goal isn't simply creating more content.",
      "It is creating content that deserves to be consumed and shared."
    ),
  },
  {
    slug: "learning-a-skill-vs-being-able-to-use-it",
    title: "The Difference Between Learning a Skill and Being Able to Use It",
    excerpt:
      "Knowing the theory behind a technology doesn't necessarily mean you can use it effectively. Practical application is where knowledge becomes capability.",
    category: "Education",
    publishedAt: "2026-05-12",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "There is an important difference between recognising an answer and being able to produce one independently.",
      "A student may understand how a programming concept works when following an instructor but struggle when asked to use the same concept in a new project.",
      "This is normal.",
      "Real learning happens when students repeatedly move from guided examples to independent problems.",
      "That is why practical exercises, projects and experimentation are so important.",
      "The objective of education shouldn't be simply completing lessons.",
      "It should be developing the ability to take knowledge and apply it to unfamiliar situations."
    ),
  },
  {
    slug: "why-game-development-is-a-team-sport",
    title: "Why Game Development Is a Team Sport",
    excerpt:
      "Modern games bring together programmers, designers, artists, animators, writers, sound designers and producers.",
    category: "Game Development",
    publishedAt: "2026-05-05",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "A game may look like one finished product, but behind it can be a large network of specialists.",
      "Programmers build systems. Artists create visual assets. Designers define mechanics and experiences. Animators bring characters and objects to life. Sound designers create audio environments.",
      "Communication connects all of them.",
      "A programmer needs to understand what the designer is asking for. A designer needs to understand technical constraints. Artists need to work within performance and visual requirements.",
      "Students who want to enter game development should therefore learn more than their individual discipline.",
      "They should understand how their work fits into the larger production pipeline."
    ),
  },
  {
    slug: "social-media-marketing-is-not-digital-marketing",
    title: "Social Media Marketing Is Not the Same as Digital Marketing",
    excerpt:
      "Social media is one part of a much larger digital ecosystem that includes websites, search, email, advertising, analytics and customer relationships.",
    category: "Digital Marketing",
    publishedAt: "2026-04-28",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Social media is highly visible, so it is easy to mistake it for digital marketing as a whole.",
      "But digital marketing includes many other channels.",
      "A company may attract someone through search, educate them through its website, retarget them through advertising and communicate with them through email.",
      "Social media may play an important role, but it is only one component.",
      "Understanding how channels work together is what separates channel-specific posting from broader digital strategy."
    ),
  },
  {
    slug: "using-ai-without-letting-ai-do-the-learning",
    title: "How Students Can Use AI Without Letting AI Do the Learning for Them",
    excerpt:
      "AI can accelerate research, experimentation and feedback, but students still need to understand the concepts behind the output.",
    category: "Technology",
    publishedAt: "2026-04-21",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "AI tools can explain concepts, generate examples, review code and help students explore unfamiliar topics.",
      "That makes them powerful learning assistants.",
      "But there is a difference between using AI to understand something and using AI to avoid understanding it.",
      "If a student asks an AI tool to generate an entire application and submits it without studying the underlying code, very little learning has occurred.",
      "A stronger approach is to use AI interactively.",
      "Ask for an explanation. Try the concept independently. Compare your solution with the AI's suggestion. Ask why something failed.",
      "The technology becomes most useful when it increases the amount of experimentation a student can do.",
      "AI should reduce unnecessary friction, not remove the thinking process."
    ),
  },
  {
    slug: "what-makes-a-game-feel-good-to-play",
    title: "What Makes a Game Feel Good to Play?",
    excerpt:
      "Great gameplay often comes from dozens of small interactions between controls, feedback, difficulty, animation, sound and progression.",
    category: "Game Design",
    publishedAt: "2026-04-14",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Players don't experience a game as a list of technical features.",
      "They experience how it feels.",
      "A button needs to respond quickly. An attack needs satisfying feedback. A successful action should communicate that something happened.",
      "These details create what designers often call game feel.",
      "Animation, sound, camera movement, visual effects and input response can all contribute.",
      "Even a mechanically simple game can feel excellent when these elements work together.",
      "For aspiring game developers, learning to evaluate how something feels, not just whether it technically works, is an important design skill."
    ),
  },
  {
    slug: "why-short-form-video-changed-content-strategy",
    title: "Why Short-Form Video Changed Content Strategy",
    excerpt: "Short-form video has changed how brands think about attention, storytelling and content production.",
    category: "Digital Marketing",
    publishedAt: "2026-04-07",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Short videos force marketers to communicate quickly.",
      "The first few seconds become important because audiences can immediately move to another piece of content.",
      "But effective short-form content isn't simply about making everything shorter.",
      "It requires understanding the audience, creating a clear idea and delivering value quickly.",
      "A useful strategy can combine educational content, entertainment, demonstrations, behind-the-scenes material and product stories.",
      "The strongest brands don't necessarily create completely different ideas for every platform. They develop ideas that can be adapted across multiple formats."
    ),
  },
  {
    slug: "why-communication-skills-matter-in-technology",
    title: "Why Communication Skills Matter in Technology Careers",
    excerpt:
      "Technical ability gets you into the conversation, but communication helps you explain ideas, collaborate with teams and solve problems effectively.",
    category: "Careers",
    publishedAt: "2026-03-31",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Technology is often described as a technical field.",
      "But most real technology work happens between people.",
      "Developers explain technical decisions. Designers present concepts. Marketers communicate strategy. Project teams discuss priorities and constraints.",
      "Someone who can clearly explain a complicated idea has a significant practical advantage.",
      "Students should therefore practice presenting their projects, documenting their decisions and explaining problems in simple language.",
      "Technical knowledge and communication aren't competing skills.",
      "They strengthen each other."
    ),
  },
  {
    slug: "from-player-idea-to-game-mechanic-prototyping",
    title: "From Player Idea to Game Mechanic: How Designers Prototype",
    excerpt:
      "Before developers spend weeks building a feature, designers can test the underlying idea through prototypes.",
    category: "Game Design",
    publishedAt: "2026-03-24",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Prototyping allows game designers to experiment quickly.",
      "A prototype might contain simple shapes, temporary graphics and basic mechanics. It doesn't need to look beautiful.",
      "The purpose is to answer questions.",
      "Is the mechanic understandable? Is it enjoyable? Does it create interesting decisions? Does it become repetitive?",
      "Rapid prototypes allow teams to discover problems before investing significant production time.",
      "This is one reason game development is highly iterative.",
      "The first version of an idea is rarely the final version."
    ),
  },
  {
    slug: "building-a-digital-marketing-career-beyond-social-media",
    title: "Building a Digital Marketing Career: Skills Beyond Social Media",
    excerpt:
      "A modern digital marketer needs more than content-writing or social media skills. Strategy, analytics, search, advertising and technology all play a role.",
    category: "Digital Marketing",
    publishedAt: "2026-03-17",
    heroImage: null,
    heroImageAlt: "",
    author: AUTHOR,
    featured: false,
    sections: body(
      "Digital marketing has become a broad discipline.",
      "A marketer may work with search optimisation, paid advertising, social media, content, email, analytics, websites or marketing automation.",
      "Students entering the field don't need to master everything immediately.",
      "Instead, they can build a strong foundation and gradually specialise.",
      "For example, someone interested in creative work may explore content and social media, while someone who enjoys data may move toward performance marketing and analytics.",
      "The most valuable skill is the ability to understand **why a marketing activity is being performed and how its outcome should be measured**."
    ),
  },
];
