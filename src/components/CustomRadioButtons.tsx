import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

interface Props {
  name: string;
  label: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  handleChange: (e: any) => void;
}

function CustomRadioButtons({
  name,
  label,
  value,
  options,
  handleChange,
}: Props) {
  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row value={value} onChange={handleChange} name={name}>
        {options.map((obj, index) => (
          <FormControlLabel
            key={index}
            value={obj.value}
            control={<Radio />}
            label={obj.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioButtons;
