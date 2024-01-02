import React from "react";
import {
	NovuProvider,
	PopoverNotificationCenter,
	NotificationBell,
} from "@novu/notification-center";
import { useNavigate } from "react-router-dom";

const Nav = () => {
	const navigate = useNavigate();

	const onNotificationClick = (notification) =>
		navigate(notification.cta.data.url);

	const signOut = () => {
		localStorage.removeItem("_id");
		navigate("/");
	};
	return (
		<nav className='navbar'>
			<h2>mentalAngel Forum</h2>

			<div className='navbarRight'>
				<NovuProvider
					subscriberId='65844d027ab43529ec765d8d'
					applicationIdentifier='5TIf19sWnja_'
				>
					<PopoverNotificationCenter
						onNotificationClick={onNotificationClick}
						colorScheme='light'
					>
						{({ unseenCount }) => (
							<NotificationBell unseenCount={unseenCount} />
						)}
					</PopoverNotificationCenter>
				</NovuProvider>
				<button onClick={signOut}>Đăng xuất</button>
			</div>
		</nav>
	);
};

export default Nav;