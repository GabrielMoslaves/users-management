import { TextField as TextFieldMaterial } from "@mui/material";
import InputMask from "react-input-mask";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";

export default function TextFieldPhone({
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
}) {
  return (
    <div className={styles.container}>
      <label htmlFor={id}>
        <Typography weight="bold" variant={labelVariant}>
          {label}
          {required && "*"}
        </Typography>
      </label>

      <InputMask
        mask="(99) 99999-9999"
        onChange={onChange}
        value={value}
        alwaysShowMask={true}
      >
        {(inputProps) => (
          <TextFieldMaterial
            {...inputProps}
            data-testid="textbox phone"
            size={size}
            type={type}
            fullWidth
            autoComplete={autoComplete}
            classes={{ root: styles.textFieldRoot }}
            error={error}
            helperText={helperText}
            id={id}
            minRows={minRows}
            placeholder={placeholder}
            variant="outlined"
          />
        )}
      </InputMask>
    </div>
  );
}
