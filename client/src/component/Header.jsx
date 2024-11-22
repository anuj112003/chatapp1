import { Link  } from "react-router-dom";
import Search from "./Search";

function Header({ cartItem }) {
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <img width="150px" src="/images/logo.png" alt="Brand Logo" />
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        
       <Link
          to={"/"}
          style={{
            textDecoration: "none", // Removes underline
            marginRight: "20px", // Adds gap
            color: "white", // Ensures consistent color
          }}
        >
          <span id="home" className="ml-3">
            Home
          </span>
        </Link>
        <Link
          to={"/cart"}
          style={{
            textDecoration: "none", // Removes underline
            color: "white", // Ensures consistent color
          }}
        >
          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            {cartItem.length}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
