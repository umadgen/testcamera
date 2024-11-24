import { List, Card, Typography, ListItem, Modal } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FileListContainer = styled(List)({
  padding: "16px",
  gap: "16px",
  display: "flex",
  flexDirection: "column",
});

export const FileCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== "isDeleted",
})<{ isDeleted?: boolean }>(({ isDeleted }) => ({
  opacity: isDeleted ? 0.8 : 1,
  maxWidth: "400px",
  width: "400px",
  transition: "opacity 0.3s ease",
  display: "flex",
  height: "50px",
  padding: "0px 4px",
  backgroundColor: isDeleted ? "rgb(253, 237, 237) !important" : "inherit",
}));

export const FileName = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "200px",
});

export const StyledListItem = styled(ListItem)({
  padding: 0,
});

export const FilePreview = styled("div")({
  minWidth: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
});

export const PreviewModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "& img": {
    maxWidth: "90vw",
    maxHeight: "90vh",
    objectFit: "contain",
  },
});
