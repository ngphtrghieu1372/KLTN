import React, { useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import QRCode from "qrcode.react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import AdminRoute from "./components/AdminRoute";
import { useSelector, useDispatch } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userAction";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import BillScreen from "./screens/BillScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import QRScreen from "./screens/QRScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "components/PrivateRoute";
import SigninQRScreen from "screens/SigninQRScreen";
import AdminOrder from "screens/AdminOrder";
import UserListScreen from "screens/UserListScreen";
import UserEditScreen from "screens/UserEditScreen";
import SearchBox from "components/SearchBox";
import SearchScreen from "screens/SearchScreen";
import DashboardScreen from "screens/DashboardScreen";
import SupportScreen from "screens/SupportScreen";
import ChatBox from "components/ChatBox";
import {
	AppstoreOutlined,
	CaretDownOutlined,
	FacebookFilled,
	InstagramFilled,
	YoutubeFilled,
	TwitterOutlined,
	LinkedinFilled,
	MailFilled,
	PhoneFilled,
	HomeFilled,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import { addToCart, removeCart } from "./actions/cartActions";
/*image*/
import logo from "./img/logohh3.png";

import logofooter from "./img/logohh2.png";
import logobct from "./img/logo-bo-cong-thuong.png";
import vnpost from "./img/vnpost.png";
import ahamove from "./img/ahamove_logo.png";
import ghn from "./img/icon_giao_hang_nhanh.png";
import snappy from "./img/icon_snappy.png";
import vnpay from "./img/vnpay_logo.png";
import zalopay from "./img/ZaloPay-logo-130x83.png";
import momo from "./img/momopay.png";
import moca from "./img/logo_moca_120.jpg";
import {
	ShoppingCartOutlined,
	QrcodeOutlined,
	UserOutlined,
	LogoutOutlined,
	DeleteTwoTone,
} from "@ant-design/icons";
import { MessengerChat } from "react-messenger-chat-plugin";
function App() {
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
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
	const userSignin = useSelector((state) => state.userSignin);
	// console.log(userSignin);
	const { userInfo } = userSignin;
	// console.log(userInfo.result.name);
	// const userSigninGoogle = useSelector(state => state.userSigninGoogle);
	// const {userInfoGoogle} = userSigninGoogle;
	const dispatch = useDispatch();
	const handleSignOut = () => {
		dispatch(signout());
	};
	const productCategoryList = useSelector(
		(state) => state.productCategoryList
	);
	const {
		loading: loadingCategories,
		error: errorCategories,
		categories,
	} = productCategoryList;
	useEffect(() => {
		dispatch(listProductCategories());
	}, [dispatch]);
	const handleRemoveCart = (id) => {
		dispatch(removeCart(id));
	};
	//cart-review
	const cart_review = (
		<div className="cart_review_container">
			<h1 style={{ fontWeight: "700", fontSize: "22px" }}>GI??? H??NG</h1>
			{cartItems.length === 0 ? (
				<div>Gi??? H??ng Tr???ng</div>
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
									<Link to={`/product/${item.product}`}>
										{item.name}
									</Link>
								</div>
								<div
									style={{
										color: "red",
										marginRight: "10px",
										fontSize: "18px",
									}}
								>
									{addCommas(item.price)} ??
								</div>
								<div
									style={{
										marginRight: "10px",
										color: "#7A7E7F",
									}}
								>
									<b>
										{"x"}
										{item.qty}
									</b>
								</div>

								<DeleteTwoTone
									onClick={() =>
										handleRemoveCart(item.product)
									}
									style={{ fontSize: "20px" }}
									twoToneColor="#C92127"
								/>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
	//dropdown
	const category = (
		<Menu>
			<ul>
				<li>
					<h
						style={{
							fontSize: "20px",
							padding: "50px",
							color: "#083B66",
							fontWeight: "bold",
						}}
					>
						DANH M???C S???N PH???M
					</h>
				</li>
				{loadingCategories ? (
					<LoadingBox></LoadingBox>
				) : errorCategories ? (
					<MessageBox variant="danger">{errorCategories}</MessageBox>
				) : (
					categories.map((c) => (
						<Menu.Item key={c} style={{ fontSize: "16px" }}>
							<Link to={`/search/category/${c}`}>{c}</Link>
						</Menu.Item>
					))
				)}
			</ul>
		</Menu>
	);
	return (
		<Router>
			<div className="grid-container">
				<header className="row">
					<div className="logo-section">
						<Link className="logo" to="/">
							<img src={logo} style={{ height: "50px" }} />
						</Link>
					</div>

					<div className="search-section">
						<Dropdown overlay={category}>
							<div className="open-sidebar">
								<AppstoreOutlined
									style={{ fontSize: "35px" }}
								/>
								<CaretDownOutlined
									style={{ fontSize: "16px" }}
								/>
							</div>
						</Dropdown>
						<Route
							render={({ history }) => (
								<SearchBox history={history}></SearchBox>
							)}
						></Route>
					</div>
					<div className="cart-user-section">
						{userInfo ? (
							""
						) : (
							<Link to="/signinqr">
								<span className="cartlogo">
									<i className="fas fa-qrcode"></i>
								</span>
							</Link>
						)}
						<Dropdown overlay={cart_review}>
							<Link to="/cart">
								<span className="cartlogo">
									<i style={{ fontSize: "25px" }}>
										<ShoppingCartOutlined />
									</i>
								</span>
								{cartItems.length > 0 && (
									<span className="badge">
										{cartItems.length}
									</span>
								)}
							</Link>
						</Dropdown>

						{userInfo ? (
							<div className="dropdown">
								<Link to="#">
									{userInfo.name}
									<i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/profile">
											<UserOutlined /> Qu???n L?? T??i Kho???n
										</Link>
									</li>
									<li>
										<Link to="/orderhistory">
											<ShoppingCartOutlined /> ????n H??ng
											C???a T??i
										</Link>
									</li>
									<li>
										<Link to="/qrscreen">
											<QrcodeOutlined /> QR C???a T??i
										</Link>
									</li>
									<li>
										<Link
											to="#signout"
											onClick={handleSignOut}
										>
											<LogoutOutlined /> ????ng Xu???t
										</Link>
									</li>
									{/* <li>
                  <QRCode
                    id="qrcode"
                    value={userInfo.token}
                    size={200}
                    level={"H"}
                    includeMargin={true}
                  />
                </li> */}
								</ul>
							</div>
						) : (
							<Link to="/signin">????ng nh???p</Link>
						)}
						{userInfo && userInfo.isAdmin && (
							<div className="dropdown">
								<Link to="#admin">
									{""}
									Admin<i className="fa fa-caret-down"></i>
								</Link>
								<ul className="dropdown-content">
									<li>
										<Link to="/dashboard">Th???ng k??</Link>
									</li>
									<li>
										<Link to="/productlist/pageNumber/:pageNumber">
											Danh s??ch s???n ph???m
										</Link>
									</li>
									<li>
										<Link to="/orderlist">????n h??ng</Link>
									</li>
									<li>
										<Link to="/userlist">Ng?????i d??ng</Link>
									</li>
									{/* <li>
										<Link to="/support">H??? tr???</Link>
									</li> */}
									{/* <li>
										<Link to="/adminorder">Thanh to??n</Link>
									</li> */}
								</ul>
							</div>
						)}
					</div>
				</header>
				{/* <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <h2>DANH M???C S???N PH???M</h2>
              <div
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <AppstoreOutlined />
              <CaretLeftOutlined style={{ fontSize: '16px' }} />
              </div>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside> */}
				<main>
					<Route path="/signinqr" component={SigninQRScreen}></Route>
					<Route path="/cart/:id?" component={CartScreen}></Route>
					<Route
						path="/products/:id"
						component={ProductScreen}
						exact
					></Route>
					<Route
						path="/product/:id/edit"
						component={ProductEditScreen}
						exact
					></Route>
					<Route path="/signin" component={SigninScreen}></Route>
					<Route path="/register" component={RegisterScreen}></Route>
					<Route
						path="/shipping"
						component={ShippingAddressScreen}
					></Route>
					<Route path="/bill/:id" component={BillScreen}></Route>
					<Route path="/payment" component={PaymentScreen}></Route>
					<Route
						path="/placeorder"
						component={PlaceOrderScreen}
					></Route>
					<Route
						path="/orderhistory"
						component={OrderHistoryScreen}
					></Route>
					<Route path="/qrscreen" component={QRScreen}></Route>
					<Route path="/order/:id" component={OrderScreen}></Route>
					<Route
						path="/search/name/:name?"
						component={SearchScreen}
						exact
					></Route>
					<Route
						path="/search/category/:category"
						component={SearchScreen}
						exact
					></Route>
					<Route
						path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
						component={SearchScreen}
						exact
					></Route>
					<PrivateRoute
						path="/profile"
						component={ProfileScreen}
					></PrivateRoute>
					<AdminRoute
						path="/productlist/pageNumber/:pageNumber"
						component={ProductListScreen}
						exact
					></AdminRoute>
					<AdminRoute
						path="/orderlist"
						component={OrderListScreen}
					></AdminRoute>
					<AdminRoute
						path="/adminorder"
						component={AdminOrder}
					></AdminRoute>
					{/* <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute> */}
					<AdminRoute
						path="/userlist"
						component={UserListScreen}
					></AdminRoute>
					<AdminRoute
						path="/support"
						component={SupportScreen}
					></AdminRoute>
					<AdminRoute
						path="/user/:id/edit"
						component={UserEditScreen}
					></AdminRoute>
					<AdminRoute
						path="/dashboard"
						component={DashboardScreen}
					></AdminRoute>
					<Route path="/" component={HomeScreen} exact></Route>
				</main>
				<footer className="footer_container">
					{/* {userInfo && !userInfo.isAdmin && (
						<ChatBox userInfo={userInfo} />
					)} */}
					{/* footer */}
				
						
						<div className="website_infor">
							<img src={logofooter} style={{ width: "100%" }} />

							<div>
								L???u 5, 12 Nguy???n V??n B???o, P.4, Q.G?? V???p, TP.HCM
								<br />
								C??ng Ty C??? Ph???n Ph??t H??nh S??ch TP HCM - H&HBOOKS
								<br />
								12 Nguy???n V??n B???o, P.4, Q.G?? V???p, TP.HCM, Vi???t
								Nam
								<br />
								hhbooks.com nh???n ?????t h??ng tr???c tuy???n v?? giao
								h??ng t???n n??i. KH??NG h??? tr??? ?????t mua v?? nh???n h??ng
								tr???c ti???p t???i v??n ph??ng c??ng nh?? t???t c??? H??? Th???ng
								H&HBooks tr??n to??n qu???c.
							</div>
							<img
								src={logobct}
								style={{ width: "25%", paddingTop: "20px" }}
							/>
							<div className="social_logo">
								<FacebookFilled />
								<InstagramFilled />
								<YoutubeFilled />
								<TwitterOutlined />
								<LinkedinFilled />
							</div>
						</div>

						<div className="footer_menu">
							<div className="footer_menu_container">
								<div className="footer_menu_section">
									<h3 className="footer_menu_title">
										D???CH V???
									</h3>
									<a className="footer_menu_txt" href="https://www.fahasa.com/dieu-khoan-su-dung">
										??i???u kho???n s??? d???ng
									</a>
									<a className="footer_menu_txt" href="https://www.fahasa.com/chinh-sach-bao-mat">
										Ch??nh s??ch b???o m???t
									</a>
									<a className="footer_menu_txt">
										Gi???i thi???u H&HBooks
									</a>
									<a className="footer_menu_txt">
										H??? th???ng trung t??m - nh?? s??ch
									</a>
								</div>
								<div className="footer_menu_section">
									<h3 className="footer_menu_title">
										H??? TR???
									</h3>
									<a className="footer_menu_txt" href="https://www.fahasa.com/doi-tra-hang">
										Ch??nh s??ch ?????i - tr??? - ho??n ti???n
									</a>
									<a className="footer_menu_txt" href="https://www.fahasa.com/chinh-sach-khach-si">
										Ch??nh s??ch kh??ch s???
									</a>
									<a className="footer_menu_txt" href="https://www.fahasa.com/phuong-thuc-van-chuyen">
										Ph????ng th???c v???n chuy???n
									</a>
									<a className="footer_menu_txt" href="https://www.fahasa.com/huong-dan-thanh-toan-va-xuat-hd">
										Ph????ng th???c thanh to??n v?? xu???t H??
									</a>
								</div>
								<div className="footer_menu_section">
									<h3 className="footer_menu_title">
										T??I KHO???N C???A T??I
									</h3>
									<Link
										className="footer_menu_txt"
										to="/signin"
									>
										????ng nh???p/T???o m???i t??i kho???n
									</Link>

									{userInfo ? (
										<div className="footer_menu_section">
											<Link
												className="footer_menu_txt"
												to="/profile"
											>
												Qu???n l?? t??i kho???n
											</Link>
											<Link
												className="footer_menu_txt"
												to="/orderhistory"
											>
												L???ch s??? mua h??ng
											</Link>
											<Link
												className="footer_menu_txt"
												to="/qrscreen"
											>
												QR c???a t??i
											</Link>
										</div>
									) : (
										<></>
									)}
								</div>
							</div>
							<div className="footer_menu_contact">
								<h3 className="footer_menu_title">LI??N H???</h3>
								<div className="footer_menu_contact_respon">
									<h className="footer_menu_txt">
										<HomeFilled
											style={{
												fontSize: "18px",
												color: "#083B66",
											}}
										/>{" "}
										12 Nguy???n V??n B???o, P.4, Q.G?? V???p, TP.HCM
									</h>
									<h className="footer_menu_txt">
										<MailFilled
											style={{
												fontSize: "18px",
												color: "#083B66",
											}}
										/>{" "}
										cskh@hhbooks.herokuapp.com
									</h>
									<h className="footer_menu_txt">
										<PhoneFilled
											style={{
												fontSize: "18px",
												color: "#083B66",
											}}
										/>{" "}
										1900636467
									</h>
								</div>
							</div>
							<div className="footer_menu_partner">
								<div className="footer_menu_partner_container">
									<img
										src={vnpost}
										width="100px"
										height="40px"
									/>
									<img src={ahamove} width="110px" />
									<img src={ghn} width="150px" />
									<img src={snappy} width="150px" />
								</div>
								<div className="footer_menu_partner_container special">
									<img
										src={vnpay}
										style={{ maxWidth: "120px" }}
									/>
									<img
										src={zalopay}
										style={{ maxWidth: "120px" }}
									/>
									<img src={momo} height="50px" />
									<img src={moca} height="65px" />
								</div>
							</div>
						</div>
				
					
				</footer>
			</div>
			<MessengerChat
				pageId="100202739365252"
				language="sv_VN"
				themeColor={"#083B66"}
				bottomSpacing={30}
				loggedInGreeting="loggedInGreeting"
				loggedOutGreeting="loggedOutGreeting"
				greetingDialogDisplay={"show"}
				debugMode={true}
				onMessengerShow={() => {
					console.log("onMessengerShow");
				}}
				onMessengerHide={() => {
					console.log("onMessengerHide");
				}}
				onMessengerDialogShow={() => {
					console.log("onMessengerDialogShow");
				}}
				onMessengerDialogHide={() => {
					console.log("onMessengerDialogHide");
				}}
				onMessengerMounted={() => {
					console.log("onMessengerMounted");
				}}
				onMessengerLoad={() => {
					console.log("onMessengerLoad");
				}}
			/>
		</Router>
	);
}

export default App;
