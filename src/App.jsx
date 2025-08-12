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
            <div className="App">
              <nav style={{ display: "flex", gap: 12, padding: 12, background: '#BDBDBD' }}>
                <Link to="/">Home</Link>
                <Link to="/add">Add Products</Link>
              </nav>

              <h1>List Products</h1>

              <ul>
                {products.map((pd) => (
                  <li key={pd.id}>
                    <div>
                      <b>
                        {pd.title} - ${pd.price} - {pd.category}
                      </b>
                      <br />
                      <img src={pd.image} alt={pd.title} />
                      <br />
                      <span>{pd.description}</span>
                    </div>

                    <Link to={`/products/${pd.id}`}>
                      <button>Show Detail</button>
                    </Link>
                  </li>
                ))}
              </ul>

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
          <section style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', justifySelf:'center', alignSelf:'center', cursor:'pointer'}}>
            <p>404 - Not Found</p>
            <p onClick={handleNavigate} style={{fontSize: '1.2rem', fontWeight:'bold', color:'#E18F8F'}}>Come back to previous page.</p>
          </section>
        }
      />
    </Routes>
  );
}

export default App;
