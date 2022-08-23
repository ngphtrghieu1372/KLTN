import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from 'constants/userConstants';
import { DeleteTwoTone } from '@ant-design/icons';
export default function UserListScreen(props) {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
      type: USER_DETAILS_RESET,
    });
  }, [dispatch, successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <div>
      <h1>Danh Sách Người Dùng</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Người Dùng</th>
              <th>Email</th>
              <th>Quyền Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user , index) => (
                <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Có' : 'Không'}</td>
                <td>
                <button
                    type="button"
                    className="edit_btn"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Chỉnh Sửa
                  </button>
                  <DeleteTwoTone
											onClick={() =>
												deleteHandler(user)
											}
											className="delete_icon"
											twoToneColor="red"
										/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}