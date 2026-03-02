# Specification

## Summary
**Goal:** Build a full-featured educational web application for Vedansh Education & Technology with a Motoko backend, covering student data management, academic content, competitive exam prep, AI tool mock interfaces, wellness tools, quizzes with leaderboard, and a consistent brand design system.

**Planned changes:**

### Backend (Motoko)
- Actor storing mock student records (name, phone, streak, subject progress, quiz scores, achievement badges)
- Query/update functions: `getStudent`, `updateStreak`, `saveQuizScore`, `getLeaderboard` (top 10)

### Frontend Pages & Components
- **Splash Screen:** 3-second animated screen with Vedansh logo, brand name, and tagline "Seekho, Badho, Chamko"; auto-transitions to landing page
- **Landing/Home Page:** Hero section with headline, sub-headline, NEP 2020 badge, animated stats (50+ Exams, Class 1–BTech, 1Cr+ Students), 6+ feature highlight cards, Founder section (Mrityunjay Pandey, BTech CSE, Founder & CEO)
- **Auth Page:** OTP-based mock login with 10-digit mobile input, 6 animated OTP boxes with auto-focus, security badge, 30-second resend countdown; any 6-digit code routes to Dashboard
- **Dashboard:** Welcome message, 4 quick-access cards (Study, Practice, Wellness, AI Tools), daily streak counter with fire icon, subject progress bars, upcoming quizzes section, notification bell with badge, NEP 2020 badge
- **Academic Section:** Class selector (1–12 + BTech branches), subject cards with icons, NCERT Books and Video Lectures sections with "Government Approved" badge, Notes section with PDF Download button UI, Study Material section
- **Competitive Exam Prep:** Scrollable grid of 50+ exam cards (JEE, NEET, UPSC, SSC, Banking, Railway, Bihar Police, etc.) each with Free Study Material, Mock Tests, and Previous Year Papers buttons; visually grouped categories
- **BTech Placement Prep:** Branch selector (CSE, ECE, ME, CE, EE, IT, Chemical, etc.), DSA & Coding with Government Approved badge, Aptitude & Reasoning, Technical Interview Prep, Resume Builder form UI, 10+ company cards, animated placement stats
- **AI Tools Hub:** Two sections — AI Maths Tutor (math input, mock keyboard, topic selector, step-by-step mock solution panel) and AI English Coach (reading comprehension, mic button UI, vocabulary builder, grammar checker, conversation practice); all mock/UI only
- **Student Wellness & Success Hub:** Health & Wellness cards (tips, meditation timer UI, eye strain/posture alerts), functional Pomodoro timer (25-min study / 5-min break, start/pause/reset), study schedule planner UI, daily goals checklist, rotating daily motivational quote, success stories, achievement badges grid, Study Groups join/create UI
- **Government Resources:** Three tabs — Government Jobs (by sector), Scholarships (NSP, state), Government Schemes; each card has Official Source badge and View Details button; 5+ sample entries per tab
- **NCERT Library:** Class selector (1–12), book cards with cover placeholder, Government Approved stamp, Read Online and Download PDF buttons (UI only), real-time search by class/subject
- **Interactive Quizzes:** Subject-wise quiz selection (6+ subjects), 30-second per-question countdown, score saved to backend via `saveQuizScore`, leaderboard from `getLeaderboard`, review answers screen, confetti animation on completion
- **Education Tools (BTech):** Branch tabs — CSE (code editor textarea with syntax highlighting, algorithm visualizer mockup), ECE (circuit simulator UI mockup), ME (CAD viewer UI mockup); Government Approved badge on all tools
- **About Page:** Brand story, Mission and Vision sections, Founder profile card, NEP 2020 compliance section, "100% Free Forever" banner

### Navigation & Global UI
- Fixed bottom navigation bar (5 tabs: Home, Study, AI Tools, Wellness, Profile) with Deep Navy background and Vibrant Orange active indicator; visible on all authenticated pages
- Dark/Light mode toggle in header; persists via localStorage; dark = #0A1628, light = #F8F9FA
- Brand design system: colors #0A1628, #FF6B00, #FFD700, #00C851; glassmorphism card effects; gradient hero sections; loading skeleton placeholders; toast notifications; Framer Motion page transitions
- Branded footer on non-dashboard pages with full attribution text, social media icons, and NEP 2020 badge
- Vedansh logo displayed in splash screen and top navbar

**User-visible outcome:** Users can open the animated splash screen, navigate a full educational platform with mock OTP login, explore academic content, competitive exam prep, AI tool UIs, wellness tools including a working Pomodoro timer, take timed quizzes with a live leaderboard, and experience a consistent branded design with dark/light mode throughout.
