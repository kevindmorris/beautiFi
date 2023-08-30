import React from "react";
import { Outlet } from "react-router-dom";
import { Paper } from "@mui/material";

import NavBar from "./scaffold/NavBar";
import NavDrawer from "./scaffold/NavDrawer";

export default function AppFrame() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <div style={{ display: "flex" }}>
      <NavBar setOpen={setOpen} />
      <NavDrawer open={open} setOpen={setOpen} />
      <Paper
        sx={{
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          overflow: "hidden",
        }}
      >
        <Outlet />
      </Paper>
    </div>
  );
}
