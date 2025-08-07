import { Routes, Route, HashRouter as Router } from "react-router-dom";
import {
  AllApartmentsPage,
  ProjectPage,
  WishlistPage,
  ConditionalLayout,
  ErrorPage,
  SingleHousePage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import SvgExtractor from "./pages/SvgExtractor";
import { AuthProvider } from "./components/auth/AuthProvider";
import AdminPage from "./pages/admin/AdminPage";
import HouseSvgExtractor from "./pages/HouseSvgExtractor";

function App() {
  return (
    <Router>
      <ConditionalLayout>
        <Routes>
          <Route path="/" element={<ProjectPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/svg-extrator" element={<SvgExtractor />} />
          <Route path="/house/svg-extractor" element={<HouseSvgExtractor />} />
          <Route path="/house/:id" element={<SingleHousePage />} />
          <Route path="/apartments" element={<AllApartmentsPage />} />
          <Route
            path="/admin/*"
            element={
              <AuthProvider>
                <AdminPage />
              </AuthProvider>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ConditionalLayout>
      <ToastContainer />
    </Router>
  );
}

export default App;
