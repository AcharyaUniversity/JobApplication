import {
  Select,
  FormControl,
  MenuItem,
  Box,
  InputLabel,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  name: string;
  label: string;
  value: any;
  items: {
    value: any;
    label: string;
  }[];
  handleChange: (e: any) => void;
  firstDisabled?: boolean;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  errorText: {
    fontSize: 12,
    margin: "2px 10px",
    color: theme.palette.error.main,
  },
}));

function CustomSelect({
  name,
  label,
  value,
  items,
  handleChange,
  firstDisabled = false,
  error,
  required = false,
  disabled = false,
}: Props) {
  const classes = useStyles();

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size="small" required={required} error={!!error} fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          disabled={disabled}
          size="small"
          name={name}
          value={value}
          label={label}
          onChange={handleChange}
          MenuProps={{
            style: {
              maxHeight: 300,
            },
          }}
        >
          {items.map((obj, index) => {
            if (index === 0 && firstDisabled)
              return (
                <MenuItem disabled key={index} value={obj.value}>
                  {obj.label}
                </MenuItem>
              );
            return (
              <MenuItem key={index} value={obj.value}>
                {obj.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {error && <p className={classes.errorText}>{error}</p>}
    </Box>
  );
}

export default CustomSelect;
