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
import {   getIsAdmin, addUser } from "store/ticketsSlice";
import {  getBillNumber } from "api/Api";
import { useCookies } from "react-cookie";
import AddBalance from "pages/AddBalance";
import { useCheckTokenQuery } from "api/loginApi";

function App() {
  const language = ClientStorage.get("language");
  const dispatch = useAppDispatch();
  const USER: any = useAppSelector(state=> state.tickets.user);
  const isAdmin: boolean = useAppSelector(getIsAdmin);
  const [cookies, setCookie] = useCookies(["token"]);
  const { data, isLoading, error , isError ,isSuccess } = useCheckTokenQuery(cookies.token);

  useEffect(() => {
    dispatch(toggleLanguage(language === "ar" ? "ar" : "en"));
  }, [dispatch, language]);

  useEffect(() => {
  if (isSuccess) {
    dispatch(addUser(data))    
    }
    

  }, [data ,isSuccess]);

  useEffect(() => {
    dispatch(getBillNumber());
  }, [getBillNumber]);

  return (
    <Box>
      {isLoading ? (
        <Loading />
      ) : (
            <Router>
          <Routes>
            {data ? (
              <>
                <Route
                  path="/"
                  element={data.isAdmin ? <AddBalance /> : <Tickets />}
                />
              </>
            ) : (
              <Route
                element={data ? <Tickets /> : <Navigate to="/login" />}
                path="/"
              />
            )}

            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      )}
    </Box>
  );
}

export default App;
