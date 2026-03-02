import { useState, useMemo } from 'react';
import { Search, BookOpen, Download, Play, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Book {
  subject: string;
  icon: string;
  color: string;
  chapters: number;
  pages: number;
}

const booksByClass: Record<string, Book[]> = {
  'Class 1': [
    { subject: 'Mathematics - Magic', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 13, pages: 120 },
    { subject: 'English - Marigold', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 10, pages: 100 },
    { subject: 'Hindi - Rimjhim', icon: '🔤', color: 'from-orange-500 to-orange-600', chapters: 23, pages: 130 },
  ],
  'Class 2': [
    { subject: 'Mathematics - Magic', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 15, pages: 140 },
    { subject: 'English - Marigold', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 10, pages: 110 },
    { subject: 'Hindi - Rimjhim', icon: '🔤', color: 'from-orange-500 to-orange-600', chapters: 15, pages: 120 },
  ],
  'Class 3': [
    { subject: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 14, pages: 160 },
    { subject: 'English - Marigold', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 10, pages: 120 },
    { subject: 'Hindi - Rimjhim', icon: '🔤', color: 'from-orange-500 to-orange-600', chapters: 15, pages: 130 },
    { subject: 'EVS - Looking Around', icon: '🌿', color: 'from-green-500 to-green-600', chapters: 24, pages: 180 },
  ],
  'Class 4': [
    { subject: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 14, pages: 170 },
    { subject: 'English - Marigold', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 10, pages: 130 },
    { subject: 'Hindi - Rimjhim', icon: '🔤', color: 'from-orange-500 to-orange-600', chapters: 18, pages: 140 },
    { subject: 'EVS - Looking Around', icon: '🌿', color: 'from-green-500 to-green-600', chapters: 27, pages: 200 },
  ],
  'Class 5': [
    { subject: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 14, pages: 180 },
    { subject: 'English - Marigold', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 10, pages: 140 },
    { subject: 'Hindi - Rimjhim', icon: '🔤', color: 'from-orange-500 to-orange-600', chapters: 18, pages: 150 },
    { subject: 'EVS - Looking Around', icon: '🌿', color: 'from-green-500 to-green-600', chapters: 22, pages: 190 },
  ],
  'Class 6': [
    { subject: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 14, pages: 290 },
    { subject: 'Science', icon: '🔬', color: 'from-green-500 to-green-600', chapters: 16, pages: 260 },
    { subject: 'Social Science - History', icon: '🏛️', color: 'from-orange-500 to-orange-600', chapters: 11, pages: 180 },
    { subject: 'Social Science - Geography', icon: '🌍', color: 'from-teal-500 to-teal-600', chapters: 8, pages: 140 },
    { subject: 'English - Honeysuckle', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 10, pages: 160 },
    { subject: 'Hindi - Vasant', icon: '🔤', color: 'from-red-500 to-red-600', chapters: 17, pages: 200 },
  ],
  'Class 7': [
    { subject: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 15, pages: 310 },
    { subject: 'Science', icon: '🔬', color: 'from-green-500 to-green-600', chapters: 18, pages: 280 },
    { subject: 'Social Science - History', icon: '🏛️', color: 'from-orange-500 to-orange-600', chapters: 10, pages: 190 },
    { subject: 'Social Science - Geography', icon: '🌍', color: 'from-teal-500 to-teal-600', chapters: 9, pages: 150 },
    { subject: 'English - Honeycomb', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 10, pages: 170 },
    { subject: 'Hindi - Vasant', icon: '🔤', color: 'from-red-500 to-red-600', chapters: 20, pages: 220 },
  ],
  'Class 8': [
    { subject: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 16, pages: 320 },
    { subject: 'Science', icon: '🔬', color: 'from-green-500 to-green-600', chapters: 18, pages: 300 },
    { subject: 'Social Science - History', icon: '🏛️', color: 'from-orange-500 to-orange-600', chapters: 12, pages: 200 },
    { subject: 'Social Science - Geography', icon: '🌍', color: 'from-teal-500 to-teal-600', chapters: 6, pages: 120 },
    { subject: 'English - Honeydew', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 10, pages: 180 },
    { subject: 'Hindi - Vasant', icon: '🔤', color: 'from-red-500 to-red-600', chapters: 18, pages: 230 },
  ],
  'Class 9': [
    { subject: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 15, pages: 350 },
    { subject: 'Science', icon: '🔬', color: 'from-green-500 to-green-600', chapters: 15, pages: 320 },
    { subject: 'Social Science - History', icon: '🏛️', color: 'from-orange-500 to-orange-600', chapters: 5, pages: 160 },
    { subject: 'Social Science - Geography', icon: '🌍', color: 'from-teal-500 to-teal-600', chapters: 6, pages: 140 },
    { subject: 'English - Beehive', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 11, pages: 190 },
    { subject: 'Hindi - Kshitij', icon: '🔤', color: 'from-red-500 to-red-600', chapters: 17, pages: 240 },
  ],
  'Class 10': [
    { subject: 'Mathematics', icon: '📐', color: 'from-blue-500 to-blue-600', chapters: 15, pages: 360 },
    { subject: 'Science', icon: '🔬', color: 'from-green-500 to-green-600', chapters: 16, pages: 340 },
    { subject: 'Social Science - History', icon: '🏛️', color: 'from-orange-500 to-orange-600', chapters: 5, pages: 170 },
    { subject: 'Social Science - Geography', icon: '🌍', color: 'from-teal-500 to-teal-600', chapters: 7, pages: 150 },
    { subject: 'English - First Flight', icon: '📚', color: 'from-purple-500 to-purple-600', chapters: 11, pages: 200 },
    { subject: 'Hindi - Kshitij', icon: '🔤', color: 'from-red-500 to-red-600', chapters: 17, pages: 250 },
  ],
  'Class 11': [
    { subject: 'Physics Part 1', icon: '⚡', color: 'from-blue-500 to-blue-600', chapters: 8, pages: 280 },
    { subject: 'Physics Part 2', icon: '⚡', color: 'from-blue-600 to-blue-700', chapters: 7, pages: 260 },
    { subject: 'Chemistry Part 1', icon: '🧪', color: 'from-green-500 to-green-600', chapters: 7, pages: 240 },
    { subject: 'Chemistry Part 2', icon: '🧪', color: 'from-green-600 to-green-700', chapters: 7, pages: 220 },
    { subject: 'Mathematics', icon: '📐', color: 'from-purple-500 to-purple-600', chapters: 16, pages: 400 },
    { subject: 'Biology', icon: '🧬', color: 'from-pink-500 to-pink-600', chapters: 22, pages: 380 },
    { subject: 'English - Hornbill', icon: '📚', color: 'from-orange-500 to-orange-600', chapters: 8, pages: 180 },
  ],
  'Class 12': [
    { subject: 'Physics Part 1', icon: '⚡', color: 'from-blue-500 to-blue-600', chapters: 8, pages: 300 },
    { subject: 'Physics Part 2', icon: '⚡', color: 'from-blue-600 to-blue-700', chapters: 6, pages: 280 },
    { subject: 'Chemistry Part 1', icon: '🧪', color: 'from-green-500 to-green-600', chapters: 9, pages: 260 },
    { subject: 'Chemistry Part 2', icon: '🧪', color: 'from-green-600 to-green-700', chapters: 7, pages: 240 },
    { subject: 'Mathematics Part 1', icon: '📐', color: 'from-purple-500 to-purple-600', chapters: 6, pages: 320 },
    { subject: 'Mathematics Part 2', icon: '📐', color: 'from-purple-600 to-purple-700', chapters: 7, pages: 300 },
    { subject: 'Biology', icon: '🧬', color: 'from-pink-500 to-pink-600', chapters: 16, pages: 360 },
    { subject: 'English - Flamingo', icon: '📚', color: 'from-orange-500 to-orange-600', chapters: 8, pages: 200 },
  ],
};

const classOptions = Object.keys(booksByClass);

export default function NCERTLibrary() {
  const [selectedClass, setSelectedClass] = useState('Class 10');
  const [search, setSearch] = useState('');

  const filteredBooks = useMemo(() => {
    const books = booksByClass[selectedClass] || [];
    if (!search.trim()) return books;
    return books.filter(b => b.subject.toLowerCase().includes(search.toLowerCase()));
  }, [selectedClass, search]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-vedansh-orange/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-vedansh-orange" />
            </div>
            <div>
              <h1 className="font-baloo font-bold text-2xl text-white">NCERT Library</h1>
              <p className="text-white/60 text-sm">Class 1-12 • All Subjects • Free</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8 space-y-4">
        {/* Filters */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search subjects..."
              className="pl-9"
            />
          </div>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map(cls => (
                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Govt Approved Banner */}
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
          <img src="/assets/generated/govt-approved-stamp.dim_128x128.png" alt="Govt Approved" className="w-8 h-8 object-contain" />
          <div>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">Government Approved Content</div>
            <div className="text-foreground/50 text-xs">All NCERT books are officially approved by MHRD, Govt. of India</div>
          </div>
        </div>

        {/* Books Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">{selectedClass} Books</h3>
            <span className="text-xs text-foreground/50">{filteredBooks.length} books</span>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="text-center py-12 text-foreground/50">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No books found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredBooks.map((book, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-glass transition-all duration-200">
                  {/* Book Cover */}
                  <div className={`bg-gradient-to-br ${book.color} p-6 flex items-center justify-center`}>
                    <div className="text-center">
                      <div className="text-4xl mb-2">{book.icon}</div>
                      <div className="text-white font-bold text-sm text-center leading-tight">{book.subject}</div>
                      <div className="text-white/70 text-xs mt-1">{selectedClass}</div>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold text-foreground text-sm">{book.subject}</div>
                        <div className="text-foreground/50 text-xs">{book.chapters} chapters • {book.pages} pages</div>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 text-xs font-semibold">
                        <CheckCircle className="w-3 h-3" /> Approved
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toast.info('Opening book reader...')}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-vedansh-orange/10 text-vedansh-orange text-xs font-semibold py-2 rounded-lg hover:bg-vedansh-orange/20 transition-colors"
                      >
                        <Play className="w-3 h-3" /> Read Online
                      </button>
                      <button
                        onClick={() => toast.info('PDF download coming soon!')}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500/10 text-blue-500 text-xs font-semibold py-2 rounded-lg hover:bg-blue-500/20 transition-colors"
                      >
                        <Download className="w-3 h-3" /> Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
