import { Button, Grid2 as Grid, Paper } from "@mui/material";
import UserData from "./UserData";
import { Event } from "../../types";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import EventSection from "./EventSection";

const EventDashboard: React.FC = () => {
  const navigate = useNavigate();
  const sessionFullName = sessionStorage.getItem("sessionFullName");
  const sessionEmail = sessionStorage.getItem("sessionEmail");
  const token = sessionStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }

  const managedEvents: Event[] = [];

  const assistedEvents: Event[] = [];

  const { data, loading, error } = useQuery<{ getAllRelatedEvents: Event[] }>(
    gql`
      query GetAllRelatedEvents {
        getAllRelatedEvents {
          _id
          title
          isActive
          ownerEmail
          participants {
            email
            fullName
            response
          }
        }
      }
    `,
    {
      context: {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      },
    }
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data) {
    managedEvents.push(
      ...data!.getAllRelatedEvents.filter((e) => e.ownerEmail === sessionEmail)
    );

    assistedEvents.push(
      ...data!.getAllRelatedEvents.filter((e) =>
        e.participants.some((p) => p.email === sessionEmail)
      )
    );
  }

  const handleLogOut = () => {
    sessionStorage.removeItem("sessionEmail");
    sessionStorage.removeItem("sessionFullName");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh", padding: 2 }}>
      <Grid size={4} sx={{ backgroundColor: "#F5F5F5", padding: 2 }}>
        <Paper elevation={16}>
          <UserData
            name={sessionFullName || ""}
            managedEvets={managedEvents.length}
            assistedEvents={assistedEvents.length}
          />
          <Button
            sx={{ marginTop: 2, backgroundColor: "green" }}
            fullWidth
            variant="contained"
            onClick={() => navigate("/event/new")}
          >
            {" "}
            New Event
          </Button>
          <Button
            sx={{ marginTop: 2 }}
            fullWidth
            variant="contained"
            onClick={handleLogOut}
          >
            Logout
          </Button>
        </Paper>
      </Grid>
      <Grid size={8} container direction="column" spacing={2}>
        <EventSection events={managedEvents} sectionTitle="Managed Events" />
        <EventSection events={assistedEvents} sectionTitle="Invited Events" />
        {/* <Grid sx={{ flex: 1, overflowY: "auto" }}>
          <Paper sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Your Invitations
            </Typography>
            {assistedEvents.map((event) => (
              <EventItem
                key={event.title}
                event={event}
                onClick={() => navigate(`/event/${event._id}`)}
              />
            ))}
          </Paper>
        </Grid> */}
      </Grid>

      {/* <EventModal
        open={openModal}
        onClose={handleCloseModal}
        event={eventSelected}
        userEmail={sessionData!.email}
      ></EventModal> */}
    </Grid>
  );
};

export default EventDashboard;
