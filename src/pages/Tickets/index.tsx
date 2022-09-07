import { KeyboardArrowLeft } from "@mui/icons-material";
import {
  Box,
  Grid,
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Stack,
  Divider,
  Button,
  IconButton,
} from "@mui/material";
import NavBar from "components/NavBar";
import SummaryList from "components/SummaryList";
import TicketList from "components/TicketList";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { IsScreenIn_sm } from "utils/hooks/IsScreenIn_sm";
interface Props {}
const Index: FunctionComponent<Props> = () => {
  const [radioValue, setRadioValue] = useState("Cash");
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  const [summaryList, setSummaryList] = useState(false);
  const { t } = useTranslation();
  const IsSm = IsScreenIn_sm();

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
          <Grid item md={7} xs={12}>
            <Stack direction="column" sx={{ mt: { xs: 3, sm: 0 } }}>
              <Stack
                direction="column"
                sx={{ mt: 3, order: { xs: 3, sm: "unset" } }}
              >
                <Typography variant="h4">
                  {t("1. Choose Payment method")}
                </Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{ color: "body.main", justifyContent: "start", mt: 1 }}
                  value={radioValue}
                  onChange={handleChangeRadio}
                >
                  <FormControlLabel
                    value="Cash"
                    control={<Radio sx={{ color: "body.main" }} />}
                    label="Cash"
                    sx={{ mr: {xs:3,sm:5} }}
                  />
                  <FormControlLabel
                    value="Card"
                    control={<Radio sx={{ color: "body.main" }} />}
                    label="Card"
                    sx={{ mr: {xs:3,sm:5} }}
                  />
                  <FormControlLabel
                    value="Visa"
                    control={<Radio sx={{ color: "body.main" }} />}
                    label="Visa"
                    sx={{ mr: {xs:3,sm:5} }}
                  />
                </RadioGroup>
              </Stack>

              <Box
                sx={{
                  mt: { xs: 0, sm: 4 },
                  maxWidth: { xs: "100%", md: "470px" },
                  order: { xs: 3, sm: "unset" },
                }}
              >
                {radioValue !== "Cash" && (
                  <>
                    <Typography variant="h4">
                      {t("2. Enter card ID")}
                    </Typography>
                    <TextField
                      variant="outlined"
                      label="Card ID"
                      sx={{ mt: 1.5 }}
                      fullWidth
                    />
                  </>
                )}
              </Box>
              {radioValue !== "Cash" && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  sx={{
                    mt: 1.5,
                    order: { xs: 1, sm: "unset" },
                    maxWidth: { xs: "100%", md: "470px" },
                  }}
                >
                  <Stack direction="row" spacing={0.5} alignItems="baseline">
                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                      {t("Member name:")}
                    </Typography>
                    <Typography variant="caption">Mustafa adel</Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="baseline">
                    <Typography variant="h5" sx={{ color: "primary.main" }}>
                      {t("Last renew year:")}
                    </Typography>
                    <Typography variant="caption">2021</Typography>
                  </Stack>
                </Stack>
              )}
            </Stack>
            {IsSm ? (
              ""
            ) : (
              <Divider sx={{ borderColor: "primary.main", my: 3 }} />
            )}
            <Box>
              <Typography
                variant="h4"
                sx={{
                  mb: 2,
                  mt: { xs: 3, sm: "unset" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {summaryList && (
                  <IconButton
                    onClick={() => setSummaryList(false)}
                    sx={{ color: "body.main" }}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                )}
                {t("3. Choose your ticket")}
              </Typography>
              {summaryList && IsSm ? <SummaryList /> : <TicketList />}
            </Box>
          </Grid>

          {IsSm ? (
            ""
          ) : (
            <Grid
              item
              md={5}
              xs={12}
              sx={{
                borderLeft: "1px solid",
                borderColor: "primary.main",
              }}
            >
              <SummaryList />
            </Grid>
          )}
          {IsSm && !summaryList ? (
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              onClick={() => setSummaryList(true)}
            >
              {t("Next")}
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Index;
