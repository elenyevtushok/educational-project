import "./App.css"
import { Layout, theme } from 'antd';
import AppHeader from "./components/common/AppHeader";
import { AppFooter } from "./components/common/AppFooter";
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
import {
	QueryClient,
	QueryClientProvider,
} from "react-query";

const queryClient = new QueryClient();

const App = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	return (
		<Router>
			<Layout className="layout">
				<AppHeader />
				<QueryClientProvider client={queryClient}>
					<ErrorBoundary FallbackComponent={ErrorFallback}>
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route path="/course/:id" element={<CoursePage />} />
							<Route path="*" element={<Page404 />} />
						</Routes>
					</ErrorBoundary>
				</QueryClientProvider>
				<AppFooter />
			</Layout>
		</Router>
	);
};

export default App;
