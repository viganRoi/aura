import React from "react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import {
  AboutPage,
  AllApartmentsPage,
  BlogPage,
  BuildingPage,
  CommercialPage,
  ContactPage,
  FloorPage,
  GeneralBuildingPage,
  HomePage,
  ParkingPage,
  PortfolioPage,
  SingleApartmentPage,
  WishlistPage,
  ConditionalLayout,
  ErrorPage,
  CommercialUnitPage,
  AllCommercialPage,
  TempCommA,
  TempCommB,
  TempCommC,
  TempCommD,
  VirtualPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import SvgExtractor from "./pages/SvgExtractor";
import FloorSvgExtractor from "./pages/FloorSvgExtractor";
import FloorBuildingSvgExtractor from "./pages/FloorBuildingSvgExtractor";
import { AuthProvider } from "./components/auth/AuthProvider";
import AdminPage from "./pages/admin/AdminPage";
import SingleApartmentByFloorPage from "./pages/SibleApartmentByFloorPage";
import FloorSvgPage from "./pages/FloorSvgPage";
import ParkingSvgExtractor from "./pages/admin/svgExtractor/ParkingSvgExtractor";
import SvgExtractorForStores from "./pages/admin/svgExtractor/SvgExtractorForStores";
import HouseSvgExtractor from "./pages/HouseSvgExtractor";

function App() {
  return (
    <Router>
      <ConditionalLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/floorsvg/:id" element={<FloorSvgPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/svg-extrator" element={<SvgExtractor />} />
          <Route path="/fsvg-extrator" element={<FloorSvgExtractor />} />
          <Route
            path="/fbsvg-extrator"
            element={<FloorBuildingSvgExtractor />}
          />
          <Route path="/psvg-extrator" element={<ParkingSvgExtractor />} />
          <Route
            path="/store/svg-extractor"
            element={<SvgExtractorForStores />}
          />
          <Route
            path="/house/svg-extractor"
            element={<HouseSvgExtractor />}
          />
          <Route path="/buildings" element={<GeneralBuildingPage />} />
          <Route path="/buildings/:id" element={<BuildingPage />} />
          <Route path="/buildings/:id/floor/:floorId" element={<FloorPage />} />
          <Route path="/apartments/:id" element={<SingleApartmentPage />} />
          <Route path="/apartments" element={<AllApartmentsPage />} />
          <Route path="/360-virtual" element={<VirtualPage />} />
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
