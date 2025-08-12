import axios from "axios";
import { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./product.css";

function ProductDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading detail...</p>;
  if (!data) return <p>Can't find the Product.</p>;
  return (
    <section id="product-page">
      <div>
        {" "}
        <Link to="/products">← Back to Products</Link>
        <h1>{data.title}</h1>
      </div>
      <p>
        <b>Price:</b> ${data.price}
      </p>
      <p>
        <b>Category:</b> {data.category}
      </p>
      <img src={data.image} alt={data.title} style={{ maxWidth: 240 }} />
      <p style={{ marginTop: 12 }}>{data.description}</p>
    </section>
  );
}
export default ProductDetail;
