import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import SignUp from "../components/Signup/Signup";
import AuthContext from "../context";

const RoutesPage = () => {
  const [authstatus, setauthstatus] = useState(false);

  const login = () => {
    setauthstatus(true);
  };

  const logout = () => {
    setauthstatus(false);
  };
  return (
    <AuthContext.Provider value={{ logout: logout, login: login }}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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
