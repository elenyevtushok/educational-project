import * as React from "react";
import { courseApi } from "./api/course-api";
import { CoursesPreviewResponse } from "./dto/Course";

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
			dispatch({ data: response.data});

		}
		performFetch();
	}, [url]);
	return state;
}

function App(){
	// const fetchState = useFetch("");
	// if (fetchState.data === null) return <div>Loading...</div>;
	// if (fetchState.data !== null) return <div>{JSON.stringify(fetchState.data?.courses)}</div>;
	return (<div>Hi there</div>)
}

export default App
