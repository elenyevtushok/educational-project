import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

export const Page404 = () => {
	return (
		<div className='app-content'>
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={<Button href='/' type="primary">Back Home</Button>}
		/>
		</div>
	)
}
