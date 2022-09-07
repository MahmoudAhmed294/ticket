import { Stack, Typography } from "@mui/material";
import { FunctionComponent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import TicketImg from "assets/images/ticket.svg";
import { IsScreenIn_sm } from "utils/hooks/IsScreenIn_sm";

interface Props {
  title: string;
  price: number;
  isSummary?: boolean;
}
const Ticket: FunctionComponent<Props> = ({ title, isSummary, price }) => {
  const { t } = useTranslation();
  const [isSelected, setIsSelected] = useState(false);
  const [color, setColor] = useState("#E2E23B");
  const IsSm = IsScreenIn_sm();

  useEffect(() => {
    switch (title) {
      case "Regular":
        setColor("#E2E23B");
        break;
      case "VIP":
        setColor("#41CA32");
        break;
      case "Children":
        setColor("#E79D2F");
        break;
      case "Super VIP":
        setColor("#4AABE2");
        break;
      case "Cat":
        setColor("#EB4EC6");
        break;
    }
  }, []);

  return (
    <Stack
      onClick={() => setIsSelected(!isSelected)}
      sx={{
        mb: {xs:"4px" , sm:1.5},
        mr: {xs:"4px" , sm:1.5},
        backgroundColor: color,
        cursor: isSummary ? "unset" : "pointer",
        py: 2,
        px: 1,
        width: isSummary ? "70px" : { xs: "85px", sm: "118px" },
        height: isSummary ? "70px" : { xs: "85px", sm: "118px" },
        borderRadius: "8px",
        color: "body.light",
        border: isSelected && !isSummary ? "2px solid " : "unset",
        borderColor: "primary.main",
        transform: isSelected && !isSummary ? "scale(0.8)" : "scale(1)",
        transition: "0.3s ease",
      }}
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={isSummary ? 0 : 1.5}
    >
      <img
        src={TicketImg}
        alt={title}
        width={isSummary ? "30px" : IsSm ? "30px" : "50px"}
      />
      <Typography
        variant={isSummary ? "overline" : "body1"}
        sx={{
          textAlign: "center",
          mt:{xs:"0 !important" , sm:"12px"}
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default Ticket;
