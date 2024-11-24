import { FC } from "react";
import { Upload } from "lucide-react";
import { useFileUpload } from "../../hooks/useFileUpload.hook";
import { ACCEPTED_FILE_TYPES } from "../../utils/file-upload.utils";
import { AttachedFile } from "../../types";
import { UploadButton } from "./FileUploadButton.styled";

export interface FileUploadButtonProps {
  onFilesSelected: (newFiles: AttachedFile[]) => void;
  accept?: string;
}

export const FileUploadButton: FC<FileUploadButtonProps> = ({
  onFilesSelected,
  accept = ACCEPTED_FILE_TYPES,
}) => {
  const { fileInputRef, handleFileSelection } = useFileUpload({
    onFilesSelected,
  });

  return (
    <UploadButton variant="contained" startIcon={<Upload />} component="label">
      Ajouter des fichiers
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelection}
        accept={accept}
      />
    </UploadButton>
  );
};
