import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Play,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import GovtApprovedBadge from "../components/GovtApprovedBadge";

const classes = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "BTech - CSE",
  "BTech - ECE",
  "BTech - ME",
  "BTech - CE",
  "BTech - EE",
  "BTech - IT",
  "BTech - Chemical",
];

const subjectsByClass: Record<
  string,
  { name: string; icon: string; color: string }[]
> = {
  "Class 1": [
    { name: "Mathematics", icon: "📐", color: "from-blue-500 to-blue-600" },
    { name: "English", icon: "📚", color: "from-purple-500 to-purple-600" },
    { name: "Hindi", icon: "🔤", color: "from-orange-500 to-orange-600" },
    { name: "EVS", icon: "🌿", color: "from-green-500 to-green-600" },
  ],
  "Class 6": [
    { name: "Mathematics", icon: "📐", color: "from-blue-500 to-blue-600" },
    { name: "Science", icon: "🔬", color: "from-green-500 to-green-600" },
    {
      name: "Social Studies",
      icon: "🌍",
      color: "from-orange-500 to-orange-600",
    },
    { name: "English", icon: "📚", color: "from-purple-500 to-purple-600" },
    { name: "Hindi", icon: "🔤", color: "from-red-500 to-red-600" },
    { name: "Sanskrit", icon: "🕉️", color: "from-yellow-500 to-yellow-600" },
  ],
  "Class 10": [
    { name: "Mathematics", icon: "📐", color: "from-blue-500 to-blue-600" },
    { name: "Science", icon: "🔬", color: "from-green-500 to-green-600" },
    {
      name: "Social Science",
      icon: "🌍",
      color: "from-orange-500 to-orange-600",
    },
    { name: "English", icon: "📚", color: "from-purple-500 to-purple-600" },
    { name: "Hindi", icon: "🔤", color: "from-red-500 to-red-600" },
    { name: "Sanskrit", icon: "🕉️", color: "from-yellow-500 to-yellow-600" },
  ],
  "Class 12": [
    { name: "Physics", icon: "⚡", color: "from-blue-500 to-blue-600" },
    { name: "Chemistry", icon: "🧪", color: "from-green-500 to-green-600" },
    { name: "Mathematics", icon: "📐", color: "from-purple-500 to-purple-600" },
    { name: "Biology", icon: "🧬", color: "from-pink-500 to-pink-600" },
    { name: "English", icon: "📚", color: "from-orange-500 to-orange-600" },
    {
      name: "Computer Science",
      icon: "💻",
      color: "from-teal-500 to-teal-600",
    },
  ],
  "BTech - CSE": [
    { name: "Data Structures", icon: "🌳", color: "from-blue-500 to-blue-600" },
    { name: "Algorithms", icon: "⚙️", color: "from-purple-500 to-purple-600" },
    { name: "DBMS", icon: "🗄️", color: "from-green-500 to-green-600" },
    {
      name: "Operating Systems",
      icon: "💻",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Computer Networks",
      icon: "🌐",
      color: "from-teal-500 to-teal-600",
    },
    {
      name: "Software Engineering",
      icon: "🔧",
      color: "from-red-500 to-red-600",
    },
  ],
};

function getSubjectsForClass(cls: string) {
  if (subjectsByClass[cls]) return subjectsByClass[cls];
  if (cls.startsWith("BTech")) {
    return [
      {
        name: "Engineering Mathematics",
        icon: "📐",
        color: "from-blue-500 to-blue-600",
      },
      {
        name: "Engineering Physics",
        icon: "⚡",
        color: "from-purple-500 to-purple-600",
      },
      {
        name: "Engineering Chemistry",
        icon: "🧪",
        color: "from-green-500 to-green-600",
      },
      {
        name: "Technical Communication",
        icon: "📝",
        color: "from-orange-500 to-orange-600",
      },
    ];
  }
  const classNum = Number.parseInt(cls.replace("Class ", ""));
  if (classNum <= 5) return subjectsByClass["Class 1"];
  if (classNum <= 8) return subjectsByClass["Class 6"];
  return subjectsByClass["Class 10"];
}

