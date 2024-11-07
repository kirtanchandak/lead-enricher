"use client";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import LeadCaptureForm from "./components/LeadCapture";

export default function LandingPage() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lead" element={<LeadCaptureForm />} />
    </Routes>
  );
}
