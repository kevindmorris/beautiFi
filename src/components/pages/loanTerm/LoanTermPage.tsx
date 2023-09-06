import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import PageContainer from "../PageContainer";
import InputNumerical from "../../shared/InputNumerical";
import { calculateLoanTerm } from "../../../utils/loanFormulas";

export default function LoanTermPage() {
  const [initialBalance, setInitialBalance] = React.useState<number>(10000);
  const [payment, setPayment] = React.useState<number>(100);
  const [interestRate, setInterestRate] = React.useState<number>(5);

  const n = React.useMemo(
    () =>
      calculateLoanTerm({
        P: initialBalance,
        PMT: payment,
        r: (Math.pow(1 + interestRate, 1 / 12) - 1) / 100,
      }),
    [initialBalance, interestRate, payment]
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
        payment={payment}
        setPayment={setPayment}
        interestRate={interestRate}
        setInterestRate={setInterestRate}
      />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">Loan Term:</Typography>
        <Typography fontWeight="bold">{n.toFixed(3)} Months.</Typography>
        <Typography fontWeight="bold">{(n / 12).toFixed(3)} Years.</Typography>
      </Box>
    </PageContainer>
  );
}

function Controls({
  initialBalance,
  setInitialBalance,
  payment,
  setPayment,
  interestRate,
  setInterestRate,
}: {
  initialBalance: number;
  setInitialBalance: React.Dispatch<React.SetStateAction<number>>;
  payment: number;
  setPayment: React.Dispatch<React.SetStateAction<number>>;
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
      <InputNumerical
        label="Monthly Payment"
        value={payment || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let v = parseFloat(event.target.value);
          setPayment(v);
        }}
        inputProps={{ min: 0, step: 10 }}
      />
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
