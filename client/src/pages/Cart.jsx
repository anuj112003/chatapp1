import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Cart({ cartItem, setCartItem }) {
    //complete msg state
    const [complete,setComplete]=useState(false);
  //increase quantity
  function incQuantity(item) {
    if (item.product.stock == item.qty) {
      return;
    }
        const updatedItem = (cartItem.map((i)=>{
            if(i.product.id == item.product.id){
                i.qty++;
            }
            return i;
        }))
        setCartItem(updatedItem)
  }
  //decrease quantity
  function decQuantity(item) {
    if (item.qty > 1) {
        const updatedItem = (cartItem.map((i)=>{
            if(i.product.id == item.product.id){
                i.qty--;
            }
            return i;
        }))
        setCartItem(updatedItem)
    }
  }
  //remove item
  function removeItem(item) {
    const updatedItem = (cartItem.filter((i) => {
        if(i.product._id !== item.product._id){
            return i;
        }
    }))
    setCartItem(updatedItem)
  }
  //place order
  const REACT_APP_API_URL="https://chatapp1-8hug.onrender.com"
  function placeOrder() {
    fetch(`${REACT_APP_API_URL}/ecommerce/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItem),
    })
    .then(() => {
      setCartItem([]);
      setComplete(true);
      toast('Order has been placed');
    })
  }
  return (
      cartItem.length > 0 ? 
        <Fragment>
            <div className="container container-fluid">
      <h2 className="mt-5">
        Your Cart: <b>{cartItem.length} items</b>
      </h2>
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          {cartItem.map((item, index) => (
            <Fragment key={index}>
              <hr />
              <div className="cart-item">
                <div className="row">
                  <div className="col-4 col-lg-3">
                    <img
                      src={item.product.image[0].image}
                      alt={item.product.name}
                      height={90}
                      width={115}
                    />
                  </div>
                  <div className="col-5 col-lg-3">
                    <Link to={"/product/" + item.product._id}>
                      {item.product.name}
                    </Link>
                  </div>
                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">${item.product.price}</p>
                  </div>
                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                      <span className="btn btn-danger minus" onClick={()=>decQuantity(item)}>-</span>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={item.qty}
                        readOnly
                      />
                      <span className="btn btn-primary plus" onClick={()=>incQuantity(item)}>+</span>
                    </div>
                  </div>
                  <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                    <i
                      id="delete_cart_item"
                      className="fa fa-trash btn btn-danger"
                      onClick={()=>removeItem(item)}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
        {/* order summary  */}
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span className="order-summary-values">{cartItem.reduce((acc,item)=>(acc+item.qty),0)} (Units)</span>
            </p>
            <p>
              Est. total: <span className="order-summary-values">${cartItem.reduce((acc,item)=>(acc+(item.product.price*item.qty)),0)}</span>
            </p>
            <hr />
            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
        </Fragment>: (!complete ? <h2 className="mt-5">Your Cart is Empty</h2>
        : 
        <Fragment>
            <h2>Your Order Placed!</h2>
            <p>Your order has been successfully</p>
        </Fragment>)
  );
}

export default Cart;
