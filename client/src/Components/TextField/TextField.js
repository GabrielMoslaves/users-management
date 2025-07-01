import { TextField as TextFieldMaterial } from "@mui/material";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";

export default function TextField({
  autoComplete,
  error,
  helperText,
  id,
  label,
  minRows,
  onChange,
  placeholder,
  required,
  value,
  type,
  labelVariant,
  size = "large",
  inputProps,
}) {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        <Typography weight="bold" variant={labelVariant}>
          {label}
          {required && "*"}
        </Typography>
      </label>

      <TextFieldMaterial
        {...inputProps}
        size={size}
        type={type}
        fullWidth
        autoComplete={autoComplete}
        classes={{ root: styles.textFieldRoot }}
        error={error}
        helperText={helperText}
        id={id}
        minRows={minRows}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        variant="outlined"
      />
    </div>
  );
}
