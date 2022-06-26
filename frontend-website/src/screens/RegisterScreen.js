import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
function RegisterScreen(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const redirect = props.location.search
		? props.location.search.split("=")[1]
		: "/";
	const userRegister = useSelector((state) => state.userRegister);
	const { userInfo, loading, error } = userRegister;

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert(" Mật khẩu không trùng khớp");
		} else {
			dispatch(register(name, email, phone, password));
		}
	};
	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [userInfo, props.history, redirect]);
	return (
		<div>
			<form className="form" onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
				<div>
					<h1 style={{ fontSize: "22px", color: "#1464A6" }}>
						{" "}
						Đăng Kí
					</h1>
				</div>
				{loading && <LoadingBox></LoadingBox>}
				{error && <MessageBox variant="danger">{error}</MessageBox>}
				<div>
					<label htmlFor="name"> Họ Và Tên</label>
					<input
						type="text"
						id="name"
						placeholder="Nhập họ và tên"
						required
						onChange={(e) => setName(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="email"> Email</label>
					<input
						type="email"
						id="email"
						placeholder=" Nhập email"
						required
						onChange={(e) => setEmail(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="phone"> Số Điện Thoại</label>
					<input
						type="tel"
						id="phone"
						placeholder=" Nhập số điện thoại"
						required
						onChange={(e) => setPhone(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="password">Mật Khẩu</label>
					<input
						type="password"
						id="password"
						placeholder="Tạo mật khẩu"
						required
						onChange={(e) => setPassword(e.target.value)}
					></input>
				</div>
				<div>
					<label htmlFor="confirmPassword"> Xác Nhận Mật Khẩu</label>
					<input
						type="password"
						id="confirmpassword"
						placeholder="xác nhận mật khẩu"
						required
						onChange={(e) => setConfirmPassword(e.target.value)}
					></input>
				</div>
				<div>
					<label />
					<button className="signin_btn" type="submit">
						{" "}
						Đăng Kí
					</button>
				</div>
				<div>
					<label />
					<div>
						Đã có tài khoản?{" "}
						<Link to={`/signin?redirect=${redirect}`}>
							Đăng Nhập{" "}
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}

export default RegisterScreen;