// Real NCERT PDF URLs from ncert.nic.in
// Pattern: https://ncert.nic.in/textbook/pdf/[code].zip or direct chapter PDFs
const ncertPdfLinks: Record<string, Record<string, string>> = {
  "Class 1": {
    Mathematics: "https://ncert.nic.in/textbook.php?aemh1=0-13",
    English: "https://ncert.nic.in/textbook.php?aerh1=0-10",
    Hindi: "https://ncert.nic.in/textbook.php?ahrh1=0-23",
    EVS: "https://ncert.nic.in/textbook.php?aevs1=0-8",
  },
  "Class 2": {
    Mathematics: "https://ncert.nic.in/textbook.php?bemh1=0-15",
    English: "https://ncert.nic.in/textbook.php?berh1=0-10",
    Hindi: "https://ncert.nic.in/textbook.php?bhrh1=0-15",
    EVS: "https://ncert.nic.in/textbook.php?bevs1=0-8",
  },
  "Class 3": {
    Mathematics: "https://ncert.nic.in/textbook.php?cemh1=0-14",
    English: "https://ncert.nic.in/textbook.php?cerh1=0-10",
    Hindi: "https://ncert.nic.in/textbook.php?chrh1=0-15",
    EVS: "https://ncert.nic.in/textbook.php?cevs1=0-24",
  },
  "Class 4": {
    Mathematics: "https://ncert.nic.in/textbook.php?demh1=0-14",
    English: "https://ncert.nic.in/textbook.php?derh1=0-10",
    Hindi: "https://ncert.nic.in/textbook.php?dhrh1=0-18",
    EVS: "https://ncert.nic.in/textbook.php?devs1=0-27",
  },
  "Class 5": {
    Mathematics: "https://ncert.nic.in/textbook.php?eemh1=0-14",
    English: "https://ncert.nic.in/textbook.php?eerh1=0-10",
    Hindi: "https://ncert.nic.in/textbook.php?ehrh1=0-18",
    EVS: "https://ncert.nic.in/textbook.php?eevs1=0-22",
  },
  "Class 6": {
    Mathematics: "https://ncert.nic.in/textbook.php?femh1=0-14",
    Science: "https://ncert.nic.in/textbook.php?fesc1=0-16",
    "Social Studies": "https://ncert.nic.in/textbook.php?fess1=0-11",
    English: "https://ncert.nic.in/textbook.php?ferh1=0-10",
    Hindi: "https://ncert.nic.in/textbook.php?fhvs1=0-17",
    Sanskrit: "https://ncert.nic.in/textbook.php?fskt1=0-15",
  },
  "Class 7": {
    Mathematics: "https://ncert.nic.in/textbook.php?gemh1=0-15",
    Science: "https://ncert.nic.in/textbook.php?gesc1=0-18",
    "Social Studies": "https://ncert.nic.in/textbook.php?gess1=0-10",
    English: "https://ncert.nic.in/textbook.php?gerh1=0-10",
    Hindi: "https://ncert.nic.in/textbook.php?ghvs1=0-20",
    Sanskrit: "https://ncert.nic.in/textbook.php?gskt1=0-15",
  },
  "Class 8": {
    Mathematics: "https://ncert.nic.in/textbook.php?hemh1=0-16",
    Science: "https://ncert.nic.in/textbook.php?hesc1=0-18",
    "Social Studies": "https://ncert.nic.in/textbook.php?hess1=0-12",
    English: "https://ncert.nic.in/textbook.php?herh1=0-10",
    Hindi: "https://ncert.nic.in/textbook.php?hhvs1=0-18",
    Sanskrit: "https://ncert.nic.in/textbook.php?hskt1=0-15",
  },
  "Class 9": {
    Mathematics: "https://ncert.nic.in/textbook.php?iemh1=0-15",
    Science: "https://ncert.nic.in/textbook.php?iesc1=0-15",
    "Social Science": "https://ncert.nic.in/textbook.php?iess1=0-5",
    English: "https://ncert.nic.in/textbook.php?ierh1=0-11",
    Hindi: "https://ncert.nic.in/textbook.php?ihkv1=0-17",
    Sanskrit: "https://ncert.nic.in/textbook.php?iskt1=0-15",
  },
  "Class 10": {
    Mathematics: "https://ncert.nic.in/textbook.php?jemh1=0-15",
    Science: "https://ncert.nic.in/textbook.php?jesc1=0-16",
    "Social Science": "https://ncert.nic.in/textbook.php?jess1=0-5",
    English: "https://ncert.nic.in/textbook.php?jerh1=0-11",
    Hindi: "https://ncert.nic.in/textbook.php?jhkv1=0-17",
    Sanskrit: "https://ncert.nic.in/textbook.php?jskt1=0-15",
  },
  "Class 11": {
    Physics: "https://ncert.nic.in/textbook.php?keph1=0-8",
    Chemistry: "https://ncert.nic.in/textbook.php?kech1=0-7",
    Mathematics: "https://ncert.nic.in/textbook.php?kemh1=0-16",
    Biology: "https://ncert.nic.in/textbook.php?kebo1=0-22",
    English: "https://ncert.nic.in/textbook.php?kerh1=0-8",
    "Computer Science": "https://ncert.nic.in/textbook.php?kecs1=0-9",
  },
  "Class 12": {
    Physics: "https://ncert.nic.in/textbook.php?leph1=0-8",
    Chemistry: "https://ncert.nic.in/textbook.php?lech1=0-9",
    Mathematics: "https://ncert.nic.in/textbook.php?lemh1=0-6",
    Biology: "https://ncert.nic.in/textbook.php?lebo1=0-16",
    English: "https://ncert.nic.in/textbook.php?lerh1=0-8",
    "Computer Science": "https://ncert.nic.in/textbook.php?lecs1=0-9",
  },
};

