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
import { MainPage } from "./pages/MainPage";
import { CoursePage } from "./pages/CoursePage";
import { Page404 } from "./pages/errors/Page404";
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from "./components/common/ErrorFallback";


const App = () => {

	return (
		<Router>
			<Layout className="layout">
				<AppHeader />
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/course/:" element={<CoursePage />} />
						<Route path="*" element={<Page404 />} />
					</Routes>
				</ErrorBoundary>
				<AppFooter />
			</Layout>
		</Router>
	);
};

export default App;
