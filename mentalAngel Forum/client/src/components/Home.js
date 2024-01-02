import React, { useEffect, useState } from "react";
import Likes from "../utils/Likes";
import Comments from "../utils/Comments";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
	const [thread, setThread] = useState("");
	const [threadList, setThreadList] = useState([]);
	const navigate = useNavigate();

	// Liệt kê ra tất cả các threads đang có (từ các user)
	useEffect(() => {
		const checkUser = () => {
			// Nếu bằng cách nào đó người dùng vẫn đăng nhập được (đăng nhập chui qua SQL Injection, không có id) 
			// => quay trở về trang đăng nhập
			if (!localStorage.getItem("_id")) { // Biến "_id" (chính là cái user_id lúc nãy) tồn tại trong localStorage
				navigate("/");
			} else { 
				fetch("http://localhost:4000/api/all/threads")
					.then((res) => res.json())
					.then((data) => setThreadList(data.threads))
					.catch((err) => console.error(err));
			}
		};
		checkUser();
	}, [navigate]);

	// Tạo threads, navigate đến file index.js trong server
	const createThread = () => {
		fetch("http://localhost:4000/api/create/thread", {
			method: "POST",
			body: JSON.stringify({
				thread,
				id: localStorage.getItem("_id"),
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				alert(data.message);
				setThreadList(data.threads);
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createThread();
		setThread("");
	};
	return (
		<>
			<Nav />
			<main className='home'>
				<h2 className='homeTitle'>Tạo bài đăng mới</h2>
				<form className='homeForm' onSubmit={handleSubmit}>
					<div className='home__container'>
						<label htmlFor='thread'>Nội dung / mô tả</label>
						<input
							type='text'
							name='thread'
							required
							value={thread}
							onChange={(e) => setThread(e.target.value)}
						/>
					</div>
					<button className='homeBtn'>TẠO BÀI ĐĂNG</button>
				</form>

				<div className='thread__container'>
					{threadList.map((thread) => (
						<div className='thread__item' key={thread.id}>
							<p>{thread.title}</p>
							<div className='react__container'>
								<Likes
									numberOfLikes={thread.likes.length}
									threadId={thread.id}
								/>
								<Comments
									numberOfComments={thread.replies.length}
									threadId={thread.id}
									title={thread.title}
								/>
							</div>
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Home;