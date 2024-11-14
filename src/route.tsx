import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@/pages/Dashboard";
import HomeLayout from "@/pages/HomeLayout";
import CaseAndService from "./pages/CaseAndService";
import ActivityFeed from "./components/CaseManagement/ActivityFeed";
import Support from "./pages/Support";
import CMS from "./pages/CMS";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },

      {
        path: "/case-and-service-management",
        element: <CaseAndService />,
      },
      {
        path: "/activity-feed",
        element: <ActivityFeed />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/cms",
        element: <CMS />,
      },
      {
        path: "*",
        element: <h1>404 Not Found</h1>,
      },
    ],
  },
]);
