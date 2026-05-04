import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

const apiUrl = import.meta.env.VITE_PORTFOLIO_BE_CHAT_API;

const getFallbackResponse = (message: string) => {
  const lowerMessage = (message || "").toLowerCase();

  if (lowerMessage.includes("genai") || lowerMessage.includes("agentic")) {
    return `🤖 **Agentic AI & GenAI Experience:**\nActively exploring and building Agentic AI using diverse Python frameworks like LangChain. Built a Data Analytics Chatbot using Python, FastAPI, LangChain Agent, and Prompt Engineering to generate complex SQL queries and charts.`;
  }

  if (lowerMessage.includes("java") || lowerMessage.includes("spring")) {
    return `☕ **Java & Backend Experience:**\nDeveloped custom Java solutions, modernized AML platforms from JBoss EAP to Spring Boot (improving batch throughput by 40-50%), integrated Kafka/JMS, and created multi-module Spring Boot microservices.`;
  }

  if (lowerMessage.includes("hi") || lowerMessage.includes("hello")) {
    return `👋 Hi! I'm Amruta's AI assistant. Amruta is a Backend Engineer with 4 years of experience building and modernizing financial systems using Java, Spring Boot, Python, and exploring Agentic AI. Feel free to ask about her experience, skills, projects, or anything else!`;
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
    return `**Contact Information** 📧\n\n**Email:** [bendaleamruta2000@gmail.com](mailto:bendaleamruta2000@gmail.com)\n**Phone:** +91-8237513503\n**LinkedIn:** [linkedin.com/in/amruta-bendale](https://www.linkedin.com/in/amruta-bendale)\n**Location:** Pune, India`;
  }

  if (lowerMessage.includes("award")) {
    return `🏆 **Awards**\n\n- **All-Star Award (Q4 2025):** Led the JBoss to Spring Boot modernization of the AML transaction monitoring platform.\n- **All-Star Award (Q1 2026):** Contributed to removing JBoss dependencies, eliminating enterprise licensing costs.\n- **Playmaker Award (Q4 2025):** Recognized for strong delivery during migration and performance improvement initiatives.`;
  }

  if (lowerMessage.includes("certif")) {
    return `📜 **Certifications**\n\n- Anthropic Claude with Amazon Bedrock (Anthropic - Mar 2026)`;
  }

  if (lowerMessage.includes("skill") || lowerMessage.includes("tech") || lowerMessage.includes("language")) {
    return `💻 **Skills**\n\n- **Languages:** Java, Python, SQL (PostgreSQL, Oracle), Shell\n- **Backend:** Spring Boot, Spring Batch, Hibernate, Kafka, JMS, ActiveMQ, FastAPI\n- **Agentic AI:** LangChain, MCP, Prompt Engineering, RAG\n- **Cloud & DevOps:** AWS, Docker, Jenkins, Git/GitHub/GitLab\n- **Engineering:** API Design, Distributed Systems, Event-Driven Architecture, Microservices`;
  }

  if (lowerMessage.includes("experience") || lowerMessage.includes("work") || lowerMessage.includes("job")) {
    return `💼 **Experience**\n\n**Western Union | Junior Associate**\nPune, India | Mar 2025 – Present\n- Led modernization of an AML transaction monitoring platform (improving batch throughput by 40-50%).\n- Designed messaging layer using Kafka and Spring JMS.\n- Eliminated proprietary JBoss licensing across 26 production instances, which saved $80,000 annually.\n\n**CLSA | Software Engineer**\nPune, India | Jul 2022 – Feb 2025\n- Developed custom Java solutions for a trading platform.\n- Designed a Python-based ETL utility reducing report generation time from 8 hours to ~1 hour.\n\n**Persistent Systems | Intern**\nPune, India | Jan 2022 - June 2022`;
  }

  if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("university")) {
    return `🎓 **Education**\n\n**Bachelor of Engineering - Computer Science**\nSavitribai Phule Pune University\nAug 2018 - May 2022\n- CGPA: 9.17/10`;
  }

  if (lowerMessage.includes("project")) {
    return `🚀 **Projects**\n\n**Data Analytics Chatbot**\nTechnologies: Python, FastAPI, LangChain Agent, Prompt Engineering, Plotly, Pandas, React, Redis\n- AI-powered data analysis assistant enabling natural language querying over datasets. Users can generate complex SQL queries, export data to CSV, and create charts automatically through a conversational interface.`;
  }

  if (lowerMessage.includes("about")) {
    return `👤 **About Amruta**\n\nAmruta is a Backend Engineer with 4 years of experience building and modernizing financial systems across trading, risk management, and AML transaction monitoring platforms. Experienced in developing distributed backend services, event-driven systems, and ETL for high-throughput financial workflows. Proven track record of delivering end-to-end backend features from system design to production deployment while upgrading legacy enterprise platforms. Actively exploring and building Agentic AI using diverse Python frameworks.`;
  }

  return `That's a great question! 😊\n\nExplore different sections of Amruta's portfolio:\n\n**📌 Quick Links**\n- 👤 **About** - Background\n- 💻 **Skills** - Technical expertise\n- 💼 **Experience** - Work history\n- 🚀 **Projects** - What Amruta has built\n- 📧 **Contact** - Get in touch\n\nOr ask me something specific about Amruta's Backend or AI experience!`;
};

