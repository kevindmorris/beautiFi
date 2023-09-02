import React from "react";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import InputNumerical from "../../shared/InputNumerical";

export default function AnnuityValuesControls({
  type,
  handleType,
  initialAmount,
  setInitialAmount,
  contribution,
  setContribution,
  contributionFrequency,
  setContributionFrequency,
  interestRate,
  setInterestRate,
  interestRateFrequency,
  setInterestRateFrequency,
  years,
  setYears,
}: {
  type: string;
  handleType: (
    event: React.ChangeEvent<HTMLInputElement>,
    newValue: string | null
  ) => void;
  initialAmount: number;
  setInitialAmount: React.Dispatch<React.SetStateAction<number>>;
  contribution: number;
  setContribution: React.Dispatch<React.SetStateAction<number>>;
  contributionFrequency: number;
  setContributionFrequency: React.Dispatch<React.SetStateAction<number>>;
  interestRate: number;
  setInterestRate: React.Dispatch<React.SetStateAction<number>>;
  interestRateFrequency: number;
  setInterestRateFrequency: React.Dispatch<React.SetStateAction<number>>;
  years: number;
  setYears: React.Dispatch<React.SetStateAction<number>>;
}) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "100%", md: 400 },
        minWidth: { xs: "100%", sm: "100%", md: 400 },
        maxWidth: { xs: "100%", sm: "100%", md: 400 },
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(1),
      }}
    >
      <FormControl>
        <RadioGroup value={type} onChange={handleType}>
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
        label="Initial Amount"
        value={initialAmount || ""}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          let v = parseFloat(event.target.value);
          setInitialAmount(v);
        }}
        inputProps={{ min: 0, step: 1000 }}
      />
      <Divider />
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
        inputProps={{ min: 0, step: 1 }}
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
        inputProps={{ min: 0, step: 1 }}
      />
    </Box>
  );
}
