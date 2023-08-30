import React from "react";
import PageContainer from "../PageContainer";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import moment from "moment";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import USDollar from "../../../utils/USDollar";
import AnnuityTable from "../../shared/AnnuityTable";
import InputNumerical from "../../shared/InputNumerical";
import AnnuityChart from "../../shared/AnnuityChart";

export default function AnnuitiesPage() {
  const theme = useTheme();

  const [graphic, setGraphic] = React.useState<"chart" | "table">("chart");
  const handleGraphic = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "chart" | "table" | null
  ) => {
    if (newValue !== null) {
      setGraphic(newValue);
    }
  };

  const [initialAmount, setInitialAmount] = React.useState<number>(1000);
  const [contribution, setContribution] = React.useState<number>(100);
  const [contributionFrequency, setContributionFrequency] =
    React.useState<number>(12);
  const [interestRate, setInterestRate] = React.useState<number>(7);
  const [interestRateFrequency, setInterestRateFrequency] =
    React.useState<number>(12);
  const [years, setYears] = React.useState<number>(5);

  return (
    <PageContainer
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        gap: theme.spacing(1),
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "100%", md: 300 },
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1),
        }}
      >
        <ToggleButtonGroup
          value={graphic}
          size="small"
          exclusive
          onChange={handleGraphic}
          sx={{ width: "100%" }}
        >
          <ToggleButton value="chart">chart</ToggleButton>
          <ToggleButton value="table">table</ToggleButton>
        </ToggleButtonGroup>
        <Divider />
        <InputNumerical
          label="Initial Amount"
          value={initialAmount || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let v = parseFloat(event.target.value);
            setInitialAmount(v);
          }}
        />
        <Divider />
        <InputNumerical
          label="Contribution"
          value={contribution || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let v = parseFloat(event.target.value);
            setContribution(v);
          }}
        />
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel>Contribution Frequency</InputLabel>
          <Select
            label="Contribution Frequency"
            size="small"
            value={contributionFrequency.toString()}
            onChange={(event: SelectChangeEvent) => {
              setContributionFrequency(parseInt(event.target.value));
            }}
          >
            <MenuItem value={1}>Annually</MenuItem>
            <MenuItem value={12}>Monthly</MenuItem>
          </Select>
        </FormControl>

        <Divider />
        <InputNumerical
          label="Interest Rate"
          value={interestRate || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let v = parseFloat(event.target.value);
            setInterestRate(v);
          }}
        />
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel>Interest Rate Frequency</InputLabel>
          <Select
            label="Interest Rate Frequency"
            size="small"
            value={interestRateFrequency.toString()}
            onChange={(event: SelectChangeEvent) => {
              setInterestRateFrequency(parseInt(event.target.value));
            }}
          >
            <MenuItem value={1}>Annually</MenuItem>
            <MenuItem value={2}>Semi-Annually</MenuItem>
            <MenuItem value={4}>Quarterly</MenuItem>
            <MenuItem value={12}>Monthly</MenuItem>
            <MenuItem value={365}>Daily</MenuItem>
          </Select>
        </FormControl>
        <Divider />
        <InputNumerical
          label="Years of Growth"
          value={years || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let v = parseFloat(event.target.value);
            setYears(v);
          }}
        />
      </Box>

      <Chart
        graphic={graphic}
        initialAmount={initialAmount || 0}
        contribution={contribution || 0}
        contributionFrequency={contributionFrequency || 0}
        interestRate={interestRate / 100 || 0}
        interestRateFrequency={interestRateFrequency || 0}
        years={years || 0}
      />
    </PageContainer>
  );
}

function Chart({
  graphic,
  initialAmount,
  contribution,
  contributionFrequency,
  interestRate,
  interestRateFrequency,
  years,
}: {
  graphic: "chart" | "table";
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

  return (
    <div style={{ width: "100%" }}>
      {graphic === "chart" ? (
        <AnnuityChart data={data} interval={contributionFrequency} />
      ) : (
        <AnnuityTable data={data} interval={contributionFrequency} />
      )}
    </div>
  );
}
