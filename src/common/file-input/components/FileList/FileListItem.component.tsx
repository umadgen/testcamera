import { FC } from "react";
import {
  CardMedia,
  CardContent,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Folder, RotateCcw } from "lucide-react";
import { AttachedFile } from "../../types";
import {
  FileCard,
  FileName,
  FilePreview,
  StyledListItem,
} from "./FileList.styled";

interface FileListItemProps {
  file: AttachedFile;
  onDelete: (id: string) => void;
  onDownload: (file: AttachedFile) => void;
  onPreview: (url: string) => void;
  formatFileSize: (size: number) => string;
}

export const FileListItem: FC<FileListItemProps> = ({
  file,
  onDelete,
  onDownload,
  onPreview,
  formatFileSize,
}) => {
  return (
    <StyledListItem>
      <FileCard isDeleted={file.isDeleted}>
        {file.type.startsWith("image/") ? (
          <CardMedia
            component="img"
            height="140"
            image={file.url}
            alt={file.name}
            sx={{ cursor: "pointer", maxWidth: "60px" }}
            onClick={() => onPreview(file.url)}
          />
        ) : (
          <FilePreview onClick={() => onDownload(file)}>
            <Folder size={40} />
          </FilePreview>
        )}
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "16px",
            height: "100%",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box>
            <FileName
              variant="body1"
              sx={{
                textDecoration: file.isDeleted ? "line-through" : "none",
              }}
            >
              {file.name}
            </FileName>
            <Typography variant="body2" color="text.secondary">
              {formatFileSize(file.size)}
            </Typography>
          </Box>
          <IconButton
            onClick={() => onDelete(file.id)}
            sx={{
              color: file.isDeleted ? "red" : "default",
            }}
          >
            {file.isDeleted ? <RotateCcw /> : <Delete />}
          </IconButton>
        </CardContent>
      </FileCard>
    </StyledListItem>
  );
};
