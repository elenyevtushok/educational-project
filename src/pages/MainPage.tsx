import { Content } from 'antd/es/layout/layout'
import { AppContent } from '../components/AppContent'
import { Hero } from '../components/Hero'


export const MainPage = () => {
	return (
		<Content>
			<Hero />
			<AppContent />
		</Content>
	)
}
