import Styles from "./inputForm.module.css";
import { useState } from "react";
import { icons, type IconName } from "../../utils/icons";

interface InputFormProps {
  type: string;
  placeholder: string;
  icon: IconName;
  variant?: number;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const InputForm = ({
  type,
  placeholder,
  icon,
  variant = 1,
  label,
  required,
  value: externalValue,
  onChange: externalOnChange,
}: InputFormProps) => {
  const IconComponent = icons[icon];
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (isControlled && externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className={`${Styles.inputFormContainer} ${Styles[`variant${variant}`] || ''}`}>
      {label && (
        <label className={Styles.label}>
          {label}
          {required && <span className={Styles.required}>*</span>}
        </label>
      )}
      <div className={Styles.inputForm}>
        <div className={Styles.icon}>
          <IconComponent
            color={isFocused ? "#0284c7" : "#64748b"}
            size={20}
            strokeWidth={2}
          />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default InputForm;