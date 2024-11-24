import { useRef, useCallback } from "react";
import { AttachedFile } from "../types";
import {
  createFileUrl,
  generateFileId,
  readFileAsDataUrl,
} from "../utils/file-upload.utils";

interface UseFileUploadProps {
  onFilesSelected: (files: AttachedFile[]) => void;
}

export const useFileUpload = ({ onFilesSelected }: UseFileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File): Promise<AttachedFile> => {
    const fileContent = await readFileAsDataUrl(file);

    return {
      id: generateFileId(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: createFileUrl(file, fileContent),
      file,
    };
  };

  const handleFileSelection = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const selectedFiles = Array.from(event.target.files || []);
        const newFiles = await Promise.all(selectedFiles.map(processFile));
        onFilesSelected(newFiles);
      } catch (error) {
        console.error("Error processing files:", error);
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [onFilesSelected]
  );

  return {
    fileInputRef,
    handleFileSelection,
  };
};
