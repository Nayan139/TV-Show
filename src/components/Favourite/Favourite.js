import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../context";

const Favourite = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate(-1)}>Dashboard</Button>
      <Grid
        container
        spacing={{ xs: 2, md: 4 }}
        columns={{ xs: 4, sm: 6, md: 12 }}
      >
        {auth.favourite.length > 0 ? (
          auth.favourite.map((movie, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card>
                <Box
                  sx={{
                    display: "inline-flex",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={movie.image.medium}
                    alt={movie.name}
                  />
                </Box>
                <CardContent sx={{ height: "225px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {movie.name}
                  </Typography>
                  <Box>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontSize: "15px", fontFamily: "cursive" }}
                    >
                      Released Date
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.premiered}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontSize: "15px", fontFamily: "cursive" }}
                    >
                      IMD Rating
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.rating.average}
                    </Typography>
                  </Box>
                  <Box>
                    <Button onClick={() => auth.handleRemove(movie)}>
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <>loading...</>
        )}
      </Grid>
    </>
  );
};

export default Favourite;
