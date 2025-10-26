import Styles from "./inputForm.module.css";
import { useState } from "react";
import { icons, type IconName } from "../../utils/icons";

interface InputFormProps {
    type: string;
    placeholder: string;
    icon: IconName; // Ahora TypeScript te sugerirá los iconos disponibles
    varian?: number;
}

const InputForm = ({type, placeholder, icon}: InputFormProps) => {
    const IconComponent = icons[icon];
    const [isFocused, setIsFocused] = useState(false);
    
    return (
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
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    );
};

export default InputForm;