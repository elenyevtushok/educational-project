import { List, Pagination } from 'antd'
import { courseApi } from '../api/course-api'
import { CoursePreview, Page, PageRequest } from '../dto/Course'
import CourseCard from './CourseCard'
import { useEffect, useReducer } from 'react'


interface FetchState {
	pageResponse: null | Page<CoursePreview>;
	pageRequest: PageRequest
}

interface FetchDataAction {
	pageResponse: Page<CoursePreview>;
}

interface FetchActions {
	type: string;
	pageResponse: Page<CoursePreview>;
	pageRequest: PageRequest;
}

const FIRST_PAGE_REQUEST: PageRequest = {
	page: 0,
	size: 10
};
const INITIAL_STATE: FetchState = {
	pageResponse: null,
	pageRequest: FIRST_PAGE_REQUEST
}

export const AppContent = () => {

	function searchReducer(currentState: FetchState, action: FetchActions): FetchState {
		//  Implement your reducer here.
		if (action.type === "PAGINATION") {
			return {
				...currentState,
				pageRequest: action.pageRequest
			};
		}

		if (action.type === "UPDATE") {
			return {
				...currentState,
				pageResponse: action.pageResponse
			};
		}

		return currentState;
	}

	function useFetch(pageRequest: PageRequest): FetchState {
		const [state, dispatchSearch] = useReducer(searchReducer, INITIAL_STATE);

		useEffect(() => {
			async function performFetch() {
				const pageResponse = await courseApi.getCoursesPreview(pageRequest);
				dispatchSearch({
					pageResponse: pageResponse,
					pageRequest: pageRequest,
					type: "UPDATE"
				});
			}
			performFetch();
		}, [pageRequest]);
		return state;
	}

	const pageChangeHandler = (page: number, pageSize: number) => {
		const newPageRequest: PageRequest = {
			page: page,
			size: pageSize
		};
		// dispatchSearch({
		// 	pageResponse: null,
		// 	pageRequest: newPageRequest,
		// 	type: "PAGINATION"
		// });
	}

	const fetchState = useFetch(FIRST_PAGE_REQUEST);
	if (fetchState.pageResponse === null) return <div>Loading...</div>;
	if (fetchState.pageResponse !== null) return (
		<div>
			<List className='app-content' grid={{
				gutter: 16,
				column: 2,
				xs: 1,
				sm: 2
			}}
				dataSource={fetchState.pageResponse.results}
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
				total={fetchState.pageResponse.total}
				defaultPageSize={10}
				onChange={pageChangeHandler}
			/>
		</div>
	)

}
