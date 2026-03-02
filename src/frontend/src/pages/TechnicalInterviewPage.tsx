import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  Building2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Users,
  Video,
} from "lucide-react";
import { useState } from "react";

interface CompanyData {
  name: string;
  logo: string;
  color: string;
  package: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: string[];
}

const companyData: CompanyData[] = [
  {
    name: "TCS",
    logo: "💼",
    color: "from-blue-400 to-blue-600",
    package: "7 LPA",
    difficulty: "Easy",
    questions: [
      "What is the difference between a process and a thread?",
      "Explain OOPS concepts with real-world examples.",
      "What is normalization in databases? Explain 1NF, 2NF, 3NF.",
      "Write a program to reverse a string without using built-in functions.",
      "What is the difference between TCP and UDP?",
      "Explain the concept of recursion with an example.",
      "What are the different types of joins in SQL?",
      "What is a deadlock? How can it be prevented?",
    ],
  },
  {
    name: "Infosys",
    logo: "🏢",
    color: "from-indigo-500 to-indigo-700",
    package: "6.5 LPA",
    difficulty: "Easy",
    questions: [
      "What is the difference between abstract class and interface?",
      "Explain the MVC architecture.",
      "What is a foreign key? How is it different from a primary key?",
      "Write a program to find the factorial of a number.",
      "What is polymorphism? Give an example.",
      "Explain the concept of inheritance in OOP.",
      "What is the difference between stack and heap memory?",
      "What are design patterns? Name a few common ones.",
    ],
  },
  {
    name: "Wipro",
    logo: "🌐",
    color: "from-purple-500 to-purple-700",
    package: "6 LPA",
    difficulty: "Easy",
    questions: [
      "What is the difference between == and === in JavaScript?",
      "Explain the concept of closures in JavaScript.",
      "What is REST API? What are its principles?",
      "Write a program to check if a number is palindrome.",
      "What is the difference between GET and POST methods?",
      "Explain ACID properties in databases.",
      "What is a binary search tree? How does it work?",
      "What is the time complexity of quicksort?",
    ],
  },
  {
    name: "Accenture",
    logo: "⚡",
    color: "from-violet-500 to-violet-700",
    package: "8 LPA",
    difficulty: "Medium",
    questions: [
      "What is Agile methodology? How does it differ from Waterfall?",
      "Explain microservices architecture.",
      "What is Docker? How is it different from a virtual machine?",
      "Write a program to find the second largest element in an array.",
      "What is the difference between synchronous and asynchronous programming?",
      "Explain the concept of API versioning.",
      "What is CI/CD? Name some tools used for it.",
      "What is the difference between SQL and NoSQL databases?",
    ],
  },
  {
    name: "Google",
    logo: "🔍",
    color: "from-blue-500 to-green-500",
    package: "45 LPA",
    difficulty: "Hard",
    questions: [
      "Design a URL shortening service like bit.ly.",
      "Explain the Google File System (GFS) architecture.",
      "How would you design a distributed cache?",
      "Write an algorithm to find the shortest path in a weighted graph.",
      "What is MapReduce? How does it work?",
      "Design a system to handle 1 million concurrent users.",
      "Explain consistent hashing and its use cases.",
      "How does Google's PageRank algorithm work?",
    ],
  },
  {
    name: "Amazon",
    logo: "📦",
    color: "from-orange-500 to-yellow-500",
    package: "35 LPA",
    difficulty: "Hard",
    questions: [
      "Design Amazon's recommendation system.",
      "How would you design a distributed messaging queue?",
      "Explain the CAP theorem with examples.",
      "Write a program to implement LRU cache.",
      "How does Amazon's DynamoDB handle partitioning?",
      "Design a rate limiter for an API.",
      "What is eventual consistency? When would you use it?",
      "How would you handle database sharding?",
    ],
  },
  {
    name: "Microsoft",
    logo: "🪟",
    color: "from-blue-600 to-blue-800",
    package: "40 LPA",
    difficulty: "Hard",
    questions: [
      "Design a collaborative document editing system like Google Docs.",
      "Explain the Windows NT kernel architecture.",
      "How would you implement a garbage collector?",
      "Write a program to serialize and deserialize a binary tree.",
      "What is the difference between process and thread scheduling?",
      "Design a notification system for millions of users.",
      "Explain virtual memory and page replacement algorithms.",
      "How does Azure handle load balancing?",
    ],
  },
  {
    name: "Flipkart",
    logo: "🛒",
    color: "from-yellow-500 to-orange-500",
    package: "30 LPA",
    difficulty: "Hard",
    questions: [
      "Design Flipkart's product search system.",
      "How would you handle flash sales with millions of concurrent users?",
      "Design a shopping cart system with inventory management.",
      "Write a program to find the top K frequent elements.",
      "How would you implement a real-time order tracking system?",
      "Design a payment gateway integration.",
      "How does Flipkart handle product recommendations?",
      "Design a review and rating system.",
    ],
  },
];