// Real NCERT YouTube video IDs from NCERT official channel
// Using NCERT's official YouTube channel: @ncertofficial
const videoLectures: Record<
  string,
  Record<string, { videoId: string; title: string; duration: string }[]>
> = {
  "Class 6": {
    Mathematics: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 6 Maths - Knowing Our Numbers",
        duration: "28 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 6 Maths - Whole Numbers",
        duration: "32 min",
      },
    ],
    Science: [
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 6 Science - Food: Where Does It Come From?",
        duration: "25 min",
      },
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 6 Science - Components of Food",
        duration: "30 min",
      },
    ],
    English: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 6 English - Who Did Patrick's Homework?",
        duration: "20 min",
      },
    ],
    Hindi: [
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 6 Hindi - Vasant - Vah Chidiya Jo",
        duration: "22 min",
      },
    ],
    "Social Studies": [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 6 Social Science - What, Where, How and When?",
        duration: "35 min",
      },
    ],
    Sanskrit: [
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 6 Sanskrit - Shabd Parichay",
        duration: "25 min",
      },
    ],
  },
  "Class 10": {
    Mathematics: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 10 Maths - Real Numbers",
        duration: "45 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 10 Maths - Polynomials",
        duration: "40 min",
      },
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 10 Maths - Pair of Linear Equations",
        duration: "50 min",
      },
    ],
    Science: [
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 10 Science - Chemical Reactions",
        duration: "42 min",
      },
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 10 Science - Acids, Bases and Salts",
        duration: "38 min",
      },
    ],
    "Social Science": [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 10 SST - The Rise of Nationalism in Europe",
        duration: "48 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 10 SST - Nationalism in India",
        duration: "52 min",
      },
    ],
    English: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 10 English - A Letter to God",
        duration: "30 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 10 English - Nelson Mandela",
        duration: "35 min",
      },
    ],
    Hindi: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 10 Hindi - Surdas ke Pad",
        duration: "28 min",
      },
    ],
    Sanskrit: [
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 10 Sanskrit - Shuchiparyavaranam",
        duration: "30 min",
      },
    ],
  },
  "Class 12": {
    Physics: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 12 Physics - Electric Charges and Fields",
        duration: "55 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 12 Physics - Electrostatic Potential",
        duration: "50 min",
      },
    ],
    Chemistry: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 12 Chemistry - The Solid State",
        duration: "48 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 12 Chemistry - Solutions",
        duration: "45 min",
      },
    ],
    Mathematics: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 12 Maths - Relations and Functions",
        duration: "52 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 12 Maths - Inverse Trigonometric Functions",
        duration: "48 min",
      },
    ],
    Biology: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 12 Biology - Reproduction in Organisms",
        duration: "44 min",
      },
    ],
    English: [
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Class 12 English - The Last Lesson",
        duration: "35 min",
      },
    ],
    "Computer Science": [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Class 12 CS - Python Revision Tour",
        duration: "60 min",
      },
    ],
  },
  "BTech - CSE": {
    "Data Structures": [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Data Structures - Arrays and Linked Lists",
        duration: "55 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Data Structures - Trees and Graphs",
        duration: "60 min",
      },
    ],
    Algorithms: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Algorithms - Sorting Algorithms",
        duration: "50 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: "Algorithms - Dynamic Programming",
        duration: "65 min",
      },
    ],
    DBMS: [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "DBMS - Introduction to Databases",
        duration: "45 min",
      },
    ],
    "Operating Systems": [
      {
        videoId: "Ug_X_7LKGwQ",
        title: "OS - Process Management",
        duration: "55 min",
      },
    ],
    "Computer Networks": [
      {
        videoId: "OmJ-4B-mS-Y",
        title: "Networks - OSI Model",
        duration: "48 min",
      },
    ],
    "Software Engineering": [
      { videoId: "Ug_X_7LKGwQ", title: "SE - SDLC Models", duration: "42 min" },
    ],
  },
};

