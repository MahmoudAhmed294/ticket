import {
  Box,
  Typography,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {  getCard } from "api/Api";
import { getCardInfo, getMemberInfo, getStatus } from "store/paymentSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";

interface Props {
  isTicketSelect: boolean;
}
const Card: FunctionComponent<Props> = ({ isTicketSelect }) => {
  const { t } = useTranslation();
  const IsLoading = useAppSelector(getStatus);
  const member = useAppSelector(getMemberInfo);
  const card = useAppSelector(getCardInfo);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const SearchAPi = (e: any) => {
    setSearchValue(e.target.value);
    if (e.target.value.length >= 6) {
      dispatch(getCard(e.target.value));
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
          order: { xs: 3, sm: "unset" },
        }}
      >
        <>
          <Typography variant="h4">{t("2. Enter Card ID")}</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="start"
            flexWrap={"wrap"}
            sx={{ width: "100%" }}
          >
            <TextField
              variant="outlined"
              label="Card ID"
              sx={{ mt: 1, maxWidth: { xs: "100%", md: "450px" } }}
              fullWidth
              type="text"
              value={searchValue}
              onChange={SearchAPi}
              disabled={isTicketSelect}
            />
          </Stack>
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
            {card?.Balance && (
              <Stack direction="row" spacing={0.5} alignItems="baseline">
                <Typography variant="h5" sx={{ color: "primary.main" }}>
                  {t("card Balance:")}
                </Typography>
                <Typography variant="caption">{card?.Balance}</Typography>
              </Stack>
            )}
          </>
        )}
      </Stack>
    </div>
  );
};

export default Card;
