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
import { checkToken, getBillNumber } from "api/Api";
import { useCookies } from "react-cookie";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const language = ClientStorage.get("language");
  const dispatch = useAppDispatch();
  const USER: any = useAppSelector(getUser);
  const IsLoading = useAppSelector(getStatus);
  const [cookies, setCookie] = useCookies(["token"]);

  useEffect(() => {
    dispatch(toggleLanguage(language === "ar" ? "ar" : "en"));
  }, [dispatch, language]);

  useEffect(() => {
    if (IsLoading === "loading") {
      setIsLoaded(true);
    }
    if (cookies.token && !USER) {
      dispatch(checkToken(cookies.token)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsLoaded(false);
          
        }
      });
    }
  }, [USER, setIsLoaded, dispatch, cookies]);
  useEffect(() => {
    dispatch(getBillNumber());
  }, [getBillNumber]);

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