const quickActions = [
  { label: "☕ Backend Exp", message: "Tell me about Amruta's overall experience" },
  { label: "🤖 AI Experience", message: "What is Amruta's experience with AI?" },
  { label: "💻 Tech Stack", message: "What technologies has Amruta worked with?" },
  { label: "📧 Contact Info", message: "How can I contact Amruta?" },
];

const markdownComponents = {
  a: ({ node, ...props }: any) => (
    <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold" />
  ),
  p: ({ node, ...props }: any) => <p {...props} className="mb-2" />,
  ul: ({ node, ...props }: any) => <ul {...props} className="list-disc list-inside mb-2" />,
  li: ({ node, ...props }: any) => <li {...props} className="mb-1" />,
  strong: ({ node, ...props }: any) => <strong {...props} className="font-bold text-black dark:text-white" />,
};

interface Message {
  role: "user" | "bot";
  content: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "👋 Hi! I'm Amruta's AI assistant. How can I help you learn more about her work?" },
    { role: "bot", content: "Feel free to ask about Amruta's experience, projects, or technical skills!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => setIsOpen((o) => !o);

  const addUserMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "user", content }]);
  };

  const addBotMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: "bot", content }]);
  };

  const sendToApiOrFallback = async (nextMessages: Message[]) => {
    setIsTyping(true);
    try {
      if (!apiUrl) throw new Error("No API URL configured");
      const response = await axios.post(apiUrl, {
        messages: nextMessages.map((m) => ({
          role: m.role === "bot" ? "assistant" : m.role,
          content: m.content,
        })),
      });
      if (response?.data?.response) {
        addBotMessage(response.data.response);
      } else {
        throw new Error("No valid response from API");
      }
    } catch (e) {
      const lastUser = nextMessages.filter((m) => m.role === "user").slice(-1)[0]?.content || "";
      addBotMessage(getFallbackResponse(lastUser));
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addUserMessage(text);
    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    await sendToApiOrFallback(nextMessages);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleQuickAction = async (msg: string) => {
    addUserMessage(msg);
    const nextMessages: Message[] = [...messages, { role: "user", content: msg }];
    await sendToApiOrFallback(nextMessages);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Chatbot Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-white dark:bg-[#1a1a1a] border-4 border-black dark:border-white shadow-[8px_8px_0px_#000000] dark:shadow-[8px_8px_0px_#ffffff] transition-all duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b-4 border-black dark:border-white bg-[#e6bfd1] dark:bg-[#2A2A2A]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 text-sm rounded-full border-2 border-black flex items-center justify-center font-bold bg-white text-black">
                AB
              </div>
              <div>
                <h3 className="font-bold text-base leading-none m-0 text-black dark:text-white"></h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 border border-black inline-block"></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black dark:text-gray-300">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="w-7 h-7 flex items-center justify-center border-2 border-black bg-white hover:bg-gray-200 active:scale-95 transition-transform"
            >
              <span className="font-bold text-black leading-none">—</span>
            </button>
          </div>

          {/* Messages */}
          <div data-lenis-prevent="true" className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm bg-[#fafafa] dark:bg-[#1a1a1a] scrollbar-hide">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 border-2 border-black dark:border-gray-500 ${msg.role === "user" ? "bg-[#c4a9f3] text-black" : "bg-white dark:bg-[#2d2d2d] dark:text-gray-200 shadow-[4px_4px_0px_#000000] dark:shadow-[4px_4px_0px_#666666]"}`}>
                  {msg.role === "bot" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkBreaks]}
                      components={markdownComponents}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap m-0 font-medium">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3 border-2 border-black bg-white shadow-[4px_4px_0px_#000000]">
                  <span className="font-bold animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions & Input area */}
          <div className="border-t-4 border-black dark:border-white bg-white dark:bg-[#1a1a1a] p-3 flex flex-col gap-3">
            <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
              {quickActions.map((qa) => (
                <button
                  key={qa.label}
                  onClick={() => handleQuickAction(qa.message)}
                  className="whitespace-nowrap px-3 py-1.5 border-2 border-black text-xs font-bold bg-[#e6ce8a] hover:bg-[#d8be75] active:scale-95 transition-transform text-black"
                >
                  {qa.label}
                </button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border-2 border-black p-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black dark:bg-[#2d2d2d] dark:text-white dark:border-gray-400"
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={sendMessage}
                className="px-4 border-2 border-black bg-[#2563EB] hover:bg-blue-700 text-white font-bold transition-colors active:scale-95 flex items-center justify-center shadow-[4px_4px_0px_#000000]"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full border-4 border-black bg-[#A96EC4] text-white flex items-center justify-center text-2xl shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-y-1 transition-all hover:bg-[#9758b4]"
          title="Chat with me"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
