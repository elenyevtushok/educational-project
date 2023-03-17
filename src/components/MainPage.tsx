import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { AppContent } from './AppContent'
import { Hero } from './Hero'

export const MainPage = () => {
  return (
	  <Content>
		  <Hero />
		  <AppContent />
	  </Content>
  )
}
