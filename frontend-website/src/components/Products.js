import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
function Products(props) {
  const { product } = props;
  function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
  return (
    <Link to={`/products/${product._id}`}>
    <div key={product._id} className="card">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="product_img"/>
      </Link>
      <div className="card-body">
        <Link to={`/products/${product._id}`}>
          <h1 className="product-name">{product.name}</h1>
        </Link>
        
        <div className="price">Giá : {addCommas(product.price)} đ</div>
        <Rating rating={product.rating} numReviews={product.numReviews} />
      </div>
    </div>
    </Link>
  );
}

export default Products;
