import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const UploadButton = styled(Button)({
  margin: "16px",
  "& input": {
    display: "none",
  },
}) as typeof Button;
