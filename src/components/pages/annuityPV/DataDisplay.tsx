import { Box, Typography } from "@mui/material";
import moment from "moment";
import _ from "lodash";

import USDollar from "../../../utils/USDollar";
import {
  calculateAnnuityDuePV,
  calculateAnnuityOrdinaryPV,
} from "../../../utils/annuityFormulas";

export default function DataDisplay({
  type,
  initialAmount,
  contribution,
  contributionFrequency,
  contributionPeriods,
  interestRate,
  interestRateFrequency,
}: {
  type: string;
  initialAmount: number;
  contribution: number;
  contributionFrequency: number;
  contributionPeriods: number;
  interestRate: number;
  interestRateFrequency: number;
}) {
  const effectiveInterestRate =
    Math.pow(1 + interestRate / interestRateFrequency, interestRateFrequency) -
    1;
  const r = Math.pow(1 + effectiveInterestRate, 1 / contributionFrequency) - 1;

  let fv: number;
  let pv: number;
  let data: Array<{
    index: number;
    date: number;
    principal: number;
    balance: number;
    interest: number;
  }> = [];
  if (type === "ordinary") {
    pv = calculateAnnuityOrdinaryPV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: contributionPeriods,
    });
  } else {
    pv = calculateAnnuityDuePV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: contributionPeriods,
    });
  }

  return (
    <Box
      sx={{
        flex: 1,
      }}
    >
      <div>
        <Typography variant="h6">Present Value:</Typography>
        <Typography variant="caption" color="text.secondary">
          Present value of the annuity on {moment().format("MMMM Do YYYY")}
        </Typography>
        <Typography fontWeight="bold">{USDollar.format(pv)}</Typography>
      </div>
    </Box>
  );
}