const hrQuestions = [
  {
    question: "Tell me about yourself.",
    tip: "Structure: Present (current role/education) → Past (relevant experience) → Future (why this company). Keep it under 2 minutes.",
  },
  {
    question: "Why should we hire you?",
    tip: "Highlight 3 key strengths that match the job description. Use specific examples and quantify achievements where possible.",
  },
  {
    question: "What are your strengths?",
    tip: "Choose 2-3 strengths relevant to the role. Back each with a specific example using the STAR method.",
  },
  {
    question: "What are your weaknesses?",
    tip: "Choose a genuine weakness that is not critical to the role. Show self-awareness and explain steps you're taking to improve.",
  },
  {
    question: "Where do you see yourself in 5 years?",
    tip: "Show ambition aligned with the company's growth. Mention skill development and leadership aspirations.",
  },
  {
    question: "Why do you want to work for this company?",
    tip: "Research the company beforehand. Mention specific products, culture, values, or recent achievements that excite you.",
  },
  {
    question: "Describe a challenging situation and how you handled it.",
    tip: "Use the STAR method: Situation, Task, Action, Result. Focus on your specific actions and positive outcomes.",
  },
  {
    question: "How do you handle pressure and tight deadlines?",
    tip: "Give a specific example. Mention prioritization, time management, and communication with team members.",
  },
  {
    question: "Are you a team player or do you prefer working alone?",
    tip: "Show flexibility. Give examples of both collaborative and independent work. Emphasize adaptability.",
  },
  {
    question: "What motivates you?",
    tip: "Be genuine. Mention learning, problem-solving, impact, or growth. Align with the company's mission.",
  },
  {
    question: "How do you handle criticism?",
    tip: "Show maturity. Explain that you view feedback as an opportunity to grow. Give an example of acting on feedback.",
  },
  {
    question: "What is your expected salary?",
    tip: "Research market rates beforehand. Give a range based on your skills and experience. Show flexibility.",
  },
  {
    question: "Do you have any questions for us?",
    tip: "Always ask 2-3 thoughtful questions about the role, team culture, growth opportunities, or company direction.",
  },
  {
    question: "Describe your leadership experience.",
    tip: "Even without formal titles, mention leading projects, mentoring peers, or organizing events. Use specific examples.",
  },
  {
    question: "How do you stay updated with industry trends?",
    tip: "Mention specific resources: tech blogs, online courses, GitHub, conferences, or communities you follow.",
  },
];

const youtubeVideos = [
  {
    id: "aW2LvQUcwqc",
    title: "TCS Interview Preparation 2024",
    description: "Complete guide for TCS NQT and interview rounds",
    channel: "Placement Prep",
  },
  {
    id: "HG68Ymazo18",
    title: "Mock Technical Interview",
    description: "Watch a real mock interview with feedback",
    channel: "Interview Tips",
  },
  {
    id: "5JIAnFcPBwU",
    title: "HR Interview Tips & Tricks",
    description: "Master common HR questions with model answers",
    channel: "Career Guide",
  },
  {
    id: "Ge0Udbws1kc",
    title: "System Design Interview Basics",
    description: "Learn system design concepts for top companies",
    channel: "Tech Interviews",
  },
  {
    id: "xpDnVSmNFX0",
    title: "Data Structures for Interviews",
    description: "Essential DSA concepts asked in interviews",
    channel: "DSA Master",
  },
  {
    id: "oBt53YbR9Kk",
    title: "Dynamic Programming Interview Questions",
    description: "Top DP problems asked in FAANG interviews",
    channel: "Coding Prep",
  },
];

