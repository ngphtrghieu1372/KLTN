import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder,listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELETE_RESET } from "constants/orderConstans";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";
export default function OrderListScreen(props) {
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
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
  }, [dispatch,successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
        dispatch(deleteOrder(order._id));
      }
  };
  return (
    <div className="profile_container">
<div style={{paddingTop:"1.5%", width:'100%'}}>
<b className="profile_title">Danh Sách Đơn Hàng</b>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th className="mobile_id">Mã Đơn Hàng</th>
              <th style={{textAlign:'center'}}>Khách Hàng</th>
              <th>Ngày Đặt</th>
              
              <th style={{textAlign:'center'}}>Ngày Thanh Toán</th>
              <th>Giao Hàng</th>
              <th>Tổng Cộng</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index+1}</td>
                <td className="mobile_id">{order._id}</td>
                <td style={{textAlign:'center'}}>{order.user.name}</td>
                <td >{order.createdAt.substring(0, 10)}</td>
               
                <td style={{textAlign:'center'}}>{order.isPaid ? order.paidAt.substring(0, 10) : (<a style={{fontSize:'12px'}}>Đang Xử Lý</a>)}</td>
                <td >
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : (<a style={{fontSize:'12px'}}>Đang Xử Lý</a>)}
                </td>
                <td style={{fontWeight:'bold', color:'#C92127'}}>{addCommas(order.totalPrice)}đ</td>
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
                  <DeleteTwoTone onClick={() => deleteHandler(order)} className="delete_icon" twoToneColor="red"/>
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
