export const portfolioData = {
  personal: {
    name: "Amruta Bendale",
    title: "Full Stack AI Engineer",
    email: "bendaleamruta2000@gmail.com",
    linkedin: "https://www.linkedin.com/in/amruta-bendale",
    portfolio: "https://amruuta.github.io",
    github: "https://github.com/amruuta",
    phone: "+91-8237513503",
    medium: "",
    resume: import.meta.env.VITE_RESUME_URL,
    location: "India",
    summary:
      "Full Stack AI Engineer with 4+ years of experience building and modernizing enterprise systems for trading, risk management, and AML transaction monitoring. Skilled in distributed backend services, event-driven architectures, and ETL pipelines for high-throughput enterprise workflows. Delivered backend features from system design to production while migrating legacy platforms and building full-stack AI applications with Python-based agentic frameworks and modern UI stacks.",
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
      "DeepAgent",
      "SpringAI",
      "MCP",
      "Prompt Engineering",
      "Context Engineering",
      "RAG",
      "Vector Database",
      "Claude",
      "OpenAI"
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
        "Modernized a high-volume Anti-Money Laundering (AML) platform processing millions of financial transactions by migrating a legacy JBoss EAP application to a standalone Spring Boot service with embedded Tomcat, REST APIs, and HikariCP, improving batch transaction throughput by 40–50%.",
        "As a part of the AML platform modernization, upgraded the messaging layer by migrating from ActiveMQ Artemis to embedded ActiveMQ Classic using Spring JMS, and integrated Kafka producers to stream processed transaction events from internal JMS queues to downstream fraud investigation and case-management system.",
        "Migrated a legacy TIBCO Enterprise Message Service queue consumer from JBoss to a standalone Spring Boot JMS service, improving processing performance.",
        "Transitioned a financial transactions processing data pipeline from JBoss application to standalone Spring Batch execution.",
        "Led a cross-platform modernization initiative across the AML platform, JBoss based TIBCO consumer, and Spring Batch ingestion pipeline by upgrading all components from Java 8 to Java 17, resolving cross-module dependency conflicts and modernizing the runtime stack.",
        "Implemented a multi-module Maven architecture with a shared common library across three applications, enabling independent builds, modular code reuse, and full local execution that reduced average debugging time by ~2 hours per session.",
        "Eliminated JBoss licensing across 30 application server instances, which saved $90,000 annually.",
        "Improved development productivity by ~50% leveraging AI-assisted tools for debugging, code generation, and unit test scaffolding tools.",
        "Supported production releases and post deployment stabilization across multiple applications and environments, leading root cause analysis, hotfixes and resolving code vulnerabilities to ensure system reliability and operational continuity."
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
      shortName: "Data Analytics",
      // Which animated demo plays in this project's folder.
      // See DEMOS in src/components/Projects.tsx.
      demo: "data-analytics",
      description:
        "Built a fully functional data analytics chatbot with a data pipeline that helps with data analysis generating complex SQL queries, converting data to csv, generating graphs and PowerPoint presentations while managing chat history and user authentication.",
      github: "https://github.com/amruuta/DataAnalysisAgent",
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
    {
      name: "AI Meeting Assistant – Real-Time RAG",
      shortName: "AI Meeting Assistant",
      demo: "presenter-assistant",
      description:
        "Built a real-time voice-to-text AI agent that surfaces answers from a presenter's own documents mid-call — captures system-level audio to run on Zoom, Teams and Meet with no proprietary SDK or vendor lock-in, transcribes via Whisper ASR, auto-detects participant questions, and streams RAG-grounded answers with source citations to a private UI over WebSockets; pluggable vector search (FAISS/NumPy) and a provider-agnostic multi-LLM layer.",
      github: "https://github.com/amruuta/ai-meeting-assistant",
      technologies: [
        "Python",
        "FastAPI",
        "WebSockets",
        "Whisper (ASR)",
        "RAG",
        "VectorDB",
        "Prompt Engineering",
        "LLM",
        "React",
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
    bio: "Full Stack AI Engineer with 4+ years of experience building and modernizing enterprise systems for trading, risk management, and AML transaction monitoring. Skilled in distributed backend services, event-driven architectures, and ETL pipelines for high-throughput enterprise workflows. Delivered backend features from system design to production while migrating legacy platforms and building full-stack AI applications with Python-based agentic frameworks and modern UI stacks.",
    stats: [
      { value: "4+", label: "Years", desc: "Full Stack AI Engineering" },
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
