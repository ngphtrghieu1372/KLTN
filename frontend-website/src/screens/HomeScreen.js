import React, { useEffect } from "react";
import Products from "../components/Products";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { listProducts,  listProductsHome} from "../actions/productActions";
import { Carousel } from "antd";
import HomeScreen2 from "./Test";
import banner1 from "../img/banner1.jpg";
import banner2 from "../img/banner2.jpg";
import banner3 from "../img/banner3.jpg";
import banner4 from "../img/banner4.jpg";
import banner6 from "../img/banner6.jpg";
import banner7 from "../img/banner7.jpg";
import banner5 from "../img/banner7.png";
import bannertop from "../img/topbanner.jpg";
import {FireTwoTone} from "@ant-design/icons"
function HomeScreen(props) {
	const dispatch = useDispatch();
	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;
	useEffect(() => {
		dispatch(listProducts({}));
	}, [dispatch]);


	// const productListHome = useSelector((state) => state.productListHome);
	// const { productsHome } = productListHome;
	// useEffect(() => {
	// 	dispatch(listProductsHome({}));
	// }, [dispatch]);


	const contentStyle = {
		height: "400px",
		color: "#fff",
		textAlign: "center",
		background: "#364d79",
	};
	return (
		<div className="home_container">
			<div className="banner_container">
				<div className="carousel">
					<Carousel autoplay>
						<img src={banner1} className="contentStyle" />

						<img src={banner2} className="contentStyle" />

						<img src={banner3} className="contentStyle" />
					</Carousel>
				</div>

				<div className="banner_right">
					<img src={banner4} className="home-banner-4"/>
					<img src={banner5} className="home-banner-4"/>
					<img src={banner6} className="home-banner-4"/>
					<img src={banner7} className="home-banner-4"/>
				</div>
			</div>
			<div className="home_title">Sản Phẩm Mới</div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					{products.length === 0 && (
						<MessageBox>"Không Có Sản Phẩm"</MessageBox>
					)}
					<div className="row center">
						{products.map((product) => (
							<Products
								key={product._id}
								product={product}
							></Products>
						))}
					</div>
				</>
			)}
			<div className="home_paralax">
				<div className="paralax_slogan">
					<div className="paralax_title">H&HBooks</div>
					<div className="paralax_txt">
						Những quyển sách làm say mê ta đến tận tủy, chúng nói
						chuyện với ta, cho ta những lời khuyên và liên kết với
						ta bởi một tình thân thật sống động và nhịp nhàng.{" "}
					</div>
				</div>
			</div>
			<HomeScreen2 name="Sách Bán Chạy"/>
			<div className="home_title">Sách Được Yêu Thích</div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					{products.length === 0 && (
						<MessageBox>"Không Có Sản Phẩm"</MessageBox>
					)}
					<div className="row center" style={{padding:'10px'}}>
						{products.map((product) => (
							<Products
								key={product._id}
								product={product}
							></Products>
						))}
					</div>
				</>
			)}
			<img src={bannertop} style={{ width: "100%", marginTop:'15px'}} />
			
			<div className="home_title"><FireTwoTone twoToneColor="#C92127"/> Xu Hướng Mua Sắm</div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					{products.length === 0 && (
						<MessageBox>"Không Có Sản Phẩm"</MessageBox>
					)}
					<div className="row center" style={{padding:'10px'}}>
						{products.map((product) => (
							<Products
								key={product._id}
								product={product}
							></Products>
						))}
					</div>
				</>
			)}
			
		</div>
	);
}

export default HomeScreen;
