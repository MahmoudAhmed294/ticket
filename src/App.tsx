import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Box } from "@mui/material";

import "style/globals.css";
import Loading from "components/Loading";
import Login from "pages/auth/Login";
import Tickets from "pages/Tickets";
import { toggleLanguage } from "store/languageSlice";
import { ClientStorage } from "utils/hooks/useLocalStroge";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import { useAuth } from "utils/hooks/useIsAuthPages";
import { checkToken, getStatus, getTickets,getAllTickets, getUser } from "store/ticketsSlice";

function App() {
  let auth = useAuth();
  const [isLoaded, setIsLoaded] = useState(true);
  const language = ClientStorage.get("language");
  const dispatch = useAppDispatch();
  const USER = useAppSelector(getUser);
  const ticket = useAppSelector(getAllTickets);
  const IsLoading = useAppSelector(getStatus);

  useEffect(() => {
    dispatch(toggleLanguage(language === "ar" ? "ar" : "en"));

    setIsLoaded(false);
    if (IsLoading === "failed" || !USER) {
      dispatch(checkToken());      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (USER && ticket.length === 0) {
      dispatch(getTickets(USER?.GateID));
    }
  }, [USER ,dispatch ,ticket]);
  
  return (
    <Box>
      {isLoaded || IsLoading === "loading" ? (
        <Loading />
      ) : (
        <Router>
          <Routes>
            <Route
              element={auth ? <Tickets /> : <Navigate to="/login" />}
              path="/"
            />

            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      )}
    </Box>
  );
}

export default App;
