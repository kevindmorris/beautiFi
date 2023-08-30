import { Container } from "@mui/material";
import { styled } from "@mui/system";

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(3),
}));

export default PageContainer;
