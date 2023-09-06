import React from "react";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import InputNumerical from "../../shared/InputNumerical";

export default function Controls({
  view,
  setView,
  initialBalance,
  setInitialBalance,
  payment,
  setPayment,
  paymentFrequency,
  setPaymentFrequency,
  paymentPeriods,
  setPaymentPeriods,
  interestRate,
  setInterestRate,
  interestRateFrequency,
  setInterestRateFrequency,
}: {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  initialBalance: number;
  setInitialBalance: React.Dispatch<React.SetStateAction<number>>;
  payment: number;
  setPayment: React.Dispatch<React.SetStateAction<number>>;
  paymentFrequency: number;
  setPaymentFrequency: React.Dispatch<React.SetStateAction<number>>;
  paymentPeriods: number;
  setPaymentPeriods: React.Dispatch<React.SetStateAction<number>>;
  interestRate: number;
  setInterestRate: React.Dispatch<React.SetStateAction<number>>;
  interestRateFrequency: number;
  setInterestRateFrequency: React.Dispatch<React.SetStateAction<number>>;
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
      <ToggleButtonGroup
        value={view}
        size="small"
        exclusive
        onChange={(
          event: React.MouseEvent<HTMLElement>,
          newValue: string | null
        ) => {
          if (newValue !== null) {
            setView(newValue);
          }
        }}
        sx={{ width: "100%" }}
      >
        <ToggleButton value="chart">chart</ToggleButton>
        <ToggleButton value="table">table</ToggleButton>
      </ToggleButtonGroup>
      <Divider />
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
          label="Payment"
          value={payment || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let v = parseFloat(event.target.value);
            setPayment(v);
          }}
          inputProps={{ min: 0, step: 100 }}
        />
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel>Frequency</InputLabel>
          <Select
            label="Frequency"
            size="small"
            value={paymentFrequency.toString()}
            onChange={(event: SelectChangeEvent) => {
              setPaymentFrequency(parseInt(event.target.value));
            }}
          >
            <MenuItem value={1}>Annually</MenuItem>
            <MenuItem value={12}>Monthly</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <InputNumerical
        label="Number of Payments"
        value={paymentPeriods || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let v = parseFloat(event.target.value);
          setPaymentPeriods(v);
        }}
        inputProps={{ min: 0, step: 1 }}
      />

      <Divider />
      <Box sx={{ display: "flex", gap: 1 }}>
        <InputNumerical
          label="Interest Rate"
          value={interestRate || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let v = parseFloat(event.target.value);
            setInterestRate(v);
          }}
          inputProps={{ min: 0, step: 1 }}
        />
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel>Frequency</InputLabel>
          <Select
            label="Frequency"
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
      </Box>
    </Box>
  );
}
