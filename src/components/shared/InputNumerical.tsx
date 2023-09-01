import { TextField, TextFieldProps } from "@mui/material";

const InputNumerical = (props: TextFieldProps) => (
  <TextField
    {...props}
    spellCheck={false}
    autoComplete="off"
    type="number"
    size="small"
    fullWidth
    inputProps={props.inputProps}
    sx={{ my: 1 }}
  />
);

export default InputNumerical;
