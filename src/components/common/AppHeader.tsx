import React, { useState } from 'react';

import { Menu, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;


function AppHeader() {
	return (
		<Header>
			<Link to={'/'}><div className="logo" ></div></Link>
			<Menu
				style={{ float: 'right'}}
				theme="light"
				mode="horizontal"
				defaultSelectedKeys={['2']}
				items={[
					// {
					// 	key: '1',
					// 	label: 'Courses',
					// },
					// {
					// 	key: '2',
					// 	label: 'Contact Us',
					// }
				]}
			/>
		</Header>
	);
}

export default AppHeader;