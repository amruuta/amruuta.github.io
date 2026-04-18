export const portfolioData = {
  personal: {
    name: "Amruta Bendale",
    title: "Backend Engineer",
    email: "bendaleamruta2000@gmail.com",
    linkedin: "https://www.linkedin.com/in/amruta-bendale",
    github: "",
    phone: "+91-8237513503",
    location: "Pune, India",
    summary:
      "Backend Engineer with ~4 years of experience building and modernizing financial systems across trading, risk management, and AML transaction monitoring platforms. Experienced in developing distributed backend services, event-driven systems, and ETL for high-throughput financial workflows. Proven track record of delivering end-to-end backend features from system design to production deployment while upgrading legacy enterprise platforms. Actively exploring and building Agentic AI using diverse Python frameworks.",
  },

  skills: {
    backend: [
      "Java",
      "Python",
      "Spring Boot",
      "Spring Batch",
      "Hibernate",
      "Kafka",
      "JMS / ActiveMQ",
      "TIBCO EMS",
      "REST APIs",
      "Microservices",
    ],
    cloudDevOps: [
      "AWS",
      "Docker",
      "Jenkins",
      "Git",
      "GitHub",
      "GitLab",
      "Maven",
      "JBoss",
      "Tomcat",
    ],
    aiData: [
      "Agentic AI",
      "LangChain",
      "MCP",
      "RAG",
      "Prompt Engineering",
      "Anthropic Claude / Bedrock",
      "Pandas",
      "PostgreSQL",
      "Oracle",
      "ETL",
    ],
  },

  experience: [
    {
      company: "Western Union",
      position: "Junior Associate — Java Developer",
      duration: "Mar 2025 – Present",
      location: "Pune, India",
      responsibilities: [
        "Led modernization of an AML transaction monitoring platform processing millions of financial transactions — replaced legacy JBoss EAP with standalone Spring Boot + embedded Tomcat, improving batch throughput by 40-50%.",
        "Replaced JBoss-managed web components with Spring Boot REST APIs; migrated JNDI DataSources to HikariCP connection pools, removing application server dependencies.",
        "Designed messaging layer by migrating from ActiveMQ Artemis to embedded ActiveMQ Classic with Spring JMS, and integrated Kafka producers to stream transaction events to downstream fraud investigation systems.",
        "Migrated a TIBCO EMS MDB consumer to a Spring Boot JMS service, reducing memory usage by eliminating EJB container overhead.",
        "Implemented multi-module Maven architecture (API, batch, messaging, shared lib) enabling independent builds and full local execution.",
        "Eliminated proprietary JBoss licensing across 26 production instances, delivering significant infrastructure cost savings.",
        "Improved development productivity by ~50% using AI-assisted tools for debugging, code generation, and unit test scaffolding.",
      ],
    },
    {
      company: "CLSA",
      position: "Software Engineer — Full Stack",
      duration: "July 2022 – Feb 2025",
      location: "Pune, India",
      responsibilities: [
        "Developed custom Java solutions for a trading and risk management platform — implementing business workflows, financial reporting, and live trading data integrations.",
        "Contributed to a Spring Boot-based Initial Margin application: implemented report generation logic and PostgreSQL data retrieval via Hibernate.",
        "Built a React-based UI for the Initial Margin application enabling users to manage configuration and review aggregated processing summaries via Spring Boot REST APIs.",
        "Designed a Python ETL utility to extract equity trading data, merge with trading reports, and automate report generation — reducing DOI report time from 8-10 hours to ~1 hour.",
        "Built a Spring Boot integration utility JAR encapsulating trading platform APIs, enabling multiple applications to consume platform data through a shared interface.",
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
      name: "Data Analysis Chatbot",
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
    { name: "Anthropic Claude with Amazon Bedrock", issuer: "Anthropic" },
  ],

  awards: [
    "All-Star Award — Led the JBoss to Spring Boot modernization of the AML transaction monitoring platform.",
    "All-Star Award — Contributed to removing JBoss dependencies from batch and TIBCO consumer services, eliminating enterprise licensing costs.",
  ],

  about: {
    bio: "I'm a backend engineer with a proven track record of architecting and scaling high-throughput financial systems. I don't just write code—I design systems. Whether it's eliminating legacy infrastructure, modernizing monoliths, or building AI-powered workflows, I thrive on solving complex architectural challenges.",
    stats: [
      { value: "4+", label: "Years", desc: "Backend Engineering" },
      { value: "2", label: "Companies", desc: "Production Systems" },
      { value: "26", label: "Instances", desc: "Modernized & Deployed" },
    ],
    keyShipped: [
      "Modernized AML transaction monitoring platform from JBoss EAP to Spring Boot (40-50% throughput improvement)",
      "Eliminated proprietary JBoss licensing across 26 production instances, saving significant infrastructure costs",
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
