import { useFileList } from "../../hooks/useFileList.hook";
import { AttachedFile } from "../../types";

import { FileListContainer } from "./FileList.styled";
import { FileListItem } from "./FileListItem.component";
import { ImagePreview } from "./ImagePreview.component";

interface FileListProps {
  files: AttachedFile[];
  onUpdateFile: (fileId: string, isDeleted: boolean) => void;
}

export const FileList = ({ files, onUpdateFile }: FileListProps) => {
  const {
    selectedImage,
    handleDelete,
    handleDownload,
    formatFileSize,
    setSelectedImage,
  } = useFileList({ files, onUpdateFile });

  return (
    <>
      <FileListContainer>
        {files.map((file) => (
          <FileListItem
            key={file.id}
            file={file}
            onDelete={handleDelete}
            onDownload={handleDownload}
            onPreview={setSelectedImage}
            formatFileSize={formatFileSize}
          />
        ))}
      </FileListContainer>

      <ImagePreview
        selectedImage={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </>
  );
};
