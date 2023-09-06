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
  Typography,
} from "@mui/material";

import InputNumerical from "../../shared/InputNumerical";

export default function Controls({
  type,
  setType,
  initialAmount,
  setInitialAmount,
  contribution,
  setContribution,
  contributionFrequency,
  setContributionFrequency,
  contributionPeriods,
  setContributionPeriods,
  interestRate,
  setInterestRate,
  interestRateFrequency,
  setInterestRateFrequency,
}: {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  initialAmount: number;
  setInitialAmount: React.Dispatch<React.SetStateAction<number>>;
  contribution: number;
  setContribution: React.Dispatch<React.SetStateAction<number>>;
  contributionFrequency: number;
  setContributionFrequency: React.Dispatch<React.SetStateAction<number>>;
  contributionPeriods: number;
  setContributionPeriods: React.Dispatch<React.SetStateAction<number>>;
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
      <FormControl>
        <RadioGroup
          value={type}
          onChange={(
            event: React.ChangeEvent<HTMLInputElement>,
            newValue: string | null
          ) => {
            if (newValue !== null) {
              setType(newValue);
            }
          }}
        >
          <FormControlLabel
            value="ordinary"
            control={<Radio />}
            label={
              <span>
                Ordinary{" "}
                <Typography variant="caption" color="text.secondary">
                  Contributions at the end of each period.
                </Typography>
              </span>
            }
          />
          <FormControlLabel
            value="due"
            control={<Radio />}
            label={
              <span>
                Due{" "}
                <Typography variant="caption" color="text.secondary">
                  Contributions at the beginning of each period.
                </Typography>
              </span>
            }
          />
        </RadioGroup>
      </FormControl>
      <Divider />
      <InputNumerical
        label="Initial Deposit"
        value={initialAmount || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let v = parseFloat(event.target.value);
          setInitialAmount(v);
        }}
        inputProps={{ min: 0, step: 1000 }}
      />
      <Divider />
      <Box sx={{ display: "flex", gap: 1 }}>
        <InputNumerical
          label="Contribution"
          value={contribution || ""}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let v = parseFloat(event.target.value);
            setContribution(v);
          }}
          inputProps={{ min: 0, step: 100 }}
        />
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel>Frequency</InputLabel>
          <Select
            label="Frequency"
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
      </Box>
      <InputNumerical
        label="Number of Contributions"
        value={contributionPeriods || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let v = parseFloat(event.target.value);
          setContributionPeriods(v);
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
