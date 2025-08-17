import { Link } from "react-router-dom";
import "./home.css";
import logoB from "../MyImgs/CompanyLogo1Black.png";



function Home() {

  return (
    <section id="home">
      <h1 style={{ marginTop: 0 }}>Home</h1>
      <img src={logoB} alt="logo" />
      <p>Welcome to Home page.</p>
      <Link to="/products">Products List</Link>
      <Link to="/add">Add Products</Link>
    </section >
  );
}
export default Home;
