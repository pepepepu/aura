import { Route, Routes } from "react-router-dom";
import {
  SplashScreen,
  Callback,
  Dashboard,
  MinhaAura,
  AuraSemanal,
  PrivacyPolicy,
  TermsAndConditions,
  Mapa,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/callback" element={<Callback />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/minhaAura" element={<MinhaAura />} />
        <Route path="/auraSemanal" element={<AuraSemanal />} />
        <Route path="/constelacao" element={<Mapa />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
