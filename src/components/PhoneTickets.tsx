import {Box , Grid, Typography ,Stack} from "@mui/material"
import React ,{FunctionComponent} from 'react'      
import { useTranslation } from 'react-i18next';      
import { useAppSelector } from "utils/hooks/useStore";
import PaymentOption from "./PaymentOption";
import PhoneDrawer from "./PhoneDrawer";
import TicketList from "./TicketList";
interface Props {}
const PhoneTickets :FunctionComponent<Props> = () => {
    const {t} = useTranslation()      
    const total = useAppSelector((state:any) => state.tickets.total )
    const tax = useAppSelector((state:any) => state.tickets.Tax )

  return (
    <Grid
    container
    sx={{
      backgroundColor: "body.light",
      position: "relative",
      top: { xs: "70px", sm: "unset" },
      p: { xs: 2, sm: 0 },
      borderRadius: { xs: "12px", sx: "unset" },
      boxShadow:"1px 1px 8px rgba(0,0,0,0.5)",
    }}
    flexDirection={"column"}
    alignItems="center" justifyContent={"space-between"}
  >
     <PaymentOption />
    <Box sx={{width:"100%" , my:3}}>
      <TicketList />
    </Box>
    {/* <Stack direction="column" spacing={1} alignItems="center" >

    <Typography variant="h2" color="initial">
      Tax: {tax}.00
    </Typography>
    <Typography variant="h1" color="primary">
      Total: {total}.00
    </Typography>
    </Stack> */}
    <Box sx={{width:'100%'}}>

    <PhoneDrawer />
    </Box>
    </Grid>
  )
};

export default PhoneTickets
