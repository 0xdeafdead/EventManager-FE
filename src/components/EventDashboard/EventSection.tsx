import { EventSectionProps } from "../../types";
import { Grid2 as Grid, Paper, Typography } from "@mui/material";
import EventItem from "./EventItem";

const EventSection: React.FC<EventSectionProps> = ({
  events,
  sectionTitle,
}) => {
  return (
    <Grid sx={{ flex: 1, overflowY: "auto" }}>
      <Paper sx={{ padding: 2, height: "100%" }}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {sectionTitle}
        </Typography>
        {events.map((event) => (
          <EventItem key={event.title} event={event} />
        ))}
      </Paper>
    </Grid>
  );
};

export default EventSection;
