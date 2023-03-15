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
		<List >
			{
				// console.log("Cources:" + JSON.stringify(fetchState.data.courses))
				fetchState.data.courses.map(course => {
					console.log("Course:" + JSON.stringify(course))
					return <CourseCard key={course.id} coursePreview = {course} />
				})};
		</List>)
}
