import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import EventPage from "./pages/EventPage";
import EventDashboard from "./pages/DashboardPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<EventDashboard />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
      </Routes>
    </>
  );
}

export default App;
