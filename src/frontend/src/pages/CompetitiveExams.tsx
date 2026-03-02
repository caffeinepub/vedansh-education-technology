import { Input } from "@/components/ui/input";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Search,
  Trophy,
} from "lucide-react";
import { useState } from "react";

// Real study material, mock test, and PYQ links for each exam, mock test, and PYQ links for each exam
const examLinks: Record<string, { study: string; mock: string; pyq: string }> =
  {
    "JEE Mains": {
      study: "https://jeemain.nta.ac.in/",
      mock: "https://ncert.nic.in/textbook.php?kemh1=0-16",
      pyq: "https://jeemain.nta.ac.in/",
    },
    "JEE Advanced": {
      study: "https://jeeadv.ac.in/",
      mock: "https://jeeadv.ac.in/",
      pyq: "https://jeeadv.ac.in/",
    },
    BITSAT: {
      study: "https://www.bitsadmission.com/",
      mock: "https://www.bitsadmission.com/",
      pyq: "https://www.bitsadmission.com/",
    },
    VITEEE: {
      study: "https://viteee.vit.ac.in/",
      mock: "https://viteee.vit.ac.in/",
      pyq: "https://viteee.vit.ac.in/",
    },
    "MHT CET": {
      study: "https://cetcell.mahacet.org/",
      mock: "https://cetcell.mahacet.org/",
      pyq: "https://cetcell.mahacet.org/",
    },
    WBJEE: {
      study: "https://wbjeeb.nic.in/",
      mock: "https://wbjeeb.nic.in/",
      pyq: "https://wbjeeb.nic.in/",
    },
    "NEET UG": {
      study: "https://neet.nta.nic.in/",
      mock: "https://neet.nta.nic.in/",
      pyq: "https://neet.nta.nic.in/",
    },
    "NEET PG": {
      study: "https://nbe.edu.in/",
      mock: "https://nbe.edu.in/",
      pyq: "https://nbe.edu.in/",
    },
    AIIMS: {
      study: "https://www.aiims.edu/",
      mock: "https://www.aiims.edu/",
      pyq: "https://www.aiims.edu/",
    },
    JIPMER: {
      study: "https://jipmer.edu.in/",
      mock: "https://jipmer.edu.in/",
      pyq: "https://jipmer.edu.in/",
    },
    "UPSC IAS": {
      study: "https://upsc.gov.in/",
      mock: "https://upsc.gov.in/",
      pyq: "https://upsc.gov.in/",
    },
    "UPSC IPS": {
      study: "https://upsc.gov.in/",
      mock: "https://upsc.gov.in/",
      pyq: "https://upsc.gov.in/",
    },
    "UPSC IFS": {
      study: "https://upsc.gov.in/",
      mock: "https://upsc.gov.in/",
      pyq: "https://upsc.gov.in/",
    },
    "UPSC CDS": {
      study: "https://upsc.gov.in/",
      mock: "https://upsc.gov.in/",
      pyq: "https://upsc.gov.in/",
    },
    "UPSC NDA": {
      study: "https://upsc.gov.in/",
      mock: "https://upsc.gov.in/",
      pyq: "https://upsc.gov.in/",
    },
    "State PSC": {
      study: "https://bpsc.bih.nic.in/",
      mock: "https://bpsc.bih.nic.in/",
      pyq: "https://bpsc.bih.nic.in/",
    },
    "SSC CGL": {
      study: "https://ssc.nic.in/",
      mock: "https://ssc.nic.in/",
      pyq: "https://ssc.nic.in/",
    },
    "SSC CHSL": {
      study: "https://ssc.nic.in/",
      mock: "https://ssc.nic.in/",
      pyq: "https://ssc.nic.in/",
    },
    "SSC MTS": {
      study: "https://ssc.nic.in/",
      mock: "https://ssc.nic.in/",
      pyq: "https://ssc.nic.in/",
    },
    "SSC GD": {
      study: "https://ssc.nic.in/",
      mock: "https://ssc.nic.in/",
      pyq: "https://ssc.nic.in/",
    },
    "SSC CPO": {
      study: "https://ssc.nic.in/",
      mock: "https://ssc.nic.in/",
      pyq: "https://ssc.nic.in/",
    },
    "SSC JE": {
      study: "https://ssc.nic.in/",
      mock: "https://ssc.nic.in/",
      pyq: "https://ssc.nic.in/",
    },
    "IBPS PO": {
      study: "https://www.ibps.in/",
      mock: "https://www.ibps.in/",
      pyq: "https://www.ibps.in/",
    },
    "IBPS Clerk": {
      study: "https://www.ibps.in/",
      mock: "https://www.ibps.in/",
      pyq: "https://www.ibps.in/",
    },
    "SBI PO": {
      study: "https://sbi.co.in/careers",
      mock: "https://sbi.co.in/careers",
      pyq: "https://sbi.co.in/careers",
    },
    "SBI Clerk": {
      study: "https://sbi.co.in/careers",
      mock: "https://sbi.co.in/careers",
      pyq: "https://sbi.co.in/careers",
    },
    "RBI Grade B": {
      study: "https://www.rbi.org.in/Scripts/Opportunities.aspx",
      mock: "https://www.rbi.org.in/Scripts/Opportunities.aspx",
      pyq: "https://www.rbi.org.in/Scripts/Opportunities.aspx",
    },
    NABARD: {
      study: "https://www.nabard.org/",
      mock: "https://www.nabard.org/",
      pyq: "https://www.nabard.org/",
    },
    "RRB NTPC": {
      study: "https://www.rrbcdg.gov.in/",
      mock: "https://www.rrbcdg.gov.in/",
      pyq: "https://www.rrbcdg.gov.in/",
    },
    "RRB Group D": {
      study: "https://www.rrbcdg.gov.in/",
      mock: "https://www.rrbcdg.gov.in/",
      pyq: "https://www.rrbcdg.gov.in/",
    },
    "RRB ALP": {
      study: "https://www.rrbcdg.gov.in/",
      mock: "https://www.rrbcdg.gov.in/",
      pyq: "https://www.rrbcdg.gov.in/",
    },
    "RRB JE": {
      study: "https://www.rrbcdg.gov.in/",
      mock: "https://www.rrbcdg.gov.in/",
      pyq: "https://www.rrbcdg.gov.in/",
    },
    "RPF Constable": {
      study: "https://www.rrbcdg.gov.in/",
      mock: "https://www.rrbcdg.gov.in/",
      pyq: "https://www.rrbcdg.gov.in/",
    },
    "Bihar Police": {
      study: "https://csbc.bih.nic.in/",
      mock: "https://csbc.bih.nic.in/",
      pyq: "https://csbc.bih.nic.in/",
    },
    "UP Police": {
      study: "https://uppbpb.gov.in/",
      mock: "https://uppbpb.gov.in/",
      pyq: "https://uppbpb.gov.in/",
    },
    "MP Police": {
      study: "https://www.peb.mp.gov.in/",
      mock: "https://www.peb.mp.gov.in/",
      pyq: "https://www.peb.mp.gov.in/",
    },
    "Rajasthan Police": {
      study: "https://police.rajasthan.gov.in/",
      mock: "https://police.rajasthan.gov.in/",
      pyq: "https://police.rajasthan.gov.in/",
    },
    "Delhi Police": {
      study: "https://delhipolice.gov.in/",
      mock: "https://delhipolice.gov.in/",
      pyq: "https://delhipolice.gov.in/",
    },
    CTET: {
      study: "https://ctet.nic.in/",
      mock: "https://ctet.nic.in/",
      pyq: "https://ctet.nic.in/",
    },
    STET: {
      study: "https://bsebstet.com/",
      mock: "https://bsebstet.com/",
      pyq: "https://bsebstet.com/",
    },
    KVS: {
      study: "https://kvsangathan.nic.in/",
      mock: "https://kvsangathan.nic.in/",
      pyq: "https://kvsangathan.nic.in/",
    },
    NVS: {
      study: "https://navodaya.gov.in/",
      mock: "https://navodaya.gov.in/",
      pyq: "https://navodaya.gov.in/",
    },
    DSSSB: {
      study: "https://dsssb.delhi.gov.in/",
      mock: "https://dsssb.delhi.gov.in/",
      pyq: "https://dsssb.delhi.gov.in/",
    },
    AFCAT: {
      study: "https://afcat.cdac.in/AFCAT/",
      mock: "https://afcat.cdac.in/AFCAT/",
      pyq: "https://afcat.cdac.in/AFCAT/",
    },
    "Indian Navy": {
      study: "https://www.joinindiannavy.gov.in/",
      mock: "https://www.joinindiannavy.gov.in/",
      pyq: "https://www.joinindiannavy.gov.in/",
    },
    "Indian Army": {
      study: "https://joinindianarmy.nic.in/",
      mock: "https://joinindianarmy.nic.in/",
      pyq: "https://joinindianarmy.nic.in/",
    },
    CAPF: {
      study: "https://upsc.gov.in/",
      mock: "https://upsc.gov.in/",
      pyq: "https://upsc.gov.in/",
    },
    "LIC AAO": {
      study: "https://licindia.in/",
      mock: "https://licindia.in/",
      pyq: "https://licindia.in/",
    },
    "NICL AO": {
      study: "https://nationalinsurance.nic.co.in/",
      mock: "https://nationalinsurance.nic.co.in/",
      pyq: "https://nationalinsurance.nic.co.in/",
    },
    EPFO: {
      study: "https://www.epfindia.gov.in/site_en/index.php",
      mock: "https://www.epfindia.gov.in/site_en/index.php",
      pyq: "https://www.epfindia.gov.in/site_en/index.php",
    },
    FCI: {
      study: "https://fci.gov.in/",
      mock: "https://fci.gov.in/",
      pyq: "https://fci.gov.in/",
    },
    DRDO: {
      study: "https://www.drdo.gov.in/",
      mock: "https://www.drdo.gov.in/",
      pyq: "https://www.drdo.gov.in/",
    },
  };