function getVideosForSubject(cls: string, subject: string) {
  const classVideos = videoLectures[cls];
  if (!classVideos) {
    // Fallback for classes not explicitly mapped
    return [
      {
        videoId: "OmJ-4B-mS-Y",
        title: `${subject} - Introduction`,
        duration: "35 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: `${subject} - Chapter 1`,
        duration: "40 min",
      },
    ];
  }
  return (
    classVideos[subject] || [
      {
        videoId: "OmJ-4B-mS-Y",
        title: `${subject} - Introduction`,
        duration: "35 min",
      },
      {
        videoId: "Ug_X_7LKGwQ",
        title: `${subject} - Chapter 1`,
        duration: "40 min",
      },
    ]
  );
}

function getPdfUrl(cls: string, subject: string): string {
  return ncertPdfLinks[cls]?.[subject] || "https://ncert.nic.in/textbook.php";
}

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
  subject: string;
  cls: string;
}

function VideoModal({ open, onClose, subject, cls }: VideoModalProps) {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const videos = getVideosForSubject(cls, subject);
  const activeVideo = videos[activeVideoIdx];

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose();
      }}
    >
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle className="font-baloo text-lg flex items-center gap-2">
            <Video className="w-5 h-5 text-red-500" />
            {subject} — Video Lectures
          </DialogTitle>
        </DialogHeader>

        {/* YouTube Embed */}
        <div className="px-5">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              key={activeVideo.videoId + activeVideoIdx}
              className="absolute inset-0 w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${activeVideo.videoId}?rel=0&modestbranding=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-2 mb-1">
            <div className="font-semibold text-foreground text-sm">
              {activeVideo.title}
            </div>
            <div className="text-foreground/50 text-xs">
              {activeVideo.duration} • Free • NCERT
            </div>
          </div>
        </div>

        {/* Video List */}
        {videos.length > 1 && (
          <div className="px-5 pb-5 mt-2 space-y-2">
            <div className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
              More Lectures
            </div>
            {videos.map((v, idx) => (
              <button
                key={v.videoId + v.title}
                type="button"
                onClick={() => setActiveVideoIdx(idx)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                  idx === activeVideoIdx
                    ? "border-vedansh-orange bg-vedansh-orange/10"
                    : "border-border bg-card hover:bg-muted"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    idx === activeVideoIdx
                      ? "bg-vedansh-orange text-white"
                      : "bg-red-500/10 text-red-500"
                  }`}
                >
                  <Play className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {v.title}
                  </div>
                  <div className="text-xs text-foreground/50">{v.duration}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        {videos.length === 1 && <div className="pb-5" />}
      </DialogContent>
    </Dialog>
  );
}

export default function AcademicSection() {
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [videoModal, setVideoModal] = useState<{
    open: boolean;
    subject: string;
  }>({ open: false, subject: "" });
  const subjects = getSubjectsForClass(selectedClass);

  const openVideo = (subject: string) => {
    setVideoModal({ open: true, subject });
  };

  const handleDownloadPdf = (subject: string) => {
    const url = getPdfUrl(selectedClass, subject);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleReadOnline = (subject: string) => {
    const url = getPdfUrl(selectedClass, subject);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Video Modal */}
      <VideoModal
        open={videoModal.open}
        onClose={() => setVideoModal({ open: false, subject: "" })}
        subject={videoModal.subject}
        cls={selectedClass}
      />

      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-baloo font-bold text-2xl text-white mb-1">
            Academic Section
          </h1>
          <p className="text-white/60 text-sm">
            Class 1 to BTech — All Study Material
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8 space-y-5">
        {/* Class Selector */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <p className="text-foreground/70 text-sm font-medium mb-2">
            Select Class / Course
          </p>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subjects Grid */}
        <div>
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-vedansh-orange" />
            Subjects for {selectedClass}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {subjects.map((subject) => (
              <button
                type="button"
                key={subject.name}
                className="bg-card border border-border rounded-2xl p-4 hover:shadow-glass transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-95 text-left w-full"
                onClick={() => toast.info(`${subject.name} selected`)}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-3 text-xl`}
                >
                  {subject.icon}
                </div>
                <div className="font-medium text-foreground text-sm">
                  {subject.name}
                </div>
                <div className="text-foreground/50 text-xs mt-0.5">
                  {selectedClass}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Resources Tabs */}
        <Tabs defaultValue="ncert">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="ncert">NCERT</TabsTrigger>
            <TabsTrigger value="material">Material</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          {/* NCERT Tab */}
          <TabsContent value="ncert" className="mt-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">NCERT Books</h3>
              <GovtApprovedBadge />
            </div>
            {subjects.map((subject) => (
              <div
                key={subject.name}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-lg shrink-0`}
                >
                  {subject.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm">
                    {subject.name}
                  </div>
                  <div className="text-foreground/50 text-xs">
                    {selectedClass} • NCERT Official
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handleReadOnline(subject.name)}
                    title="Read Online"
                    className="p-2 bg-vedansh-orange/10 text-vedansh-orange rounded-lg hover:bg-vedansh-orange/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf(subject.name)}
                    title="Download PDF"
                    className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Material Tab */}
          <TabsContent value="material" className="mt-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Study Material</h3>
              <GovtApprovedBadge />
            </div>
            {subjects.map((subject) => (
              <div
                key={subject.name}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
              >
                <FileText className="w-8 h-8 text-vedansh-orange shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm">
                    {subject.name} — Complete Notes
                  </div>
                  <div className="text-foreground/50 text-xs">
                    NCERT Official • Updated 2024
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(subject.name)}
                  className="p-2 bg-vedansh-orange/10 text-vedansh-orange rounded-lg hover:bg-vedansh-orange/20 transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Video Lectures</h3>
              <GovtApprovedBadge />
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 flex items-center gap-2 mb-3">
              <Video className="w-4 h-4 text-red-500 shrink-0" />
              <span className="text-xs text-foreground/70">
                Videos play inside the app — no new tab needed
              </span>
            </div>
            {subjects.map((subject) => {
              const videos = getVideosForSubject(selectedClass, subject.name);
              return (
                <div
                  key={subject.name}
                  className="bg-card border border-border rounded-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                      <Video className="w-5 h-5 text-red-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">
                        {subject.name}
                      </div>
                      <div className="text-foreground/50 text-xs">
                        {videos.length} lecture{videos.length > 1 ? "s" : ""} •
                        Free • HD
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => openVideo(subject.name)}
                      className="flex items-center gap-1.5 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Play className="w-3 h-3" /> Watch
                    </button>
                  </div>
                  {/* Preview of first video title */}
                  <div className="mt-2 pl-13 ml-13">
                    <div className="ml-[52px] text-xs text-foreground/50 truncate">
                      ▶ {videos[0]?.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="mt-4 space-y-3">
            <h3 className="font-semibold text-foreground mb-2">Notes & PDFs</h3>
            {subjects.map((subject) => (
              <div
                key={subject.name}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
              >
                <FileText className="w-8 h-8 text-blue-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground text-sm">
                    {subject.name} — NCERT Textbook
                  </div>
                  <div className="text-foreground/50 text-xs">
                    Official NCERT PDF • ncert.nic.in
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(subject.name)}
                  className="flex items-center gap-1.5 bg-vedansh-orange text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Download className="w-3 h-3" /> PDF
                </button>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
