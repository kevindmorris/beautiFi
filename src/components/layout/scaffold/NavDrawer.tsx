import { Looks3, Looks4, LooksOne, LooksTwo } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NavDrawer({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const theme = useTheme();

  const small = useMediaQuery(theme.breakpoints.between("xs", "md"));

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
        [`& .MuiDrawer-paper`]: { width: 240 },
      }}
    >
      <Toolbar>
        <Toolbar>
          <img
            src="/beautifi-logo-320X320.png"
            alt=""
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
      </Toolbar>

      <Divider />

      <List>
        {[
          { title: "Page 1", href: "page-1", icon: <LooksOne /> },
          { title: "Page 2", href: "page-2", icon: <LooksTwo /> },
          { title: "Page 3", href: "page-3", icon: <Looks3 /> },
          { title: "Page 4", href: "page-4", icon: <Looks4 /> },
        ].map((e) => (
          <MenuItem
            key={e.title}
            dense
            onClick={() => {
              navigate(e.href);
              setOpen(false);
            }}
            sx={{
              px: theme.spacing(2),
              mx: theme.spacing(1),
              borderRadius: theme.spacing(1),
            }}
          >
            <ListItemIcon>{e.icon}</ListItemIcon>
            <ListItemText secondary={e.title} />
          </MenuItem>
        ))}
      </List>
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
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 52,
        flexShrink: 0,
        transition: "width 0.2s ease",
        [`& .MuiDrawer-paper`]: {
          width: open ? 240 : 52,
          transition: "width 0.2s ease",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar />

      <Divider />

      <List
        sx={{
          [`& .MuiButtonBase-root`]: { minWidth: 36 },
          [`& .MuiListItemIcon-root`]: { minWidth: 20, width: 20 },
          [`& .MuiListItemText-root`]: { ml: theme.spacing(2) },
        }}
      >
        {[
          { title: "Page 1", href: "page-1", icon: <LooksOne /> },
          { title: "Page 2", href: "page-2", icon: <LooksTwo /> },
          { title: "Page 3", href: "page-3", icon: <Looks3 /> },
          { title: "Page 4", href: "page-4", icon: <Looks4 /> },
        ].map((e) => (
          <MenuItem
            key={e.title}
            dense
            onClick={() => {
              navigate(e.href);
            }}
            sx={{
              px: open ? theme.spacing(2) : theme.spacing(1),
              mx: theme.spacing(1),
              borderRadius: theme.spacing(1),
              transition: "padding 0.2s ease",
            }}
          >
            <ListItemIcon>{e.icon}</ListItemIcon>
            {open ? <ListItemText secondary={e.title} /> : null}
          </MenuItem>
        ))}
      </List>
    </Drawer>
  );
}
