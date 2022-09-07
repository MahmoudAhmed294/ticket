import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import "style/globals.css";
import Loading from "components/Loading";
import Login from "pages/auth/Login";
import Tickets from "pages/Tickets";

function App() {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {

    setTimeout(() => {
      setIsLoaded(false);
    }, 2000);
    
  }, []);

  return (
    <Box>
      {isLoaded ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Tickets />} />
          </Routes>
        </BrowserRouter>
      )}
    </Box>
  );
}

export default App;
