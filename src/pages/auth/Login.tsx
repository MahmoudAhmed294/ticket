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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import { getLanguage, toggleLanguage } from "store/languageSlice";
import loginBg from "assets/images/loginbg.jpg";
import logo from "assets/images/logoBlue.svg";
import { ClientStorage } from "utils/hooks/useLocalStroge";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const language = useAppSelector(getLanguage);
  const dispatch = useAppDispatch();

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

  return (
    <Grid container sx={{ height: "100vh" }} alignItems="center">
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
          <Stack direction="column" alignItems="center" justifyContent="center">
            <TextField
              label={t('Username or Email')}
              variant="outlined"
              fullWidth
              sx={{ mb: 3 }}
            />
            <FormControl variant="outlined" fullWidth sx={{ mb: 1 }}>
              <InputLabel>                {t("Password")}</InputLabel>
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
             {t(' Forgot password?')}
            </Link>
            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate("/home")}
              sx={{ mt: 2 }}
              size="large"
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
