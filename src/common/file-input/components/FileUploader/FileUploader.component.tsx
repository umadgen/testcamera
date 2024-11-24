import { useState } from "react";
import { AttachedFile } from "../../types";
import { CameraCapture } from "../CameraCapture/CameraCapture.component";
import { FileUploadButton } from "../FileUploadButton/FileUploadButton.component";
import { FileList } from "../FileList/FileList.component";

const FileUploader = () => {
  const [files, setFiles] = useState<AttachedFile[]>([]);

  const handlePhotoSave = (newFile: AttachedFile) => {
    console.log("Photo saved:", newFile);
    setFiles((prev) => [...prev, newFile]);
  };

  const handleUpdateFile = (fileId: string, isDeleted: boolean) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === fileId ? { ...file, isDeleted } : file))
    );
  };
  const handleFilesSelected = (newFiles: AttachedFile[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
  };

  return (
    <div>
      <CameraCapture onSave={handlePhotoSave} />
      <FileUploadButton onFilesSelected={handleFilesSelected} />
      <FileList files={files} onUpdateFile={handleUpdateFile} />
    </div>
  );
};

export default FileUploader;
