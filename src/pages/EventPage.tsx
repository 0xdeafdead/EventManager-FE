import { gql, useMutation, useQuery } from "@apollo/client";
import { Event, ResponseType } from "../types/event";
import {
  Button,
  Grid2 as Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const EventPage: React.FC = () => {
  const navigate = useNavigate();
  const param = useParams();
  const eventId = param.eventId;
  const userEmail = sessionStorage.getItem("sessionEmail");
  const token = sessionStorage.getItem("token");

  const { data, loading, error } = useQuery<{ getOneEvent: Event }>(
    gql`
      query GetOneEvent($id: String!) {
        getOneEvent(id: $id) {
          _id
          isActive
          ownerEmail
          title
          participants {
            email
            fullName
            response
          }
        }
      }
    `,
    {
      variables: { id: eventId },
    }
  );

  const [freezeEvent, freezeMutationResult] = useMutation<Event>(
    gql`
      mutation FreezeEvent($id: String!) {
        freezeEvent(id: $id) {
          _id
          isActive
          ownerEmail
          title
          participants {
            email
            fullName
            response
          }
        }
      }
    `
  );

  const [respondToEvent] = useMutation<Event>(
    gql`
      mutation RespondToEvent($input: RespondToEventInput!) {
        respondToEvent(respondToEventInput: $input) {
          email
          fullName
          response
        }
      }
    `
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <div>Event not found</div>;
  }

  const { ownerEmail, _id, isActive, participants, title } = data.getOneEvent;
  const isOwner = userEmail === ownerEmail;

  const handleEventResponse = (e: ResponseType) => {
    console.log(`Update response`);
    respondToEvent({
      variables: {
        input: {
          eventId: _id,
          response: e,
        },
      },
      context: {
        headers: { authorization: `Bearer ${sessionStorage.getItem("token")}` },
      },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const handleFreezeEvent = () => {
    freezeEvent({
      variables: { id: _id },
      context: {
        headers: { authorization: `Bearer ${sessionStorage.getItem("token")}` },
      },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <Paper sx={{ padding: 2, margin: 1, height: "100vh", overflow: "auto" }}>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid>
          <Typography>{title}</Typography>
          <Typography>Fake Date</Typography>
          {!isActive && (
            <Typography sx={{ color: "red" }}>
              This event is no longer accepting responses.
            </Typography>
          )}
          <Typography variant="h6">Participants</Typography>
        </Grid>
        {!token && (
          <Grid sx={{ textAlign: "right" }}>
            <Typography sx={{ color: "red" }}>
              You must be logged in to respond to this event
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Grid>
        )}
      </Grid>
      <Paper
        sx={{ maxHeight: 200, overflowY: "auto", padding: 1, marginTop: 1 }}
      >
        {participants.map((participant) => (
          <Paper key={participant.email} sx={{ padding: 2, margin: 1 }}>
            <Typography>{participant.fullName}</Typography>
            <Typography>{participant.email}</Typography>
            <Typography>Response: </Typography>
            {userEmail === participant.email && isActive ? (
              <Select
                value={participant.response}
                onChange={(e) =>
                  handleEventResponse(e.target.value as ResponseType)
                }
                disabled={freezeMutationResult.loading}
              >
                <MenuItem value={ResponseType.YES}>Yes</MenuItem>
                <MenuItem value={ResponseType.NO}>No</MenuItem>
                <MenuItem value={ResponseType.MAYBE}>Maybe</MenuItem>
              </Select>
            ) : (
              <Typography>Will attend: {participant.response}</Typography>
            )}
          </Paper>
        ))}
      </Paper>
      <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
        {isOwner && (
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleFreezeEvent}
          >
            {isActive ? "Freeze Event" : "Unfreeze Event"}
          </Button>
        )}

        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 2 }}
          onClick={() => navigate("/")}
        >
          Return to Dashboard
        </Button>
      </Grid>
    </Paper>
  );
};

export default EventPage;
