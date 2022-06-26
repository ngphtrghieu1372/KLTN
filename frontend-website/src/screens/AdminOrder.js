import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import QrReader from "react-qr-reader";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeCart, saveShippiingAddress } from "actions/cartActions";
import { createOrderAdmin } from "actions/orderActions";
import { ORDER_CREATE_RESET } from "constants/orderConstans";
import LoadingBox from "components/LoadingBox";
import MessageBox from "components/MessageBox";

function AdminOrder(props) {
    const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = num => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  // if sum(itemprice)> 100 shipping fee 4 : 10
  cart.shippingPrice = 0;
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const [result, setResult] = useState("");
  const {userInfo} = useSelector((state) => state.userSignin );
  const productId = result;
  //   const qty = props.location.search
  //     ? Number(props.location.search.split("=")[1])
  //     : 1;
  const qty = 1;
    const fullName = userInfo.name;
    const address ='at store';
    const city = 'TPHCM';
    const postalCode = 0;
    const country = 'VIET NAM';

  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const handleRemoveCart = (id) => {
    dispatch(removeCart(id));
  };
  const handleCheckOut = () => {
    dispatch(
        saveShippiingAddress({ fullName, address, city, postalCode, country })
      );
    dispatch(createOrderAdmin({ ...cart, orderItems: cart.cartItems }));
  };

  const handleScan = (data) => {
    if (!data) return;
    setResult(data);
    // console.log(result);
  };
  const handleError = (err) => {
    console.error(err);
  };
  const previewStyle = {
    height: "100%",
    width: "100%"
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/signin?redirect=bill/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, success, props.history]);
  return (
    <div className="row top">
      <div className="col-1">
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <div>empty</div>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => handleRemoveCart(item.product)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </li>
            ))}
            <li>
              <h2>
                Tổng Cộng: ({cartItems.reduce((a, c) => a + c.qty, 0)} items): $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={handleCheckOut}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                proceed to chechout
              </button>
              {loading && <LoadingBox />}
              {error && <MessageBox variant="danger" />}
            </li>
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
            <QrReader
        delay={1000}
        // facingMode="environment"
        // chooseDeviceId={facingMode}
        onError={handleError}
        onScan={handleScan}
      />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
