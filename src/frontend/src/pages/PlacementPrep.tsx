import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Brain,
  Briefcase,
  Building2,
  ChevronRight,
  Code,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GovtApprovedBadge from "../components/GovtApprovedBadge";

const branches = [
  "CSE",
  "ECE",
  "ME",
  "CE",
  "EE",
  "IT",
  "Chemical",
  "Civil",
  "Aerospace",
];

const companies = [
  {
    name: "Google",
    logo: "🔍",
    package: "45 LPA",
    difficulty: "Hard",
    color: "from-blue-500 to-green-500",
  },
  {
    name: "Microsoft",
    logo: "🪟",
    package: "40 LPA",
    difficulty: "Hard",
    color: "from-blue-600 to-blue-700",
  },
  {
    name: "Amazon",
    logo: "📦",
    package: "35 LPA",
    difficulty: "Hard",
    color: "from-orange-500 to-yellow-500",
  },
  {
    name: "TCS",
    logo: "💼",
    package: "7 LPA",
    difficulty: "Easy",
    color: "from-blue-400 to-blue-500",
  },
  {
    name: "Infosys",
    logo: "🏢",
    package: "6.5 LPA",
    difficulty: "Easy",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    name: "Wipro",
    logo: "🌐",
    package: "6 LPA",
    difficulty: "Easy",
    color: "from-purple-500 to-purple-600",
  },
  {
    name: "Accenture",
    logo: "⚡",
    package: "8 LPA",
    difficulty: "Medium",
    color: "from-violet-500 to-violet-600",
  },
  {
    name: "Cognizant",
    logo: "🧠",
    package: "7 LPA",
    difficulty: "Easy",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "HCL",
    logo: "🔷",
    package: "7.5 LPA",
    difficulty: "Medium",
    color: "from-teal-500 to-teal-600",
  },
  {
    name: "Tech Mahindra",
    logo: "🔧",
    package: "7 LPA",
    difficulty: "Medium",
    color: "from-red-500 to-red-600",
  },
  {
    name: "Flipkart",
    logo: "🛒",
    package: "30 LPA",
    difficulty: "Hard",
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Paytm",
    logo: "💳",
    package: "20 LPA",
    difficulty: "Medium",
    color: "from-blue-500 to-indigo-500",
  },
];

const dsaTopics = [
  { name: "Arrays & Strings", problems: 45, done: 32 },
  { name: "Linked Lists", problems: 30, done: 18 },
  { name: "Trees & Graphs", problems: 50, done: 22 },
  { name: "Dynamic Programming", problems: 60, done: 15 },
  { name: "Sorting & Searching", problems: 25, done: 20 },
  { name: "Stack & Queue", problems: 20, done: 16 },
];

