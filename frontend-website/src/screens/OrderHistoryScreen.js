import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listOrderMine } from "../actions/orderActions";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { signout } from "../actions/userAction";
function OrderHistoryScreen(props) {
  const orderMineList = useSelector(state => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  const handleSignOut = () => {
    dispatch(signout());
  };
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
  return (
    <div className="profile_container">
      <ul className="profile_menu">
                  <li>
                    <Link to="/profile">Quản Lý Tài Khoản</Link>
                  </li>
                  <li>
                    <b><Link to="/orderhistory">Đơn Hàng Của Tôi</Link></b>
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
<div className="order_table" >
      <b className="profile_title">Đơn Hàng Của Tôi</b>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger"> {error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th style={{textAlign:'center'}} className="mobile_id">Mã Đơn Hàng</th>
              <th style={{textAlign:'center'}}>Ngày Đặt</th>
              <th style={{textAlign:'center'}}>Trạng Thái Thanh Toán</th>
              <th style={{textAlign:'center'}}>Trạng Thái Giao Hàng</th>
              <th style={{textAlign:'center'}}>Tổng Cộng</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {orders.map(order => (
              <tr key={order._id} >
                <td style={{textAlign:'center'}} className="mobile_id">{order._id} </td>
                <td style={{textAlign:'center'}}>{order.createdAt.substring(0, 10)} </td>
                
                <td style={{textAlign:'center'}}>{order.isPaid ? order.paidAt.substring(0, 10) : <h style={{color:'red'}}>Chưa thanh toán</h>} </td>
                <td style={{textAlign:'center'}}>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : <h style={{color:'red'}}>Chưa giao</h>}{" "}
                </td>
                <td style={{textAlign:'center'}}>{addCommas(order.totalPrice)}đ</td>
                <td>
                  <button
                    type="button"
                    className="edit_btn"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                   Chi Tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    
  );
}

export default OrderHistoryScreen;
