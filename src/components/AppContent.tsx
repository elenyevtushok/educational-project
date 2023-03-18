import { Row, Col, Button } from 'antd'
import { getCoursesPreviewApi } from '../api/course-api'
import { CoursePreview, Page, PageRequest } from '../dto/Course'
import CourseCard from './CourseCard'
import { useEffect, useReducer } from 'react'

const FIRST_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const FIRST_PAGE_REQUEST: PageRequest = {
	page: FIRST_PAGE,
	size: DEFAULT_PAGE_SIZE
};

interface FetchState {
	pageRequest: PageRequest;
	results: CoursePreview[];
	total: number;
}

interface FetchActions {
	type: string;
	pageResponse: Page<CoursePreview> | null;
	pageRequest: PageRequest;
}


const INITIAL_STATE: FetchState = {
	pageRequest: FIRST_PAGE_REQUEST,
	results: [],
	total: 0
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
		if (action.type === "LOAD_MORE") {
			return {
				...currentState,
				pageRequest: action.pageRequest
			};
		}

		if (action.type === "UPDATE") {
			return {
				...currentState,
				results: currentState.results?.concat(action.pageResponse!.results),
				total: action.pageResponse!.total
			};
		}

		return currentState;
	}

	const loadMoreHandler = () => {
		const newPageRequest: PageRequest = {
			page: (searchState.pageRequest.page + 1),
			size: searchState.pageRequest.size
		};
		dispatchSearch({
			pageResponse: null,
			pageRequest: newPageRequest,
			type: "LOAD_MORE"
		});
	};

	return (
		<div>
			{
				(searchState.total > 0) && (
					<div className='app-content'>
						<h2 className='content-title' id='content-start'>Chose your perfect course</h2>
						<Row gutter={[24, 24]}>
							{searchState.results.map(course => {
								return (
									<Col key={`col-${course.id}`} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }}>
										<CourseCard key={course.id} coursePreview={course} />
									</Col>
								)
							})}
						</Row>
						{
							(searchState.results.length < searchState.total) &&
							(<button className='button-load-more' onClick={loadMoreHandler}>Load more courses</button>)
						}
					</div>
				)
			}
		</div>
	)

}
