import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import { FunctionComponent, useRef } from "react";
import { useTranslation } from "react-i18next";
import ReactToPrint from "react-to-print";
import { getSummary, getTax, getTotal } from "store/ticketsSlice";
import { useAppSelector , useAppDispatch } from "utils/hooks/useStore";
import Bill from "./Bill";
import SummaryItem from "./SummaryItem";
import {PostBill} from "api/Api"
interface Props {}
const SummaryList: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const SummaryList = useAppSelector(getSummary);
  const Total = useAppSelector(getTotal);
  const Tax = useAppSelector(getTax);
  const payMethod = useAppSelector((state:any) => state.payment.payMethod);
  const memberID = useAppSelector((state:any) => state.payment.member?.ID);
  const cardID = useAppSelector((state:any) => state.payment.card?.ID);
  const userName = useAppSelector((state:any) => state.tickets.user?.UserName);
  const billNumber = useAppSelector((state:any) => state.payment?.billNumber);

  const componentRef = useRef(null);
  const dispatch = useAppDispatch()

  const SendBillData =() =>{

    dispatch(PostBill({
      summary:SummaryList,
      total:Total,
      tax:Tax,
      userName:userName,
      MemberID:memberID,
      CardID: cardID,
      isPrinted:1,
      paymentMethod:payMethod,
      BillNumber:billNumber
    }))
  }
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <Box sx={{ pl: { xs: 0, sm: 4 }, pt: { sm: 3 } }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {t("Summary")}
        </Typography>
        <Stack
          direction="column"
          alignItems="top"
          justifyContent="center"
          spacing={1}
          sx={{
            overflowY: "auto",
            maxHeight: "360px",
            "::-webkit-scrollbar": {
              width: "3px",
            },
            "::-webkit-scrollbar-track": {
              background: " #f1f1f1",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#0A2488",
            },
            "  ::-webkit-scrollbar-thumb:hover": {
              background: "#294BCF",
            },
          }}
        >
          {SummaryList.map(({ Name, Amount, ID, quantity }: any) =>
            quantity > 0 ? (
              <SummaryItem key={ID} title={Name} price={Amount} id={ID} />
            ) : (
              ""
            )
          )}
        </Stack>
      </Box>
      <Divider sx={{ borderColor: "primary.main", my: 2 }} />
      <Box sx={{ pl: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2">{t("Taxes")}</Typography>
          <Typography variant="body2">{`${Tax}.00 EGP`}</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">{t("Total")}</Typography>
          <Typography variant="h3">{Total}.00 EGP</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ my: 2 }}
        >
          <Button variant="contained" fullWidth >
            {t("Print")}
          </Button>
          <ReactToPrint
          
            trigger={() => (
              <Button variant="contained" fullWidth disabled={!memberID || SummaryList.length ===0 ? true : false}>
                {t("Pay")}
              </Button>
            )}
            content={() => componentRef.current}
            onBeforeGetContent={SendBillData}
          />
          <Box ref={componentRef}  className="print-source" >
          <Bill   />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SummaryList;
