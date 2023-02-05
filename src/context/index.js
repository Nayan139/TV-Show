import React from "react";

export const AuthContext = React.createContext({
  logout: "",
  login: "",
  show: [],
  handleShow: () => {},
  handleSearch: () => {},
  handleFavourite: () => {},
  handleRemove: () => {},
  favourite: [],
});

export default AuthContext;
