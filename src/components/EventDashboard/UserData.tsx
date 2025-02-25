import { Typography } from "@mui/material";
import { Grid2 as Grid } from "@mui/material";

export interface UserDataProps {
  name: string;
  managedEvets: number;
  assistedEvents: number;
}

const UserData: React.FC<UserDataProps> = ({
  name,
  managedEvets,
  assistedEvents,
}) => {
  return (
    <Grid sx={{ padding: 2 }}>
      <Typography sx={{ textAlign: "center" }}>{name}</Typography>
      <Typography sx={{ textAlign: "center" }}>
        Managed Events: {managedEvets}
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        Assisted Events: {assistedEvents}
      </Typography>
    </Grid>
  );
};

export default UserData;
