import React, { useState } from "react";
import { Input } from 'antd';
import 'antd/dist/antd.css';
export default function SearchBox(props) {
	const [name, setName] = useState("");
	const submitHandler = (e) => {
		e.preventDefault();
		props.history.push(`/search/name/${name}`);
	};
	return (
		<form className="search" onSubmit={submitHandler}>
			<div className="boxsearch">
				<Input
					type="text"
					name="q"
					id="q"
					placeholder="Tìm kiếm sản phẩm mong muốn..."
					onChange={(e) => setName(e.target.value)}
					allowClear
          size="large"
				></Input>
				<button className="primary" type="submit">
					<i className="fa fa-search" style={{ color: "white" }}></i>
				</button>
			</div>
		</form>
	);
}
