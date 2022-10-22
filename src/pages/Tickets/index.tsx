import {
  Box,
  Grid,
  Container,
  Typography,
  Stack,
  Divider,
  Button,
} from "@mui/material";
import NavBar from "components/NavBar";
import SummaryList from "components/SummaryList";
import TicketList from "components/TicketList";
import PaymentOption from "components/PaymentOption";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { getTotal } from "store/ticketsSlice";
import { IsScreenIn_sm } from "utils/hooks/IsScreenIn_sm";
import { useAppSelector } from "utils/hooks/useStore";
import PhoneTickets from "components/PhoneTickets";
interface Props {}

const Index: FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const IsSm = IsScreenIn_sm();

  return (
    <Box>
      <NavBar />
      <Container maxWidth="lg">
        {IsSm ? (
          <PhoneTickets />
        ) : (
          <Grid container>
            <Grid item md={6} xs={12}>
              <PaymentOption />
              <Divider sx={{ borderColor: "primary.main", my: 2 }} />

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 2,
                    mt: { xs: 1, sm: "unset" },
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {t("3. Choose your ticket")}
                </Typography>
                <TicketList />
              </Box>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
              sx={{
                borderLeft: { xs: "unset ", md: "1px solid", height: "90vh" },
                borderColor: { xs: "none", md: "primary.main" },
              }}
            >
              <SummaryList />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Index;
