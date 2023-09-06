import React from "react";

import PageContainer from "../PageContainer";
import Controls from "./Controls";
import DataDisplay from "./DataDisplay";

export default function LoanForecasterPage() {
  const [view, setView] = React.useState<string>("chart");
  const [initialBalance, setInitialBalance] = React.useState<number>(1000);
  const [payment, setPayment] = React.useState<number>(100);
  const [paymentFrequency, setPaymentFrequency] =
    React.useState<number>(12);
  const [paymentPeriods, setPaymentPeriods] =
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
        initialBalance={initialBalance}
        setInitialBalance={setInitialBalance}
        payment={payment}
        setPayment={setPayment}
        paymentFrequency={paymentFrequency}
        setPaymentFrequency={setPaymentFrequency}
        paymentPeriods={paymentPeriods}
        setPaymentPeriods={setPaymentPeriods}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
        interestRateFrequency={interestRateFrequency}
        setInterestRateFrequency={setInterestRateFrequency}
      />
      <DataDisplay
        view={view}
        initialBalance={initialBalance || 0}
        payment={payment || 0}
        paymentFrequency={paymentFrequency || 0}
        interestRate={interestRate / 100 || 0}
        interestRateFrequency={interestRateFrequency || 0}
        paymentPeriods={paymentPeriods || 0}
      />
    </PageContainer>
  );
}
