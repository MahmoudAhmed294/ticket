import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import QRCode from "react-qr-code";

interface Props {}
const Bill: FunctionComponent<Props> = () => {

  return (
    <Box
      sx={{
        width: "320px",
        backgroundColor: "body.light",
        position: "relative",
        border: "1px solid",
        p: 2,
      }}
    >
      <Stack
        direction="column"
        justifyContent="top"
        spacing={1.5}
        sx={{ border: "1px solid #888", p: 1, width: "100%" }}
      >
        <Stack
          direction="column"
          justifyContent="top"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Typography variant="h2" sx={{mb:2}}>Next Step Webs</Typography>
          <Box
            sx={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 150,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"value"}
              viewBox={`0 0 256 256`}
            />
          </Box>
        </Stack>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems="center"
          >
          <Typography variant="h6">Ticket number</Typography>
          <Typography variant="overline">25648</Typography>

          </Stack>
          <Divider sx={{ borderColor: "#e7e6e6", my: 1 }} />
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems="center"
          >
          <Typography variant="h6">Name of Ticket * 2</Typography>
          <Typography variant="overline">$50.00</Typography>

          </Stack>
          <Divider sx={{ borderColor: "#e7e6e6", my: 1 }} />
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems="center"
          >
          <Typography variant="h6">Name of Ticket * 2</Typography>
          <Typography variant="overline">$50.00</Typography>

          </Stack>
          <Divider sx={{ borderColor: "#e7e6e6", my: 1 }} />
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems="center"
          >
          <Typography variant="h6">Name of Ticket * 2</Typography>
          <Typography variant="overline">$50.00</Typography>

          </Stack>
          <Divider sx={{ borderColor: "#e7e6e6", my: 1 }} />
          <Box>

          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems="center"
            sx={{mt:2 , mb:1}}
          >
          <Typography variant="h5">Tax:</Typography>
          <Typography variant="body1">$50.00</Typography>

          </Stack>
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems="center"
          >
          <Typography variant="h5">total:</Typography>
          <Typography variant="body1">$100.00</Typography>

          </Stack>
          </Box>

      </Stack>
      
      
    </Box>
  );
};

export default Bill;
