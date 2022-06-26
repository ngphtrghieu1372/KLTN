import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userAction";
import LoadingBox from "../components/LoadingBox";
import { signout } from "../actions/userAction";
import MessageBox from "../components/MessageBox";
import QRCode from "qrcode.react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default function QRScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const { userInfo } = userSignin;
  const handleSignOut = () => {
    dispatch(signout());
  };
 

  return (
    <div className="profile_container">
      
      <ul className="profile_menu">
                  <li>
                    <Link to="/profile">Quản Lý Tài Khoản</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Đơn Hàng Của Tôi</Link>
                  </li>
                  <li>
                    <b><Link to="/qrscreen">QR Của Tôi</Link></b>
                  </li>
                  <li>
                    <Link to="#signout" onClick={handleSignOut}>
                      Đăng Xuất
                    </Link>
                  </li>
                  
                </ul>
     
      <div className="qr_container" >
        <b>Quét Mã QR Để Đăng Nhập Nhanh Trên Nhiều Thiết Bị</b>
              <QRCode
                      id="qrcode"
                      value={userInfo.token}
                      size={400}
                      level={"H"}
                      includeMargin={true}
                    />
      </div>
    </div>
  );
}
