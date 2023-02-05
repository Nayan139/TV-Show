import { Box, Button, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router";

const Details = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: "20px" }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: "20px" }}>
          <CardMedia
            component="img"
            height="140"
            image={state.image.medium}
            alt="green iguana"
            sx={{ height: "100px", width: "100px", textAlign: "center" }}
          />
        </Box>
        <Typography gutterBottom variant="h5" component="div">
          Name: {state.name}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Language: {state.language}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Rating: {state.rating.average}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Release Date: {state.premiered}
        </Typography>
        <Button onClick={() => navigate("/dashboard")}>Back</Button>
      </Box>
    </Box>
  );
};

export default Details;
