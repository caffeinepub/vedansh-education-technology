import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

// Pages
import SplashScreen from './pages/SplashScreen';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import AcademicSection from './pages/AcademicSection';
import CompetitiveExams from './pages/CompetitiveExams';
import PlacementPrep from './pages/PlacementPrep';
import AIToolsHub from './pages/AIToolsHub';
import WellnessHub from './pages/WellnessHub';
import GovernmentResources from './pages/GovernmentResources';
import NCERTLibrary from './pages/NCERTLibrary';
import InteractiveQuizzes from './pages/InteractiveQuizzes';
import EducationTools from './pages/EducationTools';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public routes (no bottom nav)
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'public-layout',
  component: PublicLayout,
});

const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SplashScreen,
});

const landingRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/home',
  component: LandingPage,
});

const authRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/auth',
  component: AuthPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: '/about',
  component: AboutPage,
});

// Authenticated routes (with bottom nav)
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app-layout',
  component: Layout,
});

const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/dashboard',
  component: Dashboard,
});

const academicRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/academic',
  component: AcademicSection,
});

const competitiveExamsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/competitive-exams',
  component: CompetitiveExams,
});

const placementPrepRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/placement-prep',
  component: PlacementPrep,
});

const aiToolsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/ai-tools',
  component: AIToolsHub,
});

const wellnessRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/wellness',
  component: WellnessHub,
});

const governmentResourcesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/government-resources',
  component: GovernmentResources,
});

const ncertLibraryRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/ncert-library',
  component: NCERTLibrary,
});

const quizzesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/quizzes',
  component: InteractiveQuizzes,
});

const educationToolsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/education-tools',
  component: EducationTools,
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  publicLayoutRoute.addChildren([
    landingRoute,
    authRoute,
    aboutRoute,
  ]),
  layoutRoute.addChildren([
    dashboardRoute,
    academicRoute,
    competitiveExamsRoute,
    placementPrepRoute,
    aiToolsRoute,
    wellnessRoute,
    governmentResourcesRoute,
    ncertLibraryRoute,
    quizzesRoute,
    educationToolsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
