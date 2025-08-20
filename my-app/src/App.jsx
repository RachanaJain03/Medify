import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Booking from "./pages/Booking";
import MyBookings from "./pages/myBookings";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/booking/:centerId" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}