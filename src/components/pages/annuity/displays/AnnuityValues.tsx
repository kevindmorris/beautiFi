import { Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import USDollar from "../../../../utils/USDollar";

export default function AnnuityValues({
  periods,
  contributionFrequency,
  pv,
  fv,
}: {
  periods: number;
  contributionFrequency: number;
  pv: number;
  fv: number;
}) {
  return (
    <>
      <div>
        <Typography variant="h6">Present Value:</Typography>
        <Typography variant="caption" color="text.secondary">
          Present value of the annuity on {moment().format("MMMM Do YYYY")}
        </Typography>
        <Typography fontWeight="bold">{USDollar.format(pv)}</Typography>
      </div>
      <br />
      <div>
        <Typography variant="h6">Future Value:</Typography>
        <Typography variant="caption" color="text.secondary">
          Future value of the Annuity on{" "}
          {moment()
            .add(periods, contributionFrequency === 1 ? "years" : "months")
            .format("MMMM Do YYYY")}
        </Typography>
        <Typography fontWeight="bold">{USDollar.format(fv)}</Typography>
      </div>
    </>
  );
}