function getExamLinks(name: string) {
  return (
    examLinks[name] || {
      study: "https://www.india.gov.in/",
      mock: "https://www.india.gov.in/",
      pyq: "https://www.india.gov.in/",
    }
  );
}

const examCategories = [
  {
    category: "Engineering Entrance",
    color: "from-blue-500 to-blue-600",
    emoji: "⚙️",
    exams: [
      {
        name: "JEE Mains",
        desc: "Joint Entrance Examination - Mains",
        students: "12L+",
      },
      {
        name: "JEE Advanced",
        desc: "Joint Entrance Examination - Advanced",
        students: "2.5L+",
      },
      { name: "BITSAT", desc: "BITS Pilani Admission Test", students: "3L+" },
      {
        name: "VITEEE",
        desc: "VIT Engineering Entrance Exam",
        students: "2L+",
      },
      {
        name: "MHT CET",
        desc: "Maharashtra Common Entrance Test",
        students: "4L+",
      },
      {
        name: "WBJEE",
        desc: "West Bengal Joint Entrance Exam",
        students: "1.5L+",
      },
    ],
  },
  {
    category: "Medical Entrance",
    color: "from-green-500 to-green-600",
    emoji: "🏥",
    exams: [
      {
        name: "NEET UG",
        desc: "National Eligibility cum Entrance Test",
        students: "20L+",
      },
      { name: "NEET PG", desc: "NEET Postgraduate", students: "2L+" },
      {
        name: "AIIMS",
        desc: "All India Institute of Medical Sciences",
        students: "5L+",
      },
      {
        name: "JIPMER",
        desc: "Jawaharlal Institute Entrance Exam",
        students: "1L+",
      },
    ],
  },
  {
    category: "Civil Services",
    color: "from-orange-500 to-orange-600",
    emoji: "🏛️",
    exams: [
      {
        name: "UPSC IAS",
        desc: "Indian Administrative Service",
        students: "10L+",
      },
      { name: "UPSC IPS", desc: "Indian Police Service", students: "8L+" },
      { name: "UPSC IFS", desc: "Indian Foreign Service", students: "5L+" },
      { name: "UPSC CDS", desc: "Combined Defence Services", students: "4L+" },
      { name: "UPSC NDA", desc: "National Defence Academy", students: "6L+" },
      {
        name: "State PSC",
        desc: "State Public Service Commission",
        students: "15L+",
      },
    ],
  },
  {
    category: "SSC Exams",
    color: "from-purple-500 to-purple-600",
    emoji: "📋",
    exams: [
      { name: "SSC CGL", desc: "Combined Graduate Level", students: "30L+" },
      {
        name: "SSC CHSL",
        desc: "Combined Higher Secondary Level",
        students: "25L+",
      },
      { name: "SSC MTS", desc: "Multi Tasking Staff", students: "20L+" },
      { name: "SSC GD", desc: "General Duty Constable", students: "40L+" },
      {
        name: "SSC CPO",
        desc: "Central Police Organisation",
        students: "15L+",
      },
      { name: "SSC JE", desc: "Junior Engineer", students: "5L+" },
    ],
  },
  {
    category: "Banking & Finance",
    color: "from-teal-500 to-teal-600",
    emoji: "🏦",
    exams: [
      { name: "IBPS PO", desc: "Probationary Officer", students: "20L+" },
      { name: "IBPS Clerk", desc: "Clerical Cadre", students: "25L+" },
      { name: "SBI PO", desc: "State Bank of India PO", students: "15L+" },
      {
        name: "SBI Clerk",
        desc: "State Bank of India Clerk",
        students: "20L+",
      },
      { name: "RBI Grade B", desc: "Reserve Bank of India", students: "5L+" },
      {
        name: "NABARD",
        desc: "National Bank for Agriculture",
        students: "2L+",
      },
    ],
  },
  {
    category: "Railway Exams",
    color: "from-red-500 to-red-600",
    emoji: "🚂",
    exams: [
      {
        name: "RRB NTPC",
        desc: "Non-Technical Popular Categories",
        students: "35L+",
      },
      { name: "RRB Group D", desc: "Level 1 Posts", students: "40L+" },
      { name: "RRB ALP", desc: "Assistant Loco Pilot", students: "10L+" },
      { name: "RRB JE", desc: "Junior Engineer", students: "5L+" },
      {
        name: "RPF Constable",
        desc: "Railway Protection Force",
        students: "8L+",
      },
    ],
  },
  {
    category: "State Police",
    color: "from-indigo-500 to-indigo-600",
    emoji: "👮",
    exams: [
      {
        name: "Bihar Police",
        desc: "Bihar Police Constable",
        students: "10L+",
      },
      { name: "UP Police", desc: "Uttar Pradesh Police", students: "25L+" },
      { name: "MP Police", desc: "Madhya Pradesh Police", students: "8L+" },
      {
        name: "Rajasthan Police",
        desc: "Rajasthan Police Constable",
        students: "6L+",
      },
      { name: "Delhi Police", desc: "Delhi Police Constable", students: "5L+" },
    ],
  },
  {
    category: "Teaching Exams",
    color: "from-pink-500 to-pink-600",
    emoji: "👩‍🏫",
    exams: [
      {
        name: "CTET",
        desc: "Central Teacher Eligibility Test",
        students: "30L+",
      },
      {
        name: "STET",
        desc: "State Teacher Eligibility Test",
        students: "15L+",
      },
      { name: "KVS", desc: "Kendriya Vidyalaya Sangathan", students: "5L+" },
      { name: "NVS", desc: "Navodaya Vidyalaya Samiti", students: "3L+" },
      { name: "DSSSB", desc: "Delhi Subordinate Services", students: "4L+" },
    ],
  },
  {
    category: "Defence Exams",
    color: "from-yellow-600 to-yellow-700",
    emoji: "🎖️",
    exams: [
      {
        name: "AFCAT",
        desc: "Air Force Common Admission Test",
        students: "3L+",
      },
      { name: "Indian Navy", desc: "Navy Recruitment", students: "5L+" },
      { name: "Indian Army", desc: "Army Recruitment Rally", students: "10L+" },
      { name: "CAPF", desc: "Central Armed Police Forces", students: "4L+" },
    ],
  },
  {
    category: "Insurance & Others",
    color: "from-cyan-500 to-cyan-600",
    emoji: "📊",
    exams: [
      {
        name: "LIC AAO",
        desc: "Life Insurance Corporation AAO",
        students: "5L+",
      },
      {
        name: "NICL AO",
        desc: "National Insurance Company AO",
        students: "2L+",
      },
      {
        name: "EPFO",
        desc: "Employees Provident Fund Organisation",
        students: "3L+",
      },
      { name: "FCI", desc: "Food Corporation of India", students: "4L+" },
      { name: "DRDO", desc: "Defence Research & Development", students: "2L+" },
    ],
  },
];

