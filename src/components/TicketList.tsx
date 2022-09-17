import Stack from "@mui/material/Stack";
import { FunctionComponent } from "react";
import { getAllTickets } from "store/ticketsSlice";
import { useAppSelector } from "utils/hooks/useStore";
import Ticket from "./Ticket";
interface Props {}
const TicketList: FunctionComponent<Props> = () => {
  const tickets = useAppSelector(getAllTickets);

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexWrap={"wrap"}
      sx={{ justifyContent: { xs: "space-between", sm: "start" } }}
    >
      {tickets.map(({ Name, ID }: any) => (
        <Ticket title={Name} key={ID} id={ID} />
      ))}
    </Stack>
  );
};

export default TicketList;
