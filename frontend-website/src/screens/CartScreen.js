import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { addToCart, removeCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
// import MessageBox from "../components/MessageBox";
import {DeleteOutlined } from "@ant-design/icons";
function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const handleRemoveCart = id => {
    dispatch(removeCart(id));
  };
  const handleCheckOut = () => {
    props.history.push("/signin?redirect=shipping");
  };
  const sum_price = {
    borderBottom: '1px solid rgb(212, 209, 209)',
    borderTop: '1px solid rgb(212, 209, 209)',
    paddingTop: '16px',
    paddingBottom: '16px',
    fontFamily: '$font-bitter',
    fontWeight: '600',
    fontSize:'16px',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
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
    <div className="row top">
      <div className="col-2">
        <h1 className="profile_title">GIỎ HÀNG</h1>
        {cartItems.length === 0 ? (
          <div style={{textAlign: 'center'}}>
            <img src="/img/empty-cart.png" alt="empty-cart" className='empty'></img>
           
          </div>
        ) : (
          <ul>
            {cartItems.map(item => (
              <li key={item.product} style={{ backgroundColor:'#fff', padding:'10px', borderRadius:'5px'}}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/products/${item.product}`} style={{color:'#083B66', fontWeight:'600', fontSize:'16px'}}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={e =>
                        dispatch(
                          addToCart(item.product,Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{fontWeight:'700'}}>{addCommas(item.price)}đ</div>
                  <div>
                   
                      <DeleteOutlined style={{color:'red', fontSize:'20px'}} onClick={() => handleRemoveCart(item.product)}/>
                   
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1" style={{display:'flex', justifyContent:'center'}}>
        <div className="card_checkout">
          <ul style={{width:'100%'}}>
            <li style={{marginBottom: '16px',
                        fontSize: '20px',
                        fontFamily: '$font-merriweather'}}>
              Thông Tin Đơn Hàng
            </li>
            <li>
              <div style={sum_price}>
                <div>Tổng Tiền:</div> 
                <a style={{fontSize:'22px', color:'red'}}>{addCommas(cartItems.reduce((a, c) => a + c.price * c.qty, 0))}đ</a>
              </div>
            </li>
            <li>
              <button
                onClick={handleCheckOut}
                className="checkout_btn"
                disabled={cartItems.length === 0}
              >
                THANH TOÁN
              </button>
            </li>
            <li style={{textAlign:'center'}}>
            <Link to="/">
            <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="reply"
                            class="svg-inline--fa fa-reply fa-w-16"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{width:'15px', marginRight:'5px'}}
                        >
                            <path
                                fill="currentColor"
                                d="M8.309 189.836L184.313 37.851C199.719 24.546 224 35.347 224 56.015v80.053c160.629 1.839 288 34.032 288 186.258 0 61.441-39.581 122.309-83.333 154.132-13.653 9.931-33.111-2.533-28.077-18.631 45.344-145.012-21.507-183.51-176.59-185.742V360c0 20.7-24.3 31.453-39.687 18.164l-176.004-152c-11.071-9.562-11.086-26.753 0-36.328z"
                            ></path>
                        </svg>
              Tiếp Tục Mua Hàng</Link> 
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