interface ExamCardProps {
  name: string;
  desc: string;
  students: string;
}

function ExamCard({ name, desc, students }: ExamCardProps) {
  const links = getExamLinks(name);
  return (
    <div className="bg-card border border-border rounded-xl p-4 hover:shadow-glass transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="font-semibold text-foreground text-sm">{name}</div>
          <div className="text-foreground/50 text-xs mt-0.5">{desc}</div>
        </div>
        <span className="text-xs bg-vedansh-orange/10 text-vedansh-orange rounded-full px-2 py-0.5 ml-2 shrink-0 font-medium">
          {students}
        </span>
      </div>
      <div className="flex gap-2">
        <a
          href={links.study}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 bg-vedansh-orange/10 text-vedansh-orange text-xs font-medium py-1.5 rounded-lg hover:bg-vedansh-orange/20 transition-colors"
        >
          <BookOpen className="w-3 h-3" /> Study
        </a>
        <a
          href={links.mock}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 bg-blue-500/10 text-blue-500 text-xs font-medium py-1.5 rounded-lg hover:bg-blue-500/20 transition-colors"
        >
          <Clock className="w-3 h-3" /> Mock Test
        </a>
        <a
          href={links.pyq}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 bg-green-500/10 text-green-600 text-xs font-medium py-1.5 rounded-lg hover:bg-green-500/20 transition-colors"
        >
          <FileText className="w-3 h-3" /> PYQ
        </a>
      </div>
    </div>
  );
}

