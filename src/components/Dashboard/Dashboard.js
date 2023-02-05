import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BsCartPlus } from "react-icons/bs";
import "react-table/react-table.css";
import AuthContext from "../../context";
import usePagination from "../../utils/Pagination";
import "./Dashboard.css";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setdata] = useState(auth.show);

  const [page, setPage] = useState(1);
  const PER_PAGE = 24;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(PER_PAGE);

  useEffect(() => {
    setdata(auth.show);
  }, [auth.show]);

  useEffect(() => {
    auth.handleSearch(search.toLowerCase());
    setPage(1);
    _DATA.jump(1);
  }, [search]);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <Box>
      <Typography className="dashboard-header" variant="h2">
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => auth.logout()}>
            Logout
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => navigate("/favourite")}>
            <Typography
              variant="h6"
              component="span"
              sx={{ paddingRight: "10px" }}
            >
              <BsCartPlus />
              Favourite
              <span> {auth.favourite.length}</span>
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <TextField
            size="large"
            name="searchInput"
            value={search}
            label="Search By Name"
            fullWidth
            onChange={async (e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 4, sm: 6, md: 12 }}
        >
          {auth.show.length > 0 ? (
            _DATA.currentData().map((movie, index) => (
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
                      <Button
                        onClick={() => navigate("/details", { state: movie })}
                      >
                        View More
                      </Button>
                      <Button onClick={() => auth.handleFavourite(movie)}>
                        Add Favourite
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
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
