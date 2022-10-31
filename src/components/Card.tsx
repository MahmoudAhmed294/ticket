import {
  Box,
  Typography,
  TextField,
  Stack,
  CircularProgress,
} from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getCardInfo, getMemberInfo, addCard } from "store/paymentSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import { useGetCardMutation } from "api/cardApi";

interface Props {
  isTicketSelect: boolean;
}
const Card: FunctionComponent<Props> = ({ isTicketSelect }) => {
  const { t } = useTranslation();
  const member = useAppSelector(getMemberInfo);
  const card = useAppSelector(getCardInfo);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const [getCard,{data, error , isLoading ,isSuccess}] =useGetCardMutation()

  const SearchAPi = (e: any) => {

    setSearchValue(e.target.value);
    if (e.target.value.length >= 6) {
      getCard(e.target.value)
      
    }
  };
  useEffect(() => {
    console.log(data);
    if(data){
      dispatch(addCard(data))
    }
  }, [isSuccess ,data]);
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
        {isLoading? (
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
