import { createTheme } from "@mui/material";

const APPBAR_HEIGHT = 50;

const theme = createTheme({
  components: {
    MuiToolbar: {
      defaultProps: { disableGutters: true, variant: "dense" },
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: APPBAR_HEIGHT,
          height: APPBAR_HEIGHT,
          display: "flex",
          gap: theme.spacing(0.5),
          padding: theme.spacing(1),
        }),
      },
    },
  },
  palette: { primary: { main: "#424798" } },
});

export default theme;
