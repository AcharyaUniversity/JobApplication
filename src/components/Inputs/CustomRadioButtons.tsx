import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

interface Props {
  name: string;
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  handleChange: (e: any) => void;
  error?: string;
  required?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  errorText: {
    fontSize: 12,
    margin: "2px 10px",
    color: theme.palette.error.main,
  },
}));

function CustomRadioButtons({
  name,
  label,
  value,
  options,
  handleChange,
  error,
  required = false,
}: Props) {
  const classes = useStyles();

  return (
    <FormControl error={!!error} fullWidth required={required}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row value={value} onChange={handleChange} name={name}>
        {options.map((obj, index) => (
          <FormControlLabel
            key={index}
            value={obj.value}
            control={
              <Radio
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 19,
                  },
                }}
              />
            }
            label={obj.label}
          />
        ))}
      </RadioGroup>
      {error && <p className={classes.errorText}>{error}</p>}
    </FormControl>
  );
}

export default CustomRadioButtons;
