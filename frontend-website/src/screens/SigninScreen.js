import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin, signinGoogle, signinFacebook } from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import { GoogleLogin } from "react-google-login";
import { FacebookLoginWithButton } from "facebook-login-react";
import MessageBox from "../components/MessageBox";
import { Checkbox } from "antd";
import { QrcodeOutlined } from "@ant-design/icons";
function SigninScreen(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [savepass, setSavePass] = useState(false);
	const savePass = (e) => {
		setSavePass(e.target.checked);
	};
	const redirect = props.location.search
		? props.location.search.split("=")[1]
		: "/";
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo, loading, error } = userSignin;

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(signin(email, password));
	};
	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [userInfo, props.history, redirect]);
	const googleSuccess = async (res) => {
		const name = res.profileObj.name ? res.profileObj.name : 1;
		const name1 = res.profileObj.email ? res.profileObj.email : 1;
		// console.log(name1);
		// const token = res.tokenId?res.tokenId:1;
		dispatch(signinGoogle(name, name1));
	};
	const googleFailure = (error) => {
		console.log(error);
	};

	const responseFacebook = (response) => {
		console.log(response);
		const nameFace = response.name;
		const emailFace = response.email;
		dispatch(signinFacebook(nameFace, emailFace));
		// setData(response);
	};

	return (
		<div>
			<form
				className="form"
				onSubmit={handleSubmit}
				style={{ marginTop: "10px" }}
			>
				<div>
					<b style={{ fontSize: "22px", color: "#083B66" }}>
						{" "}
						Đăng Nhập
					</b>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant="danger">{error}</MessageBox>}
				<div className="input_box">
					<label htmlFor="email"></label>
					<input
						type="email"
						id="email"
						placeholder="Email"
						required
						onChange={(e) => setEmail(e.target.value)}
					></input>
				</div>
				<div className="input_box">
					<label htmlFor="password"></label>
					<input
						type="password"
						id="password"
						placeholder="Mật Khẩu"
						required
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>
				<div>
					<Checkbox onChange={savePass}>
						Ghi nhớ tài khoản đăng nhập
					</Checkbox>
				</div>

				<div>
					<label />
					<button className="signin_btn" type="submit">
						{" "}
						ĐĂNG NHẬP
					</button>
				</div>

				<div>
					<label />
					<div>
						Chưa có tài khoản?{" "}
						<Link to={`/register?redirect=${redirect}`}>
							{" "}
							Đăng Kí Ngay
						</Link>
					</div>
				</div>
				<div
					style={{
						textAlign: "center",
						width: "100%",
						fontWeight: "700",
					}}
				>
					Hoặc
				</div>
				<div>
					<Link to="/signinqr" className="signin_qr">
						Đăng Nhập Với QR <QrcodeOutlined />
					</Link>
				</div>

				<div>
					<GoogleLogin
						clientId="216043543519-qsm0h8a0fc2uvs0tjte6iv8jss6odrg6.apps.googleusercontent.com"
						onSuccess={googleSuccess}
						onfailure={googleFailure}
						cookiePolicy={"single_host_origin"}
					></GoogleLogin>
				</div>
				<div>
					<FacebookLoginWithButton
						appId="1109280643253436"
						// autoLoad={true}
						fields="name,email,picture"
						callback={responseFacebook}
					></FacebookLoginWithButton>
				</div>
			</form>
		</div>
	);
}

export default SigninScreen;
