// App.jsx
import "./App.css";
import { useEffect, useMemo, useState } from "react";
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
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

import { ThemeProvider, CssBaseline, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";


const MyButton = styled(Button)(({ theme }) => ({
  borderRadius: 0,
  padding: theme.spacing(1.5),

  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "#00F0FF",


  color: theme.palette.mode === "dark" ? "#00F0FF" : "#003344",
  fontWeight: 'bold',

  // Hover
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#003344" : "#00D6E6",
    color: "#fff",
  },

  // Active
  "&:active": {
    backgroundColor: "#00B8CC",

  },

  // Focus
  "&:focus": {
    outline: "2px solid #00F0FF",
    outlineOffset: 2,
  },

  // Disabled
  "&.Mui-disabled": {
    backgroundColor: "#A0A0A0",
    color: "#E0E0E0",

  },
}));





function App() {
  const [mode, setMode] = useState("light");
  const theme = createTheme({
    palette: { mode },
  });

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
    <ThemeProvider theme={theme}>
      <CssBaseline />

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
              <div className="App">
                <nav style={{ display: "flex", gap: 12, padding: 12, background: '#BDBDBD', alignItems: 'center', justifyContent: 'start' }}>
                  <Link to="/">Home</Link>
                  <Link to="/add">Add Products</Link>

                  <IconButton onClick={() => setMode(m => (m === "light" ? "dark" : "light"))} sx={{ gap: 1, borderRadius: '3px' }}>
                    {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}Switch Theme
                  </IconButton>
                </nav>

                <h1>List Products</h1>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
                  {products.map((pd) => (
                    <Card
                      key={pd.id} sx={{ width: '240px', height: '500px', overflow: 'hidden', display: 'flex', flexDirection: 'column', p: 0, transition: 'all .3s ease-in-out .2s', "&:hover": { transform: 'scale(1.1)' } }}>
                      <CardActionArea sx={{ flex: 1 }} >
                        <Box sx={{ mt: '1', flex: 1, transition: "transform 1s linear", '&:hover': { transform: 'scale(1.2)' } }}>
                          <CardMedia
                            component="img"
                            height="160"
                            image={pd.image}
                            alt={pd.title}
                            sx={{
                              objectFit: "contain", bgcolor: "background.default", bgcolor: 'transparent', filter: theme.palette.mode === 'dark'
                                ? 'drop-shadow(0 9px 6px rgba(0,0,0,.6))'
                                : 'drop-shadow(0 9px 6px rgba(0,0,0,.3))',
                              transition: 'transform .4s ease, filter .4s ease',
                              '&:hover': {
                                transform: 'scale(1.06)',
                                filter: theme.palette.mode === 'dark'
                                  ? 'drop-shadow(0 15px 3px rgba(0,0,0,.75))'
                                  : 'drop-shadow(0 15px 3px rgba(0,0,0,.4))',
                              },
                            }}
                          />
                        </Box>
                      </CardActionArea>
                      <CardContent sx={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                        <Typography variant="subtitle1" noWrap>{pd.title}</Typography>
                        <Typography variant="body1" color="text.primary"><b>${pd.price} - {pd.category}</b></Typography>
                        <Typography variant="body2" color="text.secondary">{pd.description}</Typography>
                      </CardContent>
                      <CardActions sx={{ p: 0, mt: 0, boxShadow: `0 -15px 30px ${theme.palette.mode === "dark" ? "black" : "#0000002c"}` }}>
                        <MyButton fullWidth variant="contained" color="primary">Show in Detail</MyButton>
                      </CardActions>
                    </Card>
                  ))}
                </Box>

                <footer />
              </div>
            )
          }
        />

        {/* Trang chi tiết */}
        <Route path="/products/:id" element={<ProductDetail />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', justifySelf: 'center', alignSelf: 'center', cursor: 'pointer' }}>
              <p>404 - Not Found</p>
              <p onClick={handleNavigate} style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#E18F8F' }}>Come back to previous page.</p>
            </section>
          }
        />
      </Routes>

    </ThemeProvider>
  );
}

export default App;
