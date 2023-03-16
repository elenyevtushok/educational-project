import { List, Pagination } from 'antd'
import { courseApi } from '../api/course-api'
import { CoursePreview, Page, PageRequest } from '../dto/Course'
import CourseCard from './CourseCard'
import { useEffect, useReducer } from 'react'


interface FetchState {
	data: null | Page<CoursePreview>,
}

interface FetchDataAction {
	data: Page<CoursePreview>;
}

type FetchActions = FetchDataAction

const firstPageRequest: PageRequest = {
	page: 0,
	size: 10
};


export const AppContent = () => {
	function searchReducer(initialState: FetchState, action: FetchActions): FetchState {
		//  Implement your reducer here.
		if (action.data === null) {
			return initialState;
		}
		return { data: action.data }
	}

	function useFetch(pageRequest: PageRequest): FetchState {
		const [state, dispatch] = useReducer(searchReducer, {
			data: null
		});

		useEffect(() => {
			async function performFetch() {
				const pageResponse = await courseApi.getCoursesPreview(pageRequest);
				dispatch({ data: pageResponse });

			}
			performFetch();
		}, [pageRequest]);
		return state;
	}

	const fetchState = useFetch(firstPageRequest);
	console.log("Cources data:" + JSON.stringify(fetchState.data))
	if (fetchState.data === null) return <div>Loading...</div>;
	if (fetchState.data !== null) return (
		<div>
			<List className='app-content' grid={{
				gutter: 16,
				column: 2,
				xs: 1,
				sm: 2
			}}
				dataSource={fetchState.data.results}
				renderItem={(course) => {
					return (
						<List.Item>
							<CourseCard key={course.id} coursePreview={course} />
						</List.Item>
					)
				}}
			/>
			<Pagination
				defaultCurrent={1}
				total={fetchState.data.total}
				defaultPageSize={10}
				onChange={(page: number, pageSize: number) => {
					const newPageRequest: PageRequest = {
						page: page,
						size: pageSize
					};
					useFetch(newPageRequest);
				}
				}
			/>
		</div>
	)

}
