import Styles from "./fileUpload.module.css";
import { icons } from "../../utils/icons";

interface FileUploadProps {
  label?: string;
  optional?: boolean;
  maxSize?: string;
  onFileSelect: (file: File | null) => void;
}

const FileUpload = ({
  label,
  optional,
  maxSize = "5MB",
  onFileSelect,
}: FileUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileSelect(file);
  };
  const Download = icons.Download;

  return (
    <div className={Styles.fileUploadContainer}>
      {label && (
        <label className={Styles.label}>
          {label}
          {optional && <span className={Styles.optional}>(optional)</span>}
        </label>
      )}
      <label className={Styles.fileUploadBox}>
        <input
          type="file"
          className={Styles.fileInput}
          onChange={handleFileChange}
          accept="image/*"
        />
        <Download size={20} />
        <span>Choose Profile Photo</span>
      </label>
      <p className={Styles.maxSize}>Max file size: {maxSize}</p>
    </div>
  );
};

export default FileUpload;
