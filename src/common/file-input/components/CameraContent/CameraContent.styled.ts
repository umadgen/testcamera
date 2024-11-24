import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoadingContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const ErrorContainer = styled("div")(({ theme }) => ({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  textAlign: "center",

  "& .error-icon": {
    fontSize: "60px",
    marginBottom: "16px",
    color: theme.palette.error.main,
  },

  "& .error-alert": {
    marginBottom: "16px",
  },
}));

export const CameraControlsContainer = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "16px",
  background: "linear-gradient(transparent, rgba(0, 0, 0, 0.5))",
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  zIndex: 2,
});

export const CameraButton = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.8)",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});

export const WebcamContainer = styled("div")({
  width: "100%",
  height: "100%",

  "& video": {
    width: "100%",
    objectFit: "contain",
  },
});
