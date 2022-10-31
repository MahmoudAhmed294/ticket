import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import { CircularProgress, Stack, Typography, Box } from "@mui/material";
import { addCard, getCardInfo } from "store/paymentSlice";
import { getUser } from "store/ticketsSlice";
import { Container } from "@mui/system";
import NavBar from "components/NavBar";
import { useGetCardMutation, useAddBalanceMutation } from "api/cardApi";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

export default function AddBalance() {
  const [cardInputs, setCardInputs] = React.useState<any>("");
  const [balanceInputs, setBalanceInputs] = React.useState<any>("");
  const card = useAppSelector(getCardInfo);
  const userName = useAppSelector(getUser);
  const { enqueueSnackbar } = useSnackbar();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [getCard, { data, error, isLoading }]: any = useGetCardMutation();
  const [
    addBalance,
    { data: dataBalance, isSuccess: isSuccessBalance, error: errorBalance },
  ]:any = useAddBalanceMutation();

  const SearchAPi = (e: any) => {
    setCardInputs(e.target.value);
    if (e.target.value.length >= 6) {
      getCard(e.target.value);
    }
  };
  useEffect(() => {
    if (data) {
      dispatch(addCard(data));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(`Error while login - ${error.data}`, {
        variant: "error",
      });
    }
  }, [error]);

  useEffect(() => {
    if (errorBalance) {
      enqueueSnackbar(`Error while login - ${errorBalance.data}`, {
        variant: "error",
      });
    }
  }, [errorBalance]);

  const handleClose = (e: any) => {
    setCardInputs("");
    setBalanceInputs(0);
  };
  const handleAddBalance = (e: any) => {
    e.preventDefault();
    addBalance({
      ID: data.card?.ID,
      balance: balanceInputs,
      userName: userName,
    });
    console.log(dataBalance);

    if (isSuccessBalance) {
      getCard(cardInputs);
      enqueueSnackbar(`charging the balance is done`, { variant: "success" });
    }

    setBalanceInputs("");
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
            {isLoading ? (
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
                {data?.member?.Name ? (
                  <Stack direction="row" spacing={0.5} alignItems="baseline">
                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                      {t("Member name:")}
                    </Typography>
                    <Typography variant="caption">
                      {data?.member?.Name}
                    </Typography>
                  </Stack>
                ) : (
                  cardInputs.length >= 6 && (
                    <Typography variant="caption">
                      {t("no card with this number")}
                    </Typography>
                  )
                )}
                {data?.card?.Balance && (
                  <Stack direction="row" spacing={0.5} alignItems="baseline">
                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                      {t("card Balance:")}
                    </Typography>
                    <Typography variant="caption">
                      {data?.card?.Balance}
                    </Typography>
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
                inputProps: { min: 0 },
              }}
              required
              fullWidth
              variant="outlined"
              value={balanceInputs}
              onChange={(e) =>
                +e.target.value > -1 ? setBalanceInputs(e.target.value) : ""
              }
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
                disabled={isLoading || cardInputs.length < 6}
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
