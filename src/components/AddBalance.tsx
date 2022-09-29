import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import { getCard, postBalance } from "api/Api";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { getCardInfo, getMemberInfo, getStatus } from "store/paymentSlice";

export default function AddBalance() {
  const [open, setOpen] = React.useState(false);
  const [cardInputs, setCardInputs] = React.useState<any>("");
  const card = useAppSelector(getCardInfo);
  const [balanceInputs, setBalanceInputs] = React.useState<any>(0);
  const IsLoading = useAppSelector(getStatus);
  const member = useAppSelector(getMemberInfo);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const SearchAPi = (e: any) => {
    setCardInputs(e.target.value);
    if (e.target.value.length >= 6) {
      dispatch(getCard(e.target.value));
    }
  };

  const handleAddBalance = (e: any) => {
    e.preventDefault();
      dispatch(postBalance({ ID: card?.ID, balance: balanceInputs }));
      
      setOpen(false);
      setBalanceInputs(0);
      setCardInputs("");

  };
  return (
    <div>
      <Button
        variant="text"
        onClick={handleClickOpen}
        size="small"
        sx={{ fontSize: "1rem !important", ml: 4 }}
      >
        Add Balance
      </Button>
      <Dialog open={open}>
        <Stack sx={{ minWidth: "450px" }}>
          <DialogTitle>Add balance to card</DialogTitle>
          <DialogContent>
            <Stack component={"form"} onSubmit={handleAddBalance}>
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
                <div>
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
                </div>
              )}
              <TextField
                autoFocus
                id="balance"
                label="add balance"
                type="number"
                sx={{ my: 2 }}
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
                  disabled={IsLoading === "loading"}
                >
                  {t("Add Balance")}
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </Stack>
      </Dialog>
    </div>
  );
}
