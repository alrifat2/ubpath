import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import SignIn from "./pages/auth/SignIn.tsx";
import UserOnboarding from "./pages/auth/UserOnboarding.tsx";
import VerifyCode from "./pages/auth/VerifyCode.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/verify" element={<VerifyCode />} />
        <Route path="/auth/onboarding" element={<UserOnboarding />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
