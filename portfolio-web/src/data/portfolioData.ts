export const portfolioData = {
  personal: {
    name: "Amruta Bendale",
    title: "Backend Engineer",
    email: "bendaleamruta2000@gmail.com",
    linkedin: "https://www.linkedin.com/in/amruta-bendale",
    portfolio: "https://amruuta.github.io",
    github: "",
    phone: "+91-8237513503",
    medium: "",
    resume: import.meta.env.VITE_RESUME_URL,
    location: "India",
    summary:
      "Backend Engineer with 4 years of experience building and modernizing financial systems across trading, risk management, and AML transaction monitoring platforms. Experienced in developing distributed backend services, event-driven systems, and ETL for high-throughput financial workflows. Proven track record of delivering end-to-end backend features from system design to production deployment while upgrading legacy enterprise platforms. Actively exploring and building Agentic AI using diverse Python frameworks.",
  },

  skills: {
    languages: [
      "Java",
      "Python",
      "SQL (PostgreSQL, Oracle)",
      "Shell",
    ],
    backendFrameworks: [
      "Spring Boot",
      "Spring Batch",
      "Hibernate",
      "Kafka",
      "JMS",
      "ActiveMQ",
      "TIBCO EMS",
      "JBoss",
      "Tomcat",
      "FastAPI",
      "React",
    ],
    agenticAI: [
      "LangChain",
      "MCP",
      "Prompt Engineering",
      "RAG",
    ],
    cloudDevOps: [
      "AWS",
      "Docker",
      "Jenkins",
      "Git",
      "GitHub",
      "GitLab",
    ],
    softwareEngineering: [
      "API Design & Development",
      "Distributed Systems",
      "Event-Driven Architecture",
      "Microservices",
      "System Design",
      "Data Structures & Algorithms",
      "SDLC",
      "AI-Assisted Development (Gemini Antigravity, GitHub Copilot, ChatGPT)",
    ],
  },

  experience: [
    {
      company: "Western Union",
      position: "Junior Associate",
      duration: "Mar 2025 – Present",
      location: "Pune, India",
      responsibilities: [
        "Led modernization of an AML transaction monitoring platform processing millions of financial transactions — replaced legacy JBoss EAP with standalone Spring Boot + embedded Tomcat, improving batch throughput by 40-50%.",
        "Replaced JBoss-managed web components with Spring Boot REST APIs; migrated JNDI DataSources to HikariCP connection pools, removing application server dependencies.",
        "Designed messaging layer by migrating from ActiveMQ Artemis to embedded ActiveMQ Classic with Spring JMS, and integrated Kafka producers to stream transaction events to downstream fraud investigation systems.",
        "Migrated a TIBCO EMS MDB consumer to a Spring Boot JMS service, reducing memory usage by eliminating EJB container overhead.",
        "Upgraded backend services from Java 8 to Java 17 to improve maintainability and runtime compatibility.",
        "Implemented multi-module Maven architecture (API, batch, messaging, shared lib) enabling independent builds and full local execution.",
        "Eliminated proprietary JBoss licensing across 26 production instances, which saved $80,000 annually.",
        "Improved development productivity by ~50% using AI-assisted tools (Gemini Antigravity, GitHub Copilot, ChatGPT) for debugging, code generation, and unit test scaffolding.",
      ],
    },
    {
      company: "CLSA",
      position: "Software Engineer",
      duration: "Jul 2022 – Feb 2025",
      location: "Pune, India",
      responsibilities: [
        "Developed custom Java solutions and configurations for a trading and risk management platform, implementing business workflows, financial reporting features, and integrations for processing live trading data and supporting risk analysis.",
        "Resolved data discrepancies and migration challenges during the platform version upgrade, ensuring accurate financial data transition and minimizing operational risk.", 
        "Contributed to a Spring Boot–based Initial Margin application, implementing report-generation logic and leveraging Hibernate for efficient PostgreSQL data retrieval.",
        "Developed a React-based UI for the Initial Margin application, enabling users to manage system configuration data and view aggregated processing summaries via Spring Boot REST APIs.", 
        "Designed and implemented a Python-based ETL utility to extract equity trading data from database, transform and merge it with trading reports, and automate report generation workflow, reducing DOI report generation time from 8–10 hours to ~1 hour.", 
        "Developed a Spring Boot–based integration utility JAR encapsulating trading platform APIs, enabling multiple applications to access platform data through a shared interface while eliminating the need for individual platform JAR dependencies in each project.", 
        "Used AI-assisted tools (Gemini Antigravity, GitHub Copilot, ChatGPT) to improve development productivity.",
      ],
    },
    {
      company: "Persistent Systems",
      position: "Intern",
      duration: "Jan 2022 – June 2022",
      location: "Pune, India",
      responsibilities: [
        "Successfully finished an extensive curriculum that included Java, Spring Boot, React.js, MySQL, Git, and Object-Oriented Programming.",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Engineering — Computer Science",
      institution: "Savitribai Phule Pune University",
      year: "Aug 2018 – May 2022",
      achievement: "CGPA: 9.17 / 10",
    },
  ],

  projects: [
    {
      name: "Data Analytics Chatbot",
      description:
        "AI-powered data analysis assistant enabling natural language querying over datasets. Users can generate complex SQL queries, export data to CSV, and create charts automatically through a conversational interface.",
      technologies: [
        "Python",
        "FastAPI",
        "LangChain Agent",
        "Prompt Engineering",
        "Plotly",
        "Pandas",
        "React",
        "Redis",
      ],
    },
  ],

  certifications: [
    { name: "Anthropic Claude with Amazon Bedrock (Mar 2026)", issuer: "Anthropic", verificationUrl: "https://verify.skilljar.com/c/u7wdd8eyayit" },
  ],

  awards: [
    "All-Star Award (Q4 2025) — Led the JBoss to Spring Boot modernization of the AML transaction monitoring platform.",
    "All-Star Award (Q1 2026) — Contributed to removing JBoss dependencies from batch and TIBCO consumer services, eliminating enterprise licensing costs.",
    "Playmaker Award (Q4 2025) — Recognized for strong delivery during migration and performance improvement initiatives.",
  ],

  about: {
    bio: "Backend Engineer with 4 years of experience building and modernizing financial systems across trading, risk management, and AML transaction monitoring platforms. Experienced in developing distributed backend services, event-driven systems, and ETL for high-throughput financial workflows. Proven track record of delivering end-to-end backend features from system design to production deployment while upgrading legacy enterprise platforms. Actively exploring and building Agentic AI using diverse Python frameworks.",
    stats: [
      { value: "4+", label: "Years", desc: "Backend Engineering" },
      { value: "2", label: "Companies", desc: "Production Systems" },
      { value: "26", label: "Instances", desc: "Modernized & Deployed" },
    ],
    keyShipped: [
      "Modernized AML transaction monitoring platform from JBoss EAP to Spring Boot (40-50% throughput improvement)",
      "Eliminated proprietary JBoss licensing across 26 production instances, which saved $80,000 annually.",
      "Architected Kafka-based event streaming layer for trading platforms processing millions of financial transactions",
      "Built Python ETL utility reducing daily report generation time from 8-10 hours to ~1 hour",
      "Designed multi-module Maven architecture enabling independent builds and full local execution",
    ],
    capabilities: [
      { title: "Distributed Systems", tag: "Backend" },
      { title: "Event-Driven Arch", tag: "Kafka/JMS" },
      { title: "Microservices", tag: "Spring Boot" },
      { title: "Cloud Infrastructure", tag: "AWS/Docker" },
      { title: "Agentic AI", tag: "LLM Systems" },
    ],
    mindset: [
      "Systems-first thinking",
      "Write code for humans, not machines",
      "Optimize for scale AND clarity",
      "Measure impact, not just lines of code",
      "Embrace modern tooling (AI-assisted dev)",
    ],
  },
};
