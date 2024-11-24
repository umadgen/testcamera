import { useState } from "react";
import { AttachedFile } from "../types";

interface UseFileListParams {
  files: AttachedFile[];
  onUpdateFile: (fileId: string, isDeleted: boolean) => void;
}

export const useFileList = ({ files, onUpdateFile }: UseFileListParams) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    const file = files.find((f) => f.id === id);
    if (file) {
      onUpdateFile(id, !file.isDeleted);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleDownload = (file: AttachedFile) => {
    if (file.type.startsWith("image/")) {
      const link = document.createElement("a");
      link.href = file.url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const url = window.URL.createObjectURL(file.file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  return {
    selectedImage,
    setSelectedImage,
    handleDelete,
    handleDownload,
    formatFileSize,
  };
};
