import PageContainer from "../PageContainer";
import {
  Divider,
  Paper,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <PageContainer
      sx={{
        pt: theme.spacing(22),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: theme.spacing(3),
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Typography variant="h2" color="text.secondary">
          BeautiFi
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Financial and actuarial calculations made beautiful.
        </Typography>
      </div>

      <Divider flexItem variant="middle" />

      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        spacing={2}
        flexWrap="wrap"
        useFlexGap
        justifyContent="center"
      >
        {[
          {
            primary: "Forecaster",
            secondary: "Forecast annuity growth.",
            href: "annuity-forecaster",
          },
          {
            primary: "Present Value",
            secondary: "Calculate present value.",
            href: "annuity-present-value",
          },
          {
            primary: "Future Value",
            secondary: "Calculate future value.",
            href: "annuity-future-value",
          },
        ].map((e) => (
          <Paper
            key={e.primary}
            variant="outlined"
            square
            onClick={() => {
              navigate(e.href);
            }}
            sx={{
              width: 350,
              p: theme.spacing(2),
              borderRadius: theme.spacing(1),
              cursor: "pointer",
              transition: "all 0.5s ease",
              display: "flex",
              flexDirection: "column",
              "&:hover": { backgroundColor: alpha(theme.palette.divider, 0.1) },
            }}
          >
            <Typography>{e.primary}</Typography>
            <Typography color="text.secondary">{e.secondary}</Typography>
          </Paper>
        ))}
      </Stack>
    </PageContainer>
  );
}
