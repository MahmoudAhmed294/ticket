import {
  Typography,
  Stack,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
} from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import Card from "./Card";
import { getSummary } from "store/ticketsSlice";
import { payMethod } from "store/paymentSlice";

interface Props {}
const PaymentOptions: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const [radioValue, setRadioValue] = useState("Card");
  const [isTicketSelect, SetIsTicketSelect] = useState(false);
  const dispatch = useAppDispatch();
  const summary = useAppSelector(getSummary);

  useEffect(() => {
    if (summary.length === 0) {
      SetIsTicketSelect(false);
    } else {
      SetIsTicketSelect(true);
    }
  }, [summary]);
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    dispatch(payMethod((event.target as HTMLInputElement).value));
  };
  return (
    <Stack direction="column" sx={{ mt: { xs: 1, sm: 3 } }}>
      <Stack direction="column" >
        <Typography variant="h4">{t("1. Choose Payment method")}</Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{
            color: "body.main",
            justifyContent: "start",
            mt: {xs:0 ,sm:1},
            ml:0.7,
            "& .MuiFormControlLabel-root .MuiButtonBase-root": {
              transform: { xs: "scale(0.8)", sm: "scale(1)" },
              
            },
          }}
          value={radioValue}
          onChange={handleChangeRadio}
        >
          <FormControlLabel
            value="Card"
            control={<Radio sx={{ color: "body.main", px: {xs:0 , sm:1} }} />}
            label="Card"
            sx={{ mr: { xs: 3, sm: 5 } }}
            disabled={isTicketSelect}
            
          />
          <FormControlLabel
            value="Visa"
            control={<Radio sx={{ color: "body.main", px: {xs:0 , sm:1} }} />}
            label="Visa"
            sx={{ mr: { xs: 3, sm: 5 } }}
            disabled={isTicketSelect}
          />
        </RadioGroup>
      </Stack>
      <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>
        {
         radioValue === "Card" ? (
          <Card isTicketSelect={isTicketSelect} />
        ) : (
          radioValue === "Visa" && (
            <Typography variant="h2" sx={{ my: 2, color: "primary.main" }}>
              {t("Coming Soon . . .")}
            </Typography>
          )
        )}
      </Box>
    </Stack>
  );
};

export default PaymentOptions;
