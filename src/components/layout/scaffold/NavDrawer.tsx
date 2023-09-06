import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../../../assets/beautifi-logo-320X320.png";
import { ExpandMore } from "@mui/icons-material";

const DRAWER_WIDTH = 300;

export default function NavDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();

  const small = useMediaQuery(theme.breakpoints.between("xs", "lg"));

  if (small) return <NavDrawerMobile open={open} setOpen={setOpen} />;
  return <NavDrawerDesktop open={open} setOpen={setOpen} />;
}

function NavDrawerMobile({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        zIndex: theme.zIndex.drawer + 5,
        [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH },
      }}
    >
      <Toolbar>
        <img
          src={logo}
          alt=""
          onClick={() => {
            navigate("/");
            setOpen(false);
          }}
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
      <Divider />
      <NavDrawerContents setOpen={setOpen} />
    </Drawer>
  );
}

function NavDrawerDesktop({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />
      <Divider />
      <NavDrawerContents setOpen={setOpen} />
    </Drawer>
  );
}

const NavDrawerContents = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [openAnnuity, setOpenAnnuity] = React.useState(true);
  const [openLoans, setOpenLoans] = React.useState(true);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 300,
        [`& .MuiButtonBase-root`]: {
          minWidth: 36,
          whiteSpace: "wrap",
          px: theme.spacing(2),
          mx: theme.spacing(1),
          borderRadius: theme.spacing(1),
        },
        [`& .MuiListItemText-root`]: {
          mx: theme.spacing(1),
        },
      }}
    >
      <MenuItem onClick={() => setOpenAnnuity(!openAnnuity)}>
        <ExpandMore
          sx={{
            transform: openAnnuity ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.25s ease",
          }}
        />
        <ListItemText primary="Annuity" />
      </MenuItem>
      <Collapse in={openAnnuity} unmountOnExit>
        <List dense disablePadding>
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
            <MenuItem
              key={e.primary}
              dense
              onClick={() => {
                navigate(e.href);
                setOpen(false);
              }}
            >
              <ListItemText primary={e.primary} secondary={e.secondary} />
            </MenuItem>
          ))}
        </List>
      </Collapse>

      <MenuItem onClick={() => setOpenLoans(!openLoans)}>
        <ExpandMore
          sx={{
            transform: openLoans ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 0.25s ease",
          }}
        />
        <ListItemText primary="Loan" />
      </MenuItem>
      <Collapse in={openLoans} unmountOnExit>
        <List dense disablePadding>
          {[
            {
              primary: "Forecaster",
              secondary: "Forecast loan balance.",
              href: "loan-forecaster",
            },
            {
              primary: "Monthly Payment",
              secondary: "Calculate monthly payment.",
              href: "loan-monthly-payment",
            },
            {
              primary: "Term",
              secondary: "Calculate term.",
              href: "loan-term",
            },
          ].map((e) => (
            <MenuItem
              key={e.primary}
              dense
              onClick={() => {
                navigate(e.href);
                setOpen(false);
              }}
            >
              <ListItemText primary={e.primary} secondary={e.secondary} />
            </MenuItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
};
