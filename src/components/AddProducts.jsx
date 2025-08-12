import { Link } from "react-router-dom";
import "./add-production.css";

function AddProducts() {
  return (
    <section id="add-products">
      <Link to="/">Home</Link>
      <h1 className="product-name">Name</h1>
      <span>Description</span>
      <img src="" alt="photo" />
      <button>Add</button>
    </section>
  );
}
export default AddProducts;
