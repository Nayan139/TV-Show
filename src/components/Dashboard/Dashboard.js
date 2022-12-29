import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AuthContext from "../../context";
import "./Dashboard.css";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [staticData, setStaticData] = useState([]);
  const [loading, setloading] = useState(false);

  const auth = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    globalSearch();
  }, [search]);

  const getData = async () => {
    try {
      const dataPosts = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (dataPosts?.data.length > 0) {
        setData(dataPosts.data);
        setStaticData(dataPosts.data);
      }
    } catch (error) {
      console.log("error ");
    } finally {
      setloading(true);
    }
  };

  let columns = [
    {
      Header: "Title",
      accessor: "title",
      sortable: true,
    },
    {
      Header: "Body",
      accessor: "body",
      sortable: true,
    },
  ];

  const globalSearch = async () => {
    let filteredData = await staticData.filter((value) => {
      return (
        value.title.toLowerCase().includes(search.toLowerCase()) ||
        value.body.toLowerCase().includes(search.toLowerCase())
      );
    });
    setData(filteredData);
  };
  return (
    <Box>
      <Typography className="dashboard-header"> Dashboard </Typography>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Button variant="outlined" onClick={() => auth.logout()}>
            Logout
          </Button>
        </Grid>
        <Grid item xs={4}>
          <TextField
            size="large"
            name="searchInput"
            value={search}
            label="Search"
            fullWidth
            onChange={async (e) => setSearch(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <ReactTable
              data={data || []}
              columns={columns}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          ) : (
            <Typography variant="h5">loading</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
