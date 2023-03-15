import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";
import { CoursesPreviewResponse } from "../dto/Course";
import { http } from "../http";
import { STUB_COURSES_PREVIEW } from "./data-cources-overview";

class CourseApi {
	// private http: AxiosInstance;

	// constructor(){
	// 	this.http = axios.create({
	// 		baseURL: COURSE_URL
	// 	});
	// }	

	async getCoursesPreview(): Promise<AxiosResponse<CoursesPreviewResponse>> {
		var mock = new MockAdapter(http.instance);

		// Mock any GET request to /users
		// arguments for reply are (status, data, headers)
		mock.onGet("/core/preview-courses").reply(200, STUB_COURSES_PREVIEW);
		return await http.get<CoursesPreviewResponse, AxiosResponse<CoursesPreviewResponse>>("/core/preview-courses");
	}

}

export const courseApi = new CourseApi();