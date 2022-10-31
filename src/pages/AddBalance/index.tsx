import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { getCard, postBalance } from "api/Api";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import { CircularProgress, Stack, Typography, Box } from "@mui/material";
import { getCardInfo, getMemberInfo, getStatus } from "store/paymentSlice";
import { getUser } from "store/ticketsSlice";
import { Container } from "@mui/system";
import NavBar from "components/NavBar";

export default function AddBalance() {
  const [cardInputs, setCardInputs] = React.useState<any>("");
  const [balanceInputs, setBalanceInputs] = React.useState<any>(0);
  const card = useAppSelector(getCardInfo);
  const IsLoading = useAppSelector(getStatus);
  const member = useAppSelector(getMemberInfo);
  const userName = useAppSelector(getUser);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const SearchAPi = (e: any) => {
    setCardInputs(e.target.value);
    if (e.target.value.length >= 6) {
      dispatch(getCard(e.target.value));
    }
  };

  const handleClose = (e: any) => {
    setCardInputs("");
    setBalanceInputs(0);
  };
  const handleAddBalance = (e: any) => {
    e.preventDefault();
    dispatch(
      postBalance({ ID: card?.ID, balance: balanceInputs, userName: userName })
    );

    setBalanceInputs(0);
    setCardInputs("");
  };
  return (
    <Box sx={{ height: "90vh" }}>
      <NavBar />

      <Container maxWidth="sm" sx={{ height: "100%" }}>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100%" }}
        >
          <Typography variant="h3" mb={4}>
            Add balance to card
          </Typography>
          <Stack
            component={"form"}
            onSubmit={handleAddBalance}
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            <TextField
              autoFocus
              id="cardNumber"
              label="add card Number"
              type="text"
              fullWidth
              variant="outlined"
              required
              sx={{ my: 2 }}
              value={cardInputs}
              onChange={SearchAPi}
            />
            {IsLoading === "loading" ? (
              <Stack>
                <CircularProgress
                  color="inherit"
                  sx={{
                    my: 1,
                    height: "26px !important",
                    width: "26px !important",
                  }}
                />
              </Stack>
            ) : (
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="baseline"
                justifyContent={"space-between"}
              >
                {member?.Name ? (
                  <Stack direction="row" spacing={0.5} alignItems="baseline">
                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                      {t("Member name:")}
                    </Typography>
                    <Typography variant="caption">{member?.Name}</Typography>
                  </Stack>
                ) : (
                  cardInputs.length >= 6 && (
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
              </Stack>
            )}
            <TextField
              autoFocus
              id="balance"
              label="add balance"
              type="number"
              sx={{ my: 2 }}
              InputProps={{
                inputProps: { min: 0 }
              }}
        
              required
              fullWidth
              variant="outlined"
              value={balanceInputs}
              onChange={(e) => setBalanceInputs(e.target.value)}
            />
            <Stack direction="row" justifyContent="space-between" mt={4}>
              <Button onClick={handleClose} variant="outlined" size="small">
                {t("Cancel")}
              </Button>
              <Button
                onClick={handleAddBalance}
                variant="contained"
                size="small"
                type="submit"
                disabled={IsLoading === "loading" || cardInputs.length < 6}
              >
                {t("Add Balance")}
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
