import type { PortfolioData } from "../types/portfolio";

const portfolioData: PortfolioData = {
  personal: {
    name: "Amruta Bendale",
    title: "Backend Engineer",
    email: "bendaleamruta2000@gmail.com",
    linkedin: "https://www.linkedin.com/in/amruta-bendale",
    github: "",
    leetcode: "",
    medium: "",
    phone: "+91-8237513503",
    location: "Pune, India",
    resumeUrl: import.meta.env.VITE_RESUME_URL || "#contact",
    summary:
      "Backend Engineer with ~4 years of experience building and modernizing financial systems across trading, risk management, and AML transaction monitoring platforms. Experienced in developing distributed backend services, event-driven systems, and ETL for high-throughput financial workflows. Proven track record of delivering end-to-end backend features from system design to production deployment while upgrading legacy enterprise platforms. Actively exploring and building Agentic AI using diverse Python frameworks.",
  },

  skills: {
    languages: ["Java", "Python", "SQL (PostgreSQL, Oracle)", "Shell"],
    genai: [
      "Agentic AI",
      "Prompt Engineering",
      "RAG",
      "Anthropic Claude with Amazon Bedrock",
    ],
    agenticai: ["LangChain", "MCP", "Prompt Engineering", "RAG"],
    backend: [
      "Spring Boot",
      "Spring Batch",
      "Hibernate",
      "Kafka",
      "JMS",
      "ActiveMQ",
      "TIBCO EMS",
      "JBoss",
      "Tomcat",
    ],
    frontend: ["React"],
    cloud: ["AWS", "Docker", "Jenkins", "Git", "GitHub", "GitLab"],
    engineering: [
      "API Design and Development",
      "Distributed Systems",
      "Event-Driven Architecture",
      "Microservices",
      "System Design",
      "Data Structures and Algorithms",
      "SDLC",
      "AI-Assisted Development Tools",
    ],
    data: ["ETL", "Data Pipelines", "Pandas", "PostgreSQL", "Oracle"],
  },

  experience: [
    {
      company: "Western Union",
      position: "Junior Associate (Java Developer)",
      duration: "Mar 2025 - Present",
      location: "Pune, India",
      responsibilities: [
        "Led modernization of an AML transaction monitoring platform processing millions of financial transactions by replacing a legacy JBoss EAP system with a standalone Spring Boot service using embedded Tomcat, improving batch throughput by 40-50%.",
        "Replaced JBoss-managed web components with Spring Boot REST APIs and migrated JNDI DataSources to HikariCP connection pools, enabling lightweight self-contained services and removing application server dependencies.",
        "Designed and developed the messaging layer by migrating from ActiveMQ Artemis to embedded ActiveMQ Classic with Spring JMS, and integrated Kafka producers to stream transaction events to downstream fraud investigation systems.",
        "Migrated a TIBCO EMS MDB consumer to a Spring Boot JMS service, improving message processing performance and reducing memory usage by eliminating EJB container overhead.",
        "Transitioned a Spring Batch financial transaction processing pipeline from JBoss-hosted deployment to standalone execution while preserving partitioned jobs, DB2 transactional staging, and Drools-based rule processing.",
        "Upgraded AML API, TIBCO JMS consumer, and batch components from Java 8 to Java 17, resolving cross-module dependency conflicts and modernizing the runtime stack.",
        "Implemented a multi-module Maven architecture separating API, batch, and messaging services with a shared common library to enable independent builds, modular reuse, and full local execution.",
        "Eliminated proprietary JBoss licensing across 26 production application server instances, delivering significant infrastructure cost savings.",
        "Improved development productivity by ~50% using AI-assisted tools for debugging, code generation, and unit test scaffolding.",
      ],
    },
    {
      company: "CLSA",
      position: "Software Engineer (Fullstack)",
      duration: "July 2022 - Feb 2025",
      location: "Pune, India",
      responsibilities: [
        "Developed custom Java solutions and configurations for a trading and risk management platform, implementing business workflows, financial reporting features, and live trading data integrations.",
        "Resolved data discrepancies and migration challenges during a platform version upgrade, ensuring accurate financial data transition and minimizing operational risk.",
        "Contributed to a Spring Boot-based Initial Margin application by implementing report generation logic and using Hibernate for efficient PostgreSQL data retrieval.",
        "Developed a React-based UI for the Initial Margin application, enabling users to manage configuration data and review aggregated processing summaries via Spring Boot REST APIs.",
        "Designed and implemented a Python-based ETL utility to extract equity trading data, transform and merge it with trading reports, and automate report generation, reducing DOI report time from 8-10 hours to about 1 hour.",
        "Built a Spring Boot-based integration utility JAR encapsulating trading platform APIs, enabling multiple applications to consume platform data through a shared interface without individual platform JAR dependencies.",
        "Used AI-assisted development tools to improve engineering productivity.",
      ],
    },
    {
      company: "Persistent Systems",
      position: "Intern",
      duration: "Jan 2022 - June 2022",
      location: "Pune, India",
      responsibilities: [
        "Successfully finished an extensive curriculum that included Java, Spring Boot, React.js, MySQL, Git, and Object-Oriented Programming.",
      ],
    },
  ],

  education: [
    {
      degree: "Bachelor of Engineering",
      field: "Computer Science",
      institution: "Savitribai Phule Pune University",
      year: "Aug 2018 - May 2022",
      achievements: ["CGPA: 9.17/10"],
    },
  ],

  projects: [
    {
      name: "Data Analysis Chatbot",
      description:
        "AI-powered data analysis assistant with natural language querying and automated analytics outputs",
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
      highlights: [
        "Built a fully functional data analysis AI agent with a data pipeline for natural language based analysis workflows.",
        "Enabled users to generate complex SQL queries, export data to CSV, and create charts automatically.",
      ],
    },
  ],

  certifications: [{ name: "Anthropic Claude with Amazon Bedrock (Anthropic)", url: null }],

  awards: [
    "All-Star Award - Led the JBoss to Spring Boot modernization of the AML transaction monitoring platform.",
    "All-Star Award - Contributed to removing JBoss dependencies from batch and TIBCO consumer services, eliminating enterprise licensing costs.",
  ],

  publications: [],
};

export default portfolioData;