interface CompanyCardProps {
  company: CompanyData;
}

function CompanyCard({ company }: CompanyCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-xl flex-shrink-0`}
        >
          {company.logo}
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold text-foreground">{company.name}</p>
          <p className="text-xs text-muted-foreground">
            {company.package} • {company.questions.length} questions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              company.difficulty === "Easy"
                ? "bg-green-500/10 text-green-600"
                : company.difficulty === "Medium"
                  ? "bg-orange-500/10 text-orange-600"
                  : "bg-red-500/10 text-red-600"
            }`}
          >
            {company.difficulty}
          </span>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border p-4 space-y-2">
          {company.questions.map((q, idx) => (
            <div
              key={q}
              className="flex items-start gap-3 py-2 border-b border-border/50 last:border-0"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <p className="text-sm text-foreground">{q}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface HRCardProps {
  item: { question: string; tip: string };
  index: number;
}

function HRCard({ item, index }: HRCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center gap-3 p-4 hover:bg-accent/50 transition-colors text-left"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-vedansh-orange/10 text-vedansh-orange text-xs font-bold flex items-center justify-center">
          {index + 1}
        </span>
        <p className="flex-1 font-medium text-foreground text-sm">
          {item.question}
        </p>
        {expanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>
      {expanded && (
        <div className="border-t border-border px-4 py-3 bg-amber-50/50 dark:bg-amber-950/20">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            <span className="font-bold">💡 Tip:</span> {item.tip}
          </p>
        </div>
      )}
    </div>
  );
}

export default function TechnicalInterviewPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<
    "companies" | "hr" | "videos"
  >("companies");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={() => navigate({ to: "/placement" })}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Placement Prep
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-white">
                Technical Interview Prep
              </h1>
              <p className="text-white/60 text-sm">
                Company-wise Questions • HR Tips • Video Resources
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8 space-y-5">
        {/* Section Tabs */}
        <div className="bg-card border border-border rounded-2xl p-1 flex gap-1">
          {[
            { key: "companies", label: "Company-wise", icon: Building2 },
            { key: "hr", label: "HR Questions", icon: Users },
            { key: "videos", label: "Video Resources", icon: Video },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSection(key as typeof activeSection)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeSection === key
                  ? "bg-vedansh-orange text-white shadow-sm"
                  : "text-foreground/60 hover:text-foreground hover:bg-accent"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Company-wise Section */}
        {activeSection === "companies" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5 text-vedansh-orange" />
                Company-wise Interview Questions
              </h2>
              <Badge variant="secondary">{companyData.length} companies</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Click on any company to expand interview questions.
            </p>
            {companyData.map((company) => (
              <CompanyCard key={company.name} company={company} />
            ))}
          </div>
        )}

        {/* HR Questions Section */}
        {activeSection === "hr" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-vedansh-orange" />
                HR Interview Questions
              </h2>
              <Badge variant="secondary">{hrQuestions.length} questions</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Click on any question to see expert answer tips.
            </p>
            <div className="space-y-2">
              {hrQuestions.map((item, idx) => (
                <HRCard key={item.question} item={item} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* Video Resources Section */}
        {activeSection === "videos" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <Video className="h-5 w-5 text-vedansh-orange" />
                Interview Prep Videos
              </h2>
              <Badge variant="secondary">{youtubeVideos.length} videos</Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Watch interview preparation videos directly in the app.
            </p>
            <div className="space-y-5">
              {youtubeVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                >
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "56.25%" }}
                  >
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-sm">
                      {video.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-primary font-medium">
                        {video.channel}
                      </span>
                      <a
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" /> Open in YouTube
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
