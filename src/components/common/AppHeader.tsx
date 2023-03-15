import React, { useState } from 'react';

import { Menu, Layout } from 'antd';

const { Header } = Layout;


function AppHeader() {
	return (
		<Header>
			<div className="logo">Courses</div>
			<Menu
				style={{ float: 'right'}}
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['2']}
				items={[
					{
						key: '1',
						label: 'Courses',
					},
					{
						key: '3',
						label: 'Contact Us',
					},
				]}
			/>
		</Header>
	);
}

export default AppHeader;