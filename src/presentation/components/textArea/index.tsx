import Styles from "./textArea.module.css";
import { useRef, useState } from "react";
import { icons, type IconName } from "../../utils/icons";

interface TextAreaProps {
  rows: number;
  placeholder: string;
  icon: IconName;
}

const TextArea = ({ rows, placeholder, icon }: TextAreaProps) => {
  const IconComponent = icons[icon];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (textarea.scrollHeight > textarea.clientHeight) {
      return;
    }
    
    setValue(e.target.value);
  };

  return (
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
  );
};

export default TextArea;