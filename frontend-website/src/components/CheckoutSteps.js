import React from "react";

function CheckoutSteps(props) {
  return (
    <div className=" row checkout-steps">
      <div className={props.step1 ? "active" : ""}>Đăng Nhập</div>
      <div className={props.step2 ? "active" : ""}>Chi Tiết</div>
      <div className={props.step3 ? "active" : ""}>Thanh Toán</div>
      <div className={props.step4 ? "active" : ""}>Đặt Hàng</div>
    </div>
  );
}

export default CheckoutSteps;
