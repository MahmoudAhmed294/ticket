import {
  Typography,
  Stack,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import Cash from "./Cash";
import Card from "./Card";
import { getSummary } from "store/ticketsSlice";
import { payMethod } from "store/paymentSlice";

interface Props {}
const PaymentOptions: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const [radioValue, setRadioValue] = useState("Cash");
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
    <Stack direction="column" sx={{ mt: { xs: 1, sm: 0 } }}>
      <Stack
        direction="column"
        sx={{ mt: { xs: 1, sm: 3 }, order: { xs: 3, sm: "unset" } }}
      >
        <Typography variant="h4">{t("1. Choose Payment method")}</Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          sx={{ color: "body.main", justifyContent: "start", mt: 1 }}
          value={radioValue}
          onChange={handleChangeRadio}
        >
          <FormControlLabel
            value="Cash"
            control={<Radio sx={{ color: "body.main", padding: "0 8px" }} />}
            label="Cash"
            sx={{ mr: { xs: 1, sm: 5 } }}
            disabled={isTicketSelect}
          />
          <FormControlLabel
            value="Card"
            control={<Radio sx={{ color: "body.main", padding: "0 8px" }} />}
            label="Card"
            sx={{ mr: { xs: 1, sm: 5 } }}
            disabled={isTicketSelect}
          />
          <FormControlLabel
            value="Visa"
            control={<Radio sx={{ color: "body.main", padding: "0 8px" }} />}
            label="Visa"
            sx={{ mr: { xs: 1, sm: 5 } }}
            disabled={isTicketSelect}
          />
        </RadioGroup>
      </Stack>
      {radioValue === "Cash" ? (
        <Cash isTicketSelect={isTicketSelect} />
      ) : radioValue === "Card" ? (
        <Card isTicketSelect={isTicketSelect} />
      ) : (
        radioValue === "Visa" && (
          <Typography variant="h2" sx={{ my: 2, color: "primary.main" }}>
            {t("Coming Soon . . .")}
          </Typography>
        )
      )}
    </Stack>
  );
};

export default PaymentOptions;
