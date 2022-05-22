import { Select, FormControl, MenuItem, Box, InputLabel } from "@mui/material";

interface Props {
  name: string;
  label: string;
  value: string;
  items: {
    value: string;
    label: string;
  }[];
  handleChange: (e: any) => void;
}

function CustomSelect({ name, label, value, items, handleChange }: Props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select name={name} value={value} label={label} onChange={handleChange}>
          {items.map((obj, index) => (
            <MenuItem key={index} value={obj.value}>
              {obj.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default CustomSelect;
