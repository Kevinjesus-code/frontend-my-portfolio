import Styles from "./textArea.module.css";
import { useRef, useState } from "react";
import { icons, type IconName } from "../../utils/icons";

interface TextAreaProps {
  rows: number;
  placeholder: string;
  icon: IconName;
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const TextArea = ({
  rows,
  placeholder,
  icon,
  label,
  required,
  value: externalValue,
  onChange: externalOnChange,
}: TextAreaProps) => {
  const IconComponent = icons[icon];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Determinar si el componente es controlado o no controlado
  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Solo verificar scroll si NO es controlado
    if (!isControlled && textarea.scrollHeight > textarea.clientHeight) {
      return;
    }

    const newValue = e.target.value;

    if (isControlled && externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className={Styles.textAreaContainer}>
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
        <textarea
          ref={textareaRef}
          rows={rows}
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

export default TextArea;