export default function PlacementPrep() {
  const [branch, setBranch] = useState("CSE");
  const [resumeName, setResumeName] = useState("");
  const [resumeEmail, setResumeEmail] = useState("");
  const [resumeSkills, setResumeSkills] = useState("");
  const [resumeExp, setResumeExp] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-vedansh-orange/20 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-vedansh-orange" />
            </div>
            <div>
              <h1 className="font-baloo font-bold text-2xl text-white">
                BTech Placement Prep
              </h1>
              <p className="text-white/60 text-sm">
                DSA • Aptitude • Interview • Resume
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8 space-y-5">
        {/* Branch Selector */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <Label className="text-foreground/70 text-sm font-medium block mb-2">
            Select Branch
          </Label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Placement Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Avg Package",
              value: "12 LPA",
              icon: "💰",
              color: "text-green-500",
            },
            {
              label: "Highest Pkg",
              value: "45 LPA",
              icon: "🏆",
              color: "text-vedansh-gold",
            },
            {
              label: "Placement %",
              value: "94%",
              icon: "📈",
              color: "text-blue-500",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-2xl p-4 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`font-baloo font-bold text-lg ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-foreground/50 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="dsa">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="dsa">DSA</TabsTrigger>
            <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
          </TabsList>

          {/* DSA Tab */}
          <TabsContent value="dsa" className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <Code className="w-4 h-4 text-vedansh-orange" /> DSA & Coding
              </h3>
              <GovtApprovedBadge />
            </div>
            <div className="space-y-3">
              {dsaTopics.map((topic) => (
                <div
                  key={topic.name}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">
                      {topic.name}
                    </span>
                    <span className="text-xs text-foreground/50">
                      {topic.done}/{topic.problems}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-vedansh-orange h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(topic.done / topic.problems) * 100}%`,
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      toast.info(`Opening ${topic.name} problems...`)
                    }
                    className="mt-3 w-full text-xs text-vedansh-orange font-medium flex items-center justify-center gap-1 hover:underline"
                  >
                    Practice Problems <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Aptitude Tab */}
          <TabsContent value="aptitude" className="mt-4 space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-vedansh-orange" /> Aptitude &
              Reasoning
            </h3>
            {[
              {
                name: "Quantitative Aptitude",
                topics: "25 topics",
                icon: "🔢",
                path: "/placement/aptitude",
              },
              {
                name: "Logical Reasoning",
                topics: "20 topics",
                icon: "🧩",
                path: "/placement/aptitude",
              },
              {
                name: "Verbal Ability",
                topics: "15 topics",
                icon: "📝",
                path: "/placement/aptitude",
              },
              {
                name: "Data Interpretation",
                topics: "12 topics",
                icon: "📊",
                path: "/placement/aptitude",
              },
              {
                name: "Non-Verbal Reasoning",
                topics: "10 topics",
                icon: "🔷",
                path: "/placement/aptitude",
              },
            ].map((item) => (
              <button
                key={item.name}
                type="button"
                className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:shadow-glass transition-all active:scale-95 text-left"
                onClick={() =>
                  navigate({ to: item.path as "/placement/aptitude" })
                }
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">
                    {item.name}
                  </div>
                  <div className="text-foreground/50 text-xs">
                    {item.topics} • Free Practice
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-foreground/30" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => navigate({ to: "/placement/aptitude" })}
              className="w-full mt-2 bg-vedansh-orange hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Brain className="w-4 h-4" /> Open Full Aptitude Practice
            </button>
          </TabsContent>

          {/* Interview Tab */}
          <TabsContent value="interview" className="mt-4 space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-vedansh-orange" /> Company-wise
              Prep
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {companies.map((company) => (
                <button
                  key={company.name}
                  type="button"
                  className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-glass transition-all active:scale-95 text-left"
                  onClick={() =>
                    navigate({ to: "/placement/technical-interview" })
                  }
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${company.color} flex items-center justify-center text-xl mb-3`}
                  >
                    {company.logo}
                  </div>
                  <div className="font-semibold text-foreground text-sm">
                    {company.name}
                  </div>
                  <div className="text-foreground/50 text-xs mt-0.5">
                    {company.package}
                  </div>
                  <span
                    className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${
                      company.difficulty === "Easy"
                        ? "bg-green-500/10 text-green-600"
                        : company.difficulty === "Medium"
                          ? "bg-orange-500/10 text-orange-600"
                          : "bg-red-500/10 text-red-600"
                    }`}
                  >
                    {company.difficulty}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate({ to: "/placement/technical-interview" })}
              className="w-full mt-2 bg-vedansh-orange hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" /> Open Full Interview Prep
            </button>
          </TabsContent>

          {/* Resume Tab */}
          <TabsContent value="resume" className="mt-4 space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-vedansh-orange" /> Resume
              Builder
            </h3>
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm text-foreground/70 mb-1 block">
                    Full Name
                  </Label>
                  <Input
                    value={resumeName}
                    onChange={(e) => setResumeName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label className="text-sm text-foreground/70 mb-1 block">
                    Email
                  </Label>
                  <Input
                    value={resumeEmail}
                    onChange={(e) => setResumeEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm text-foreground/70 mb-1 block">
                  Technical Skills
                </Label>
                <Input
                  value={resumeSkills}
                  onChange={(e) => setResumeSkills(e.target.value)}
                  placeholder="React, Node.js, Python, Java..."
                />
              </div>
              <div>
                <Label className="text-sm text-foreground/70 mb-1 block">
                  Experience / Projects
                </Label>
                <Textarea
                  value={resumeExp}
                  onChange={(e) => setResumeExp(e.target.value)}
                  placeholder="Describe your projects and experience..."
                  rows={4}
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  toast.success(
                    "Resume preview generated! Download feature coming soon.",
                  )
                }
                className="w-full bg-vedansh-orange hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-4 h-4" /> Generate Resume Preview
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
