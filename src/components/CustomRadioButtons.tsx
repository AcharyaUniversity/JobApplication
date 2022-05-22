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
  options: {
    value: string;
    label: string;
  }[];
  handleChange: (e: any) => void;
  [x: string]: any;
}

function CustomRadioButtons({
  name,
  label,
  options,
  handleChange,
  ...props
}: Props) {
  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row onChange={handleChange} name={name}>
        {options.map((obj, index) => (
          <FormControlLabel
            key={index}
            value={obj.value}
            control={<Radio />}
            label={obj.label}
          />
        ))}
        {/* <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="female" control={<Radio />} label="Female" /> */}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioButtons;
