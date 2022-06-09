import { TextField, Theme } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { makeStyles } from "@mui/styles";

interface Props {
  value: Date | null;
  handleChange: (
    value: Date | null,
    keyboardInputValue?: string | undefined
  ) => void;
  error?: string;
  [x: string]: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  errorText: {
    fontSize: 12,
    margin: "2px 10px",
    color: theme.palette.error.main,
  },
}));

function CustomDatePicker({ value, handleChange, error, ...props }: Props) {
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        value={value}
        inputFormat="dd/MM/yyyy"
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            required
            size="small"
            fullWidth
            helperText="dd/mm/yyyy"
            sx={{ outline: "1px solid red" }}
            {...params}
          />
        )}
        {...props}
      />
      {error && <p className={classes.errorText}>{error}</p>}
    </LocalizationProvider>
  );
}

export default CustomDatePicker;
