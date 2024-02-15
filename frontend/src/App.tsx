import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
