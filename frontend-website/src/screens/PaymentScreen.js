import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";
import { Checkbox } from 'antd';
function PaymentScreen(props) {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <div style={{marginTop:'1.5%'}}>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1>Hình Thức Thanh Toán</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={e => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal"> Chuyển Khoản Qua Paypal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="COD"
              value="COD"
              name="paymentMethod"
              required
              onChange={e => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="COD"> Ship COD</label>
          </div>
        </div>
        <div>
        <Checkbox onChange={onChange}>Chọn để xác nhận bạn đã đọc và đồng ý với <a>Các điều khoản và điều kiện</a> và <a>Chính sách bảo mật</a> của chúng tôi.</Checkbox>
        </div>
        <div>
          <button type="submit" className="checkout_btn">
            Tiếp Tục
          </button>
        </div>
      </form>
    </div>
  );
}

export default PaymentScreen;
