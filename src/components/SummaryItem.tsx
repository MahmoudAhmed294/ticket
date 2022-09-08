import { Stack, Typography, IconButton, Box } from "@mui/material";
import React, { FunctionComponent } from "react";
import Ticket from "./Ticket";
import { useTranslation } from "react-i18next";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "utils/hooks/useStore";
import { deleteTicketFromSummary } from "store/ticketsSlice";

interface Props {
  title: string;
  price: number;
  id: number;
}
const SummaryItem: FunctionComponent<Props> = ({ title, price, id }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="top">
      <Stack direction="row" justifyContent="start" alignItems="top">
        <Ticket price={price} isSummary title={title} id={id} />
        <Box>
          <Typography variant="body1">
            1 {t("Ticket")} - {title}
          </Typography>
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
