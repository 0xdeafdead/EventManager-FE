import { gql, useMutation } from "@apollo/client";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewEventForm: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState<{ name: string; email: string }[]>([
    { name: "", email: "" },
  ]);

  const [createEvent, { data, loading, error }] = useMutation(gql`
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
          guests: guests.map((guest) => ({
            fullName: guest.name,
            email: guest.email,
          })),
        },
      },
      context: {
        headers: { authorization: `Bearer ${sessionStorage.getItem("token")}` },
      },
    })
      .then((result) => {
        console.log("Event created", result);
        navigate("/", { state: result.data.createEvent._id });
      })
      .catch((error) => {
        console.log("Error creating event", error);
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Paper sx={{ padding: 3, margin: 2 }}>
      <Typography variant="h5">Create Event</Typography>
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
      <section>
        {guests.map((guest, index) => (
          <div key={index}>
            <Typography>Participant {index + 1}</Typography>
            <TextField
              label="Guest Name"
              fullWidth
              margin="normal"
              value={guest.name}
              onChange={(e) => {
                const newGuests = [...guests];
                newGuests[index].name = e.target.value;
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
            newGuests.push({ name: "", email: "" });
            setGuests(newGuests);
          }}
        >
          Add Participant
        </Button>
      </section>
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
    </Paper>
  );
};

export default NewEventForm;
