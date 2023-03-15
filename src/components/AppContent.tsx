import { List } from 'antd'
import React from 'react'
import { courseApi } from '../api/course-api'
import { CoursePreview, CoursesPreviewResponse } from '../dto/Course'
import CourseCard from './CourseCard'


interface FetchState {
	data: null | CoursesPreviewResponse,
}

interface FetchDataAction {
	data: CoursesPreviewResponse
}

type FetchActions = FetchDataAction

function fetchReducer(initialState: FetchState, action: FetchActions): FetchState {
	//  Implement your reducer here.
	if (action.data === null) {
		return initialState;
	}
	return { data: action.data }
}

function useFetch(url: string): FetchState {
	const [state, dispatch] = React.useReducer(fetchReducer, {
		data: null
	});

	React.useEffect(() => {
		async function performFetch() {
			const response = await courseApi.getCoursesPreview();
			dispatch({ data: response.data });

		}
		performFetch();
	}, [url]);
	return state;
}




export const AppContent = () => {
	const fetchState = useFetch("");
	console.log("Cources data:" + JSON.stringify(fetchState.data))
	if (fetchState.data === null) return <div>Loading...</div>;
	if (fetchState.data !== null) return (
		<List grid={{
			gutter: 16, 
			xs: 1,
			sm: 2,
			md: 4,
			lg: 4,
			xl: 6,
			xxl: 3, }}>
			{
				// console.log("Cources:" + JSON.stringify(fetchState.data.courses))
				fetchState.data.courses.map(course => {
					console.log("Course:" + JSON.stringify(course))
					return (
						<List.Item>
							<CourseCard key={course.id} coursePreview={course} />
						</List.Item>
					)
				})};
		</List>)
}
