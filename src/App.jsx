import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing.jsx";
import Studio from "./pages/Studio.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/studio" element={<Studio />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
