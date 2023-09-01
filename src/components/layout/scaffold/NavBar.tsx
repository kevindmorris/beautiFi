import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Toolbar,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/beautifi-logo-320X320.png";

export default function NavBar({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderStyle: "solid",
        borderColor: theme.palette.divider,
        borderWidth: "0px 0px thin",
        borderRadius: 0,
        backgroundColor: alpha(theme.palette.background.paper, 0.5),
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        color: theme.palette.text.primary,
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton size="small" onClick={() => setOpen((prev) => !prev)}>
          <Menu />
        </IconButton>
        <img
          src={logo}
          alt=""
          onClick={() => navigate("/")}
          style={{ height: 40, cursor: "pointer" }}
        />
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            ml: theme.spacing(0.5),
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{ color: theme.palette.text.secondary }}
          >
            beautiFi.io
          </Typography>
          <Typography
            variant="caption"
            fontStyle="italic"
            sx={{ color: theme.palette.text.secondary }}
          >
            Calculators, but beautiful.
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
