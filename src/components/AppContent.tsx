import { List, Pagination, Row, Col, Card, Rate, Button } from 'antd'
import { getCoursesPreviewApi } from '../api/course-api'
import { CoursePreview, Page, PageRequest } from '../dto/Course'
import CourseCard from './CourseCard'
import { useEffect, useReducer } from 'react'
import Meta from 'antd/es/card/Meta'
import { Link } from 'react-router-dom'

const FIRST_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE_REQUEST: PageRequest = {
	page: FIRST_PAGE,
	size: DEFAULT_PAGE_SIZE
};

interface FetchState {
	pageResponse: null | Page<CoursePreview>;
	pageRequest: PageRequest
}

interface FetchDataAction {
	pageResponse: Page<CoursePreview>;
}

interface FetchActions {
	type: string;
	pageResponse: Page<CoursePreview> | null;
	pageRequest: PageRequest;
}


const INITIAL_STATE: FetchState = {
	pageResponse: null,
	pageRequest: FIRST_PAGE_REQUEST
}

export const AppContent = () => {
	const [searchState, dispatchSearch] = useReducer(searchReducer, INITIAL_STATE);
	useEffect(() => {
		async function performFetch() {
			const pageResponse = await getCoursesPreviewApi(searchState.pageRequest);

			dispatchSearch({
				pageResponse: pageResponse,
				pageRequest: searchState.pageRequest,
				type: "UPDATE"
			});
		}
		performFetch();
	}, [searchState.pageRequest]);

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

	const pageChangeHandler = (page: number, pageSize: number) => {
		const newPageRequest: PageRequest = {
			page: page,
			size: pageSize
		};
		dispatchSearch({
			pageResponse: null,
			pageRequest: newPageRequest,
			type: "PAGINATION"
		});
	}


	if (searchState.pageResponse === null) return <div>Loading...</div>;
	if (searchState.pageResponse !== null) return (
		<div className='app-content'>
			<h2 className='content-title'>Chose your perfect course</h2>
			<Row gutter={[24, 24]}>
				{searchState.pageResponse.results.map(course => {
					return (
						<Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
							<CourseCard key={course.id} coursePreview={course} />
						</Col>
					)
				})}
			</Row>

			<Pagination
				className='pagination'
				defaultCurrent={FIRST_PAGE}
				total={searchState.pageResponse.total}
				defaultPageSize={DEFAULT_PAGE_SIZE}
				onChange={pageChangeHandler}
			/>
		</div>
	)

}
