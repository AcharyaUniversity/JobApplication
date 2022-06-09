import { Dispatch, SetStateAction } from "react";
import { Theme, Autocomplete, TextField } from "@mui/material";
import { IFormState } from "../../states/FormState";
import { makeStyles } from "@mui/styles";

interface Props {
  label: string;
  options: { id: number; name: string }[];
  value: string;
  setValue: Dispatch<SetStateAction<{ id: number; name: string }>>;
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

function CustomAutocomplete({
  label,
  options,
  value,
  setValue,
  error,
  required = false,
  disabled = false,
}: Props) {
  const classes = useStyles();

  const handleChange = (e: any, val: string) => {
    options.forEach((obj) => {
      if (obj.name === val) setValue(obj);
      return;
    });
  };

  return (
    <>
      <Autocomplete
        size="small"
        disableClearable
        options={options.map((obj) => obj.name)}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            error={!!error && !!required}
            required={required}
            label={label}
          />
        )}
      />
      {error && required && <p className={classes.errorText}>{error}</p>}
    </>
  );
}

export default CustomAutocomplete;
