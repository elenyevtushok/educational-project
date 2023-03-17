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
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import { MainPage } from "./components/MainPage";
import { CoursePage } from "./components/CoursePage";

const { Header, Content, Footer } = Layout;

const App = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Router>
			<Layout className="layout">
				<AppHeader />
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/course/:" element={<CoursePage />} />
				</Routes>
				<AppFooter />
			</Layout>
		</Router>
	);
};

export default App;
