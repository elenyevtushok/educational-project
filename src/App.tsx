import * as React from "react";
import "./App.css"
import { courseApi } from "./api/course-api";
import { CoursesPreviewResponse } from "./dto/Course";
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import CourseCard from "./components/CourseCard";
import { AppContent } from "./components/AppContent";

const { Header, Content, Footer } = Layout;

const App = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout className="layout">
			<Header>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={['2']}
					items={new Array(15).fill(null).map((_, index) => {
						const key = index + 1;
						return {
							key,
							label: `nav ${key}`,
						};
					})}
				/>
			</Header>
			<Content style={{ padding: '0 50px' }}>
				<AppContent />
			</Content>
			<Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
		</Layout>
	);
};

export default App;
