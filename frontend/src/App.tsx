import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        element={
          <Layout>
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          </Layout>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
