import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";
import PublicLayout from "./components/PublicLayout";
import AIToolsHub from "./pages/AIToolsHub";
import AboutPage from "./pages/AboutPage";
import AcademicSection from "./pages/AcademicSection";
import AptitudePage from "./pages/AptitudePage";
import AuthPage from "./pages/AuthPage";
import CompetitiveExams from "./pages/CompetitiveExams";
import Dashboard from "./pages/Dashboard";
import EducationTools from "./pages/EducationTools";
import GovernmentResources from "./pages/GovernmentResources";
import InteractiveQuizzes from "./pages/InteractiveQuizzes";
import LandingPage from "./pages/LandingPage";
import NCERTLibrary from "./pages/NCERTLibrary";
import PlacementPrep from "./pages/PlacementPrep";
import SplashScreen from "./pages/SplashScreen";
import TechnicalInterviewPage from "./pages/TechnicalInterviewPage";
import WellnessHub from "./pages/WellnessHub";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public layout route
const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public-layout",
  component: PublicLayout,
});

// App layout route (authenticated)
const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app-layout",
  component: Layout,
});

// Splash screen
const splashRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SplashScreen,
});

// Landing page
const landingRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/landing",
  component: LandingPage,
});

// Auth page
const authRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/auth",
  component: AuthPage,
});

// About page
const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/about",
  component: AboutPage,
});

// Dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/dashboard",
  component: Dashboard,
});

// Profile (same as dashboard)
const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/profile",
  component: Dashboard,
});

// Academic Section
const academicRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/academic",
  component: AcademicSection,
});

// Interactive Quizzes
const quizzesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/quizzes",
  component: InteractiveQuizzes,
});

// AI Tools Hub
const aiToolsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/ai-tools",
  component: AIToolsHub,
});

// Wellness Hub
const wellnessRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/wellness",
  component: WellnessHub,
});

// Placement Prep
const placementRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/placement",
  component: PlacementPrep,
});

// Aptitude Page
const aptitudeRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/placement/aptitude",
  component: AptitudePage,
});

// Technical Interview Page
const technicalInterviewRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/placement/technical-interview",
  component: TechnicalInterviewPage,
});

// NCERT Library
const ncertRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/ncert",
  component: NCERTLibrary,
});

// Competitive Exams
const competitiveRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/competitive",
  component: CompetitiveExams,
});

// Government Resources
const govtRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/govt-resources",
  component: GovernmentResources,
});

// Education Tools
const educationToolsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/education-tools",
  component: EducationTools,
});

const routeTree = rootRoute.addChildren([
  splashRoute,
  publicLayoutRoute.addChildren([landingRoute, authRoute, aboutRoute]),
  appLayoutRoute.addChildren([
    dashboardRoute,
    profileRoute,
    academicRoute,
    quizzesRoute,
    aiToolsRoute,
    wellnessRoute,
    placementRoute,
    aptitudeRoute,
    technicalInterviewRoute,
    ncertRoute,
    competitiveRoute,
    govtRoute,
    educationToolsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
