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
interface Props {}

const Index: FunctionComponent<Props> = () => {
  // const [summaryList, setSummaryList] = useState(false);
  const { t } = useTranslation();
  const IsSm = IsScreenIn_sm();
  const Total = useAppSelector(getTotal);

  return (
    <Box>
      <NavBar />
      <Container maxWidth="lg">
        <Grid
          container
          sx={{
            backgroundColor: "body.light",
            position: "relative",
            top: { xs: "70px", sm: "unset" },
            p: { xs: 2, sm: 0 },
            borderRadius: { xs: "12px", sx: "unset" },
          }}
        >
          <Grid item md={6} xs={12}>
            <PaymentOption />
            {IsSm ? (
              ""
            ) : (
              <Divider sx={{ borderColor: "primary.main", my: 1 }} />
            )}
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
                {/* {summaryList && (
                  <IconButton
                    onClick={() => setSummaryList(false)}
                    sx={{ color: "body.main" }}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                )} */}
                {t("3. Choose your ticket")}
              </Typography>
              {/* <SummaryList /> */}
              <TicketList />
              {/* { IsSm ? <TicketList /> : ""} */}
            </Box>
          </Grid>

          {IsSm ? (
            ""
          ) : (
            <Grid
              item
              md={6}
              xs={12}
              sx={{
                borderLeft: "1px solid",
                borderColor: "primary.main",
              }}
            >
              <SummaryList />
            </Grid>
          )}
          {IsSm ? (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ width: "100%", color: "primary.main", mt: 1.5 }}
              >
                <Typography variant="h3">{t("Total")}</Typography>
                <Typography variant="h3">{Total}.00 EGP</Typography>
              </Stack>

              <Button variant="contained" fullWidth sx={{ mt: 1.5 }}>
                {t("Print")}
              </Button>
            </>
          ) : (
            ""
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
