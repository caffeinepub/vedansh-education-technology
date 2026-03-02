import { useState } from 'react';
import { BookOpen, Video, FileText, Download, Play, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GovtApprovedBadge from '../components/GovtApprovedBadge';
import { toast } from 'sonner';

const classes = [
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
  'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12',
  'BTech - CSE', 'BTech - ECE', 'BTech - ME', 'BTech - CE', 'BTech - EE', 'BTech - IT', 'BTech - Chemical',
];

const subjectsByClass: Record<string, { name: string; icon: string; color: string }[]> = {
  'Class 1': [
    { name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600' },
    { name: 'English', icon: '📚', color: 'from-purple-500 to-purple-600' },
    { name: 'Hindi', icon: '🔤', color: 'from-orange-500 to-orange-600' },
    { name: 'EVS', icon: '🌿', color: 'from-green-500 to-green-600' },
  ],
  'Class 6': [
    { name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600' },
    { name: 'Science', icon: '🔬', color: 'from-green-500 to-green-600' },
    { name: 'Social Studies', icon: '🌍', color: 'from-orange-500 to-orange-600' },
    { name: 'English', icon: '📚', color: 'from-purple-500 to-purple-600' },
    { name: 'Hindi', icon: '🔤', color: 'from-red-500 to-red-600' },
    { name: 'Sanskrit', icon: '🕉️', color: 'from-yellow-500 to-yellow-600' },
  ],
  'Class 10': [
    { name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600' },
    { name: 'Science', icon: '🔬', color: 'from-green-500 to-green-600' },
    { name: 'Social Science', icon: '🌍', color: 'from-orange-500 to-orange-600' },
    { name: 'English', icon: '📚', color: 'from-purple-500 to-purple-600' },
    { name: 'Hindi', icon: '🔤', color: 'from-red-500 to-red-600' },
    { name: 'Sanskrit', icon: '🕉️', color: 'from-yellow-500 to-yellow-600' },
  ],
  'Class 12': [
    { name: 'Physics', icon: '⚡', color: 'from-blue-500 to-blue-600' },
    { name: 'Chemistry', icon: '🧪', color: 'from-green-500 to-green-600' },
    { name: 'Mathematics', icon: '📐', color: 'from-purple-500 to-purple-600' },
    { name: 'Biology', icon: '🧬', color: 'from-pink-500 to-pink-600' },
    { name: 'English', icon: '📚', color: 'from-orange-500 to-orange-600' },
    { name: 'Computer Science', icon: '💻', color: 'from-teal-500 to-teal-600' },
  ],
  'BTech - CSE': [
    { name: 'Data Structures', icon: '🌳', color: 'from-blue-500 to-blue-600' },
    { name: 'Algorithms', icon: '⚙️', color: 'from-purple-500 to-purple-600' },
    { name: 'DBMS', icon: '🗄️', color: 'from-green-500 to-green-600' },
    { name: 'Operating Systems', icon: '💻', color: 'from-orange-500 to-orange-600' },
    { name: 'Computer Networks', icon: '🌐', color: 'from-teal-500 to-teal-600' },
    { name: 'Software Engineering', icon: '🔧', color: 'from-red-500 to-red-600' },
  ],
};

function getSubjectsForClass(cls: string) {
  if (subjectsByClass[cls]) return subjectsByClass[cls];
  if (cls.startsWith('BTech')) {
    return [
      { name: 'Engineering Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600' },
      { name: 'Engineering Physics', icon: '⚡', color: 'from-purple-500 to-purple-600' },
      { name: 'Engineering Chemistry', icon: '🧪', color: 'from-green-500 to-green-600' },
      { name: 'Technical Communication', icon: '📝', color: 'from-orange-500 to-orange-600' },
    ];
  }
  const classNum = parseInt(cls.replace('Class ', ''));
  if (classNum <= 5) return subjectsByClass['Class 1'];
  if (classNum <= 8) return subjectsByClass['Class 6'];
  return subjectsByClass['Class 10'];
}

export default function AcademicSection() {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const subjects = getSubjectsForClass(selectedClass);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-baloo font-bold text-2xl text-white mb-1">Academic Section</h1>
          <p className="text-white/60 text-sm">Class 1 to BTech — All Study Material</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8 space-y-5">
        {/* Class Selector */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <label className="text-foreground/70 text-sm font-medium block mb-2">Select Class / Course</label>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
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
              <div
                key={subject.name}
                className="bg-card border border-border rounded-2xl p-4 hover:shadow-glass transition-all duration-200 hover:-translate-y-0.5 cursor-pointer active:scale-95"
                onClick={() => toast.info(`Opening ${subject.name}...`)}
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-3 text-xl`}>
                  {subject.icon}
                </div>
                <div className="font-medium text-foreground text-sm">{subject.name}</div>
                <div className="text-foreground/50 text-xs mt-0.5">{selectedClass}</div>
              </div>
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

          <TabsContent value="ncert" className="mt-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">NCERT Books</h3>
              <GovtApprovedBadge />
            </div>
            {subjects.map((subject) => (
              <div key={subject.name} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-lg shrink-0`}>
                  {subject.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">{subject.name}</div>
                  <div className="text-foreground/50 text-xs">{selectedClass} • NCERT</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toast.info('Opening book...')}
                    className="p-2 bg-vedansh-orange/10 text-vedansh-orange rounded-lg hover:bg-vedansh-orange/20 transition-colors"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toast.info('Download feature coming soon!')}
                    className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="material" className="mt-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Study Material</h3>
              <GovtApprovedBadge />
            </div>
            {subjects.map((subject) => (
              <div key={subject.name} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                <FileText className="w-8 h-8 text-vedansh-orange shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">{subject.name} — Complete Notes</div>
                  <div className="text-foreground/50 text-xs">PDF • 45 pages • Updated 2024</div>
                </div>
                <button
                  onClick={() => toast.info('Download feature coming soon!')}
                  className="p-2 bg-vedansh-orange/10 text-vedansh-orange rounded-lg hover:bg-vedansh-orange/20 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="videos" className="mt-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Video Lectures</h3>
              <GovtApprovedBadge />
            </div>
            {subjects.map((subject) => (
              <div key={subject.name} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <Video className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">{subject.name} — Chapter 1</div>
                  <div className="text-foreground/50 text-xs">45 min • HD Quality • Free</div>
                </div>
                <button
                  onClick={() => toast.info('Video player coming soon!')}
                  className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  <Play className="w-4 h-4" />
                </button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="notes" className="mt-4 space-y-3">
            <h3 className="font-semibold text-foreground mb-2">Notes & PDFs</h3>
            {subjects.map((subject) => (
              <div key={subject.name} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-500 shrink-0" />
                <div className="flex-1">
                  <div className="font-medium text-foreground text-sm">{subject.name} — Quick Notes</div>
                  <div className="text-foreground/50 text-xs">PDF • 12 pages • Handwritten</div>
                </div>
                <button
                  onClick={() => toast.info('PDF download coming soon!')}
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
