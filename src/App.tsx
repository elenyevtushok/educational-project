import * as React from "react";
import "./App.css"
import { courseApi } from "./api/course-api";
import { CoursesPreviewResponse } from "./dto/Course";
import { Layout, Menu, theme } from 'antd';
import CourseCard from "./components/CourseCard";
import { AppContent } from "./components/AppContent";
import AppHeader from "./components/common/AppHeader";

const { Header, Content, Footer } = Layout;

const App = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout className="layout">
			<AppHeader />
			<Content style={{ padding: '0 50px' }}>
				<AppContent />
			</Content>
			<Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
		</Layout>
	);
};

export default App;
