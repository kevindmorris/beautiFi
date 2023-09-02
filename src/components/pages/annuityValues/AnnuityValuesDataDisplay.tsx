import { Box, Typography } from "@mui/material";
import React from "react";
import USDollar from "../../../utils/USDollar";
import moment from "moment";

export default function AnnuityValuesDataDisplay({
  type,
  initialAmount,
  contribution,
  contributionFrequency,
  interestRate,
  interestRateFrequency,
  years,
}: {
  type: string;
  initialAmount: number;
  contribution: number;
  contributionFrequency: number;
  interestRate: number;
  interestRateFrequency: number;
  years: number;
}) {
  const periods = years * contributionFrequency;

  const effectiveInterestRate =
    Math.pow(1 + interestRate / interestRateFrequency, interestRateFrequency) -
    1;
  const effectiveInterestRateByContributionFrequency =
    (Math.pow(1 + effectiveInterestRate, 1 / contributionFrequency) - 1) *
    contributionFrequency;

  const r =
    effectiveInterestRateByContributionFrequency / contributionFrequency;

  let fv: number;
  let pv: number;

  if (type === "ordinary") {
    fv = calculateAnnuityOrdinaryFV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: periods,
    });
    pv = calculateAnnuityOrdinaryPV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: periods,
    });
  } else {
    fv = calculateAnnuityDueFV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: periods,
    });
    pv = calculateAnnuityDuePV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: periods,
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
          Value as of {moment().format("dddd, MMMM Do YYYY")}
        </Typography>
        <Typography fontWeight="bold">{USDollar.format(pv)}</Typography>
      </div>
      <br />
      <div>
        <Typography variant="h6">Future Value:</Typography>
        <Typography variant="caption" color="text.secondary">
          Value as of{" "}
          {moment()
            .add(periods, contributionFrequency === 1 ? "years" : "months")
            .format("dddd, MMMM Do YYYY")}
        </Typography>
        <Typography fontWeight="bold">{USDollar.format(fv)}</Typography>
      </div>
    </Box>
  );
}

function calculateAnnuityOrdinaryPV({
  P,
  PMT,
  r,
  n,
}: {
  P: number;
  PMT: number;
  r: number;
  n: number;
}) {
  const PV = P + PMT * ((1 - Math.pow(1 + r, -n)) / r);

  return PV;
}
function calculateAnnuityOrdinaryFV({
  P,
  PMT,
  r,
  n,
}: {
  P: number;
  PMT: number;
  r: number;
  n: number;
}) {
  const FV = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);

  return FV;
}

function calculateAnnuityDuePV({
  P,
  PMT,
  r,
  n,
}: {
  P: number;
  PMT: number;
  r: number;
  n: number;
}) {
  const PV = (P + PMT * ((1 - Math.pow(1 + r, -n)) / r)) * (1 + r);

  return PV;
}
function calculateAnnuityDueFV({
  P,
  PMT,
  r,
  n,
}: {
  P: number;
  PMT: number;
  r: number;
  n: number;
}) {
  const FV =
    (P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r)) * (1 + r);

  return FV;
}
