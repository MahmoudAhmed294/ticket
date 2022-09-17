import { Stack } from "@mui/material";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import Logo from "assets/images/logo.svg";
interface Props {}
const Loading: FunctionComponent<Props> = () => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "primary.main",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex:1000
      }}
    >
      <img src={Logo} alt="logo" />
    </Stack>
  );
};

export default Loading;
