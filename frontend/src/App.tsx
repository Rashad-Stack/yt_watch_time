import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Layout from "./pages/Layout";
import MyVideos from "./pages/MyVideos";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-videos" element={<MyVideos />} />
        </Route>
        <Route index element={<Home />} />
        <Route path="how-it-works" element={<HowItWorks />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
