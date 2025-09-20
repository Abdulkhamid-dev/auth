import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProviders } from "./providers/AppProviders";

const Login = React.lazy(() => import("./pages/login/Login"));
const Verify = React.lazy(() => import("./pages/Verify/Verify"));

export function App() {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </AppProviders>
  );
}
