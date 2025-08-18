import axios from "axios";
import { use, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import "./product.css";
import {
  Container,
  Stack,
  Button,
  Breadcrumbs,
  Link as MUILink,
  Typography,
  Card,
  Skeleton,
  CardMedia,
  CardContent,
  Chip,
  Rating,
  Divider,
  Box,
  CardActions,
  CardActionArea,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const MyLink = styled(MUILink)({
  "&:hover": {
    color: "black",
  },
});

function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => alive && setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id]);

  const rating = useMemo(() => data?.rating?.rate ?? 0, [data]);
  const count = useMemo(() => data?.rating?.count ?? 0, [data]);

  return (
    <Container
      maxWidth="false"
      sx={{ m: 0, p: 0, minHeight: "100vh" }}
      disableGutters
    >
      <Stack sx={{ borderBottom: "2px solid black" }}>
        <Button
          fullWidth
          variant="text"
          component={RouterLink}
          to="/products"
          sx={{
            m: 0,
            background: "gray",
            "&:hover": {
              backgroundColor: "black",
              color: "white",
            },
            "&:active": { backgroundColor: "white", color: "black" },

            borderRadius: 0,
            color: "black",
          }}
        >
          Back to Products
        </Button>
        <Breadcrumbs
          sx={(theme) => ({
            display: "flex",
            justifyContent: "center",
            backgroundColor:
              theme.palette.mode === "light" ? "#e4e4e4ff" : "#6b6b6bff",
          })}
        >
          <MyLink
            component={RouterLink}
            underline="hover"
            color="inherit"
            to="/"
          >
            Home
          </MyLink>
          <MyLink
            component={RouterLink}
            underline="hover"
            color="inherit"
            to="/products"
          >
            Products
          </MyLink>
          <Typography color="text.primary">#{id}</Typography>
        </Breadcrumbs>
      </Stack>
      <Stack spacing={3} alignItems="center">
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            overflow: "visible",
          }}
          elevation={3}
        >
          {loading ? (
            <Skeleton variant="rounded" width="100%" height={420} />
          ) : (
            <CardActionArea sx={{bgcolor:'#181818ff'}}>
              <CardMedia
                component="img"
                image={data.image}
                alt={data.title}
                sx={{
                  maxWidth: 520,
                  width: "100%",
                  height: 420,
                  objectFit: "contain",
                  mx: "auto",
                  filter: (theme) =>
                    theme.palette.mode === "dark"
                      ? "drop-shadow(0 12px 12px rgba(0,0,0,.9))"
                      : "drop-shadow(0 12px 12px rgba(0,0,0,.6))",
                  transform: "scale(.6)",
                  transition:
                    "transform 1.2s linear .1s, filter 1.2s linear .1s",
                  "&:hover": {
                    transform: "scale(.9)",
                    filter: (theme) =>
                      theme.palette.mode === "dark"
                        ? "drop-shadow(18px 45px 3px rgba(0,0,0,.9))"
                        : "drop-shadow(18px 45px 3px rgba(0,0,0,.6))",
                  },
                  overflow: "visible",
                }}
              />
            </CardActionArea>
          )}
        </Card>
        <Card
          sx={{ width: "100%", borderWidth: 3 }}
          elevation={3}
          variant="outlined"
        >
          <CardContent sx={{ textAlign: "center" }}>
            {loading ? (
              <>
                <Skeleton width="80%" height={36} sx={{ mx: "auto", mb: 1 }} />
                <Skeleton width="30%" sx={{ mx: "auto", mb: 2 }} />
              </>
            ) : (
              <>
                <Typography variant="h5" fontweight={700} gutterBottom>
                  {data.title}
                </Typography>
                <Chip
                  label={data.category}
                  color="primary"
                  variant="outlined"
                  sx={{ textTransform: "capitalize", mb: 1 }}
                />
                <Stack
                  spacing={1}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Rating value={rating} precision={0.1} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {rating} ({count})
                  </Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="h4"
                  color="primary"
                  fontweight={800}
                  sx={{ mb: 2 }}
                >
                  ${data.price}💵
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {data.description}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>

        {!loading && (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary">
              Product ID: {id}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              borderRadius: 2,
              bgcolor: "#00a4f0ff",
              color: "white",
              "&:hover": {
                bgcolor: "white",
                outline: "3px solid #28bbff",
                color: "#28bbff",
              },
            }}
          >
            Order Now
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              px: 4,
              borderRadius: 2,
              bgcolor: "black",
              color: "white",
              "&:hover": {
                bgcolor: "white",
                outline: "3px solid #28bbff",
                color: "#28bbff",
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
export default ProductDetail;
