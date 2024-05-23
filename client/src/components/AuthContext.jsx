import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8081/')
      .then(response => {
        if (response.data.Status === "Success") {
          setIsLoggedIn(true);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    axios.get('http://localhost:8081/logout')
      .then(response => {
        if (response.data.Status === "Success") {
          setIsLoggedIn(false);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