export default function CompetitiveExams() {
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["Engineering Entrance", "Civil Services", "SSC Exams"]),
  );

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filteredCategories = examCategories
    .map((cat) => ({
      ...cat,
      exams: cat.exams.filter(
        (e) =>
          e.name.toLowerCase().includes(search.toLowerCase()) ||
          e.desc.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.exams.length > 0);

  const totalExams = examCategories.reduce(
    (sum, cat) => sum + cat.exams.length,
    0,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-vedansh-orange/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-vedansh-orange" />
            </div>
            <div>
              <h1 className="font-baloo font-bold text-2xl text-white">
                Competitive Exams
              </h1>
              <p className="text-white/60 text-sm">
                {totalExams}+ Exams • 100% Free Study Material
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8 space-y-4">
        {/* Search */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exams (JEE, NEET, UPSC...)"
              className="pl-9"
            />
          </div>
        </div>

        {/* Exam Categories */}
        {filteredCategories.map((cat) => (
          <div
            key={cat.category}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggleCategory(cat.category)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-lg`}
                >
                  {cat.emoji}
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground text-sm">
                    {cat.category}
                  </div>
                  <div className="text-foreground/50 text-xs">
                    {cat.exams.length} exams
                  </div>
                </div>
              </div>
              {expandedCategories.has(cat.category) ? (
                <ChevronUp className="w-4 h-4 text-foreground/40" />
              ) : (
                <ChevronDown className="w-4 h-4 text-foreground/40" />
              )}
            </button>

            {expandedCategories.has(cat.category) && (
              <div className="px-4 pb-4 space-y-3 border-t border-border">
                <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {cat.exams.map((exam) => (
                    <ExamCard key={exam.name} {...exam} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12 text-foreground/50">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No exams found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
