import { Route, Routes } from "react-router-dom";

import LoginPage from "./components/LoginPage/LoginPage";
import EventPage from "./components/EventDashboard/EventPage";
import EventDashboard from "./components/EventDashboard/EventDashboard";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import NewEventForm from "./components/EventDashboard/NewEventForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<EventDashboard />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/event/new" element={<NewEventForm />} />
      </Routes>
    </>
  );
}

export default App;
