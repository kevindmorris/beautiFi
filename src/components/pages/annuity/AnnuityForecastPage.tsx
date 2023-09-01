import React from "react";
import PageContainer from "../PageContainer";
import { useTheme } from "@mui/material";
import AnnuityForecastControls from "./AnnuityForecastControls";
import AnnuityForecastDataDisplay from "./AnnuityForecastDataDisplay";

export default function AnnuityForecastPage() {
  const theme = useTheme();

  const [type, setType] = React.useState<"chart" | "table">("chart");
  const handleType = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "chart" | "table" | null
  ) => {
    if (newValue !== null) {
      setType(newValue);
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
      <AnnuityForecastControls
        type={type}
        handleType={handleType}
        initialAmount={initialAmount}
        setInitialAmount={setInitialAmount}
        contribution={contribution}
        setContribution={setContribution}
        contributionFrequency={contributionFrequency}
        setContributionFrequency={setContributionFrequency}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        interestRateFrequency={interestRateFrequency}
        setInterestRateFrequency={setInterestRateFrequency}
        years={years}
        setYears={setYears}
      />
      <AnnuityForecastDataDisplay
        type={type}
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
