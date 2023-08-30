import PageContainer from "../PageContainer";

import logo from "../../../assets/beautifi-logo-320X320.png";
import { Divider, Paper, Typography, useTheme } from "@mui/material";

export default function HomePage() {
  const theme = useTheme();

  return (
    <PageContainer
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h2" fontFamily="monospace" color="text.secondary">
        BeautiFi
      </Typography>
      <Divider />

      <div style={{ display: "flex" }}>
        <Paper variant="outlined" square sx={{ p: theme.spacing(2) }}>
          <Typography variant="button" color="text.secondary">
            Annutities
          </Typography>
        </Paper>
      </div>
    </PageContainer>
  );
}
