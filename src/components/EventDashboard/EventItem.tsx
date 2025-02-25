import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Event } from "../../types";

export interface EventItemProp {
  event: Event;
}

const EventItem: React.FC<EventItemProp> = ({ event }) => {
  const navigate = useNavigate();
  return (
    <Paper
      sx={{ padding: 2, margin: 1, cursor: "pointer" }}
      onClick={() => navigate(`/event/${event._id}`, { state: event })}
    >
      <Typography variant="subtitle1">{event.title}</Typography>
      <Typography variant="body2">{event.date}</Typography>
    </Paper>
  );
};

export default EventItem;
