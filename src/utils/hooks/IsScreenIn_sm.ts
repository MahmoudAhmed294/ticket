import * as React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from '@mui/material/styles';

export const IsScreenIn_sm = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down('sm'));

   
};
