import * as React from "react";
import "./App.css"
import { courseApi } from "./api/course-api";
import { CoursesPreviewResponse } from "./dto/Course";
import { Layout, Menu, theme } from 'antd';
import CourseCard from "./components/CourseCard";
import { AppContent } from "./components/AppContent";
import AppHeader from "./components/common/AppHeader";
import { AppFooter } from "./components/common/AppFooter";
import { Hero } from "./components/Hero";

const { Header, Content, Footer } = Layout;

const App = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Layout className="layout">
			<AppHeader />
			<Hero />
			<Content style={{ padding: '0 50px' }}>
				<AppContent />
			</Content>
			<AppFooter />
		</Layout>
	);
};

export default App;
