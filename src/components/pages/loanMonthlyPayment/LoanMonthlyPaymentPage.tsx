import React from "react";
import PageContainer from "../PageContainer";
import { Box, Divider, Typography } from "@mui/material";
import InputNumerical from "../../shared/InputNumerical";
import { calculateMonthlyPayment } from "../../../utils/loanFormulas";
import USDollar from "../../../utils/USDollar";

export default function LoanMonthlyPaymentPage() {
  const [initialBalance, setInitialBalance] = React.useState<number>(10000);
  const [term, setTerm] = React.useState<number>(60);
  const [interestRate, setInterestRate] = React.useState<number>(5);

  const payment = React.useMemo(
    () =>
      calculateMonthlyPayment({
        P: initialBalance,
        r: (Math.pow(1 + interestRate, 1 / 12) - 1) / 100,
        n: term,
      }),
    [initialBalance, interestRate, term]
  );

  return (
    <PageContainer
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row" },
        gap: 3,
      }}
    >
      <Controls
        initialBalance={initialBalance}
        setInitialBalance={setInitialBalance}
        term={term}
        setTerm={setTerm}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">Monthly Payment:</Typography>
        <Typography fontWeight="bold">{USDollar.format(payment)}</Typography>
      </Box>
    </PageContainer>
  );
}

function Controls({
  initialBalance,
  setInitialBalance,
  term,
  setTerm,
  interestRate,
  setInterestRate,
}: {
  initialBalance: number;
  setInitialBalance: React.Dispatch<React.SetStateAction<number>>;
  term: number;
  setTerm: React.Dispatch<React.SetStateAction<number>>;
  interestRate: number;
  setInterestRate: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: 400 },
        minWidth: { xs: "100%", sm: "100%", md: 400 },
        maxWidth: { xs: "100%", sm: "100%", md: 400 },
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <InputNumerical
        label="Initial Balance"
        value={initialBalance || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let v = parseFloat(event.target.value);
          setInitialBalance(v);
        }}
        inputProps={{ min: 0, step: 1000 }}
      />
      <Divider />
      <Box sx={{ display: "flex", gap: 1 }}>
        <InputNumerical
          label="Term (Months)"
          value={term || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let v = parseFloat(event.target.value);
            setTerm(v);
          }}
          inputProps={{ min: 0, step: 1 }}
        />
        <InputNumerical
          label="Term (Years)"
          value={term / 12 || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let v = parseFloat(event.target.value) * 12;
            setTerm(v);
          }}
          inputProps={{ min: 0, step: 1 }}
        />
      </Box>
      <Divider />
      <InputNumerical
        label="Interest Rate"
        value={interestRate || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let v = parseFloat(event.target.value);
          setInterestRate(v);
        }}
        inputProps={{ min: 0, step: 0.1 }}
      />
    </Box>
  );
}
