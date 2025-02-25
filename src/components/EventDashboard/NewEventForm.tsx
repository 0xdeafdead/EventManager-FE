import { gql, useMutation } from "@apollo/client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Guests } from "../../types";

export interface NewEventModalProps {
  open: boolean;
  onClose: () => void;
  refetchEvents: () => void;
}

const NewEventModal: React.FC<NewEventModalProps> = ({
  open,
  onClose,
  refetchEvents,
}) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState<Guests[]>([{ fullName: "", email: "" }]);

  const [createEvent, { loading, error }] = useMutation(gql`
    mutation CreateEvent($createEventInput: CreateEventInput!) {
      createEvent(createEventInput: $createEventInput) {
        _id
        title
      }
    }
  `);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const handleCreate = () => {
    console.log("Creating event", { title, date, guests });
    createEvent({
      variables: {
        createEventInput: {
          title,
          date: new Date(date).getTime(),
          guests,
        },
      },
    });
    onClose();
    refetchEvents();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle variant="h5">Create Event</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          label="Event Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Event Date"
          type="date"
          fullWidth
          margin="normal"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {guests.map((guest, index) => (
          <div key={index}>
            <Typography>Participant {index + 1}</Typography>
            <TextField
              label="Guest Name"
              fullWidth
              margin="normal"
              value={guest.fullName}
              onChange={(e) => {
                const newGuests = [...guests];
                newGuests[index].fullName = e.target.value;
                setGuests(newGuests);
              }}
            />
            <TextField
              label="Guest Email"
              fullWidth
              margin="normal"
              value={guest.email}
              onChange={(e) => {
                const newGuests = [...guests];
                newGuests[index].email = e.target.value;
                setGuests(newGuests);
              }}
            />
          </div>
        ))}
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            const newGuests = [...guests];
            newGuests.push({ fullName: "", email: "" });
            setGuests(newGuests);
          }}
        >
          Add Participant
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ marginTop: 2 }}
        >
          Create
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          sx={{ marginTop: 2, marginLeft: 1 }}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewEventModal;
