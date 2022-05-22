import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface Props {
  value: Date | null;
  handleChange: (
    value: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
  [x: string]: any;
}

function CustomDatePicker({ value, handleChange, ...props }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        inputFormat="dd/MM/yyyy"
        onChange={handleChange}
        renderInput={(params) => (
          <TextField fullWidth helperText="dd/mm/yyyy" {...params} />
        )}
        {...props}
      />
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
