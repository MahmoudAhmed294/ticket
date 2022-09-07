import { Box, Typography, Stack, Divider, Button } from "@mui/material";
import { ticketsData } from "data/tikcet";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import SummaryItem from "./SummaryItem";
interface Props {}
const SummaryList: FunctionComponent<Props> = () => {
  const { t } = useTranslation();

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100%" }}
    >
      <Box sx={{ px: {xs:0 , sm:4}, pt: {sm:3} }}>
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
          {ticketsData.map(({ title, price, id }) => (
            <SummaryItem key={id} title={title} price={price} />
          ))}
        </Stack>
      </Box>
      <Divider sx={{ borderColor: "primary.main", my: 2 }} />
      <Box sx={{ px: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2">{t("Taxes")}</Typography>
          <Typography variant="body2">00.00 EGP</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3">{t("Total")}</Typography>
          <Typography variant="h3">1700.00 EGP</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ my: 2 }}
        >
          <Button variant="contained" fullWidth>
            {t("Print")}
          </Button>
          <Button variant="contained" fullWidth>
            {t("Pay")}
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SummaryList;
