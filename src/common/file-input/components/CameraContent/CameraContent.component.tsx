import Webcam from "react-webcam";
import { Alert, Button, CircularProgress } from "@mui/material";
import { Close, Check, CameraAlt } from "@mui/icons-material";
import { CameraOff } from "lucide-react";
import {
  VideoContainer,
  PreviewImage,
  ActionButtons,
} from "../CameraCapture/CameraCapture.styled";
import {
  LoadingContainer,
  ErrorContainer,
  WebcamContainer,
  CameraControlsContainer,
  CameraButton,
} from "./CameraContent.styled";

interface CameraContentProps {
  isLoading: boolean;
  error: string | null;
  hasPermission: boolean | null;
  capturedImage: string | null;
  webcamRef: React.RefObject<Webcam>;
  onCapture: () => void;
  onClose: () => void;
  onSave: () => void;
}

export const CameraContent = ({
  isLoading,
  error,
  hasPermission,
  capturedImage,
  webcamRef,
  onCapture,
  onClose,
  onSave,
}: CameraContentProps) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress />
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <ErrorContainer>
        <CameraOff className="error-icon" />
        <Alert severity="error" className="error-alert">
          {error}
        </Alert>
        <Button variant="outlined" onClick={onClose}>
          Fermer
        </Button>
      </ErrorContainer>
    );
  }

  if (!capturedImage && hasPermission) {
    return (
      <>
        <VideoContainer>
          <WebcamContainer>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              onUserMediaError={(err) => {
                console.error("Erreur Webcam:", err);
              }}
            />
          </WebcamContainer>
        </VideoContainer>
        <CameraControlsContainer>
          <CameraButton onClick={onClose}>
            <Close />
          </CameraButton>
          <CameraButton onClick={onCapture}>
            <CameraAlt />
          </CameraButton>
        </CameraControlsContainer>
      </>
    );
  }

  if (capturedImage) {
    return (
      <>
        <PreviewImage src={capturedImage} />
        <ActionButtons>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Close />}
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<Check />}
            onClick={onSave}
          >
            Valider
          </Button>
        </ActionButtons>
      </>
    );
  }

  return null;
};
