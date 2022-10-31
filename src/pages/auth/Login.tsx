import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  InputLabel,
  OutlinedInput,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  Link,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import { getLanguage, toggleLanguage } from "store/languageSlice";
import loginBg from "assets/images/loginbg.jpg";
import logo from "assets/images/logoBlue.svg";
import { ClientStorage } from "utils/hooks/useLocalStroge";
import { useTranslation } from "react-i18next";
import { addUser} from "store/ticketsSlice";
import { useCookies } from "react-cookie";
import { useLoginMutation } from "api/loginApi";
import Loading from "components/Loading";
import { useSnackbar } from "notistack";


const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const language = useAppSelector(getLanguage);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [cookies, setCookie] = useCookies(["token"]);

  const [login, { data, isLoading, error , isError  }]: any = useLoginMutation();

  const changeLanguage = () => {
    switch (language) {
      case "en":
        dispatch(toggleLanguage("ar"));
        ClientStorage.set("language", "ar");
        break;
      case "ar":
        dispatch(toggleLanguage("en"));
        ClientStorage.set("language", "en");

        break;
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);

      setCookie("token", data.token, {
        secure: true,
        maxAge: 24 * 60 * 60 *1000,
      });
      dispatch(addUser(data));
      navigate("/");
    }
    else if(isError){
      enqueueSnackbar(`Error while login - ${error.data}`, { variant: "error" });

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(`Error while login - ${error.data}`, { variant: "error" });
    }
  }, [enqueueSnackbar, error ,isError]);

  const handleLogin = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if(form.password !== '' && form.userName !== ''){
      login(form);
    }else{
      enqueueSnackbar(`Error while login - please enter username and password`, { variant: "error" });

    }
  };

  return (
    <Grid container sx={{ height: "100vh" }} alignItems="center">
      {isLoading ? <Loading /> : null}
      <Grid item sx={{ display: { xs: "none", md: "flex" } }} md={6}>
        <img
          src={loginBg}
          alt="Login Hero"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ height: "100%", px: { xs: 2, md: 8 }, py: 5 }}
      >
        <Stack direction="column" spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 10 }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <img
                src={logo}
                alt="logo"
                style={{ width: "65px", height: "65px", objectFit: "cover" }}
              />
              <Typography
                variant="h3"
                sx={{ color: "primary.main", fontWeight: "500" }}
              >
                {t("Ticket management system")}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{ fontFamily: "Cairo , sans-serif" }}
              onClick={() => changeLanguage()}
            >
              {t("العربيه")}
            </Button>
          </Stack>
          <Typography variant="h2" sx={{ width: { xs: "100%", md: "70%" } }}>
            {t("Enter your ID number associated with your account")}
          </Typography>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            component="form"
            onSubmit={handleLogin}
          >
            <TextField
              label={t("Username or Email")}
              variant="outlined"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
              fullWidth
              sx={{ mb: 3 }}
            />
            <FormControl variant="outlined" fullWidth sx={{ mb: 1 }}>
              <InputLabel> {t("Password")}</InputLabel>
              <OutlinedInput
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Link href="#" underline="none" alignSelf="end">
              {t(" Forgot password?")}
            </Link>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              size="large"
              type="submit"
            >
              {t("Login")}
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Login;
