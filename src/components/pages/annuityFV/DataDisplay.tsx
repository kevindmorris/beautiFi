import { Box, Typography } from "@mui/material";
import moment from "moment";
import _ from "lodash";

import {
  calculateAnnuityDueFV,
  calculateAnnuityOrdinaryFV,
} from "../../../utils/annuityFormulas";
import USDollar from "../../../utils/USDollar";

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
  if (type === "ordinary") {
    fv = calculateAnnuityOrdinaryFV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: contributionPeriods,
    });
  } else {
    fv = calculateAnnuityDueFV({
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
        <Typography variant="h6">Future Value:</Typography>
        <Typography variant="caption" color="text.secondary">
          Future value of the Annuity on{" "}
          {moment()
            .add(
              contributionPeriods,
              contributionFrequency === 1 ? "years" : "months"
            )
            .format("MMMM Do YYYY")}
        </Typography>
        <Typography fontWeight="bold">{USDollar.format(fv)}</Typography>
      </div>
    </Box>
  );
}
