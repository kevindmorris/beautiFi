import { Box, Typography } from "@mui/material";
import React from "react";
import USDollar from "../../../utils/USDollar";
import moment from "moment";
import {
  calculateAnnuityDueFV,
  calculateAnnuityDuePV,
  calculateAnnuityOrdinaryFV,
  calculateAnnuityOrdinaryPV,
} from "./utils";
import AnnuityValues from "./displays/AnnuityValues";
import _ from "lodash";
import AnnuityTable from "./displays/AnnuityTable";
import AnnuityChart from "./displays/AnnuityChart";

export default function AnnuityDataDisplay({
  view,
  type,
  initialAmount,
  contribution,
  contributionFrequency,
  contributionPeriods,
  interestRate,
  interestRateFrequency,
}: {
  view: string;
  type: string;
  initialAmount: number;
  contribution: number;
  contributionFrequency: number;
  contributionPeriods: number;
  interestRate: number;
  interestRateFrequency: number;
}) {
  const periodsArray = _.range(0, contributionPeriods + 1);

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
    fv = calculateAnnuityOrdinaryFV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: contributionPeriods,
    });
    data = periodsArray.map((d) => {
      let date = moment()
        .add(d, contributionFrequency === 1 ? "years" : "months")
        .valueOf();
      let principal = initialAmount + contribution * d;
      let balance = calculateAnnuityOrdinaryFV({
        P: initialAmount,
        PMT: contribution,
        r: r,
        n: d,
      });
      let interest = balance - principal;
      return {
        index: d,
        date: date,
        principal: principal,
        balance: balance,
        interest: interest,
      };
    });
  } else {
    pv = calculateAnnuityDuePV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: contributionPeriods,
    });
    fv = calculateAnnuityDueFV({
      P: initialAmount,
      PMT: contribution,
      r: r,
      n: contributionPeriods,
    });
    data = periodsArray.map((d) => {
      let date = moment()
        .add(d, contributionFrequency === 1 ? "years" : "months")
        .valueOf();
      let principal = initialAmount + contribution * d;
      let balance = calculateAnnuityDueFV({
        P: initialAmount,
        PMT: contribution,
        r: r,
        n: d,
      });
      let interest = balance - principal;
      return {
        index: d,
        date: date,
        principal: principal,
        balance: balance,
        interest: interest,
      };
    });
  }

  const content = () => {
    switch (view) {
      case "chart":
        return (
          <AnnuityChart
            data={data}
            contributionFrequency={contributionFrequency}
            fv={fv}
          />
        );
      case "table":
        return (
          <AnnuityTable
            data={data}
            contributionFrequency={contributionFrequency}
          />
        );
      case "values":
      default:
        return (
          <AnnuityValues
            periods={contributionPeriods}
            contributionFrequency={contributionFrequency}
            pv={pv}
            fv={fv}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
      }}
    >
      {content()}
    </Box>
  );
}
