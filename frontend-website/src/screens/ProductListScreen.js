import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createProduct,
  listProducts,
  deleteProduct
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET
} from "../constants/productConstants";
import { DeleteTwoTone } from "@ant-design/icons";
export default function ProductListScreen(props) {
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
  const { pageNumber = 1 } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ pageNumber }));
  }, [
    createdProduct,
    dispatch,
    props.history,
    successCreate,
    successDelete,
    pageNumber
  ]);

  const deleteHandler = (product) => {
		if (window.confirm("Bạn Có Chắc Chắn Muốn Xóa?")) {
			dispatch(deleteProduct(product._id));
		}
	};

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div style={{paddingTop:'2rem'}}>
      	<div className="row">
					<b className="profile_title">Danh Sách Sản Phẩm</b>
					<button
						type="button"
						className="add_btn"
						onClick={createHandler}
					>
						Thêm Sản Phẩm
					</button>
				</div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th className="mobile_id">Mã Sản Phẩm</th>
								<th>Tên Sản Phẩm</th>
								<th>Thể Loại</th>
								<th>NXB</th>
                <th>Tồn Kho</th>
								<th>Giá</th>
								<th></th>
              </tr>
            </thead>
            <tbody>
            {products.map((product, index) => (
								<tr key={product._id}>
                  <td style={{textAlign:'center', fontWeight:'bold'}}>{index+1}</td>
									<td className="mobile_id" style={{ fontSize: "12px" }}>
										{product._id}
									</td>
									<td >
										{product.name}
									</td>

									<td >
										{product.category}
									</td>
									<td >
										{product.brand}
									</td>
                  <td style={{textAlign:'center', fontWeight:'bold'}}>
                  {product.countInStock > 10 ? (
													<span style={{color:'green'}}>
														{product.countInStock}
													</span>
												) : (
													<span style={{color:'red'}}>
														{product.countInStock}
													</span>
												)}
									</td>
									<td style={{fontWeight:'bold', color:'#C92127'}}>
										{addCommas(product.price)}đ
									</td>
									<td style={{textAlign:'center'}}>
										<button
											type="button"
											className="edit_btn"
											onClick={() =>
												props.history.push(
													`/product/${product._id}/edit`
												)
											}
										>
											Chỉnh Sửa
										</button>

										<DeleteTwoTone
											onClick={() =>
												deleteHandler(product)
											}
											className="delete_icon"
											twoToneColor="red"
										/>
									</td>
								</tr>
							))}
            </tbody>
          </table>
          <div className="row center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
