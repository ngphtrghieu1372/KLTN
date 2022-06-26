import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import RatingReview from "../components/RatingReview";
import { useSelector, useDispatch } from "react-redux";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct, createReview } from "../actions/productActions";
import { PRODUCT_REVIEW_CREATE_RESET } from "constants/productConstants";
import HomeScreen2 from "./Test";
function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
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
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Gửi bình luận thành công');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  },  [dispatch, productId, successReviewCreate]);
  const handleAddToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Xin vui lòng nhập mô tả và đánh giá');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger"> {error} </MessageBox>
      ) : (
        <div>
          {/* <Link to="/">Back to result</Link> */}
          <div className="product_container">
						<div className="product_container_top">
							<div className="product_container_top_2">
								<div className="detail_img">
									<img
										className="large"
										src={product.image}
										alt={product.name}
									/>
								</div>
								<div className="detail_name">
									<ul>
										<li>
											<h1
												style={{
													fontWeight: "700",
													fontSize: "25px",
												}}
											>
												{product.name}
											</h1>
										</li>
										<li>
											<Rating
												rating={product.rating}
												numReviews={product.numReviews}
											/>
										</li>
										<li>Giá: <a style={{color:'#C92127', fontWeight:'bold',fontSize:'30px'}}>{addCommas(product.price)}đ</a> </li>
										<li>
										<b>Thể Loại:</b> {product.category}
										</li>
										<li>
										<b>Nhà Xuất Bản:</b> {product.brand}
										</li>
                							
									</ul>
								</div>
							</div>

							<div className="detail_checkout_card">
								<ul style={{width:'100%'}}>
									<li>
										<div className="checkout_label">
											<div>Giá</div>
											<div className="price">
												{addCommas(product.price)} đ
											</div>
										</div>
									</li>
									<li>
										<div className="row">
											<div>Tình Trạng</div>
											<div>
												{product.countInStock > 0 ? (
													<span className="success">
														Còn Hàng
													</span>
												) : (
													<span className="danger">
														Hết Hàng
													</span>
												)}
											</div>
										</div>
									</li>
									{product.countInStock > 0 && (
										<>
											<li>
												<div className="row">
													<div>Số Lượng :</div>
													<div>
														<select
															value={qty}
															onChange={(e) =>
																setQty(
																	e.target
																		.value
																)
															}
														>
															{[
																...Array(
																	product.countInStock
																).keys(),
															].map((x) => (
																<option
																	key={x + 1}
																	value={
																		x + 1
																	}
																>
																	{x + 1}
																</option>
															))}
														</select>
													</div>
												</div>
											</li>
											<li style={{textAlign:'center'}}>
												<button
													className="signin_btn"
													onClick={handleAddToCart}
												>
													Thêm Vào Giỏ Hàng
												</button>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
            
						<div className="product_container_bottom">
							<div className="describe_container">
								<p className="profile_title">Mô tả:</p> 
                <p>{product.description}</p>
							</div>
						</div>
					</div>
          <div className="rating_container">
            <p className="profile_title" id="reviews">Đánh giá sản phẩm</p>
            {product.reviews.length === 0 && (
              <MessageBox>Không có đánh giá..</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id} className="comment">
                  <strong>{review.name}</strong>
                  <RatingReview rating={review.rating} caption=""></RatingReview>
                  <p style={{fontSize:'10px'}}>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Đánh giá sản phẩm</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Xếp hạng</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Chọn đánh giá...</option>
                        <option value="1">1- Rất tệ</option>
                        <option value="2">2- Tệ</option>
                        <option value="3">3- Hay</option>
                        <option value="4">4- Rất hay</option>
                        <option value="5">5- Xuất sắc</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Bình luận</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Gửi đánh giá
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Chỉ có thành viên mới có thể viết nhận xét.Vui lòng <Link to="/signin">đăng nhập</Link> 
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
          <HomeScreen2 name="Có Thể Bạn Cũng Thích"/>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
