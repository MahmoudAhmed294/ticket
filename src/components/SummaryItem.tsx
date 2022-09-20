import { Stack, Typography, IconButton, Box } from "@mui/material";
import React, { FunctionComponent, useEffect, useState } from "react";
import Ticket from "./Ticket";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";
import { deleteTicketFromSummary, getSummary } from "store/ticketsSlice";
import { IsScreenIn_sm } from "utils/hooks/IsScreenIn_sm";

interface Props {
  title: string;
  price: number;
  id: number;
}
const SummaryItem: FunctionComponent<Props> = ({ title, price, id }) => {
  const { t } = useTranslation();
  const [quantityNumber, setQuantityNumber] = useState(0);
  const dispatch = useAppDispatch();
  const tickets = useAppSelector(getSummary);

  const getQuantity = (id: any) => {
    const quantity: any = tickets.find((value: any) => value.ID === id);
    setQuantityNumber(quantity.quantity);
  };
const IsSm =IsScreenIn_sm();

  useEffect(() => {
    getQuantity(id);
  }, [tickets]);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="top">
      <Stack direction="row" justifyContent="start" alignItems="top">
        <Ticket isSummary title={title} id={id} />
        <Box sx={{ml:{xs:1.5 , sm:"unset"}}}>
          {
            !IsSm ? (
              <Typography variant="body1">
            {quantityNumber} {t("Ticket")} - {title}
          </Typography>

            ):(
              <Typography variant="body1">
             {title} * {quantityNumber}
          </Typography>

              )
          }
          <Typography variant="subtitle1">{price}.00 EGP</Typography>
        </Box>
      </Stack>
      <IconButton
        sx={{ alignItems: "flex-start", height: "fit-content" }}
        onClick={() => dispatch(deleteTicketFromSummary(id))}
      >
        <DeleteIcon sx={{ color: "error.main" }} />
      </IconButton>
    </Stack>
  );
};

export default SummaryItem;
