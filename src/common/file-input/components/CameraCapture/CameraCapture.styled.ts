import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FullScreenDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    margin: 0,
    maxHeight: "100vh",
    maxWidth: "100vw",
    width: "100%",
    height: "100%",
    borderRadius: 0,
    backgroundColor: "black",
  },
});

export const CameraContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
});

export const VideoContainer = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  backgroundColor: "black",
});

export const ActionButtons = styled("div")({
  position: "absolute",
  bottom: "20px",
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  zIndex: 1000,
});

export const PreviewImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
});
