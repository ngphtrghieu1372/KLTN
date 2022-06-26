import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsOrder, payOrder, deliverOrder } from "../actions/orderActions";
import axios from "axios";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../constants/orderConstans";

function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector(state => state.orderDetails);
  const { error, loading, order } = orderDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector(state => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay
  } = orderPay;
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
function toUSD(x) {
  return x / 23000;
}
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      // console.log(data);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
       if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  },  [dispatch, order, orderId, sdkReady, successPay, successDeliver]);
  const handleSuccessPayment = paymentResult => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="order_form">
      <h1 style={{fontWeight:'700', fontSize:'25px'}}> Đơn Hàng Số {order._id}</h1>
      <div className="">
        <div className="">
          <ul>
            <li>
              <div className="">
              <h2 style={{fontSize:'18px', color:'#6666'}}>Thông Tin Khách Hàng</h2>
                <p>
                  <strong> Họ Và Tên: </strong> {order.shippingAddress.fullName}
                  <br />
                  <strong> Số Điện Thoại: </strong> {order.shippingAddress.phone}
                  <br />
                  <strong> Địa Chỉ: </strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.country}
                  <br />
                  <strong> Email: </strong>
                  {order.shippingAddress.email}
                  <br />
                  <strong> Mã Bưu Điện: </strong>{" "}
                  {order.shippingAddress.postalCode}
                  
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Đã Giao Tại {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"> Chưa Được Giao</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="">
              <h2 style={{fontSize:'18px', color:'#6666'}}>Thanh Toán</h2>
                <p>
                  <strong> Phương Thức Thanh Toán: </strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Đã Thanh Toán {order.paidAt.substring(0, 10)}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger"> Chưa Thanh Toán</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="">
              <h2 style={{fontSize:'18px', color:'#6666'}}>Chi Tiết Đơn Hàng</h2>
                <ul>
                  {order.orderItems.map(item => (
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
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          Số Lượng: {item.qty}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="">
          <div className="">
            <ul>
              
              <li>
                <div className="row">
                  <strong>Thành Tiền</strong>
                  <div style={{fontSize:'20px', color:'#C92127'}}>{addCommas(order.itemsPrice)}đ</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <strong>Phí Giao Hàng</strong>
                  <div style={{fontSize:'20px', color:'#C92127'}}>{addCommas(order.shippingPrice)}đ</div>
                </div>
              </li>
              <li>
                {/* <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice}</div>
                </div> */}
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Tổng Cộng</strong>
                  </div>
                  <div>
                    <strong style={{fontSize:'20px', color:'#C92127'}}>{addCommas(order.totalPrice)}đ</strong>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Tổng Cộng Thanh Toán PayPal</strong>
                  </div>
                  <div>
                    <strong style={{fontSize:'20px', color:'green'}}>{toUSD(order.totalPrice).toFixed(2)} USD</strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger"> {errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <div style={{display:'flex', flexDirection:'column', alignItems:'center', lineHeight:'6rem'}}>
                        <div className="example1">Thanh toán ngay với</div>
                      <PayPalButton
                        amount={toUSD(order.totalPrice).toFixed(2)}
                        onSuccess={handleSuccessPayment}
                      ></PayPalButton>
                      </div>
                      
                    </>
                  )}
                </li>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                  Đã Giao Hàng
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;
