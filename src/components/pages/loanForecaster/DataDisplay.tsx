import { Box } from "@mui/material";
import moment from "moment";
import _ from "lodash";
import { calculateLoanBalance } from "../../../utils/loanFormulas";
import Table from "./Table";
import Chart from "./Chart";

export default function DataDisplay({
  view,
  initialBalance,
  payment,
  paymentFrequency,
  paymentPeriods,
  interestRate,
  interestRateFrequency,
}: {
  view: string;
  initialBalance: number;
  payment: number;
  paymentFrequency: number;
  paymentPeriods: number;
  interestRate: number;
  interestRateFrequency: number;
}) {
  const periodsArray = _.range(0, paymentPeriods + 1);

  const effectiveInterestRate =
    Math.pow(1 + interestRate / interestRateFrequency, interestRateFrequency) -
    1;
  const r = Math.pow(1 + effectiveInterestRate, 1 / paymentFrequency) - 1;

  let data: Array<{
    index: number;
    date: number;
    principal: number;
    balance: number;
    interest: number;
  }> = [];

  data = periodsArray.map((d) => {
    let date = moment()
      .add(d, paymentFrequency === 1 ? "years" : "months")
      .valueOf();
    let principal = payment * d;
    let balance = calculateLoanBalance({
      P: initialBalance,
      PMT: payment,
      r: r,
      n: d,
    });
    return {
      index: d,
      date: date,
      principal: principal,
      balance: balance,
      interest: 0,
    };
  });

  const content = () => {
    switch (view) {
      default:
      case "chart":
        return <Chart data={data} paymentFrequency={paymentFrequency} />;
      case "table":
        return <Table data={data} paymentFrequency={paymentFrequency} />;
    }
  };

  return content();
}
