import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Stack,
  Button,
  MenuItem,
  Menu,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { FunctionComponent, useState, MouseEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ticket from "assets/images/ticket.svg";
import { Logout, Person } from "@mui/icons-material";
import { IsScreenIn_sm } from "utils/hooks/IsScreenIn_sm";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import {
  getGate,
  getGateID,
  resetAll,
  addGateName,
} from "store/ticketsSlice";
import { reset } from "store/paymentSlice";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetGateNameQuery } from "api/loginApi";

interface Props {}
const NavBar: FunctionComponent<Props> = () => {
  const { t } = useTranslation(),
    dispatch = useAppDispatch(),
    USER = useAppSelector((state: any) => state.tickets?.user),
    GateName = useAppSelector(getGate),
    navigate = useNavigate(),
    GateID: any = useAppSelector(getGateID),
    [cookies, setCookie, removeCookie] = useCookies(["token"]),
    [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null),
    open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const IsSm = IsScreenIn_sm();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data, isLoading } = useGetGateNameQuery(GateID);

  useEffect(() => {
    if (data) {
      dispatch(addGateName(data));
    }
  }, [data]);

  const logoutHandle = () => {
    navigate("/login", { replace: true });
    removeCookie("token");
    dispatch(resetAll());
    dispatch(reset());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: 0,
          height: { xs: "60vh", sm: "" },
          position: { xs: "absolute", sm: "unset" },
          zIndex: { xs: 0, sm: "unset" },
        }}
      >
        <Toolbar sx={{ px: "0 !important" }}>
          <Container maxWidth="lg">
            {IsSm ? (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ flexGrow: 1 }}
              >
                <Typography variant={IsSm ? "h6" : "h4"}>{USER}</Typography>
                <Typography variant={IsSm ? "caption" : "h4"}>
                  {GateName}
                </Typography>
              </Stack>
            ) : (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ flexGrow: 1 }}
              >
                <Stack direction="row" spacing={2}>
                  <img src={ticket} alt="ticket" />
                  <Typography variant="h1">{t("Tickets")}</Typography>
                </Stack>
                {isLoading ? (
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ color: "body.light" }}
                    spacing={1}
                  >
                    <Typography variant="h4">{t("Loading")}</Typography>
                    <CircularProgress
                      color="inherit"
                      sx={{
                        height: "26px !important",
                        width: "26px !important",
                      }}
                    />
                  </Stack>
                ) : (
                  <Typography variant="h4"> {GateName}</Typography>
                )}
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Stack
                      direction="row"
                      alignItems={"center"}
                      spacing={1}
                      sx={{ color: "body.light" }}
                    >
                      <Avatar alt="Mahmoud" />
                      <Typography variant="body2">{USER}</Typography>
                      <KeyboardArrowDownIcon />
                    </Stack>
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    sx={{
                      "& .MuiPaper-root": {
                        width: 250,
                        border: "1px solid",
                        borderColor: "secondary.main",
                        boxShadow: 0,
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ color: "body.main" }}
                        spacing={1}
                      >
                        <Person />
                        <Typography variant="body1">Profile</Typography>
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={logoutHandle}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ color: "error.main" }}
                        spacing={1}
                      >
                        <Logout />
                        <Typography variant="body1">Logout</Typography>
                      </Stack>
                    </MenuItem>
                  </Menu>
                </div>
              </Stack>
            )}
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
