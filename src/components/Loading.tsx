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
      sx={{ backgroundColor: "primary.main", height: "100vh", width: "100vw" }}
    >
      <img src={Logo} alt="logo" />
    </Stack>
  );
};

export default Loading;
