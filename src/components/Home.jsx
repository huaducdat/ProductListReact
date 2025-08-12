import { Link } from "react-router-dom";
import './home.css';

function Home() {
  return (
    <section id="home">
      <h1>Home</h1>
      <p>Welcome to Home page</p>
      <Link to="/products">Products List</Link>
      <Link to="/add">Add Products</Link>
    </section>
  );
}
export default Home;
