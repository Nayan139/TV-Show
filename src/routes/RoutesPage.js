import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Details from "../components/Details/Details";
import Favourite from "../components/Favourite/Favourite";
import Login from "../components/Login/Login";
import SignUp from "../components/Signup/Signup";
import AuthContext from "../context";

const RoutesPage = () => {
  const [authstatus, setauthstatus] = useState(false);
  const [show, setShow] = useState([]);
  const [favourite, setFavourite] = useState([]);

  const login = () => {
    setauthstatus(true);
  };

  const logout = () => {
    setauthstatus(false);
  };
  const handleShow = async () => {
    try {
      const dataPosts = await axios.get("https://api.tvmaze.com/shows");
      if (dataPosts?.data.length > 0) {
        const result = dataPosts.data.filter(
          (object1) => !favourite.some((object2) => object1.id === object2.id)
        );
        setShow(result);
      }
    } catch (error) {
      console.log("error ");
    }
  };

  const handleSearch = async (search) => {
    try {
      if (search !== "") {
        const isFilter = show.filter((movie) =>
          movie.name.toLowerCase().includes(search)
        );
        setShow(isFilter);
      } else {
        handleShow();
      }
    } catch (error) {
      console.log("error is here", error);
    }
  };

  const handleFavourite = async (movie) => {
    try {
      const isFavourite = show.filter((data) => data.id !== movie.id);
      setShow(isFavourite);
      setFavourite([...favourite, movie]);
    } catch (error) {
      console.log("error");
    }
  };

  const handleRemove = async (movie) => {
    try {
      const isFavourite = favourite.filter((data) => data.id !== movie.id);
      setFavourite(isFavourite);
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        logout: logout,
        login: login,
        handleShow: handleShow,
        show: show,
        handleSearch: handleSearch,
        handleFavourite: handleFavourite,
        favourite: favourite,
        handleRemove: handleRemove,
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/details"
            element={authstatus ? <Details /> : <Navigate to="/login" />}
          />
          <Route
            path="/favourite"
            element={authstatus ? <Favourite /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={authstatus ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default RoutesPage;
