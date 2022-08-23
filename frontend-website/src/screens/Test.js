import React, { useEffect } from "react";
import Products from "../components/Products";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { listProductsHome, listProducts } from "../actions/productActions";
import { Carousel } from "antd";
import { FireTwoTone } from "@ant-design/icons";
function HomeScreen2(props) {
	const dispatch = useDispatch();
	const productListHome = useSelector((state) => state.productListHome);
	const { loading, error, products } = productListHome;
	useEffect(() => {
		dispatch(listProductsHome({}));
	}, [dispatch]);

	return (
		<div className="home_container">
			<div className="home_title">{props.name}</div>
			{loading ? (
				<LoadingBox></LoadingBox>
			) : error ? (
				<MessageBox variant="danger">{error}</MessageBox>
			) : (
				<>
					{products.length === 0 && (
						<MessageBox>"Không Có Sản Phẩm"</MessageBox>
					)}
					<div className="row center" style={{ padding: "10px" }}>
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

export default HomeScreen2;
