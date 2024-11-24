import { Box } from "@mui/material";
import { PreviewModal } from "./FileList.styled";

interface ImagePreviewProps {
  selectedImage: string | null;
  onClose: () => void;
}

export const ImagePreview = ({ selectedImage, onClose }: ImagePreviewProps) => {
  if (!selectedImage) return null;

  return (
    <PreviewModal open={!!selectedImage} onClose={onClose}>
      <Box onClick={onClose}>
        <img src={selectedImage} alt="Preview" />
      </Box>
    </PreviewModal>
  );
};
