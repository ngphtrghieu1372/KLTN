import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, summary, error } = orderSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);
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
    <div>
      <div className="row">
        <h1>Thống kê</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary" >
            <li style={{backgroundColor:'#fff'}}>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Tổng số người dùng
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li style={{backgroundColor:'#fff'}}>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Tổng số đơn hàng
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li style={{backgroundColor:'#fff'}}>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Tổng số doanh thu
                </span>
              </div>
              <div className="summary-body">
                {addCommas(summary.orders[0]
                  ? summary.orders[0].totalSales
                  : 0)}
                  đ
              </div>
            </li>
          </ul>
          <div>
            <div>
              <h2>Doanh thu theo ngày</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>Không có</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Đang tải</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
          </div>
          <div>
            <h2>Danh mục sản phẩm</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>Không có</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Đang tải</div>}
                data={[
                  ['Category', 'Products'],
                  ...summary.productCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}