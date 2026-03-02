import { useState } from 'react';
import { ExternalLink, CheckCircle, Briefcase, GraduationCap, Building2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface ResourceItem {
  title: string;
  desc: string;
  eligibility: string;
  source: string;
  deadline?: string;
  amount?: string;
}

const govtJobs: ResourceItem[] = [
  { title: 'UPSC Civil Services 2025', desc: 'IAS, IPS, IFS and other Group A & B services', eligibility: 'Graduate, Age 21-32', source: 'upsc.gov.in', deadline: 'Feb 2025' },
  { title: 'SSC CGL 2025', desc: 'Combined Graduate Level Examination for Group B & C posts', eligibility: 'Graduate, Age 18-32', source: 'ssc.nic.in', deadline: 'Mar 2025' },
  { title: 'RRB NTPC 2025', desc: 'Railway Non-Technical Popular Categories recruitment', eligibility: '12th Pass / Graduate', source: 'indianrailways.gov.in', deadline: 'Apr 2025' },
  { title: 'IBPS PO 2025', desc: 'Probationary Officer in Public Sector Banks', eligibility: 'Graduate, Age 20-30', source: 'ibps.in', deadline: 'May 2025' },
  { title: 'Bihar Police Constable', desc: 'Bihar Police Constable recruitment 2025', eligibility: '12th Pass, Age 18-25', source: 'csbc.bih.nic.in', deadline: 'Jun 2025' },
  { title: 'CTET 2025', desc: 'Central Teacher Eligibility Test for teaching posts', eligibility: 'B.Ed / D.El.Ed', source: 'ctet.nic.in', deadline: 'Jul 2025' },
  { title: 'NDA 2025', desc: 'National Defence Academy entrance examination', eligibility: '12th Pass, Age 16.5-19.5', source: 'upsc.gov.in', deadline: 'Aug 2025' },
  { title: 'DRDO Scientist B', desc: 'Defence Research & Development Organisation', eligibility: 'B.Tech/BE, Age 18-28', source: 'drdo.gov.in', deadline: 'Sep 2025' },
];

const scholarships: ResourceItem[] = [
  { title: 'NSP Central Sector Scholarship', desc: 'For Class 12 passed students pursuing higher education', eligibility: 'Family income < 8 LPA, 80%+ in 12th', source: 'scholarships.gov.in', amount: '₹12,000/year' },
  { title: 'PM Scholarship Scheme', desc: 'For wards of ex-servicemen and ex-coast guard personnel', eligibility: 'Wards of Ex-Servicemen', source: 'ksb.gov.in', amount: '₹2,500/month' },
  { title: 'Inspire Scholarship (DST)', desc: 'For students pursuing natural and basic sciences', eligibility: 'Top 1% in 12th, pursuing BSc/BS', source: 'online-inspire.gov.in', amount: '₹80,000/year' },
  { title: 'Pragati Scholarship (AICTE)', desc: 'For girl students pursuing technical education', eligibility: 'Girl students in AICTE approved colleges', source: 'aicte-india.org', amount: '₹50,000/year' },
  { title: 'Saksham Scholarship (AICTE)', desc: 'For differently-abled students in technical education', eligibility: 'Differently-abled students', source: 'aicte-india.org', amount: '₹50,000/year' },
  { title: 'Bihar State Scholarship', desc: 'For SC/ST/OBC students in Bihar', eligibility: 'SC/ST/OBC students in Bihar', source: 'pmsonline.bih.nic.in', amount: '₹15,000/year' },
  { title: 'Minority Scholarship (MOMA)', desc: 'Pre and post matric scholarships for minority students', eligibility: 'Minority community students', source: 'scholarships.gov.in', amount: '₹10,000/year' },
];

const govtSchemes: ResourceItem[] = [
  { title: 'PM KAUSHAL VIKAS YOJANA', desc: 'Free skill development training for youth under NSDC', eligibility: 'Age 15-45, Indian citizen', source: 'pmkvyofficial.org' },
  { title: 'Digital India Programme', desc: 'Free digital literacy and computer training', eligibility: 'All Indian citizens', source: 'digitalindia.gov.in' },
  { title: 'Startup India', desc: 'Support for student entrepreneurs and startups', eligibility: 'Students with innovative ideas', source: 'startupindia.gov.in' },
  { title: 'SWAYAM (Free Online Courses)', desc: 'Free online courses from IITs, IIMs, and central universities', eligibility: 'All students', source: 'swayam.gov.in' },
  { title: 'e-Pathshala', desc: 'Free digital textbooks and educational resources', eligibility: 'Class 1-12 students', source: 'epathshala.nic.in' },
  { title: 'National Digital Library', desc: 'Free access to millions of books and research papers', eligibility: 'All students and researchers', source: 'ndl.gov.in' },
  { title: 'Vidyanjali 2.0', desc: 'Volunteer program to strengthen government schools', eligibility: 'Graduates and professionals', source: 'vidyanjali.education.gov.in' },
  { title: 'PM e-VIDYA', desc: 'Multi-mode access to digital education', eligibility: 'All students', source: 'pmevidya.education.gov.in' },
];

function ResourceCard({ item, type }: { item: ResourceItem; type: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-4 hover:shadow-glass transition-all duration-200">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold text-foreground text-sm leading-tight flex-1 pr-2">{item.title}</h4>
          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 text-xs font-semibold shrink-0">
            <CheckCircle className="w-3 h-3" /> Official
          </span>
        </div>
        <p className="text-foreground/60 text-xs mb-2 leading-relaxed">{item.desc}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {item.amount && (
            <span className="text-xs bg-vedansh-gold/10 text-vedansh-gold border border-vedansh-gold/20 rounded-full px-2 py-0.5 font-medium">
              💰 {item.amount}
            </span>
          )}
          {item.deadline && (
            <span className="text-xs bg-red-500/10 text-red-500 border border-red-500/20 rounded-full px-2 py-0.5 font-medium">
              📅 {item.deadline}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-foreground/40 text-xs flex items-center gap-1">
            <ExternalLink className="w-3 h-3" /> {item.source}
          </span>
          <button
            onClick={() => setOpen(true)}
            className="text-xs bg-vedansh-orange/10 text-vedansh-orange font-semibold px-3 py-1.5 rounded-lg hover:bg-vedansh-orange/20 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{item.title}</DialogTitle>
            <DialogDescription>{item.desc}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="bg-muted/50 rounded-xl p-3">
              <div className="text-xs font-semibold text-foreground/70 mb-1">Eligibility</div>
              <p className="text-sm text-foreground">{item.eligibility}</p>
            </div>
            {item.amount && (
              <div className="bg-vedansh-gold/10 rounded-xl p-3">
                <div className="text-xs font-semibold text-foreground/70 mb-1">Amount / Benefit</div>
                <p className="text-sm font-bold text-vedansh-gold">{item.amount}</p>
              </div>
            )}
            {item.deadline && (
              <div className="bg-red-500/10 rounded-xl p-3">
                <div className="text-xs font-semibold text-foreground/70 mb-1">Last Date</div>
                <p className="text-sm font-bold text-red-500">{item.deadline}</p>
              </div>
            )}
            <div className="bg-emerald-500/10 rounded-xl p-3">
              <div className="text-xs font-semibold text-foreground/70 mb-1">Official Source</div>
              <p className="text-sm text-emerald-600 font-medium">{item.source}</p>
            </div>
            <button
              onClick={() => { toast.info('Redirecting to official website...'); setOpen(false); }}
              className="w-full bg-vedansh-orange hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> Visit Official Website
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function GovernmentResources() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-vedansh-orange/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-vedansh-orange" />
            </div>
            <div>
              <h1 className="font-baloo font-bold text-2xl text-white">Government Resources</h1>
              <p className="text-white/60 text-sm">Jobs • Scholarships • Schemes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8">
        <Tabs defaultValue="jobs">
          <TabsList className="w-full grid grid-cols-3 mb-5">
            <TabsTrigger value="jobs">
              <Briefcase className="w-3.5 h-3.5 mr-1" /> Jobs
            </TabsTrigger>
            <TabsTrigger value="scholarships">
              <GraduationCap className="w-3.5 h-3.5 mr-1" /> Scholarships
            </TabsTrigger>
            <TabsTrigger value="schemes">
              <Building2 className="w-3.5 h-3.5 mr-1" /> Schemes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Government Jobs 2025</h3>
              <span className="text-xs text-foreground/50">{govtJobs.length} listings</span>
            </div>
            {govtJobs.map((item, i) => (
              <ResourceCard key={i} item={item} type="job" />
            ))}
          </TabsContent>

          <TabsContent value="scholarships" className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Scholarships for Students</h3>
              <span className="text-xs text-foreground/50">{scholarships.length} scholarships</span>
            </div>
            {scholarships.map((item, i) => (
              <ResourceCard key={i} item={item} type="scholarship" />
            ))}
          </TabsContent>

          <TabsContent value="schemes" className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Government Schemes</h3>
              <span className="text-xs text-foreground/50">{govtSchemes.length} schemes</span>
            </div>
            {govtSchemes.map((item, i) => (
              <ResourceCard key={i} item={item} type="scheme" />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
