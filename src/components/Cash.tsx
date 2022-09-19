import {
  Box,
  Typography,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { FunctionComponent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getMember } from "api/Api";
import { getCardInfo, getMemberInfo, getStatus } from "store/paymentSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";

interface Props {
  isTicketSelect: boolean;
}
const Cash: FunctionComponent<Props> = ({ isTicketSelect }) => {
  const { t } = useTranslation();
  const IsLoading = useAppSelector(getStatus);
  const card = useAppSelector(getCardInfo);
  const member = useAppSelector(getMemberInfo);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const SearchAPi = (e: any) => {
    setSearchValue(e.target.value);
    if (e.target.value.length > 0 ) {
      dispatch(getMember(e.target.value));
    }
  };

  useEffect(() => {
    if (!isTicketSelect) {
      setSearchValue("");
    }
  }, [isTicketSelect]);

  return (
    <div>
      <Box
        sx={{
          mt: { xs: 0, sm: 3 },
          maxWidth: { xs: "100%", md: "470px" },
          order: { xs: 3, sm: "unset" },
        }}
      >
        <>
          <Typography variant="h4">{t("2. Enter Member ID")}</Typography>
          <TextField
            variant="outlined"
            label="Member ID"
            sx={{ mt: 1 }}
            fullWidth
            type="text"
            value={searchValue}
            onChange={SearchAPi}
            disabled={isTicketSelect}
          />
        </>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{
          mt: { xs: 0, sm: 1 },
          order: { xs: 1, sm: "unset" },
          maxWidth: { xs: "100%", md: "470px" },
        }}
      >
        {IsLoading === "loading" ? (
          <CircularProgress
            color="inherit"
            sx={{
              my: 1,
              height: "26px !important",
              width: "26px !important",
            }}
          />
        ) : (
          <>
            {member?.Name ? (
              <Stack direction="row" spacing={0.5} alignItems="baseline">
                <Typography variant="h5" sx={{ color: "primary.main" }}>
                  {t("Member name:")}
                </Typography>
                <Typography variant="caption">{member?.Name}</Typography>
              </Stack>
            ) : (
              searchValue.length >= 6 && (
                <Typography variant="caption">
                  {t("no card with this number")}
                </Typography>
              )
            )}
          </>
        )}
      </Stack>
    </div>
  );
};

export default Cash;
