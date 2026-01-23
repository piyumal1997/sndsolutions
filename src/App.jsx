import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';

// Lazy load pages – this triggers the spinner on navigation
const Home = lazy(() => import('./pages/Home'));
const Solutions = lazy(() => import('./pages/Solutions'));
const SolarEnergy = lazy(() => import('./pages/SolarEnergy'));
const SolarHome = lazy(() => import('./pages/SolarHome'));
const SolarIndustry = lazy(() => import('./pages/SolarIndustry'));
const Automation = lazy(() => import('./pages/Automation'));
const Engineering = lazy(() => import('./pages/Engineering'));
const Projects = lazy(() => import('./pages/Projects'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/AdminDashboard'));

// Shared Layout (Header + Footer on all pages)
const Layout = () => (
  <>
    <Header />
    <main>
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </>
);

// Router configuration
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/solutions", element: <Solutions /> },
      { path: "/solar-energy", element: <SolarEnergy /> },
      { path: "/solar-home", element: <SolarHome /> },
      { path: "/solar-industry", element: <SolarIndustry /> },
      { path: "/automation", element: <Automation /> },
      { path: "/engineering", element: <Engineering /> },
      { path: "/projects", element: <Projects /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<LoadingSpinner />} />;
}

export default App;