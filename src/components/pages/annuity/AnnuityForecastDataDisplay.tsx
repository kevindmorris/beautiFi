import moment from "moment";
import AnnuityForecastChart from "./AnnuityForecastChart";
import AnnuityForecastTable from "./AnnuityForecastTable";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
import USDollar from "../../../utils/USDollar";

export default function AnnuityForecastDataDisplay({
  type,
  initialAmount,
  contribution,
  contributionFrequency,
  interestRate,
  interestRateFrequency,
  years,
}: {
  type: "chart" | "table";
  initialAmount: number;
  contribution: number;
  contributionFrequency: number;
  interestRate: number;
  interestRateFrequency: number;
  years: number;
}) {
  const periods = _.range(0, years * contributionFrequency + 1);

  const effectiveInterestRate =
    Math.pow(1 + interestRate / interestRateFrequency, interestRateFrequency) -
    1;
  const effectiveInterestRateByContributionFrequency =
    (Math.pow(1 + effectiveInterestRate, 1 / contributionFrequency) - 1) *
    contributionFrequency;

  const r =
    effectiveInterestRateByContributionFrequency / contributionFrequency;

  const data = periods.map((d) => {
    let date = moment()
      .add(d, contributionFrequency === 1 ? "years" : "months")
      .valueOf();
    let principal = initialAmount + contribution * d;
    let balance =
      initialAmount * Math.pow(1 + r, d) +
      contribution * ((Math.pow(1 + r, d) - 1) / r);
    let interest = balance - principal;
    return {
      index: d,
      date: date,
      principal: principal,
      balance: balance,
      interest: interest,
    };
  });

  const finalBalance = data[data.length - 1].balance;

  return (
    <Box
      sx={{
        flex: 1,
      }}
    >
      {type === "chart" ? (
        <>
          <Typography variant="h6" textAlign="right">
            {USDollar.format(finalBalance)}
          </Typography>
          <AnnuityForecastChart data={data} interval={contributionFrequency} />
        </>
      ) : (
        <AnnuityForecastTable data={data} interval={contributionFrequency} />
      )}
    </Box>
  );
}
