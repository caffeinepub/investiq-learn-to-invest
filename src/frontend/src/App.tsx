import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import CalculatorsPage from "./pages/CalculatorsPage";
import GlossaryPage from "./pages/GlossaryPage";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import ModuleDetailPage from "./pages/ModuleDetailPage";
import QuizPage from "./pages/QuizPage";

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const learnRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learn",
  component: LearnPage,
});

const moduleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learn/$id",
  component: ModuleDetailPage,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learn/$id/quiz",
  component: QuizPage,
});

const calculatorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculators",
  component: CalculatorsPage,
});

const glossaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/glossary",
  component: GlossaryPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  learnRoute,
  moduleDetailRoute,
  quizRoute,
  calculatorsRoute,
  glossaryRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
