import { Route, Routes } from "react-router-dom";
import {
  SplashScreen,
  Callback,
  Dashboard,
  MinhaAura,
  AuraSemanal,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/callback" element={<Callback />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/minhaAura" element={<MinhaAura />} />
        <Route path="/auraSemanal" element={<AuraSemanal />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
