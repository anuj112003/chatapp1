import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetails({ cartItem, setCartItem }) {
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
const REACT_APP_API_URL="http://localhost:3000"
  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/ecommerce/product/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProduct(res.product);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [id]);

  //add a cart
  function addTheCart() {
    const itemExit = cartItem.find((item) => item.product._id == product._id);
    if (!itemExit) {
      const newItem = { product, qty };
      setCartItem((state) => [...state, newItem]);
      toast.success("item is added to cart");
    }
  }

  //increase quantity
  function incQuantity() {
    if (product.stock == qty) {
      return;
    }
    setQty((prev) => prev + 1);
  }
  //decrease quantity
  function decQuantity() {
    if (qty == 1) {
      return;
    }
    setQty((prev) => prev - 1);
  }

  return (
    product && (
      <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.image[0].image}
              alt={product.name}
              height={500}
              width={500}
            />
          </div>
          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">{product._id}</p>
            <hr />
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.rating / 5) * 100}%` }}
              ></div>
            </div>
            <hr />
            <p id="product_price">${product.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decQuantity}>
                -
              </span>
              <input
                type="number"
                className="form-control count d-inline"
                value={qty}
                readOnly
              />
              <span className="btn btn-primary plus" onClick={incQuantity}>
                +
              </span>
            </div>
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              onClick={addTheCart}
              disabled={product.stock==0}
            >
              Add to Cart
            </button>
            <hr />
            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.stock > 0 ? "text-success" : "text-danger"}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>
            <hr />
            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller" className="mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>
            <div className="rating w-50" />
          </div>
        </div>
      </div>
    )
  );
}

export default ProductDetails;
