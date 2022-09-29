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
import { getStatus, getAllTickets, getUser } from "store/ticketsSlice";
import {  checkToken, getBillNumber } from "api/Api";

function App() {
  
  const [isLoaded, setIsLoaded] = useState(true);
  const language = ClientStorage.get("language");
  const dispatch = useAppDispatch();
  const USER: any = useAppSelector(getUser);
  const ticket = useAppSelector(getAllTickets);
  const IsLoading = useAppSelector(getStatus);

  useEffect(() => {
    dispatch(toggleLanguage(language === "ar" ? "ar" : "en"));
  }, [dispatch, language]);


  useEffect(() => {
    setIsLoaded(false);
    if (!USER) {
      
      dispatch(checkToken());
    }
  }, [USER, setIsLoaded, dispatch ,ticket]);
  useEffect(() => {
    dispatch(getBillNumber())

  }, [getBillNumber])

  return (
    <Box>
      {isLoaded || IsLoading === "loading" ? (
        <Loading />
      ) : (
        <Router>
          <Routes>
            <Route
              element={USER ? <Tickets /> : <Navigate to="/login" />}
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

/* 
TODO ticket api handle repeated 
TODO reduce  redux slice 
TODO loader in name and balance 
TODO make radio as  taps
TODO 


*/
