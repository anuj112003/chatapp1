import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { useSearchParams } from "react-router-dom";

function HomePage() {
  const [products,setProducts] = useState([]);
  const [searchParams,setSearchParams] = useSearchParams()

  //old
  // useEffect(()=>{
  //   fetch(process.env.REACT_API_URL+'/products')
  //   .then(res=>res.json())
  //   .then(res=>{setProducts(res)})
  // },[])
  //help by avinash sir
  const REACT_APP_API_URL="http://localhost:3000"
  useEffect(() => {
    const fetchProducts = async () => {
        const response = await fetch(`${REACT_APP_API_URL}/ecommerce/products?`+searchParams);
        const data = await response.json();
        setProducts(data.Products);
    };

    fetchProducts();
  }, [searchParams]);
  return (
    <>
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products.map(product => <ProductCard product={product} />)}
        </div>
      </section>
    </>
  );
}

export default HomePage;
