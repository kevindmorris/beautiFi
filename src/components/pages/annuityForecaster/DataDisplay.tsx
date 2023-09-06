import { Box } from "@mui/material";
import moment from "moment";
import _ from "lodash";

import {
  calculateAnnuityDueFV,
  calculateAnnuityOrdinaryFV,
} from "../../../utils/annuityFormulas";
import Chart from "./Chart";
import Table from "./Table";

export default function DataDisplay({
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

  let data: Array<{
    index: number;
    date: number;
    principal: number;
    balance: number;
    interest: number;
  }> = [];
  if (type === "ordinary") {
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
      default:
      case "chart":
        return (
          <Chart
            data={data}
            contributionFrequency={contributionFrequency}
          />
        );
      case "table":
        return (
          <Table data={data} contributionFrequency={contributionFrequency} />
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
