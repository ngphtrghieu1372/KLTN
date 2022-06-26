import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstans";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

function PayOderScreen(props) {
	const cart = useSelector((state) => state.cart);
	function toUSD(x) {
		return x / 23000;
	  }
	if (!cart.paymentMethod) {
		props.history.push("/payment");
	}
	const orderCreate = useSelector((state) => state.orderCreate);
	const { loading, success, error, order } = orderCreate;
	const toPrice = (num) => Number(num.toFixed(2));
	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
	);
	// if sum(itemprice)> 100 shipping fee 4 : 10
	cart.shippingPrice = cart.itemsPrice > 100000 ? toPrice(0) : toPrice(10000);
	cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
	const dispatch = useDispatch();

	const handlePlaceOrder = () => {
		dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
	};
	useEffect(() => {
		if (success) {
			props.history.push(`/order/${order._id}`);
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [dispatch, order, success, props.history]);
	return (
		<div style={{ marginTop: "1.5%" }}>
			<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
			<div style={{ padding: "50px 250px 100px 250px", backgroundColor:'#fff'}}>
				<div className="placeorder_title">Chi Tiết Đặt Hàng</div>
				<div className="">
					<ul>
						<li>
							<div className="">
								<h2
									style={{ fontSize: "18px", color: "#6666" }}
								>
									Thông Tin Khách Hàng
								</h2>
								<p>
									<strong> Họ Và Tên: </strong>{" "}
									{cart.shippingAddress.fullName}
									<br />
									<strong> Số Điện Thoại: </strong>{" "}
									{cart.shippingAddress.phone}
									<br />
									<strong> Địa Chỉ: </strong>
									{cart.shippingAddress.address},
									{cart.shippingAddress.city},
									{cart.shippingAddress.country}
									<br />
									<strong> Email: </strong>
									{cart.shippingAddress.email}
									<br />
									<strong> Mã Bưu Điện: </strong>{" "}
									{cart.shippingAddress.postalCode}
								</p>
							</div>
						</li>

						<li>
							<div className="">
								<h2
									style={{ fontSize: "18px", color: "#6666" }}
								>
									Chi Tiết Đơn Hàng
								</h2>
								<ul>
									{cart.cartItems.map((item) => (
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
													<Link
														to={`/product/${item.product}`}
													>
														{item.name}
													</Link>
												</div>
												<div>Số Lượng: {item.qty}</div>
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
									<div>{cart.itemsPrice}đ</div>
								</div>
							</li>
							<li>
								<div className="row">
									<strong>Phí Giao Hàng</strong>
									<div>{cart.shippingPrice}đ</div>
								</div>
							</li>
							{/* <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice}</div>
                </div>
              </li> */}
							<li>
								<div className="row">
									<div>
										<strong style={{fontSize:'20px', color:'#C92127'}}>Tổng Cộng</strong>
									</div>
									<div>
										<strong>{cart.totalPrice}đ</strong>
									</div>
								</div>
							</li>
							<li>
								<div className="row">
									<div>
										<strong>Tổng Cộng Bằng USD</strong>
									</div>
									<div>
										<strong style={{fontSize:'20px', color:'green'}}>{toUSD(cart.totalPrice).toFixed(2)} USD</strong>
									</div>
								</div>
							</li>
							<li>
								<div className="">
									<h2
										style={{
											fontSize: "18px",
											color: "#6666",
										}}
									>
										Thanh Toán
									</h2>
									<p>
										<strong>
											{" "}
											Phương Thức Thanh Toán:{" "}
										</strong>{" "}
										{cart.paymentMethod}
									</p>
								</div>
							</li>
							<li>
								<button
									className="checkout_btn"
									type="button"
									onClick={handlePlaceOrder}
									disabled={cart.cartItems.length === 0}
								>
									Đặt Hàng
								</button>
							</li>
							{loading && <LoadingBox />}
							{error && <MessageBox variant="danger" />}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PayOderScreen;
