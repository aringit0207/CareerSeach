import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import Home from "./components/HomePage/Home.jsx";
import Jobs from "./components/JobsPage/Jobs.jsx";
import Browse from "./components/BrowsePage/Browse.jsx";
import Profile from "./components/Profile/Profile.jsx";
import JobDescription from "./components/JobsPage/JobDescription.jsx";
import Companies from "./components/Admin/Company/Companies.jsx";
import NewCompany from "./components/Admin/Company/NewCompany.jsx";
import CompanySetup from "./components/Admin/Company/CompanySetup.jsx";
import AdminJobs from "./components/Admin/Job/AdminJobs.jsx";
import PostJob from "./components/Admin/Job/PostJob.jsx";
import Applicants from "./components/Admin/Applicants/Applicants.jsx";
import RecruiterRouteProtection from "./components/RouteProtection/RecruiterRouteProtection.jsx";
import StudentRouteProtection from "./components/RouteProtection/StudentRouteProtection.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  
  // client side
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <StudentRouteProtection><JobDescription /></StudentRouteProtection>,
  },
  {
    path: "/browse",
    element: <StudentRouteProtection><Browse /></StudentRouteProtection>,
  },
  {
    path: "/profile",
    element: <StudentRouteProtection><Profile /></StudentRouteProtection>,
  },

  // admin side
  {
    path: "/admin/companies",
    element: <RecruiterRouteProtection><Companies /></RecruiterRouteProtection>,
  },
  {
    path: "/admin/companies/create",
    element: <RecruiterRouteProtection><NewCompany /></RecruiterRouteProtection>,
  },
  {
    path: "/admin/companies/:id",
    element: <RecruiterRouteProtection><CompanySetup /></RecruiterRouteProtection>,
  },
  {
    path: "/admin/jobs",
    element: <RecruiterRouteProtection><AdminJobs /></RecruiterRouteProtection>,
  },
  {
    path: "/admin/jobs/create",
    element: <RecruiterRouteProtection><PostJob /></RecruiterRouteProtection>,
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <RecruiterRouteProtection><Applicants /></RecruiterRouteProtection>,
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
