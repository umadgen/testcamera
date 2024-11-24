import { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { AttachedFile } from "../types";
import { base64ToFile } from "../utils/file-upload.utils";

interface CameraState {
  isOpen: boolean;
  capturedImage: string | null;
  hasPermission: boolean | null;
  error: string | null;
  isLoading: boolean;
}

interface Props {
  onSave: (newFile: AttachedFile) => void;
}
export const useCamera = ({ onSave }: Props) => {
  const [state, setState] = useState<CameraState>({
    isOpen: false,
    capturedImage: null,
    hasPermission: null,
    error: null,
    isLoading: false,
  });
  const webcamRef = useRef<Webcam>(null);

  const setIsOpen = (isOpen: boolean) => {
    setState((prev) => ({ ...prev, isOpen }));
  };

  const handleClose = () => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
      capturedImage: null,
      error: null,
      hasPermission: null,
    }));
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setState((prev) => ({ ...prev, capturedImage: imageSrc }));
    } else {
      setState((prev) => ({
        ...prev,
        error: "Erreur lors de la capture. Veuillez réessayer.",
      }));
    }
  };

  const handleSave = () => {
    if (state.capturedImage) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `Photo_${timestamp}.jpg`;

      const newFile = {
        id: `photo-${Date.now()}`,
        name: filename,
        size: Math.round(state.capturedImage.length * 0.75),
        type: "image/jpeg",
        url: state.capturedImage,
        file: base64ToFile(state.capturedImage, filename),
      };

      onSave(newFile);
      handleClose();
    }
  };

  const handleCameraError = (err: Error) => {
    console.error("Camera error:", err);

    const errorMessages = {
      NotAllowedError:
        "Accès à la caméra refusé. Veuillez autoriser l'accès dans les paramètres de votre navigateur.",
      NotFoundError: "Aucune caméra détectée sur votre appareil.",
      OverconstrainedError:
        "Votre caméra ne supporte pas les contraintes demandées.",
      default: "Erreur lors de l'accès à la caméra. Veuillez réessayer.",
    };

    setState((prev) => ({
      ...prev,
      hasPermission: false,
      error:
        errorMessages[err.name as keyof typeof errorMessages] ||
        errorMessages.default,
    }));
  };

  useEffect(() => {
    if (!state.isOpen) return;

    const initCamera = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));

      try {
        // try to access camera with ideal constraints
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
          },
        });
        setState((prev) => ({ ...prev, hasPermission: true, error: null }));
      } catch {
        // else try to access camera with default constraints
        try {
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "environment",
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
          });
          setState((prev) => ({ ...prev, hasPermission: true, error: null }));
        } catch (err) {
          handleCameraError(err as Error);
        }
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initCamera();
  }, [state.isOpen]);

  return {
    isOpen: state.isOpen,
    capturedImage: state.capturedImage,
    hasPermission: state.hasPermission,
    error: state.error,
    isLoading: state.isLoading,
    webcamRef,

    setIsOpen,
    handleClose,
    handleCapture,
    handleSave,
  };
};
