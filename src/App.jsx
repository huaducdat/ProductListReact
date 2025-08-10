import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const getLst = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    } catch (error) {
      console.log("Got problem when download list products", error);
    }
  };
  useEffect(() => {
    getLst();
  }, []);
  return (
    <div className="App">
      <h1>List Products</h1>
      <ul>
        {products.map((pd) => (
          <li key={pd.id}>
            <div>
              {" "}
              <b>
                {pd.title} - ${pd.price} - {pd.category}
              </b>
              <br />
              <img src={pd.image} alt="photo" />
              <br />
              <span>{pd.description}</span>
            </div>
            <button>Show Detail</button>
          </li>
        ))}
      </ul>
      <footer></footer>
    </div>
  );
}

export default App;
