import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const loginUser = () => {
		fetch("http://localhost:4000/api/login", {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error_message) {
					alert(data.error_message);
				} else {
					alert(data.message);
					navigate("/dashboard");
					localStorage.setItem("_id", data.id); // Lưu cái user_id vào trong localStorage của trình duyệt dưới biến "_id"
				}
			})
			.catch((err) => console.error(err));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser();
		setEmail("");
		setPassword("");
	};

	return (
		<main className='login'>
			<h1 className='loginTitle'>Đăng nhập vào tài khoản của bạn</h1>
			<form className='loginForm' onSubmit={handleSubmit}>
				<label htmlFor='email'>Địa chỉ email</label>
				<input
					type='text'
					name='email'
					id='email'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='password'>Mật khẩu</label>
				<input
					type='password'
					name='password'
					id='password'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='loginBtn'>ĐĂNG NHẬP</button>
				<p>
					Chưa có tài khoản trên mentalAngel? <Link to='/register'>Đăng ký</Link>
				</p>
			</form>
		</main>
	);
};

export default Login;