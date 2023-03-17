import { List, Pagination } from 'antd'
import { getCoursesPreviewApi } from '../api/course-api'
import { CoursePreview, Page, PageRequest } from '../dto/Course'
import CourseCard from './CourseCard'
import { useEffect, useReducer } from 'react'

const FIRST_PAGE = 1;
const DEFAULT_PAGE_SIZE = 9;
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
		<div>
			<h2>Chose your perfect course</h2>
			{/* <div className='cards-test'>
				<CourseCard key={searchState.pageResponse.results[0].id} coursePreview={searchState.pageResponse.results[0]} />
				<CourseCard key={searchState.pageResponse.results[5].id} coursePreview={searchState.pageResponse.results[6]} />
			</div> */}

			
			<List className='app-content' grid={{
				gutter: 16,
				column: 3,
				xs: 1,
				sm: 1,
				md: 1,
				lg: 2,
				xl: 2,
				xxl: 3
			}}
				dataSource={searchState.pageResponse.results}
				renderItem={(item) => {
					return (
						<List.Item>
							<CourseCard key={item.id} coursePreview={item} />
						</List.Item>
					)
				}}
			/>
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
