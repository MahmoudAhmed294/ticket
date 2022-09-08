import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";

import "style/globals.css";
import Loading from "components/Loading";
import Login from "pages/auth/Login";
import Tickets from "pages/Tickets";
import { toggleLanguage } from "store/languageSlice";
import { ClientStorage } from "utils/hooks/useLocalStroge";
import { useAppDispatch } from "utils/hooks/useStore";

function App() {
  const [isLoaded, setIsLoaded] = useState(true);
  const language = ClientStorage.get("language");
  const dispatch = useAppDispatch();

  useEffect(() => {

    setTimeout(() => {
      setIsLoaded(false);
    }, 2000);
      dispatch(toggleLanguage(language === "ar" ? "ar" : "en"));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  
    
  }, []);

  return (
    <Box>
      {isLoaded ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/"  element={<Login />} />
            <Route path="/home" element={<Tickets />} />
          </Routes>
        </BrowserRouter>
      )}
    </Box>
  );
}

export default App;
