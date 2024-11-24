import { Button } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";

import { FullScreenDialog, CameraContainer } from "./CameraCapture.styled";
import { CameraContent } from "../CameraContent/CameraContent.component";
import { AttachedFile } from "../../types";
import { useCamera } from "../../hooks/useCamera.hook";

export interface CameraCaptureProps {
  onSave: (newFile: AttachedFile) => void;
}

export const CameraCapture = ({ onSave }: CameraCaptureProps) => {
  const {
    isOpen,
    capturedImage,
    hasPermission,
    error,
    isLoading,
    webcamRef,
    handleCapture,
    handleClose,
    handleSave,
    setIsOpen,
  } = useCamera({ onSave });

  return (
    <>
      <Button
        variant="contained"
        startIcon={<CameraAlt />}
        onClick={() => setIsOpen(true)}
        sx={{ margin: "16px" }}
      >
        Prendre une photo
      </Button>

      <FullScreenDialog
        open={isOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: error ? "white" : "black",
          },
        }}
      >
        <CameraContainer>
          <CameraContent
            isLoading={isLoading}
            error={error}
            hasPermission={hasPermission}
            capturedImage={capturedImage}
            webcamRef={webcamRef}
            onCapture={handleCapture}
            onClose={handleClose}
            onSave={handleSave}
          />
        </CameraContainer>
      </FullScreenDialog>
    </>
  );
};
