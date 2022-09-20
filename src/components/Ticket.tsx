import { Stack, Typography } from "@mui/material";
import { FunctionComponent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IsScreenIn_sm } from "utils/hooks/IsScreenIn_sm";
import { useAppDispatch, useAppSelector } from "utils/hooks/useStore";

import TicketImg from "assets/images/ticket.svg";
import { addTicketToSummary } from "store/ticketsSlice";
interface Props {
  title: string;
  isSummary?: boolean;
  id: number;
}
const Ticket: FunctionComponent<Props> = ({ title, isSummary, id }) => {
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);
  const [color, setColor] = useState("#E2E23B");
  const dispatch = useAppDispatch();
  const member = useAppSelector((state: any) => state.payment.member);
  const IsSm = IsScreenIn_sm();

  useEffect(() => {
    switch (title) {
      case "Regular":
        setColor("#E2E23B");
        break;
      case "vip":
        setColor("#41CA32");
        break;
      case "Children":
        setColor("#E79D2F");
        break;
      case "weekEnd":
        setColor("#4AABE2");
        break;
      case "Cat":
        setColor("#EB4EC6");
        break;
    }
  }, []);

  const AddTicket = () => {
    if (member) {
      setIsSelected(true);
      setTimeout(() => {
        setIsSelected(false);
      }, 1000);
      dispatch(addTicketToSummary({ id }));
    }
  };

  return (
    <Stack
      onClick={() => (!isSummary ? AddTicket() : "")}
      sx={{
        mb: { xs: "8px", sm: 1.5 },
        mr: { xs: "0", sm: 1.5 },
        backgroundColor: color,
        cursor: isSummary ? "unset" : "pointer",
        py: 2,
        px: 1,
        width: isSummary
          ? { xs: "80px", sm: "85px" }
          : { xs: "80px", sm: "110px" },
        height: isSummary
          ? { xs: "70px", sm: "80px" }
          : { xs: "80px", sm: "105px" },
        borderRadius: "8px",
        color: "body.light",
        border: isSelected && !isSummary ? "2px solid " : "unset",
        borderColor: "primary.main",
        transition: "0.3s ease",
      }}
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={0.5}
    >
      <img
        src={TicketImg}
        alt={title}
        width={
             !isSummary && IsSm
            ? "30px"
            : isSummary && IsSm
            ? "25px":
            isSummary
            ? "35px"
            : "50px"
        }
      />
      <Typography
        variant={isSummary ? "overline" : "body1"}
        sx={{
          textAlign: "center",
          fontSize: { xs: "14px !important", sm: "inherit" },
        }}
      >
        {t(title)}
      </Typography>
    </Stack>
  );
};

export default Ticket;
