import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import { signout } from "../actions/userAction";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "constants/userConstants";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default function ProfileScreen() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmpassword, setConfirmPassword] = useState("");
	const handleSignOut = () => {
		dispatch(signout());
	};
	const userSignin = useSelector((state) => state.userSignin);
	const { userInfo } = userSignin;
	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;
	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const {
		success: successUpdate,
		error: errorUpdate,
		loading: loadingUpdate,
	} = userUpdateProfile;
	const dispatch = useDispatch();
	useEffect(() => {
		if (!user) {
			dispatch({ type: USER_UPDATE_PROFILE_RESET });
			dispatch(detailsUser(userInfo._id));
		} else {
			setName(user.name);
			setPhone(user.phone);
			setEmail(user.email);
		}
	}, [dispatch, userInfo._id, user]);
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmpassword) {
			alert("Mật khẩu không đúng!");
		} else {
			dispatch(
				updateUserProfile({ userId: user._id, name, phone, email, password })
			);
		}
	};
	return (
		<div className="profile_container">
			<ul className="profile_menu">
				<li>
					<b>
						<Link to="/profile">Quản Lý Tài Khoản</Link>
					</b>
				</li>
				<li>
					<Link to="/orderhistory">Đơn Hàng Của Tôi</Link>
				</li>
				<li>
					<Link to="/qrscreen">QR Của Tôi</Link>
				</li>
				<li>
					<Link to="#signout" onClick={handleSignOut}>
						Đăng Xuất
					</Link>
				</li>
			</ul>

			<form className="form" onSubmit={handleSubmit}>
				<div>
					<b className="profile_title">Tài Khoản</b>
				</div>
				{loading ? (
					<LoadingBox />
				) : error ? (
					<MessageBox variant="danger"> {error}</MessageBox>
				) : (
					<>
						
						<div>
							<label htmlFor="name">Họ Và Tên</label>
							<input
								id="name"
								type="text"
								placeholder="Họ Và Tên"
								onChange={(e) => setName(e.target.value)}
								value={name}
								
							/>
						</div>
						<div>
							<label htmlFor="phone">Số Điện Thoại</label>
							<input
								id="phone"
								type="tel"
								placeholder="Số Điện Thoại"
								onChange={(e) => setPhone(e.target.value)}
								value={phone}
							/>
						</div>
						<div>
							<label htmlFor="email">Email</label>
							<input
								id="email"
								type="text"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="password">Mật Khẩu Mới</label>
							<input
								id="password"
								type="password"
								placeholder=""
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div>
							<label htmlFor="confirmpassword">
								Xác Nhận Mật Khẩu
							</label>
							<input
								id="confirmpassword"
								type="password"
								placeholder=""
								onChange={(e) =>
									setConfirmPassword(e.target.value)
								}
							/>
						</div>
						<div>
							<label />
							<button className="signin_btn" type="submit">
								{" "}
								Lưu Thay Đổi
							</button>
						</div>
						{loadingUpdate && <LoadingBox />}
						{errorUpdate && (
							<MessageBox variant="danger">
								{errorUpdate}
							</MessageBox>
						)}
						{successUpdate && (
							<MessageBox variant="success">
								{" "}
								Chỉnh sửa thành công
							</MessageBox>
						)}
					</>
				)}
			</form>
		</div>
	);
}
