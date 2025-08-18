// App.jsx
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./components/Home";
import {
  Route,
  Routes,
  Link /* hoặc NavLink */,
  useNavigate,
} from "react-router-dom";
import ProductDetail from "./components/ProductDetail";
import AddProducts from "./components/AddProducts";
import {
  Card,
  List,
  ListItem,
  CardMedia,
  Box,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLst = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Got problem when download list products", error);
      } finally {
        setLoading(false);
      }
    };
    getLst();
  }, []);

  const navigator = useNavigate();
  const handleNavigate = () => {
    navigator(-1);
  };

  return (
    <Routes>
      {/* Trang bắt đầu = Home */}
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddProducts />} />
      {/* Danh sách sản phẩm */}
      <Route
        path="/products"
        element={
          loading ? (
            <p>Loading...</p>
          ) : (
            <section className="App">
              <nav
                style={{
                  display: "flex",
                  gap: 12,
                  padding: 12,
                  background: "#BDBDBD",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/">Home</Link>
                <Link to="/add">Add Products</Link>
              </nav>

              <strong>List Products</strong>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  paddingLeft: 6,
                  paddingRight: 6,
                  paddingTop: 3,
                }}
              >
                {products.map((pd) => (
                  <Card
                    key={pd.id}
                    sx={{
                      flex: "1 1 calc(25% - 16px)", // mỗi card chiếm khoảng 25% chiều ngang
                      minWidth: 250, // không nhỏ hơn 250px
                      maxWidth: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 0,
                      boxShadow: "0 0 3px rgb(0 ,0, 0, .3)",
                      transition: "all .3s ease-in-out .1s",
                      "&:hover": {
                        borderRadius: "9px",
                        transform: "scale(1.05)",
                        boxShadow: "0 0 6px rgb(0 ,0, 0, .6)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={pd.image}
                      alt={pd.title}
                      sx={{ objectFit: "contain", padding: "2px" }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="div">
                        <b>
                          {pd.title} - ${pd.price}
                        </b>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {pd.category}
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: 1 }}>
                        {pd.description}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 0 }}>
                      <Link
                        to={`/products/${pd.id}`}
                        style={{ textDecoration: "none", width: "100%" }}
                      >
                        <Button
                          variant="contained"
                          fullWidth
                          sx={{ backgroundColor: '#004cf0ff',
                            "&:hover": { backgroundColor: "#19C8FF" },
                            fontWeight: "Bold",
                          }}
                        >
                          Show in Detail
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                ))}
              </Box>

              <footer></footer>
            </section>
          )
        }
      />

      {/* Trang chi tiết */}
      <Route path="/products/:id" element={<ProductDetail />} />

      {/* 404 */}
      <Route
        path="*"
        element={
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              justifySelf: "center",
              alignSelf: "center",
              cursor: "pointer",
            }}
          >
            <p>404 - Not Found</p>
            <p
              onClick={handleNavigate}
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#E18F8F",
              }}
            >
              Come back to previous page.
            </p>
          </section>
        }
      />
    </Routes>
  );
}

export default App;
