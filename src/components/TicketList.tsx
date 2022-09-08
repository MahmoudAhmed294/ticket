import Stack from "@mui/material/Stack"
import { ticketsData } from "data/ticket";
import React ,{FunctionComponent} from 'react'      
import { useTranslation } from 'react-i18next';      
import Ticket from "./Ticket";
interface Props {}
const TicketList :FunctionComponent<Props> = () => {

    const {t} = useTranslation()      

  return (
    <Stack
    direction="row"
    alignItems="center"
    flexWrap={"wrap"}
    sx={{ justifyContent: { xs: "space-between", sm: "start" } }}
  >
    {ticketsData.map(({ title, price, id }) => (
      <Ticket title={title} price={price} key={id}  id={id}/>
    ))}
  </Stack>
)
};

export default TicketList
