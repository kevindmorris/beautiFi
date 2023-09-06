import React from "react";

import PageContainer from "../PageContainer";
import Controls from "./Controls";
import DataDisplay from "./DataDisplay";

export default function AnnuityForecasterPage() {
  const [view, setView] = React.useState<string>("chart");
  const [type, setType] = React.useState<string>("ordinary");
  const [initialAmount, setInitialAmount] = React.useState<number>(1000);
  const [contribution, setContribution] = React.useState<number>(100);
  const [contributionFrequency, setContributionFrequency] =
    React.useState<number>(12);
  const [contributionPeriods, setContributionPeriods] =
    React.useState<number>(12);
  const [interestRate, setInterestRate] = React.useState<number>(10);
  const [interestRateFrequency, setInterestRateFrequency] =
    React.useState<number>(1);

  return (
    <PageContainer
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        gap: 3,
      }}
    >
      <Controls
        view={view}
        setView={setView}
        type={type}
        setType={setType}
        initialAmount={initialAmount}
        setInitialAmount={setInitialAmount}
        contribution={contribution}
        setContribution={setContribution}
        contributionFrequency={contributionFrequency}
        setContributionFrequency={setContributionFrequency}
        contributionPeriods={contributionPeriods}
        setContributionPeriods={setContributionPeriods}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        interestRateFrequency={interestRateFrequency}
        setInterestRateFrequency={setInterestRateFrequency}
      />
      <DataDisplay
        view={view}
        type={type}
        initialAmount={initialAmount || 0}
        contribution={contribution || 0}
        contributionFrequency={contributionFrequency || 0}
        interestRate={interestRate / 100 || 0}
        interestRateFrequency={interestRateFrequency || 0}
        contributionPeriods={contributionPeriods || 0}
      />
    </PageContainer>
  );
}
