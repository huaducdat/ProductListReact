import { Link as RouterLink } from "react-router-dom";
import "./home.css";
import logoB from "../MyImgs/CompanyLogo1Black.png";
import logoA from "../MyImgs/CompanyLogo1White.png";
import {
  Container,
  Stack,
  Typography,
  Button,
  Box,
  Paper,
  Link as MUILink,
  useTheme,
} from "@mui/material";

function Home() {
  const theme = useTheme();
  return (
    <Container maxWidth={false} disableGutters>
      <Paper
        elevation={3}
        sx={{
          textAlign: "center",
          background:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : "#fff",
          minHeight: "100dvh",
        }}
      >
        <Stack spacing={9} alignItems="center">
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              mt: 0,
              bgcolor: "black",
              width: "100%",
              color: "white",
              py: 2,
            }}
          >
            Home
          </Typography>
          <Box
            component="img"
            src={theme.palette.mode === "dark" ? logoA : logoB}
            sx={{
              width: { xs: 270, md: 210 },
              height: "auto",
            }}
          />
          <Typography variant="body1" color="text.secondary">
            Welcome to Home page
            <br />
            <b>In this Place you can buy what you want!</b>
            <br />
            You can change to light or dark mode in Products List Page
            <br />
            Enjoy...
          </Typography>
          <Stack direction="column" spacing={1}>
            <MUILink
              component={RouterLink}
              to="/products"
              underline="always"
              fontWeight="bold"
            >
              Products List
            </MUILink>
            <MUILink
              component={RouterLink}
              to="/add"
              underline="always"
              fontWeight="bold"
            >
              Add Product
            </MUILink>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}
export default Home;
